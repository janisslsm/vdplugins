import { ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { ViewProps } from "react-native";
import { Forms } from "@vendetta/ui/components";
import { Review } from "../def";
import { useThemedColor } from "../lib/utils";
import showReviewActionSheet from "../lib/showReviewActionSheet";
import ReviewUsername from "./ReviewUsername";
import { findByProps } from "@vendetta/metro";
import { semanticColors } from "@vendetta/ui";

interface ReviewRowProps {
	review: Review;
	style: ViewProps["style"];
}

const styles = stylesheet.createThemedStyleSheet({
	avatar: {
		height: 36,
		width: 36,
		borderRadius: 18,
	},
	card: {
		backgroundColor: semanticColors.CARD_SECONDARY_BG,
	},
});

const { FormRow, FormSubLabel } = Forms;
const { TableRowGroup } = findByProps("TableRow");
// This component behaves VERY similarly to this custom one, but subLabel doesn't get themed so... here we are!
// const UserProfileRow = findByName("UserProfileRow");

export default ({ review, style }: ReviewRowProps) => (
	<TableRowGroup style={[style]}>
		<FormRow
			style={[style]}
			label={
				<ReviewUsername
					username={review.sender.username}
					badges={review.sender.badges}
				/>
			}
			subLabel={
				<FormSubLabel
					text={review.comment}
					style={{ color: useThemedColor("TEXT_NORMAL") }}
				/>
			}
			leading={
				<RN.Image
					style={styles.avatar}
					source={{ uri: review.sender.profilePhoto }}
				/>
			}
			onLongPress={() => showReviewActionSheet(review)}
		/>
	</TableRowGroup>
);
