import { ReactNative as RN } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { findByProps } from "@vendetta/metro";

const {
	TableRow,
	TableSwitchRow,
	TableRadioGroup,
	TableRadioRow,
	TableRowGroup,
} = findByProps("TableRow");
const { Stack } = findByProps("Stack");

const sizeOptions = {
	Tiny: 16,
	Small: 32,
	Medium: 48,
	Large: 64,
	Huge: 96,
	Jumbo: 128,
};

const previewUri = "https://cdn.discordapp.com/emojis/926602689213767680.webp";

export default () => {
	useProxy(storage);

	return (
		<Stack
			style={{ paddingVertical: 24, paddingHorizontal: 12 }}
			spacing={24}
		>
			<TableRadioGroup
				title="Emoji size"
				defaultValue={storage.emojiSize.toString()}
				onChange={(v: string) => (storage.emojiSize = parseInt(v))}
			>
				{Object.entries(sizeOptions).map(([name, size]) => (
					<TableRadioRow
						label={name}
						subLabel={size}
						key={size.toString()}
						value={size.toString()}
					/>
				))}
			</TableRadioGroup>
			<TableRowGroup title="Preview">
				<RN.Image
					source={{
						uri: `${previewUri}?size=${storage.emojiSize}`,
						width: storage.emojiSize,
						height: storage.emojiSize,
					}}
				/>
			</TableRowGroup>
			<TableRowGroup title="User Profile" titleStyleType="no_border">
				<TableSwitchRow
					label="Use hyperlinks when sending fake emojis"
					onValueChange={(v) => {
						storage.hyperLink = v;
					}}
					value={storage.hyperLink}
				/>
				<TableSwitchRow
					label="Transform fake emojis into real ones"
					onValueChange={(v) => {
						storage.transformEmoji = v;
					}}
					value={storage.transformEmoji}
				/>
			</TableRowGroup>
		</Stack>
	);
};
