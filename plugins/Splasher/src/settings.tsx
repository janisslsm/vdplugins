import { ReactNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";

const { FormSection, FormDivider, FormIcon, FormSwitchRow } = Forms;

export default () => {
  useProxy(storage);

  return (
    <ReactNative.ScrollView>
      <FormSection title="User Profile" titleStyleType="no_border">
        <FormSwitchRow
          label="Hide call button"
          leading={<FormIcon source={getAssetIDByName("ic_audio")} />}
          onValueChange={(v) => {
            storage.upHideVoiceButton = v;
          }}
          value={storage.upHideVoiceButton}
        />
        <FormDivider />
        <FormSwitchRow
          label="Hide video button"
          leading={<FormIcon source={getAssetIDByName("ic_video")} />}
          onValueChange={(v) => {
            storage.upHideVideoButton = v;
          }}
          value={storage.upHideVideoButton}
        />
      </FormSection>
      <FormSection title="DMs" titleStyleType="no_border">
      <FormSwitchRow
          label="Hide call button"
          leading={<FormIcon source={getAssetIDByName("ic_audio")} />}
          onValueChange={(v) => {
            storage.dmHideCallButton = v;
          }}
          value={storage.dmHideCallButton}
        />
        <FormDivider />
        <FormSwitchRow
          label="Hide video button"
          leading={<FormIcon source={getAssetIDByName("ic_video")} />}
          onValueChange={(v) => {
            storage.dmHideVideoButton = v;
          }}
          value={storage.dmHideVideoButton}
        />
      </FormSection>
      <FormSection title="Other" titleStyleType="no_border">
        <FormSwitchRow
          label="Hide video button in VC"
          leading={<FormIcon source={getAssetIDByName("video")} />}
          onValueChange={(v) => (storage.hideVCVideoButton = v)}
          value={storage.hideVCVideoButton}
        />
      </FormSection>
    </ReactNative.ScrollView>
  );
};