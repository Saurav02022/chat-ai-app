import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDF } from '@/lib/ai';

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
      // For PDF files, use Gemini 2.5 Flash (supports PDF natively)
      try {
        console.log('Processing PDF with Gemini 2.5 Flash...');
        const result = await extractTextFromPDF(fileData);

        if (!result.text || result.text.trim().length < 10) {
          throw new Error('No meaningful text extracted from PDF');
        }

        extractedText = result.text;
        console.log(
          `✅ Extraction complete: ${extractedText.length} characters`
        );
      } catch (geminiError) {
        console.error('Gemini PDF extraction failed:', geminiError);
        throw new Error(
          `Unable to extract text from PDF: ${geminiError instanceof Error ? geminiError.message : 'Unknown error'}`
        );
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
