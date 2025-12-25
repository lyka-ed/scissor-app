import * as QRCode from 'qrcode';

// 1. Generate a random 6-character alphanumeric string
export const generateRandomCode = (length: number = 6): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// 2. Generate Base64 QR Code
export const generateQrCode = async (url: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(url);
  } catch (err) {
    console.error('Error generating QR Code', err);
    return ''; // Return empty string on failure to not break the flow
  }
};
