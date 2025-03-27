export const JWT_COOKIE = "sessionToken";
export const JWT_DURATION = 14 * 24 * 60 * 60 * 1000; // 2 weeks

// secret key for JWT
export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
