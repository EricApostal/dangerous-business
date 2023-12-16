import Roact from '@rbxts/roact';
import { useState, withHooks } from "@rbxts/roact-hooked";

const LocalPlayer = game.GetService("Players").LocalPlayer as Player;
const PlayerGui = LocalPlayer.FindFirstChildOfClass("PlayerGui");

export function spawnInventory() {
    const Inventory = withHooks(() => {
        const [buttonText, setButtonText] = useState("Hello, World!");

        const onButtonClick = (rbx: GuiButton, x: number, y: number) => {
            print("clicked");
            setButtonText(tostring(x));
        };

        return (
            <screengui>
                <textbutton
                    Event={{
                        MouseButton1Down: onButtonClick,
                    }}
                    Key="Label"
                    Text={buttonText}
                    Size={new UDim2(1, 0, 1, 0)}
                />
            </screengui>
        );
    });

    const bar = <Inventory />;
    Roact.mount(bar, PlayerGui, "HelloWorld");
}
