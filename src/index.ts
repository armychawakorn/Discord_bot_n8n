import { Client, Events, Message } from 'discord.js';
import dotenv from 'dotenv';
import { config } from './config';
import { sendToWebhook } from './webhook';
import './errorHandling';

// โหลดตัวแปรจากไฟล์ .env
dotenv.config();

// สร้างอินสแตนซ์ของ Discord client
const client = new Client({
  intents: config.discord.intents,
});

// กำหนด URL ของ webhook จากตัวแปรสภาพแวดล้อม
const webhookUrl = config.webhook.url;

// แสดงข้อความเมื่อบอทพร้อมทำงาน
client.once(Events.ClientReady, (readyClient) => {
  console.log(`บอทพร้อมทำงานแล้ว! เข้าสู่ระบบในชื่อ ${readyClient.user.tag}`);
});

// จัดการกับข้อความที่เข้ามา
client.on(Events.MessageCreate, async (message: Message) => {
  try {
    // ไม่สนใจข้อความจากบอท เพื่อป้องกันการวนซ้ำ
    if (message.author.bot) return;
      // เตรียมข้อมูลสำหรับส่งไปยัง webhook
    
    const webhookData = {
      content: message.content,
      author: {
        id: message.author.id,
        username: message.author.username,
        discriminator: message.author.discriminator,
        avatar: message.author.avatarURL(),
      },
      channelType: message.channel.type,
      channelId: message.channelId,
      guildId: message.guildId,
      messageId: message.id,
      timestamp: message.createdTimestamp,
    };    
    // บันทึกข้อความที่เรากำลังส่งไปยัง webhook
    console.log(`กำลังส่งข้อความไปยัง webhook: "${message.content}" จาก ${message.author.username}`);
    
    // ส่งข้อมูลข้อความไปยัง webhook
    const success = await sendToWebhook(webhookUrl, webhookData);
    
    if (success) {
      console.log('ส่งข้อความไปยัง webhook สำเร็จ');
    } else {
      console.error('ไม่สามารถส่งข้อความไปยัง webhook หลังจากลองซ้ำหลายครั้ง');
    }  } catch (error) {
    // บันทึกข้อผิดพลาด
    console.error('เกิดข้อผิดพลาดในการส่งข้อความไปยัง webhook:', error);
  }
});

// เข้าสู่ระบบด้วยโทเค็นของบอท
client.login(config.discord.token)
  .then(() => console.log('กำลังเข้าสู่ระบบบอท...'))
  .catch((error) => {
    console.error('เข้าสู่ระบบไม่สำเร็จ:', error);
    process.exit(1);
  });
