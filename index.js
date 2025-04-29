require('dotenv').config();
const { Client, GatewayIntentBits, Partials  } = require('discord.js');
const { google } = require('googleapis');
const fs = require('fs');

const SHEET_ID = process.env.SHEET_ID;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: SCOPES,
});
const sheets = google.sheets({ version: 'v4', auth });

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages], partials: [Partials.Channel] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || message.channel.type !== 1) return;

  const content = message.content.trim();
  const timestamp = new Date().toISOString();
  console.log(`Received message: "${content}" from ${message.author.username}`);

  try {
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[timestamp, content, message.author.username]],
      },
    });

    console.log('Saved to Google Sheets:', result.statusText);
    await message.reply('Expense saved to Google Sheet ✅');
  } catch (err) {
    console.error('Google Sheets error:', err);
    await message.reply('❌ Failed to save expense');
  }
});


client.login(process.env.DISCORD_TOKEN);
