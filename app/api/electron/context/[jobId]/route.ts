import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;

    // For now, return mock data since jobStore is client-side
    // In production, you'd want to:
    // 1. Store jobs in Supabase/database
    // 2. Implement auth tokens for Electron
    // 3. Fetch actual job/resume/prep docs from storage

    // Mock response structure
    const context = {
      job: {
        id: jobId,
        role: 'Software Engineer',
        company: 'Google',
        description:
          'We are looking for a talented Software Engineer to join our team...',
      },
      resume: {
        text: 'John Doe\nSoftware Engineer with 5 years of experience in React, Node.js...',
      },
      prepDocs: [
        'Company Research: Google is known for innovation...',
        'Technical prep: Focus on data structures and algorithms...',
      ],
    };

    return NextResponse.json(context);
  } catch (error) {
    console.error('Failed to fetch context:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch context',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
