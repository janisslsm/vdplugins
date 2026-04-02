import { findInReactTree } from "@vendetta/utils";
import ReviewSection from "../components/ReviewSection";
import { after } from "@vendetta/patcher";
import { React } from "@vendetta/metro/common";

const SegmentedControlPages = bunny.metro.findByFilePath(
	"design/components/SegmentedControl/native/SegmentedControlPages.native.tsx",
);

export default () =>
	SegmentedControlPages !== undefined
		? after("SegmentedControlPages", SegmentedControlPages, (args, ret) => {
				const profileSections = findInReactTree(
					ret?.props?.children[0]?.props?.item?.page?.props?.children,
					(r) =>
						r?.type?.displayName === "View" &&
						// UserProfileBio still exists even when the user has no bio. Yep.
						r?.props?.children.findIndex(
							(i: any) =>
								i?.type?.name === "UserProfileBio" ||
								i?.type?.name === "UserProfileAboutMeCard",
						) !== -1,
				)?.props?.children;
				const userId =
					profileSections?.[profileSections?.length - 1]?.props
						?.userId;

				profileSections?.push(
					React.createElement(ReviewSection, { userId }),
				);
			})
		: (): boolean => {
				return false;
			};
