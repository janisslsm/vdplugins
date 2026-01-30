import { findByProps, findByStoreName } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

const nitroInfo = findByProps("canUseEmojisEverywhere");

const { getCurrentUser } = findByStoreName("UserStore");

export default [
	instead("canUseEmojisEverywhere", nitroInfo, (args, orig) => {
		if (getCurrentUser?.().premiumType !== null)
			return orig.apply(this, args);
		var stack_str = new Error().stack;
		if (stack_str?.includes("at EmojiPicker")) return true;

		return orig.apply(this, args);
	}),
	instead("canUseAnimatedEmojis", nitroInfo, (args, orig) => {
		if (getCurrentUser?.().premiumType !== null)
			return orig.apply(this, args);
		var stack_str = new Error().stack;
		if (stack_str?.includes("at EmojiPicker")) return true;

		return orig.apply(this, args);
	}),
];
