import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";

const AccountDispatcher = findByProps("getCanUseMultiAccountMobile");

const patches = [];
patches.push(
	after("getCanUseMultiAccountMobile", AccountDispatcher, () => {
		return true;
	}),
);

export const onUnload = () => patches.forEach((p) => p());
