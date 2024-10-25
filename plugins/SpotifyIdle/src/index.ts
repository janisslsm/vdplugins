import { findByProps } from "@vendetta/metro"
import { after, instead } from "@vendetta/patcher"
let patches = []

export default {
    onLoad: () => {
        const activityInfo = findByProps("shouldShowActivity");
        
        patches.push(instead("shouldShowActivity", activityInfo, () => true));
    },
    onUnload: () => {
        for (const unpatch of patches) unpatch()
    }
}