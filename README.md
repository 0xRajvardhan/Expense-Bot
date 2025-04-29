# 🧾 Discord Expense Tracker Bot

This bot lets you log your expenses by **DMing it on Discord**, and it will **append each entry into a Google Sheet** with the message, timestamp, and sender name.

---

## 📌 Features

- Logs DMs like `Coffee - $3` to Google Sheets
- Timestamps each entry
- Requires no external commands or prefixes
- Easy to deploy locally

---

## 🚀 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/expense-bot.git
cd expense-bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the root folder:

```
DISCORD_TOKEN=your_discord_bot_token_here
SHEET_ID=your_google_sheet_id_here
```

**How to get `SHEET_ID`**:  
Open your Google Sheet and copy the string between `/d/` and `/edit`:

```
https://docs.google.com/spreadsheets/d/1abcDEF1234567XYZ/edit#gid=0
                                   ^^^^^^^^^^^^^^^^^^^^^
```

---

## 🛠 Discord Bot Setup

### A. Create your bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application** → Name it → Create
3. Go to **Bot** tab → Click **Add Bot**
4. Toggle **MESSAGE CONTENT INTENT** on
5. Copy the **token** and put it in `.env` as `DISCORD_TOKEN`

### B. Invite bot to your server (optional)

If you want to test it in servers too:

1. Go to **OAuth2 > URL Generator**
2. Scopes: `bot`
3. Bot permissions: `Send Messages`, `Read Messages`, `Message Content`
4. Copy the generated URL and open it in a browser to invite the bot

---

## 📊 Google Sheets Setup

### A. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new sheet (name it `Sheet1`, or update the code to match your name)
3. Add this header in Row 1:
   ```
   Timestamp | Message | Username
   ```

### B. Create a Google Cloud project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Go to **APIs & Services > Library**
   - Enable **Google Sheets API**
   - Enable **Google Drive API**

### C. Create a service account

1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > Service Account**
3. After creation, go to the service account and click **Keys > Add Key > JSON**
4. Save the downloaded file as `credentials.json` in your project root

### D. Share your Sheet with the service account

1. Open `credentials.json`
2. Copy the value of `"client_email"`
3. Share your Google Sheet with that email (`Editor` access)

---

## 🧠 Running the Bot

```bash
node index.js
```

Then open Discord and DM your bot:

```
Snacks - $5
```

You should see the entry appear in your Google Sheet.

---

## 📂 Folder Structure

```
expense-bot/
│
├── credentials.json        # Google service account key
├── .env                    # Secrets (token, sheet ID)
├── index.js                # Main bot logic
├── package.json
└── README.md
```

---

## 🔒 .gitignore

Make sure to add this to your `.gitignore`:

```
.env
credentials.json
node_modules/
```

---

## ✅ Example Output

| Timestamp           | Message     | Username             |
|---------------------|-------------|----------------------|
| 2025-04-29 15:05:00 | Coffee - $3 | rajvardhansinghdodiya |
| 2025-04-29 15:10:00 | Snacks - $5 | rajvardhansinghdodiya |

---

## 👨‍💻 Author

Made with ☕ and 📊 by [Your Name]  
Feel free to fork and extend this project!