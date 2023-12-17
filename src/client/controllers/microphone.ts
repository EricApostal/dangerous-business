import { Players } from "@rbxts/services";

let VoiceChatService = game.GetService("VoiceChatService");

let enabled = VoiceChatService.IsVoiceEnabledForUserIdAsync(Players.LocalPlayer.UserId);