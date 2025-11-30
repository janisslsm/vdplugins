import { React } from "@vendetta/metro/common";
import { findByTypeName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findInReactTree } from "@vendetta/utils";
import ReviewSection from "../components/ReviewSection";

let UserProfile = findByTypeName("UserProfile");
if(UserProfile === undefined)
    UserProfile = findByTypeName("UserProfileContent");

export default () => after("type", UserProfile, (args, ret) => {
    const profileSections = findInReactTree(ret, r =>
        r?.type?.displayName === "View" &&
        // UserProfileBio still exists even when the user has no bio. Yep.
        r?.props?.children.findIndex(i => i?.type?.name === "UserProfileBio" || i?.type?.name === "UserProfileAboutMeCard") !== -1
    )?.props?.children;

    const userId = args[0]?.userId;

    profileSections?.push(React.createElement(ReviewSection, { userId }));
});