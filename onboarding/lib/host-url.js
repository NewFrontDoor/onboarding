export const HOST_URL =
  `https://${process.env.HOST_URL}` ||
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` ||
  `https://${process.env.VERCEL_URL}` ||
  'http://localhost:3000';
