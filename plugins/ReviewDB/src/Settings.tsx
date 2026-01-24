import { React } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { getAssetIDByName } from "@vendetta/ui/assets";
import showAuthModal from "./lib/showAuthModal";
import { findByProps } from "@vendetta/metro";

const { TableRow, TableSwitchRow, TableRowGroup } = findByProps("TableRow");
const { Stack } = findByProps("Stack");

export default () => {
    useProxy(storage);

    const isAuthenticated = storage.authToken.length !== 0;

    return (
        <Stack
            style={{ paddingVertical: 24, paddingHorizontal: 12 }}
            spacing={24}
        >
            <TableRowGroup title="Authentication">
                <TableRow
                    label="Authenticate with ReviewDB"
                    icon={<TableRow.Icon source={getAssetIDByName("copy")} />}
                    arrow={true}
                    disabled={isAuthenticated}
                    onPress={showAuthModal}
                />
                <TableRow
                    variant={isAuthenticated ? "danger" : undefined}
                    label="Log out of ReviewDB"
                    subLabel="Note that this does not remove ReviewDB from your Authorized Apps page in Discord."
                    icon={
                        <TableRow.Icon
                            variant={isAuthenticated ? "danger" : undefined}
                            source={getAssetIDByName("ic_leave_24px")}
                        />
                    }
                    disabled={!isAuthenticated}
                    onPress={() => (storage.authToken = "")}
                />
            </TableRowGroup>
            <TableRowGroup title="Settings">
                <TableSwitchRow
                    label="Use profile-themed send button"
                    subLabel="Controls whether the review send button should attempt to match the user's profile colors."
                    icon={
                        <TableRow.Icon
                            source={getAssetIDByName("ic_paint_brush")}
                        />
                    }
                    value={storage.useThemedSend}
                    onValueChange={(v: boolean) => (storage.useThemedSend = v)}
                />
            </TableRowGroup>
        </Stack>
    );
};
