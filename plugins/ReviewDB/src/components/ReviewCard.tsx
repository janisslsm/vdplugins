import { React } from "@vendetta/metro/common";
import { ErrorBoundary } from "@vendetta/ui/components";
import ReviewActionSheet from "./ReviewActionSheet";
import { ActionSheet } from "./ActionSheet";
import { findByProps } from "@vendetta/metro";
const { TableRow } = findByProps("TableRow");

interface ReviewCardProps {
	userId: string;
}

export default function ReviewCard({ userId }: ReviewCardProps) {
	return (
		<ErrorBoundary>
			<TableRow
				label="Reviews"
				onPress={() => {
					ActionSheet.open(ReviewActionSheet, { userId });
				}}
			/>
		</ErrorBoundary>
	);
}
