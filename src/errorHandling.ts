// ตั้งค่าตัวรับฟังกิจกรรมของโปรเซสเพื่อจัดการข้อผิดพลาดได้ดีขึ้น

process.on('unhandledRejection', (reason, promise) => {
  console.error('เกิดข้อผิดพลาด Promise ที่ไม่ได้จัดการ:', reason);
  // การบันทึกเฉพาะแอปพลิเคชัน
});

process.on('uncaughtException', (error) => {
  console.error('เกิดข้อยกเว้นที่ไม่ได้จัดการ:', error);
  // การบันทึกเฉพาะแอปพลิเคชัน แล้วจึงออกอย่างสวยงาม
  process.exit(1);
});

// สำหรับการปิดอย่างสะอาด
process.on('SIGINT', () => {
  console.log('ได้รับ SIGINT กำลังปิดโปรแกรมอย่างสวยงาม...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('ได้รับ SIGTERM กำลังปิดโปรแกรมอย่างสวยงาม...');
  process.exit(0);
});
