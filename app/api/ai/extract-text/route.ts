import { NextRequest, NextResponse } from 'next/server';
import { processWithGemini, processWithOpenAI } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileData, fileType } = body;

    // Validate required fields
    if (!fileData || !fileType) {
      return NextResponse.json(
        { error: 'fileData and fileType are required' },
        { status: 400 }
      );
    }

    let extractedText = '';

    if (fileType === 'application/pdf') {
      // For PDF files, use AI to extract text
      const prompt = `
Extract all text content from this PDF resume/document. Return only the plain text content without any formatting or metadata.

Focus on:
- Personal information (name, contact details)
- Professional summary/objective
- Work experience with dates and descriptions
- Education details
- Skills and certifications
- Any other relevant text content

Return the extracted text in a clean, readable format. Do not include any JSON formatting or additional commentary.

PDF Base64 Data: ${fileData.substring(0, 2000)}...
`;

      try {
        // Try Gemini first (cheaper for text extraction)
        extractedText = await processWithGemini(prompt);
      } catch (geminiError) {
        console.warn('Gemini extraction failed, trying OpenAI:', geminiError);
        try {
          extractedText = await processWithOpenAI(prompt);
        } catch (openaiError) {
          console.error(
            'Both AI services failed for PDF extraction:',
            openaiError
          );
          throw new Error(
            'Unable to extract text from PDF. Please try a different file format.'
          );
        }
      }
    } else {
      // For other file types, try to decode base64
      try {
        const base64Data = fileData.includes(',')
          ? fileData.split(',')[1]
          : fileData;
        extractedText = atob(base64Data);
      } catch (decodeError) {
        throw new Error(
          'Unable to decode file content. Please ensure the file is valid.'
        );
      }
    }

    // Validate extracted text
    if (!extractedText || extractedText.trim().length < 10) {
      throw new Error('No meaningful text content found in the file.');
    }

    return NextResponse.json({
      success: true,
      text: extractedText.trim(),
      wordCount: extractedText.trim().split(/\s+/).length,
    });
  } catch (error) {
    console.error('Text extraction failed:', error);
    return NextResponse.json(
      {
        error: 'Text extraction failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
