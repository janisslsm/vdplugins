import { findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";
import ReviewActionSheet from "../components/ReviewActionSheet";
import { ActionSheet } from "../components/ActionSheet";

let ContextMenuPopout = findByProps("ContextMenuPopout");

export default () =>
	before("ContextMenuPopout", ContextMenuPopout, (args) => {
		const userId = args[0]?.menu?.key;
		if (userId !== undefined && args[0]?.menu?.items?.length === 3) {
			args[0].menu.items.push({
				label: "Reviews",
				action: () => {
					ActionSheet.open(ReviewActionSheet, { userId });
				},
			});
		}
	});
