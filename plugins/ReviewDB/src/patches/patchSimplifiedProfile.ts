import { React } from "@vendetta/metro/common";
import { findByTypeName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findInReactTree } from "@vendetta/utils";
import ReviewSection from "../components/ReviewSection";

const SimplifiedUserProfileContent = findByTypeName("SimplifiedUserProfileContent");


export default () => SimplifiedUserProfileContent !== undefined ? after("type", SimplifiedUserProfileContent, (args, ret) => {
  const profileSections = findInReactTree(ret, r =>
    r?.type?.displayName === "View" &&
    r?.props?.children.findIndex(i => i?.type?.name === "SimplifiedUserProfileAboutMeCard") !== -1
  )?.props?.children;

  const userId = args[0]?.user?.id;
  profileSections?.push(React.createElement(ReviewSection, { userId }));
}) : () => { }