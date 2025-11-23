import { NextRequest, NextResponse } from 'next/server';
import { analyzeResumeForATS } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeText, jobDescription, companyName } = body;

    // Validate required fields
    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: 'resumeText and jobDescription are required' },
        { status: 400 }
      );
    }

    // Run AI analysis - focused on resume-to-JD matching
    const atsResult = await analyzeResumeForATS(
      resumeText,
      jobDescription,
      companyName
    );

    return NextResponse.json({
      success: true,
      data: {
        atsResult,
      },
    });
  } catch (error) {
    console.error('Resume analysis failed:', error);
    return NextResponse.json(
      {
        error: 'Analysis failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
