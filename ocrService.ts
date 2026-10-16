import { FormSchema, OCRResult } from '../types';

export const ocrService = {
  /**
   * Performs optical character recognition and field extraction from an uploaded document.
   * In a production environment, this delegates to:
   * - Google Cloud Vision API
   * - Tesseract.js / AWS Textract
   * - Gemini 1.5 Multimodal Document Extraction
   */
  async readDocument(
    documentId: string,
    formSchema: FormSchema,
    fileName: string,
    onProgress?: (stepText: string) => void
  ): Promise<OCRResult> {
    if (onProgress) onProgress('Scanning document layout and text blocks...');
    await new Promise(r => setTimeout(r, 600));

    if (onProgress) onProgress('Enhancing image clarity and character extraction...');
    await new Promise(r => setTimeout(r, 600));

    if (onProgress) onProgress('Matching extracted values against form fields...');
    await new Promise(r => setTimeout(r, 500));

    const docDef = formSchema.requiredDocuments.find(d => d.id === documentId);
    const docName = docDef?.name || fileName || 'Supporting Document';

    // Build extracted fields based on form schema and mock definitions
    const extractedFields: OCRResult['extractedFields'] = [];

    if (docDef && docDef.mockExtractedData) {
      for (const [key, data] of Object.entries(docDef.mockExtractedData)) {
        // Find matching form field in the schema
        let targetFieldId: string | undefined;
        let targetFieldName: string | undefined;

        for (const section of formSchema.sections) {
          const match = section.fields.find(f => 
            f.name.toLowerCase().includes(key.toLowerCase()) || 
            key.toLowerCase().includes(f.name.toLowerCase())
          );
          if (match) {
            targetFieldId = match.id;
            targetFieldName = match.name;
            break;
          }
        }

        extractedFields.push({
          key,
          label: key,
          value: data.value,
          confidence: data.confidence,
          targetFieldId,
          targetFieldName,
          confirmed: true // Default pre-confirmed or confirmable by user
        });
      }
    } else {
      // Generic fallback for custom documents
      extractedFields.push(
        {
          key: 'Document Title',
          label: 'Document Title',
          value: fileName.replace(/\.[^/.]+$/, ''),
          confidence: 'high',
          confirmed: true
        },
        {
          key: 'Extracted Identifier',
          label: 'Extracted ID / Ref',
          value: 'REF-' + Math.floor(100000 + Math.random() * 900000),
          confidence: 'medium',
          confirmed: false
        }
      );
    }

    // Determine overall confidence
    const hasLow = extractedFields.some(f => f.confidence === 'low');
    const hasMedium = extractedFields.some(f => f.confidence === 'medium');
    const overallConfidence: 'high' | 'medium' | 'low' = hasLow ? 'low' : hasMedium ? 'medium' : 'high';

    return {
      documentId,
      documentName: docName,
      confidence: overallConfidence,
      extractedFields
    };
  }
};
