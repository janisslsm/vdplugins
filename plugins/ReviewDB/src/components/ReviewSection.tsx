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

const { TableRow, TableRowGroup } = findByProps("TableRow");
const { FlashList } = findByProps("FlashList");

const { getDisplayProfile } = findByProps("getDisplayProfile");

export default function ReviewSection({ userId }: ReviewSectionProps) {
	const [reviews, setReviews] = React.useState<Review[]>([]);

	const fetchReviews = () => {
		getReviews(userId).then((i) => setReviews(i));
	};
	React.useEffect(fetchReviews, []);

	const hasExistingReview =
		reviews.filter((i) => i.sender.discordID === getCurrentUser()?.id)
			.length !== 0;

	const themeColors = getDisplayProfile?.(userId)?.themeColors;
	console.log(themeColors);
	const styles = stylesheet.createThemedStyleSheet({
		avatar: {
			height: 36,
			width: 36,
			borderRadius: 18,
		},
		card: {
			backgroundColor:
				themeColors === undefined
					? semanticColors.CARD_PRIMARY_BG
					: `#00000073`,
			borderRadius: 16,
			padding: 8,
		},
		reviewCard: {
			backgroundColor:
				themeColors === undefined
					? semanticColors.CARD_SECONDARY_BG
					: `#00000083`,
		},
	});

	return (
		<ErrorBoundary>
			<RN.View style={[styles.card]}>
				<UserProfileCard title="Reviews" styles={[styles.card]}>
					<FlashList
						ItemSeparatorComponent={() => <RN.View style={{ height: 8 }} />}
						data={reviews}
						renderItem={({ item }) => (
							<ReviewRow style={styles.reviewCard} owner={userId} review={item} />
						)}
						keyExtractor={(item) => item.sender.username}
						scrollEnabled={false}
						estimatedSize={84}
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
