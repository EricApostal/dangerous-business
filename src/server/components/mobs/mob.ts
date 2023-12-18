import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { PathfindingService } from "@rbxts/services";
import { Players } from "@rbxts/services";
import { TweenService } from "@rbxts/services";

@Component({
    tag: "mob"
})
export class Mob extends BaseComponent implements OnStart {
    pathfindFollowThread: thread | undefined;
    constructor() {
        super();
    }

    private getNearestPlayer() {
        let nearestPlayer: Player | undefined;
        let nearestDistance: number | undefined;

        for (const player of Players.GetPlayers()) {
            if (player.Character === undefined) { continue; }
            let distance = (player.Character!.PrimaryPart!.Position.sub((this.instance as BasePart).Position)).Magnitude;
            if ((nearestDistance === undefined || distance < nearestDistance) && distance < 20) {
                nearestDistance = distance;
                nearestPlayer = player;
            }
        }

        return nearestPlayer;
    }

    private getWaypoints() {
        let waypoints: PathWaypoint[] = [];

        while (waypoints.size() === 0) {
            let path: Path = PathfindingService.CreatePath({
                AgentCanJump: true,
                AgentHeight: 0,
                AgentRadius: 0,
            });
            let nearestPlayer = this.getNearestPlayer();
            if (nearestPlayer === undefined) { task.wait(); continue }
            let rootpart = this.getNearestPlayer()!.Character?.FindFirstChild("HumanoidRootPart") as BasePart;
            let finish = rootpart.Position;
            path.ComputeAsync((this.instance as BasePart).Position, finish);
            task.wait();
            waypoints = path.GetWaypoints();
        }

        return waypoints;
    }


    startWaypointTask() {
        if (typeIs(this.pathfindFollowThread, "thread")) {
            task.cancel(this.pathfindFollowThread);
        }

        this.pathfindFollowThread = task.spawn(() => {
            let path = this.getWaypoints();
            path.remove(0);
            path.remove(0);

            let timePerNode = 0.2;
            for (const waypoint of path) {
                let newCFrame = waypoint.Position.add(new Vector3(0, 1 + (this.instance as BasePart).Size.Y / 2, 0));
                TweenService.Create((this.instance as BasePart), new TweenInfo(timePerNode), { Position: newCFrame }).Play();
                (this.instance as BasePart).CFrame = CFrame.lookAt((this.instance as BasePart).Position, new Vector3(waypoint.Position.X, (this.instance as BasePart).Position.Y, waypoint.Position.Z));

                task.wait(timePerNode - 0.05);
            }
        });
    }

    onStart() {
        task.wait(5);
        // this.startWaypointTask();
        task.spawn(() => {
            while (true) {
                task.wait(0.5);
                this.startWaypointTask();
            }
        });
    }
}