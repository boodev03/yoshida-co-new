/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface ContactFormData {
  category: string;
  company?: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  privacy: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message || !formData.category || !formData.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email addresses
    const FROM_EMAIL = 'noreply@ysd-k.co.jp';
    const TO_EMAIL = 'soumu@ysd-k.co.jp';

    // Create notification email content (to company)
    const notificationEmailHtml = `
      <h2>新しいお問い合わせが届きました</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px; margin: 0 auto;">
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; width: 30%;">お問い合わせ区分</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${formData.category}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">会社名</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${formData.company || '（記入なし）'}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">お名前</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${formData.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">電話番号</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${formData.phone}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">メールアドレス</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${formData.email}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">お問い合わせ内容</td>
          <td style="padding: 12px; border: 1px solid #ddd; white-space: pre-wrap;">${formData.message}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; font-size: 12px; color: #666;">
        このメールは${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}に送信されました。
      </p>
    `;

    // Create auto-reply email content (to user)
    const autoReplyEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #1247AF; padding-bottom: 10px;">
          お問い合わせありがとうございます
        </h2>
        
        <p>この度は、株式会社ヨシダへお問い合わせいただき、誠にありがとうございました。</p>
        
        <p>以下の内容でお問い合わせを受け付けいたしました。<br>
        お送りいただきました内容を確認の上、担当者よりご連絡いたします。</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 4px solid #1247AF;">
          <h3 style="margin-top: 0; color: #333;">お問い合わせ内容</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; background-color: #fff; border: 1px solid #ddd; font-weight: bold; width: 30%;">お問い合わせ区分</td>
              <td style="padding: 8px 12px; background-color: #fff; border: 1px solid #ddd;">${formData.category}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background-color: #f5f5f5; border: 1px solid #ddd; font-weight: bold;">会社名</td>
              <td style="padding: 8px 12px; background-color: #f5f5f5; border: 1px solid #ddd;">${formData.company || '（記入なし）'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background-color: #fff; border: 1px solid #ddd; font-weight: bold;">お名前</td>
              <td style="padding: 8px 12px; background-color: #fff; border: 1px solid #ddd;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background-color: #f5f5f5; border: 1px solid #ddd; font-weight: bold;">電話番号</td>
              <td style="padding: 8px 12px; background-color: #f5f5f5; border: 1px solid #ddd;">${formData.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background-color: #fff; border: 1px solid #ddd; font-weight: bold;">メールアドレス</td>
              <td style="padding: 8px 12px; background-color: #fff; border: 1px solid #ddd;">${formData.email}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #fff; border: 1px solid #ddd; padding: 15px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #333;">お問い合わせ内容:</h4>
          <p style="white-space: pre-wrap; line-height: 1.6;">${formData.message}</p>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
          <p style="margin-bottom: 5px;"><strong>株式会社ヨシダ</strong></p>
          <p style="margin: 2px 0; font-size: 14px; color: #666;">
            お急ぎの場合は、お電話でもお問い合わせを承っております。
          </p>
          <p style="margin: 2px 0; font-size: 14px; color: #666;">
            このメールにご返信いただいても対応できませんのでご了承ください。
          </p>
        </div>
        
        <p style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">
          このメールは自動送信されています。<br>
          送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
        </p>
      </div>
    `;

    // Prepare emails
    const emails = [
      // Notification email to company
      {
        to: TO_EMAIL,
        from: FROM_EMAIL,
        subject: `[お問い合わせ] ${formData.name}様より - ${formData.category}`,
        html: notificationEmailHtml,
      },
      // Auto-reply email to user
      {
        to: formData.email,
        from: FROM_EMAIL,
        subject: 'お問い合わせありがとうございます - 株式会社ヨシダ',
        html: autoReplyEmailHtml,
      }
    ];

    // Send emails
    try {
      await sgMail.send(emails);
      console.log('Emails sent successfully');
    } catch (error) {
      console.error('SendGrid error:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const sgError = error as any;
        console.error('SendGrid response body:', sgError.response?.body);
      }
      throw error;
    }

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}