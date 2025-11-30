import { storage } from "@vendetta/plugin";
import { getAdmins } from "./lib/api";
import patchProfile from "./patches/patchProfile";
import exposeAPI from "./patches/exposeAPI";
import patchSimplifiedProfile from "./patches/patchSimplifiedProfile";
import patchServer from "./patches/patchServer";
import patchContextMenu from "./patches/patchContextMenu";
// Default settings
storage.authToken ??= "";
storage.useThemedSend ??= true;

const patches = [
	exposeAPI(),
	patchProfile(),
	patchSimplifiedProfile(),
	patchServer(),
	patchContextMenu(),
];

export const admins = [];
getAdmins().then((i) => admins.push(...i));

export const onUnload = () => patches.forEach((p) => p());

export { default as settings } from "./Settings";
