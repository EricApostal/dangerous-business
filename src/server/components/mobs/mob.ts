import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { PathfindingService } from "@rbxts/services";
import { Players } from "@rbxts/services";

@Component({
    tag: "mob"
})
export class Mob extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    private getNearestPlayer() {
        let nearestPlayer: Player | undefined;
        let nearestDistance: number | undefined;

        for (const player of Players.GetPlayers()) {
            if (player.Character === undefined) { continue; }
            let distance = (player.Character!.PrimaryPart!.Position.sub((this.instance as BasePart).Position)).Magnitude;
            if (nearestDistance === undefined || distance < nearestDistance) {
                nearestDistance = distance;
                nearestPlayer = player;
            }
        }

        return nearestPlayer;
    }

    private getWaypoints() {
        let waypoints: PathWaypoint[] = [];

        while (waypoints.size() === 0) {
            let path: Path = PathfindingService.CreatePath({});
            let nearestPlayer = this.getNearestPlayer();
            if (nearestPlayer === undefined) { task.wait(); continue }
            let rootpart = this.getNearestPlayer()!.Character?.FindFirstChild("HumanoidRootPart") as BasePart;
            let finish = rootpart.Position;
            path.ComputeAsync((this.instance as BasePart).Position, finish);
            waypoints = path.GetWaypoints();
            task.wait();
        }

        return waypoints;

    }

    onStart() {
        let path = this.getWaypoints();
        print(path)
        for (const waypoint of path) {
            (this.instance as BasePart).CFrame = new CFrame(waypoint.Position.add(new Vector3(0, (this.instance as BasePart).Size.Y / 2, 0)));
            task.wait(0.2)
        }
    }
}