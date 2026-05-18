const TelegramBot = require('node-telegram-bot-api');

// ============================================================
//  CRICKET INSIGHT HUB BOT — Configuration
// ============================================================
const TOKEN        = "7975942099:AAGGA-S7bfV2MoqrgxLylyP_nMsFP6a1N2M";
const CHANNEL_LINK = "https://t.me/+c4OAoozBTD8zNWU1";
const BANNER_IMAGE = "https://fantasticczone.site/wp-content/uploads/2026/05/Screenshot-2026-05-08-170943.png";

const bot = new TelegramBot(TOKEN, { polling: true });

// ============================================================
//  Helper — send photo with caption & keyboard
// ============================================================
async function sendPhotoMessage(chatId, caption, keyboard) {
  try {
    await bot.sendPhoto(chatId, BANNER_IMAGE, {
      caption,
      parse_mode: 'HTML',
      reply_markup: keyboard ? { inline_keyboard: keyboard } : undefined,
    });
  } catch (err) {
    // Fallback to text if image fails
    console.error('Photo send failed, falling back to text:', err.message);
    await bot.sendMessage(chatId, caption, {
      parse_mode: 'HTML',
      reply_markup: keyboard ? { inline_keyboard: keyboard } : undefined,
    });
  }
}

// ============================================================
//  /start  — Welcome message
// ============================================================
bot.onText(/\/start/, async (msg) => {
  const chatId    = msg.chat.id;
  const firstName = msg.from.first_name || 'Cricket Fan';

  const caption = `🏏 <b>Welcome to CRICKET INSIGHT HUB</b>, ${firstName}!

━━━━━━━━━━━━━━━━━━━━
🎯 <b>Your Daily Cricket Intelligence Platform</b>
━━━━━━━━━━━━━━━━━━━━

Get <b>expert cricket insights</b>, match predictions, fantasy team tips & in-depth analysis — all for <i>educational purposes</i>.

🔥 <b>What You'll Get:</b>
  📊 Daily Match Analysis
  🏆 Fantasy Cricket Tips
  📈 Player Form & Stats
  🎯 Pitch & Weather Reports
  💡 Strategy Breakdowns

🚀 <i>Learn • Analyse • Win</i>

📌 <b>Tap below to join our official channel</b> and never miss an update! 👇`;

  const keyboard = [
    [{ text: "📢 Join CRICKET INSIGHT HUB", url: CHANNEL_LINK }],
    [{ text: "✅ I've Joined!", callback_data: "joined" }],
    [{ text: "📊 Today's Insights", callback_data: "insights" },
     { text: "🏆 Fantasy Tips", callback_data: "fantasy" }]
  ];

  await sendPhotoMessage(chatId, caption, keyboard);

  // Disclaimer after 1.5 sec
  setTimeout(() => {
    bot.sendMessage(chatId,
      `⚠️ <b>Disclaimer</b>\n\n` +
      `All content shared here is <b>strictly for educational & entertainment purposes</b>.\n\n` +
      `• We do <b>NOT</b> guarantee match outcomes.\n` +
      `• Fantasy tips are based on analysis, not certainties.\n` +
      `• Always use your own judgment before playing.\n\n` +
      `<i>Play responsibly. Cricket is a game of uncertainty!</i> 🏏`,
      { parse_mode: 'HTML' }
    );
  }, 1500);
});

// ============================================================
//  Callback queries
// ============================================================
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data   = query.data;

  // ── Joined ──────────────────────────────────────────────
  if (data === 'joined') {
    await sendPhotoMessage(
      chatId,
      `✅ <b>Welcome to the Family!</b> 🏏\n\n` +
      `You're now part of <b>CRICKET INSIGHT HUB</b>!\n\n` +
      `🎯 <b>Here's what's coming your way:</b>\n` +
      `  📅 Pre-match analysis every match day\n` +
      `  🏆 Dream11 & fantasy playing XI tips\n` +
      `  📊 Live match updates & breakdowns\n` +
      `  🌦️ Pitch & toss predictions\n\n` +
      `📌 <b>Stay tuned. Big insights incoming!</b> 🔥`,
      [
        [{ text: "📊 Today's Insights", callback_data: "insights" }],
        [{ text: "🏆 Fantasy Tips",     callback_data: "fantasy"  }],
        [{ text: "ℹ️ About Us",         callback_data: "about"    }]
      ]
    );
  }

  // ── Today's Insights ────────────────────────────────────
  else if (data === 'insights') {
    const caption =
      `📊 <b>TODAY'S CRICKET INSIGHTS</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `🏏 <b>Match Analysis</b>\n` +
      `Our experts study pitch reports, head-to-head stats, player form & weather conditions to give you the most informed breakdown.\n\n` +
      `📈 <b>What we analyse:</b>\n` +
      `  • Recent form of both teams\n` +
      `  • Key player matchups\n` +
      `  • Venue & pitch behaviour\n` +
      `  • Toss impact analysis\n\n` +
      `🔔 <b>Join our channel</b> for real-time match day updates!\n\n` +
      `<i>All analysis is educational only. Cricket is unpredictable!</i> 🎯`;

    await sendPhotoMessage(chatId, caption, [
      [{ text: "📢 Join Channel for Live Updates", url: CHANNEL_LINK }],
      [{ text: "🏆 Fantasy Tips", callback_data: "fantasy" },
       { text: "🏠 Home",         callback_data: "home"    }]
    ]);
  }

  // ── Fantasy Tips ────────────────────────────────────────
  else if (data === 'fantasy') {
    const caption =
      `🏆 <b>FANTASY CRICKET TIPS</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `💡 <b>How We Pick Fantasy Teams:</b>\n\n` +
      `  1️⃣ <b>Captain & VC Selection</b> — Based on current form & venue stats\n` +
      `  2️⃣ <b>Pitch Report</b> — Batters vs Bowlers friendly pitch\n` +
      `  3️⃣ <b>Player Form</b> — Last 5 match performance\n` +
      `  4️⃣ <b>Weather Impact</b> — Dew factor & overcast conditions\n` +
      `  5️⃣ <b>Matchup Analysis</b> — Bowler vs batter stats\n\n` +
      `📌 Join our channel for <b>match-day playing XI & team suggestions</b>!\n\n` +
      `⚠️ <i>Fantasy tips are for entertainment & learning. Play responsibly.</i>`;

    await sendPhotoMessage(chatId, caption, [
      [{ text: "📢 Get Daily Fantasy Tips", url: CHANNEL_LINK }],
      [{ text: "📊 Match Insights", callback_data: "insights" },
       { text: "🏠 Home",           callback_data: "home"     }]
    ]);
  }

  // ── About ────────────────────────────────────────────────
  else if (data === 'about') {
    const caption =
      `ℹ️ <b>ABOUT CRICKET INSIGHT HUB</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `🏏 We are a team of passionate cricket analysts dedicated to helping fans:\n\n` +
      `  📚 <b>Learn</b> the finer points of cricket strategy\n` +
      `  📊 <b>Understand</b> match dynamics & player roles\n` +
      `  🎯 <b>Make better decisions</b> in fantasy cricket\n\n` +
      `🌟 <b>Our Promise:</b>\n` +
      `Unbiased, data-driven, in-depth cricket education — delivered daily.\n\n` +
      `📢 <b>Platform:</b> Telegram Channel\n` +
      `🏆 <b>Focus:</b> IPL, T20 World Cup, ODIs & Tests\n\n` +
      `<i>Built by fans, for fans. 🏏❤️</i>`;

    await sendPhotoMessage(chatId, caption, [
      [{ text: "📢 Join Our Channel", url: CHANNEL_LINK }],
      [{ text: "🏠 Home", callback_data: "home" }]
    ]);
  }

  // ── Home ─────────────────────────────────────────────────
  else if (data === 'home') {
    const caption =
      `🏏 <b>CRICKET INSIGHT HUB</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `What would you like to explore? 👇`;

    await sendPhotoMessage(chatId, caption, [
      [{ text: "📢 Join Official Channel",  url: CHANNEL_LINK      }],
      [{ text: "📊 Today's Insights",       callback_data: "insights" },
       { text: "🏆 Fantasy Tips",           callback_data: "fantasy"  }],
      [{ text: "ℹ️ About Us",               callback_data: "about"    }]
    ]);
  }

  await bot.answerCallbackQuery(query.id);
});

// ============================================================
//  /help command
// ============================================================
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `🆘 <b>HELP — CRICKET INSIGHT HUB</b>\n\n` +
    `<b>Available Commands:</b>\n` +
    `  /start — Welcome screen\n` +
    `  /help  — This help message\n\n` +
    `<b>Quick Buttons:</b>\n` +
    `  📊 Today's Insights\n` +
    `  🏆 Fantasy Tips\n` +
    `  ℹ️ About Us\n\n` +
    `📢 For daily updates join: ${CHANNEL_LINK}`,
    { parse_mode: 'HTML' }
  );
});

// ============================================================
//  Polling error handler
// ============================================================
bot.on('polling_error', (err) => {
  console.error('Polling error:', err.message);
});

console.log("🏏 CRICKET INSIGHT HUB Bot is running...");
