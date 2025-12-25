export class LinkEntity {
  id: number;
  originalUrl: string;
  shortUrl: string;
  qrCode?: string;
  clicks: number;
  createdAt: Date;

  constructor(partial: Partial<LinkEntity>) {
    Object.assign(this, partial);
  }
}
