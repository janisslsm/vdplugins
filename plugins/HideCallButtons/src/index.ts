import { find, findByName, findByProps } from "@vendetta/metro"
import { after } from "@vendetta/patcher"
import { getAssetIDByName } from "@vendetta/ui/assets";
import { findInReactTree } from "@vendetta/utils";
import { storage } from "@vendetta/plugin";
import Settings from "./settings";
import { components } from "@vendetta/ui";
let patches = []

export default {
    onLoad: () => {
        storage.upHideVoiceButton ??= true;
        storage.upHideVideoButton ??= true;
        storage.dmHideCallButton ??= false;
        storage.dmHideVideoButton ??= false;
        storage.hideVCVideoButton ??= false;

        const videoCallAsset = getAssetIDByName("ic_video");
        const voiceCallAsset = getAssetIDByName("ic_audio");
        const videoAsset = getAssetIDByName("video");
        const callAsset = getAssetIDByName("nav_header_connect");

        const UserProfileActions = findByName("UserProfileActions", false);
        const PrivateChannelButtons = find(x => x?.type?.name == "PrivateChannelButtons");
        const ChannelButtons = findByProps("ChannelButtons");
        const FocusedControlsBottomControls = findByName("FocusedControlsBottomControls", false);

        // User Profile
        patches.push(after("default", UserProfileActions, (_, component) => {
            if(!storage.upHideVideoButton && !storage.upHideVoiceButton) return;
            
            const buttons = findInReactTree(component, (x) => x?.props?.children[1]?.type?.name == "_default")?.props?.children;
            if(buttons === undefined) return;

            for(var idx in buttons)
            {
                var button = buttons[idx];
                if((button?.props?.icon === voiceCallAsset && storage.upHideVoiceButton) || 
                    (button?.props?.icon === videoCallAsset && storage.upHideVideoButton))
                    delete buttons[idx];
            }

            return [component]
        }));
        
        // VC
        patches.push(after("default", FocusedControlsBottomControls, (_, component) => {
            if(!storage.hideVCVideoButton) return;

            const children = component?.props?.children?.props?.children;
            if(children === undefined) return;

            var _default = component?.props?.children?.props?.children[1];
            if(_default?.type?.name !== "_default") return;

            const p1 = after("type", _default, (_, comp) => {
                var buttons = comp?.props?.children?.props?.children?.props?.children;
                if(buttons !== undefined)
                    delete buttons[0];
                
                p1();
            });
        }));

        // Tabs V2 DM Header
        patches.push(after("type", PrivateChannelButtons, (_, component) => {
            if(!storage.dmHideCallButton && !storage.dmHideVideoButton) return;

            const buttons = component?.props?.children;
            if(buttons === undefined) return;

            for(var idx in buttons)
            {
                var button = buttons[idx];
                if((button?.props?.source === callAsset && storage.dmHideCallButton) || 
                    (button?.props?.source === videoAsset && storage.dmHideVideoButton))
                    delete buttons[idx];
            }
        }));
        
        // Legacy UI DM Header
        patches.push(after("ChannelButtons", ChannelButtons, (_, component) => {
            if(!storage.dmHideCallButton && !storage.dmHideVideoButton) return;

            const buttons = component?.props?.children;
            if(buttons === undefined) return;
            
            for(var idx in buttons)
            {
                var button = buttons[idx]?.props?.children[0];
                if(button === undefined) continue;

                if((button?.props?.source === callAsset && storage.dmHideCallButton) || 
                    (button?.props?.source === videoAsset && storage.dmHideVideoButton))
                    delete buttons[idx];
            }
        }));
    },
    onUnload: () => {
        for (const unpatch of patches) unpatch()
    },
    settings: Settings
}