# Verbo Match! · Install on your iPhone

## What's in this folder
| File | What it does |
|---|---|
| index.html | The app |
| manifest.json | Name, colors and icons for the home screen |
| sw.js | Makes the app work offline |
| icon-*.png | App icons |

Keep all files together in one folder. Don't rename them.

## Step 1 · Put it online (free, about 10 minutes) with GitHub Pages
1. Create a free account at https://github.com.
2. Click **+** (top right) → **New repository**. Name it `verbo-match`, choose **Public**, click **Create repository**.
3. Click **uploading an existing file**, drag in **every file from this folder**, then click **Commit changes**.
4. Go to **Settings → Pages**. Under *Branch*, pick **main** and **/(root)**, click **Save**.
5. Wait 1–2 minutes. Your link will be: `https://YOUR-USERNAME.github.io/verbo-match/`

*Faster alternative:* go to https://app.netlify.com/drop and drag this whole folder onto the page. You get a link instantly (make a free account to keep it).

## Step 2 · Install on your iPhone
1. Open the link in **Safari** (not Chrome or the Teams/Outlook in-app browser).
2. Tap the **Share** button (square with ⬆️).
3. Scroll down, tap **Add to Home Screen**, then **Add**.
4. Open it from the new icon. It runs full screen and works offline after the first open.

## Step 3 · Bring your progress over (optional)
1. On your computer, open the version you've been using → **My Stats** → **⬇️ Back up progress**.
   - Older versions (v6 and earlier) don't have this button. Open the new online link on your computer once, though: progress only carries over within the same browser and address, so starting fresh on the phone is usually simplest.
2. Email or AirDrop the `.json` file to your phone and save it to **Files**.
3. In the iPhone app: **Stats → ⬆️ Restore backup** → pick the file.

## Tips
- **Brazilian voice:** iPhone Settings → Accessibility → Spoken Content → Voices → Portuguese → download a **Brazil** voice (e.g. Luciana).
- **Back up now and then.** iOS can clear website data for apps you haven't opened in a while.
- **Updating the app:** upload the new `index.html` to GitHub, and change `VERSION` at the top of `sw.js` (e.g. `verbo-match-v8`). Close and reopen the app twice to see the update.
