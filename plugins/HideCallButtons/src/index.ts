import { findByName } from "@vendetta/metro"
import { after } from "@vendetta/patcher"
import { getAssetIDByName } from "@vendetta/ui/assets";
import { findInReactTree } from "@vendetta/utils";
let patches = []

export default {
    onLoad: () => {
        const UserProfileActions = findByName("UserProfileActions", false);

        patches.push(after("default", UserProfileActions, (_, component) => {
            const { props } = component;
            const { children } = props
            if(children === undefined) return;
            const buttons = findInReactTree(component, (x) => x?.props.children[1].props.icon == getAssetIDByName("ic_video"))?.props.children
            if(buttons === undefined) return;
            delete buttons[0];
            delete buttons[1];

            return [component]
        }));

    },
    onUnload: () => {
        for (const unpatch of patches) unpatch()
    }
}