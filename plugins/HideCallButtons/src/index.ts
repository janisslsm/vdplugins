import { findByName } from "@vendetta/metro"
import { after } from "@vendetta/patcher"
let patches = []

export default {
    onLoad: () => {
        const UserProfileHeader = findByName("UserProfileHeader", false);
        const UserProfileActions = findByName("UserProfileActions", false);
        
        patches.push(after("default", UserProfileHeader, (_, component) => {
            const { props } = component;
            const { children } = props
            if(children === undefined) return;
            const buttons = children[4]?.props?.children;
            if(buttons === undefined) return;
        
            delete buttons[1];
            delete buttons[2];
        
            return [component]
        }));
        
        patches.push(after("default", UserProfileActions, (_, component) => {
            const { props } = component;
            const { children } = props
            if(children === undefined) return;
            const buttons = children?.props?.children[1]?.props?.children;
            if(buttons === undefined) return;
        
            delete buttons[1];
            delete buttons[2];
        
            return [component]
        }));
    },
    onUnload: () => {
        for (const unpatch of patches) unpatch()
    }
}