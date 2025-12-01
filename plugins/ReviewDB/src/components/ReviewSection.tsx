import { React, ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { findByName, findByProps, findByStoreName } from "@vendetta/metro";
import { ErrorBoundary } from "@vendetta/ui/components";
import { Review } from "../def";
import { getReviews } from "../lib/api";
import ReviewRow from "./ReviewRow";
import ReviewInput from "./ReviewInput";
import { semanticColors } from "@vendetta/ui";

const { getCurrentUser } = findByStoreName("UserStore");
const UserProfileCard = findByName("UserProfileCard");

interface ReviewSectionProps {
	userId: string;
}

const styles = stylesheet.createThemedStyleSheet({
	avatar: {
		height: 36,
		width: 36,
		borderRadius: 18,
	},
	card: {
		backgroundColor: semanticColors.CARD_PRIMARY_BG,
		borderRadius: 16,
		padding: 8,
	},
});
const { TableRow, TableRowGroup } = findByProps("TableRow");
const { FlashList } = findByProps("FlashList");

export default function ReviewSection({ userId }: ReviewSectionProps) {
	const [reviews, setReviews] = React.useState<Review[]>([]);

	const fetchReviews = () => {
		getReviews(userId).then((i) => setReviews(i));
	};
	React.useEffect(fetchReviews, []);

	const hasExistingReview =
		reviews.filter((i) => i.sender.discordID === getCurrentUser()?.id)
			.length !== 0;

	return (
		<ErrorBoundary>
			<RN.View style={[styles.card]}>
				<UserProfileCard title="Reviews" styles={[styles.card]}>
					<FlashList
						ItemSeparatorComponent={() => <RN.View style={{ height: 8 }} />}
						data={reviews}
						renderItem={({ item }) => <ReviewRow review={item} />}
						keyExtractor={(item) => item.sender.username}
						scrollEnabled={false}
					/>
					<ReviewInput
						userId={userId}
						refetch={fetchReviews}
						shouldEdit={hasExistingReview}
					/>
				</UserProfileCard>
			</RN.View>
		</ErrorBoundary>
	);
}
