import { ReactNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { findByProps } from "@vendetta/metro";

const { TableRow, TableSwitchRow, TableRowGroup } = findByProps("TableRow");
const { Stack } = findByProps("Stack");

export default () => {
	useProxy(storage);

	return (
		<Stack
			style={{ paddingVertical: 24, paddingHorizontal: 12 }}
			spacing={24}
		>
			<TableRowGroup title="User Profile">
				<TableSwitchRow
					label="Hide call button"
					icon={
						<TableRow.Icon
							source={getAssetIDByName("PhoneCallIcon")}
						/>
					}
					onValueChange={(v) => {
						storage.upHideVoiceButton = v;
					}}
					value={storage.upHideVoiceButton}
				/>
				<TableSwitchRow
					label="Hide video button"
					icon={
						<TableRow.Icon source={getAssetIDByName("VideoIcon")} />
					}
					onValueChange={(v) => {
						storage.upHideVideoButton = v;
					}}
					value={storage.upHideVideoButton}
				/>
			</TableRowGroup>
			<TableRowGroup title="DMs" titleStyleType="no_border">
				<TableSwitchRow
					label="Hide call button"
					icon={
						<TableRow.Icon
							source={getAssetIDByName("PhoneCallIcon")}
						/>
					}
					onValueChange={(v) => {
						storage.dmHideCallButton = v;
					}}
					value={storage.dmHideCallButton}
				/>
				<TableSwitchRow
					label="Hide video button"
					icon={
						<TableRow.Icon source={getAssetIDByName("VideoIcon")} />
					}
					onValueChange={(v) => {
						storage.dmHideVideoButton = v;
					}}
					value={storage.dmHideVideoButton}
				/>
			</TableRowGroup>
			<TableRowGroup title="Other" titleStyleType="no_border">
				<TableSwitchRow
					label="Hide video button in VC"
					icon={
						<TableRow.Icon source={getAssetIDByName("VideoIcon")} />
					}
					onValueChange={(v) => (storage.hideVCVideoButton = v)}
					value={storage.hideVCVideoButton}
				/>
			</TableRowGroup>
		</Stack>
	);
};
