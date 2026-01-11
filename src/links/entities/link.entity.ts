import { Link } from '@prisma/client';

export class LinkEntity {
  id: number;
  originalUrl: string;
  shortUrl: string;
  fullShortUrl: string;
  qrCode?: string;
  clicks: number;
  createdAt: Date;

  constructor(partial: Partial<Link>, qrCodeData?: string) {
    Object.assign(this, partial);

    const baseUrl = process.env.APP_URL || 'http://localhost:3000';
    this.fullShortUrl = `${baseUrl}/${this.shortUrl}`;

    if (qrCodeData) {
      this.qrCode = qrCodeData;
    }
  }
}
