import dotenv from 'dotenv';
import { GatewayIntentBits } from 'discord.js';

// โหลดตัวแปรสภาพแวดล้อมจากไฟล์ .env
dotenv.config();

// ตรวจสอบตัวแปรสภาพแวดล้อมที่จำเป็น
if (!process.env.DISCORD_TOKEN) {
  console.error('ไม่พบ DISCORD_TOKEN ในตัวแปรสภาพแวดล้อม');
  process.exit(1);
}

export const config = {
  // การกำหนดค่าของบอท Discord
  discord: {
    token: process.env.DISCORD_TOKEN,
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  },
  
  // การกำหนดค่าของ Webhook
  webhook: {
    url: process.env.WEBHOOK_URL || 'https://n8n.chawakorndev.online/webhook-test/34a6a11f-da6f-41aa-b62d-f02e1b08e033',
    retries: 3,
    timeout: 5000, // 5 วินาที
  },
  
  // การกำหนดค่าการบันทึก
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enableConsole: true,
  },
};
