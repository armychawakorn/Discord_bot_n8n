# ใช้อิมเมจ Node.js 18 อย่างเป็นทางการเป็นอิมเมจพื้นฐาน
FROM node:23-alpine

# สร้างและกำหนดไดเรกทอรีทำงาน
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json ไปยังไดเรกทอรีทำงาน
COPY package*.json ./

# ติดตั้งแพ็คเกจที่จำเป็น
RUN npm ci --only=production

# คัดลอกไฟล์ JavaScript ที่คอมไพล์แล้ว
COPY dist/ ./dist/

# คัดลอกไฟล์ .env (สำหรับการพัฒนาเท่านั้น - ในโหมดผลิตภัณฑ์ให้ใช้ตัวแปรสภาพแวดล้อม)
COPY .env ./

# เปิดพอร์ตถ้าบอท Discord ของคุณใช้ REST API
# EXPOSE 3000

# กำหนดคำสั่งเพื่อเรียกใช้บอท
CMD ["node", "dist/index.js"]
