import { ReactNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";

const { FormDivider, FormIcon, FormSwitchRow } = Forms;

export default () => {
  useProxy(storage);

  return (
    <ReactNative.ScrollView>
      <FormSwitchRow
        label="Hide from user profile"
        subLabel="Hide call buttons from user profile"
        leading={<FormIcon source={getAssetIDByName("ic_profile_24px")} />}
        onValueChange={(v) => {
          storage.hideUserProfile = v;
        }}
        value={storage.hideUserProfile}
      />
      <FormDivider />
      <FormSwitchRow
        label="Hide from DM"
        subLabel="Hide call buttons from DM title bar"
        leading={<FormIcon source={getAssetIDByName("ic_dm")} />}
        onValueChange={(v) => (storage.hideDMTitlebar = v)}
        value={storage.hideDMTitlebar}
      />
      <FormDivider />
      <FormSwitchRow
        label="Hide from VC"
        subLabel="Hide video button from VC"
        leading={<FormIcon source={getAssetIDByName("video")} />}
        onValueChange={(v) => (storage.hideVCVideoButton = v)}
        value={storage.hideVCVideoButton}
      />
    </ReactNative.ScrollView>
  );
};