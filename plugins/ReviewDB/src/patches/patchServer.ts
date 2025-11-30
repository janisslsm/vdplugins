import { React } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import ReviewCard from "../components/ReviewCard";

let GuildActions = findByProps("GuildActionSheetPrimaryActions");

export default () =>
	after("GuildActionSheetPrimaryActions", GuildActions, (args, ret) => {
		const guildId = args[0]?.guild?.id;
		ret?.props?.children?.push(
			React.createElement(ReviewCard, { userId: guildId }),
		);
	});
