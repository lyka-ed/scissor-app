import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }

  private async send(to: string, subject: string, html: string, text: string) {
    this.transporter
      .sendMail({
        from: `"Scissor App" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
        text,
      })
      .catch((error) => {
        console.error(`Error sending email to ${to}:`, error);
      });
  }

  async sendOtp(email: string, firstName: string, otp: string) {
    const subject = 'Verify your Scissor Account';
    const text = `Hello ${firstName}, your code is ${otp}. Valid for 10 mins.`;
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hello ${firstName},</h2>
        <p>Your verification code for Scissor App is:</p>
        <h1 style="color: #4A90E2; letter-spacing: 5px;">${otp}</h1>
        <p>This code expires in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `;

    await this.send(email, subject, html, text);
  }

  async sendWelcome(email: string, firstName: string) {
    const subject = 'Welcome to Scissor!';
    const text = `Welcome aboard, ${firstName}! Your account is now active.`;
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome aboard, ${firstName}! 🎉</h2>
        <p>Your account has been successfully verified.</p>
        <p>You can now log in and start creating short links.</p>
      </div>
    `;
    await this.send(email, subject, html, text);
  }
}
