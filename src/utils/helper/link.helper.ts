import * as QRCode from 'qrcode';

export const generateRandomCode = (length: number = 6): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const generateQrCode = async (text: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error('Error generating QR code', err);
    return '';
  }
};
