/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface RecruitFormData {
  type: string;
  jobType: string;
  name: string;
  furigana: string;
  email: string;
  phone: string;
  message?: string;
  privacy: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const formData: RecruitFormData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.furigana || !formData.email || !formData.phone || !formData.type || !formData.jobType) {
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
      <h2>新しい採用応募が届きました</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px; margin: 0 auto;">
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; width: 30%;">応募種別</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${formData.type}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">希望職種</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${formData.jobType}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">お名前</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${formData.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">フリガナ</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${formData.furigana}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">メールアドレス</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${formData.email}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">電話番号</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${formData.phone}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">自己PR・志望動機</td>
          <td style="padding: 12px; border: 1px solid #ddd; white-space: pre-wrap;">${formData.message || '（記入なし）'}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; font-size: 12px; color: #666;">
        このメールは${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}に送信されました。
      </p>
    `;

    // Create auto-reply email content (to applicant)
    const autoReplyEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #1247AF; padding-bottom: 10px;">
          ご応募ありがとうございます
        </h2>
        
        <p>${formData.name} 様</p>
        
        <p>この度は、株式会社ヨシダへご応募いただき、誠にありがとうございました。</p>
        
        <p>以下の内容でご応募を承りました。<br>
        今後の選考につきましては、書類選考の結果を含め、追って担当者よりご連絡いたします。</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 4px solid #1247AF;">
          <h3 style="margin-top: 0; color: #333;">ご応募内容</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; background-color: #fff; border: 1px solid #ddd; font-weight: bold; width: 30%;">応募種別</td>
              <td style="padding: 8px 12px; background-color: #fff; border: 1px solid #ddd;">${formData.type}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background-color: #f5f5f5; border: 1px solid #ddd; font-weight: bold;">希望職種</td>
              <td style="padding: 8px 12px; background-color: #f5f5f5; border: 1px solid #ddd;">${formData.jobType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background-color: #fff; border: 1px solid #ddd; font-weight: bold;">お名前</td>
              <td style="padding: 8px 12px; background-color: #fff; border: 1px solid #ddd;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background-color: #f5f5f5; border: 1px solid #ddd; font-weight: bold;">フリガナ</td>
              <td style="padding: 8px 12px; background-color: #f5f5f5; border: 1px solid #ddd;">${formData.furigana}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background-color: #fff; border: 1px solid #ddd; font-weight: bold;">メールアドレス</td>
              <td style="padding: 8px 12px; background-color: #fff; border: 1px solid #ddd;">${formData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background-color: #f5f5f5; border: 1px solid #ddd; font-weight: bold;">電話番号</td>
              <td style="padding: 8px 12px; background-color: #f5f5f5; border: 1px solid #ddd;">${formData.phone}</td>
            </tr>
          </table>
        </div>
        
        ${formData.message ? `
        <div style="background-color: #fff; border: 1px solid #ddd; padding: 15px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #333;">自己PR・志望動機:</h4>
          <p style="white-space: pre-wrap; line-height: 1.6;">${formData.message}</p>
        </div>
        ` : ''}
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
          <p style="margin-bottom: 5px;"><strong>株式会社ヨシダ 採用担当</strong></p>
          <p style="margin: 2px 0; font-size: 14px; color: #666;">
            選考に関するお問い合わせは、お電話でも承っております。
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
        subject: `[採用応募] ${formData.name}様より - ${formData.type}（${formData.jobType}）`,
        html: notificationEmailHtml,
      },
      // Auto-reply email to applicant
      {
        to: formData.email,
        from: FROM_EMAIL,
        subject: 'ご応募ありがとうございます - 株式会社ヨシダ 採用担当',
        html: autoReplyEmailHtml,
      }
    ];

    // Send emails
    try {
      await sgMail.send(emails);
      console.log('Recruit emails sent successfully');
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
        message: 'Recruit form submitted successfully',
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