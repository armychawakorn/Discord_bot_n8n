# บอท Discord สำหรับส่งต่อข้อความไปยัง Webhook

บอท Discord นี้จะส่งต่อข้อความทั้งหมดที่ได้รับไปยัง URL ของ webhook ที่กำหนด

## คุณสมบัติ

- ส่งต่อข้อความ Discord ทั้งหมดไปยัง webhook
- รวมเนื้อหาข้อความ, ข้อมูลผู้ส่ง และข้อมูลอื่นๆ
- สร้างด้วย TypeScript เพื่อคุณภาพโค้ดและความปลอดภัยของไทป์

## การติดตั้ง

### สิ่งที่ต้องมี

- [Node.js](https://nodejs.org/) (v16.0.0 หรือสูงกว่า)
- [npm](https://www.npmjs.com/) (มักมาพร้อมกับ Node.js)
- โทเค็นของบอท Discord ([สร้างบอท](https://discord.com/developers/applications))

### วิธีติดตั้ง

1. โคลนหรือดาวน์โหลดซอร์สโค้ด
2. เข้าไปในไดเรกทอรีของโปรเจคและติดตั้งแพ็คเกจที่จำเป็น:

```bash
npm install
```

3. สร้างไฟล์ `.env` ในไดเรกทอรีหลักโดยมีเนื้อหาดังนี้:

```
DISCORD_TOKEN=โทเค็นของบอท_discord_ของคุณ
WEBHOOK_URL=https://n8n.chawakorndev.online/webhook-test/34a6a11f-da6f-41aa-b62d-f02e1b08e033
```

แทนที่ `โทเค็นของบอท_discord_ของคุณ` ด้วยโทเค็นจริงของบอท Discord ของคุณ

### การเรียกใช้บอท

สำหรับการพัฒนา:
```bash
npm run dev
```

สร้างและเรียกใช้ในโหมดผลิตภัณฑ์:
```bash
npm run build
npm start
```

### การเรียกใช้ด้วย Docker

โปรเจคนี้มีการสนับสนุน Docker เพื่อรันบอทในคอนเทนเนอร์

สร้างและเรียกใช้ด้วย Docker:
```bash
docker build -t discord-webhook-bot .
docker run -d --name discord-webhook-bot --env-file .env discord-webhook-bot
```

หรือด้วย Docker Compose:
```bash
docker-compose up -d
```

### การติดตั้งบน Kubernetes

สำหรับการติดตั้งบน Kubernetes:

1. อัปเดตไฟล์ `kubernetes-deployment.yaml` ด้วยโทเค็นบอทของคุณ (เข้ารหัสเป็น base64):
   ```bash
   echo -n 'โทเค็นบอท_discord_ของคุณ' | base64
   ```

2. นำใช้การตั้งค่า:
   ```bash
   kubectl apply -f kubernetes-deployment.yaml
   ```

## การตั้งค่าบอท Discord

1. ไปที่ [Discord Developer Portal](https://discord.com/developers/applications)
2. สร้างแอปพลิเคชันใหม่และตั้งค่าบอท
3. เปิดใช้งาน Privileged Gateway Intents ต่อไปนี้:
   - Server Members Intent
   - Message Content Intent
4. สร้างโทเค็นบอทและเพิ่มลงในไฟล์ `.env` ของคุณ
5. ใช้ OAuth2 URL Generator เพื่อสร้างลิงก์เชิญโดยมีขอบเขตดังนี้:
   - `bot`
   - `applications.commands`
6. เพิ่มบอทเข้าสู่เซิร์ฟเวอร์ Discord ของคุณโดยใช้ลิงก์เชิญที่สร้างขึ้น

## รูปแบบข้อมูล Webhook

บอทจะส่งข้อมูลต่อไปนี้ไปยัง URL ของ webhook:

```json
{
  "content": "เนื้อหาข้อความ",
  "author": {
    "id": "ไอดีผู้ใช้",
    "username": "ชื่อผู้ใช้",
    "discriminator": "เลขประจำตัวผู้ใช้",
    "avatar": "URL รูปประจำตัว"
  },
  "channelId": "ไอดีช่อง",
  "guildId": "ไอดีเซิร์ฟเวอร์",
  "messageId": "ไอดีข้อความ",
  "timestamp": 1620000000000
}
```
