export const JWT_COOKIE = "sessionToken";

export const JWT_DURATION = 14 * 24 * 60 * 60 * 1000; // 2 weeks

// secret key for JWT
// เข้ารหัสข้อความ (String) เป็นข้อมูลแบบ Uint8Array (bytes) ซึ่งเหมาะสำหรับการทำงานกับ Binary Data เช่น การเข้ารหัส รหัสผ่าน, Web Crypto API, หรือ Buffer
export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
