import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Simple validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 },
      );
    }

    // TODO: Implement email sending logic here
    // Can be integrated with services like SendGrid, Mailgun, or EmailJS

    console.log('New Contact Form Submission:', data);

    return NextResponse.json(
      { message: 'Form submitted successfully.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
