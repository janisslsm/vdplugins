import { findByName } from "@vendetta/metro"
import { after } from "@vendetta/patcher"
import { getAssetIDByName } from "@vendetta/ui/assets";
import { findInReactTree } from "@vendetta/utils";
import { storage } from "@vendetta/plugin";
import Settings from "./settings";
import { components } from "@vendetta/ui";
let patches = []

export default {
    onLoad: () => {
        storage.hideUserProfile ??= true;
        storage.hideDMTitlebar ??= false;
        storage.hideVCVideoButton ??= false;

        const videoCallAsset = getAssetIDByName("ic_video");

        const UserProfileActions = findByName("UserProfileActions", false);
        const ChannelActions = findByName("ChannelActions", false);
        const Header = findByName("Header", false);
        const FocusedControlsBottomControls = findByName("FocusedControlsBottomControls", false);

        patches.push(after("default", UserProfileActions, (_, component) => {
            if(!storage.hideUserProfile) return;
            const buttons = findInReactTree(component, (x) => x?.props?.children[1]?.props?.icon == videoCallAsset)?.props?.children;
            if(buttons === undefined) return;

            delete buttons[0];
            delete buttons[1];

            return [component]
        }));

        patches.push(after("default", FocusedControlsBottomControls, (_, component) => {
            if(!storage.hideVCVideoButton) return;
            const children = component?.props?.children?.props?.children;
            if(children === undefined) return;

            var _default = component?.props?.children?.props?.children[1];
            
            const p1 = after("type", _default, (_, comp) => {
                var buttons = comp?.props?.children?.props?.children?.props?.children;
                if(buttons !== undefined)
                    delete buttons[0];
                
                p1();
            });
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
                        const buttons = comp?.props?.buttons;
                        if(buttons !== undefined)
                        {
                            delete buttons[0];
                            delete buttons[1];
                        }
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