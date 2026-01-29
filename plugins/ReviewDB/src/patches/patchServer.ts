import { React } from "@vendetta/metro/common";
import { findByName } from "@vendetta/metro";
import { after, instead } from "@vendetta/patcher";
import ReviewCard from "../components/ReviewCard";

let GuildActionSheetProgress = findByName("GuildActionSheetProgress", false);

export default () =>
    instead("default", GuildActionSheetProgress, (args, ret) => {
        const guildId = args[0]?.guild?.id;
        return React.createElement(ReviewCard, { userId: guildId });
    });
