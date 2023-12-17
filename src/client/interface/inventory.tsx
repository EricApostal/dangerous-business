import { BaseComponent } from '@flamework/components';
import Roact from '@rbxts/roact';
import { useState, withHooks } from "@rbxts/roact-hooked";
import { Item } from 'shared/game/items/item';

const LocalPlayer = game.GetService("Players").LocalPlayer as Player;
const PlayerGui = LocalPlayer.FindFirstChildOfClass("PlayerGui");

let updateItemsCallback: (items: Array<Item>) => void;
let updateSelectedCallback: (idx: number) => void;

export function spawnInventory() {
    const Inventory = withHooks(() => {
        const [inventoryItems, setInventoryItems] = useState<Array<Item>>([]);
        const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

        updateItemsCallback = setInventoryItems;
        updateSelectedCallback = setSelectedItemIndex;

        function getCurrentColor(idx: number) {
            if (idx === selectedItemIndex) return Color3.fromRGB(255, 255, 255);
            return Color3.fromRGB(36, 38, 41);
        }

        return (
            <screengui>
                <frame
                    Size={new UDim2(0, 400, 0, 100)}
                    Position={new UDim2(0.5, 0, 1, -20)}
                    AnchorPoint={new Vector2(0.5, 1)}
                    BackgroundTransparency={1}
                >
                    <uicorner CornerRadius={new UDim(0, 8)} />
                    <uilistlayout FillDirection={Enum.FillDirection.Horizontal} HorizontalAlignment={"Center"} />

                    {inventoryItems.map((item, index) => (
                        <frame
                            Size={new UDim2(0, 100, 0, 100)}
                            BackgroundTransparency={1}>
                            <frame BackgroundTransparency={1} Size={new UDim2(0.8, 0, 0.8, 0)}>
                                <uicorner CornerRadius={new UDim(0, 0)} />
                                <uistroke Color={getCurrentColor(index)} Thickness={3} ApplyStrokeMode={"Border"} />
                                <textlabel Text={item.displayName as string} TextScaled={true} Size={new UDim2(1, 0, 0.2, 0)} Position={new UDim2(0, 0, 0.8, 0)} BackgroundTransparency={1} TextColor3={Color3.fromRGB(255, 255, 255)} TextStrokeTransparency={0} TextStrokeColor3={Color3.fromRGB(0, 0, 0)} />
                            </frame>
                        </frame>
                    ))}
                </frame>
            </screengui>
        );
    });

    const bar = <Inventory />;
    Roact.mount(bar, PlayerGui, "HelloWorld");
}

export function updateInventoryUI(items: Array<Item>) {
    let parsedItems = new Array<Item>();
    for (const item of items) {
        if (item.pockitable) parsedItems.push(item);
    }
    updateItemsCallback(parsedItems);
}

export function updateSelected(idx: number) {
    updateSelectedCallback(idx);
}