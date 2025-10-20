import { NextRequest, NextResponse } from 'next/server';
import { analyzeResumeForATS, generateCompanyInsights } from '@/lib/ai';

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

    // Run AI analysis
    const [atsResult, companyInsights] = await Promise.all([
      analyzeResumeForATS(resumeText, jobDescription, companyName),
      companyName
        ? generateCompanyInsights(companyName, jobDescription)
        : Promise.resolve(null),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        atsResult,
        companyInsights,
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
