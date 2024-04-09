import { storage } from "@vendetta/plugin";
import nitroChecks from "./patches/nitroChecks";
import sendMessage from "./patches/sendMessage";
import transformEmoji from "./patches/transformEmoji";
import settings from "./settings";

storage.emojiSize ??= 48;
storage.hyperLink ??= true;
storage.transformEmoji ??= true;

const patches = [
    ...nitroChecks,
    ...sendMessage,
    ...transformEmoji
];

export default {
    settings: settings,
    onUnload: () => patches.forEach(p => p())
}