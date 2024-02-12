import { findByName, findByProps, findByStoreName } from "@vendetta/metro"
import { after, instead, before } from "@vendetta/patcher"
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";

let patches = []

const bannerRegex = /\u{e0042}\u{e004E}\u{e0052}\u{e003C}([\u{e0061}-\u{e007A}\u{e0041}-\u{e005a}\u{e0030}-\u{e0039}]+?)\u{e003E}/u;

const encode = (text) => {
   const codePoints = [...text].map((c) => c.codePointAt(0));

   const output: any[] = [];
   for (const char of codePoints) {
      output.push(
         String.fromCodePoint(
            char + (0x00 < char && char < 0x7f ? 0xe0000 : 0)
         ).toString()
      );
   }

   return output.join("");
};

export default {
    onLoad: () => {
        let pendingID: string | null;
        const ProfileBanner = findByName('ProfileBanner', false);
        const EditUserProfileBanner = findByName('EditUserProfileBanner', false);
        const UserProfileStore = findByProps('getUserProfile');
        const UserSettingsAccountStore = findByProps('saveProfileChanges');
        const Clipboard = findByProps('setString');
        const ChangeBannerActionSheet = findByName('ChangeBannerActionSheet', false);
        const Dialog = findByProps('show', 'openLazy', 'close');
        const Users = findByStoreName("UserStore")

        // Inital profile patch
        patches.push(after('getUserProfile', UserProfileStore, (_, res) => {
           if (res === undefined) { return res; }
  
           const bannerString = res?.bio.match(bannerRegex);
  
           if (bannerString) {
              res.banner = bannerString[0];
              res.bio = res.bio.replace(bannerRegex, '')
           }
  
           return res;
        }));
  
        // Actual banner patch
        patches.push(before('default', ProfileBanner, (args) => {
           if (!args[0].bannerSource) { return }
           const bannerURI = args[0].bannerSource['uri']
  
           if (!bannerURI) { return }
  
           const id = bannerURI.match(bannerRegex);
  
           if (id) {
              const parsedID = [...id[0]]
                 .map(x => String.fromCodePoint(x.codePointAt(0)! - 0xe0000))
                 .join('');
  
              args[0].bannerSource['uri'] = `https://i.imgur.com/${parsedID.slice(4, -1)}.png`;
           }
        }));
  
        // Jump in-between [Save] and upload our banner to imgur
        patches.push(instead('saveProfileChanges', UserSettingsAccountStore, (args, res) => {
           const currentProfile = UserProfileStore.getUserProfile(Users.getCurrentUser().id)
           const currentBio = args[0].bio !== undefined ? args[0].bio : currentProfile['bio']
  
           // Remove banner if null by setting the bio to the current one, which is always stripped of the splash.
           if (args[0].banner === null) { args[0].bio = currentBio; return res.apply(this, args); }
           if (!(args[0].banner || currentProfile.banner.match(bannerRegex))) { return res.apply(this, args); }
  
           // If uploading hasn't completed, block the save from occuring.
           if (args[0].banner && !pendingID) {
              showToast(
                `Slow down and try again!`, 
                getAssetIDByName("ic_clock_timeout_16px")
              );
              return;
           }
  
           const encodedInfo = pendingID ? encode(`BNR<${pendingID}>`) : currentProfile.banner;
           const insertedBio = currentBio + encodedInfo
  
           // 190 is the maximum length, can't go over that one!
           if (insertedBio.length > 190) {
              Clipboard.setString(encodedInfo)
              Dialog.show({
                 title: 'Woah there!',
                 body: `There's not enough space in your bio to insert your banner. You need to clear ${encodedInfo.length} characters before you can continue. Your banner has been copied to the clipboard.`,
              });
           }
  
           args[0].bio = insertedBio;
           pendingID = null;
  
           return res.apply(this, args);
        }));
  
        // The banner must be uploaded before the save button, otherwise a race condition is forced.
        patches.push(before('setPendingBanner', UserSettingsAccountStore, (args) => {
           if (args[0] === null) { return; }
  
           const formData = new FormData();
           formData.append('image', args[0].split(',')[1])
  
           fetch('https://api.imgur.com/3/image', {
              method: "POST",
              body: formData,
              headers: {
                 "Authorization": "Client-ID 8218830746fcf7d",
              }
           }).then(response => {
              response.json().then(output => {
                 showToast(
                    `Banner uploaded!`,
                    getAssetIDByName("ic_add_tier_40px"),
                 );
  
                 pendingID = output.data.id;
              })
           });
        }));
  
        // Nitro Spoofing
  
        // This is jank. It enables the "Preview profile" button without nitro, but because I can't just change that prop without it replicating, I have to quickly do the old switcheroo.
        patches.push(instead('default', EditUserProfileBanner, (args, res) => {
           const premiumType = args[0].user['premiumType'];
           args[0].user['premiumType'] = 2;
  
           let result = res.apply(self, args);
  
           args[0].user['premiumType'] = premiumType;
           return result;
        }));
  
        // Switch the banner changing menu from the limited one to the nitro one.
        patches.push(before('default', ChangeBannerActionSheet, (args) => {
           args[0].isTryItOut = true;
        }));
    },
    onUnload: () => {
        for (const unpatch of patches) unpatch()
    },
    //settings: Settings
}