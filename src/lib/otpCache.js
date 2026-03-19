export const otpCache = globalThis.otpCache || new Map();
if (process.env.NODE_ENV !== "production") { globalThis.otpCache = otpCache; }
