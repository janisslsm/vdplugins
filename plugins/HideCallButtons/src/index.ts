import { findByName } from "@vendetta/metro"
import { after } from "@vendetta/patcher"
import { getAssetIDByName } from "@vendetta/ui/assets";
import { findInReactTree } from "@vendetta/utils";
import { storage } from "@vendetta/plugin";
import Settings from "./settings";
let patches = []

export default {
    onLoad: () => {
        storage.hideUserProfile ??= true;
        storage.hideDMTitlebar ??= false;

        const UserProfileActions = findByName("UserProfileActions", false);
        const ChannelActions = findByName("ChannelActions", false);
        const videoCallAsset = getAssetIDByName("ic_video");
        const Header = findByName("Header", false);

        patches.push(after("default", UserProfileActions, (_, component) => {
            if(!storage.hideUserProfile) return;
            const buttons = findInReactTree(component, (x) => x?.props?.children[1]?.props?.icon == videoCallAsset)?.props?.children;
            if(buttons === undefined) return;

            delete buttons[0];
            delete buttons[1];

            return [component]
        }));

        patches.push(after("default", ChannelActions, (_, component) => {
            if(!storage.hideDMTitlebar) return;
            const privateChannelButtons = component?.props?.children?.type;
            if(privateChannelButtons?.type?.name !== "PrivateChannelButtons") return;

            const p1 = after("type", privateChannelButtons, (_, comp) => {
                const buttons = comp?.props?.children;
                if(buttons === undefined) return;

                delete buttons[0];
                delete buttons[1];
                p1();
            });

            return [component];
        }));

        patches.push(after("default", Header, (_, component) => {
            if(!storage.hideDMTitlebar) return;
            
            const _default = findInReactTree(component, (x) => x?.type?.name == "_default");
            if(_default === undefined) return;
            
            const p1 = after("type", _default, (_, channelnavbuttons) => {
                if(channelnavbuttons?.type === undefined) return;

                const p2 = after("type", channelnavbuttons, (_, nonnullchannelnavbuttons) => {
                    if(nonnullchannelnavbuttons?.type === undefined) return;

                    const p3 = after("type", nonnullchannelnavbuttons, (_, comp) => {
                        delete comp?.props?.buttons[0];
                        delete comp?.props?.buttons[1];

                        p3();
                    });

                    p2();
                });

                p1();
            });

            return [component];
        }));
    },
    onUnload: () => {
        for (const unpatch of patches) unpatch()
    },
    settings: Settings
}