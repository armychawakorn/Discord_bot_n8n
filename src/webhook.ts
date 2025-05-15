import axios, { AxiosError } from 'axios';

interface WebhookMessage {
  content: string;
  author: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
  };
  channelId: string;
  guildId: string | null;
  messageId: string;
  timestamp: number;
}

export async function sendToWebhook(webhookUrl: string, data: WebhookMessage): Promise<boolean> {
  try {
    const response = await axios.post(webhookUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000, // หมดเวลารอ 5 วินาที
    });
    
    if (response.status >= 200 && response.status < 300) {
      console.log(`ส่งข้อมูลไปยัง Webhook สำเร็จ (${response.status})`);
      return true;
    } else {
      console.warn(`Webhook ส่งคืนสถานะผิดปกติ: ${response.status}`);
      return false;
    }  } catch (error) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response) {
      // คำขอถูกส่งแล้วและเซิร์ฟเวอร์ตอบกลับด้วยรหัสสถานะ
      // ที่อยู่นอกช่วง 2xx
      console.error(`ข้อผิดพลาด Webhook: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`);
    } else if (axiosError.request) {
      // คำขอถูกส่งแล้วแต่ไม่ได้รับการตอบกลับ
      console.error('ข้อผิดพลาด Webhook: ไม่ได้รับการตอบกลับจากเซิร์ฟเวอร์');
    } else {
      // มีบางอย่างผิดพลาดในการตั้งค่าคำขอที่ทำให้เกิดข้อผิดพลาด
      console.error(`ข้อผิดพลาดการตั้งค่า Webhook: ${axiosError.message}`);
    }
    
    // ดำเนินการตามตรรกะการลองใหม่
    return await retryWebhook(webhookUrl, data);
  }
}

async function retryWebhook(webhookUrl: string, data: WebhookMessage, maxRetries = 3, delay = 1000): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`กำลังลองส่ง webhook อีกครั้ง (ครั้งที่ ${attempt}/${maxRetries})...`);
    
    // รอก่อนที่จะลองอีกครั้ง
    await new Promise(resolve => setTimeout(resolve, delay * attempt));
    
    try {
      await axios.post(webhookUrl, data);
      console.log(`ส่ง webhook สำเร็จในการลองครั้งที่ ${attempt}`);
      return true;
    } catch (error) {
      console.error(`การลองส่ง webhook ครั้งที่ ${attempt} ล้มเหลว`);
      
      if (attempt === maxRetries) {
        console.error('ถึงจำนวนครั้งสูงสุดในการลองแล้ว ขอยกเลิก');
        return false;
      }
    }
  }
  
  return false;
}
