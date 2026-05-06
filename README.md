# 🎬 imdb-quickplay

A lightweight Chrome extension that adds a **Watch Now** button directly on IMDB movie pages and Google Search results — so you can jump straight to watching without extra steps.

</br>
<div > <img src="https://i.ibb.co/prsY4P4w/a.png" width=500> </div>
</br>
<div > <img src="https://i.ibb.co/WvY9WV7L/b.png" width=500> </div>

---

## ✨ Features

- ▶ Adds a **Watch Now** button on any IMDB movie or TV show page
- 🔍 Detects movies automatically from **Google Search** results
- 💛 Floating button always visible in the bottom-right corner
- ⚡ Lightweight — no tracking, no data collection, no permissions abuse

---

## 📦 Installation

Since this extension is not on the Chrome Web Store, you install it manually in **Developer Mode** — it takes about 60 seconds.

### Step 1 — Download the code

Click the green **Code** button on this page → **Download ZIP**, then unzip the folder somewhere on your computer.

Or if you have Git:
```bash
git clone https://github.com/yourname/imdb-quickplay.git
```

### Step 2 — Open Chrome Extensions

Go to this URL in Chrome:
```
chrome://extensions/
```

### Step 3 — Enable Developer Mode

Toggle **Developer mode** ON in the top-right corner.

### Step 4 — Load the extension

Click **Load unpacked** → select the unzipped `imdb-quickplay` folder.

✅ Done! The extension is now active.

---

## 🎯 How to Use

### On IMDB
1. Go to any movie or TV show page on IMDB:
   ```
   https://www.imdb.com/title/tt1375670/
   ```
2. A **▶ Watch Now** button appears near the title
3. A floating gold button also appears in the bottom-right corner
4. Click either to start watching instantly

### On Google Search
1. Search for any movie or TV show on Google:
   ```
   Grown Ups movie
   ```
2. The extension detects the movie from search results or the Knowledge Panel
3. A **▶ Watch Now** button appears automatically
4. Click it to go directly to the movie

---

## 📁 File Structure

```
imdb-quickplay/
├── manifest.json     ← Extension configuration
├── content.js        ← Button injection logic
├── style.css         ← Button styles
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## ✏️ Customization

Want to change the streaming destination? Open `content.js` and edit this line:

```js
const playUrl = window.location.href.replace(
  "www.imdb.com",
  "streamimdb.ru"   // ← change this to any site you prefer
);
```

---

## 🔄 Updating

If you cloned via Git:
```bash
git pull
```
Then go to `chrome://extensions/` and click the **🔄 refresh** icon on the extension card.

If you downloaded the ZIP, re-download and repeat the Load unpacked step.

---

## ❓ FAQ

**Does this work on Firefox?**
Not yet — Chrome and Edge only for now.

**Will this slow down my browser?**
No. The script only runs on IMDB and Google Search pages and does nothing in the background.

**Does it collect any data?**
No. The extension has no backend, no analytics, and no network requests. It only injects a button.

**The button isn't showing up on Google Search — why?**
Google updates their page structure frequently. If the button doesn't appear, try refreshing. You can always use the IMDB page directly.

---

## 🛠 Built With

- Vanilla JavaScript — no frameworks
- Chrome Extension Manifest V3
- CSS3

---

## 📄 License

MIT License — free to use, modify, and share.
