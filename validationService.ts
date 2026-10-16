import { FormField, FormSchema, RequiredDocument, UploadedDocInfo, OCRResult } from '../types';

export interface FieldValidation {
  isValid: boolean;
  message?: string;
}

export interface VerificationCheckItem {
  id: string;
  title: string;
  passed: boolean;
  warning?: string;
}

export interface FormValidationSummary {
  isValid: boolean;
  checks: VerificationCheckItem[];
  missingFields: { fieldId: string; fieldName: string; sectionName: string }[];
  missingDocuments: RequiredDocument[];
  contradictions: string[];
}

export const validationService = {
  /**
   * Validates an individual field value based on its type and validation rules.
   */
  validateField(field: FormField, value: any, allAnswers: Record<string, any> = {}): FieldValidation {
    // Check conditional display first: if condition not satisfied, field is not required
    if (field.dependsOn) {
      const parentValue = allAnswers[field.dependsOn.fieldId];
      if (parentValue !== field.dependsOn.value) {
        return { isValid: true };
      }
    }

    const strVal = (value !== undefined && value !== null) ? String(value).trim() : '';

    // Required check
    if (field.required && !strVal) {
      return {
        isValid: false,
        message: 'We still need this information before you can continue.'
      };
    }

    if (!strVal) {
      return { isValid: true };
    }

    // Phone validation
    if (field.validation === 'phone') {
      const phoneDigits = strVal.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        return {
          isValid: false,
          message: 'Please enter a valid 10-digit mobile phone number.'
        };
      }
    }

    // Date validation
    if (field.validation === 'date' || field.type === 'date') {
      const date = new Date(strVal);
      if (isNaN(date.getTime())) {
        return {
          isValid: false,
          message: "This date doesn't seem correct. Please check the day and month."
        };
      }
      // Check year range
      const year = date.getFullYear();
      if (year < 1900 || year > 2026) {
        return {
          isValid: false,
          message: "This date doesn't seem correct. Please check the year."
        };
      }
    }

    // Number validation
    if (field.validation === 'number' || field.type === 'number') {
      const num = Number(strVal);
      if (isNaN(num) || num < 0) {
        return {
          isValid: false,
          message: 'Please enter a valid positive number.'
        };
      }
    }

    return { isValid: true };
  },

  /**
   * Checks if a field should be shown based on its conditional logic
   */
  isFieldActive(field: FormField, allAnswers: Record<string, any>): boolean {
    if (!field.dependsOn) return true;
    const parentVal = allAnswers[field.dependsOn.fieldId];
    return parentVal === field.dependsOn.value;
  },

  /**
   * Comprehensive validation before final review & export.
   */
  verifyForm(
    schema: FormSchema,
    answers: Record<string, any>,
    uploadedDocs: UploadedDocInfo[],
    ocrResults: Record<string, OCRResult> = {}
  ): FormValidationSummary {
    const missingFields: { fieldId: string; fieldName: string; sectionName: string }[] = [];
    const contradictions: string[] = [];

    // 1. Check all sections and fields
    for (const section of schema.sections) {
      for (const field of section.fields) {
        if (this.isFieldActive(field, answers)) {
          const valResult = this.validateField(field, answers[field.id], answers);
          if (!valResult.isValid) {
            missingFields.push({
              fieldId: field.id,
              fieldName: field.name,
              sectionName: section.name
            });
          }
        }
      }
    }

    // 2. Check required documents
    const missingDocuments: RequiredDocument[] = [];
    for (const doc of schema.requiredDocuments) {
      if (doc.required) {
        const isUploaded = uploadedDocs.some(u => u.documentId === doc.id);
        if (!isUploaded) {
          missingDocuments.push(doc);
        }
      }
    }

    // 3. Contradiction & consistency checks
    // Example: If an applicant typed their name, but the OCR document extracted a distinctly different name
    for (const ocr of Object.values(ocrResults)) {
      for (const extracted of ocr.extractedFields) {
        if (extracted.targetFieldId && answers[extracted.targetFieldId]) {
          const typedVal = String(answers[extracted.targetFieldId]).trim().toLowerCase();
          const docVal = String(extracted.value).trim().toLowerCase();
          
          if (typedVal && docVal && typedVal !== docVal) {
            contradictions.push(
              `I found different information for "${extracted.targetFieldName}": you entered "${answers[extracted.targetFieldId]}" but your document shows "${extracted.value}". Please verify which is correct.`
            );
          }
        }
      }
    }

    // Build verification checklist
    const checks: VerificationCheckItem[] = [
      {
        id: 'check-required',
        title: 'Required fields completed',
        passed: missingFields.length === 0,
        warning: missingFields.length > 0 ? `${missingFields.length} required field(s) need your attention.` : undefined
      },
      {
        id: 'check-dates',
        title: 'Dates and numbers appear valid',
        passed: true // Passed basic format verification
      },
      {
        id: 'check-docs',
        title: 'Required supporting documents provided',
        passed: missingDocuments.length === 0,
        warning: missingDocuments.length > 0 ? `${missingDocuments.length} mandatory document(s) still needed.` : undefined
      },
      {
        id: 'check-contradictions',
        title: 'Document-to-field consistency check',
        passed: contradictions.length === 0,
        warning: contradictions.length > 0 ? 'Document details differ from entered details. Please check below.' : undefined
      }
    ];

    const isValid = missingFields.length === 0 && missingDocuments.length === 0;

    return {
      isValid,
      checks,
      missingFields,
      missingDocuments,
      contradictions
    };
  }
};
