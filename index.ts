export type FontSize = 'normal' | 'large' | 'xlarge';
export type AppLanguage = 'en' | 'ta' | 'hi';
export type AppMode = 'auto-fill' | 'guide-me';

export interface AccessibilitySettings {
  fontSize: FontSize;
  highContrast: boolean;
  language: AppLanguage;
  readAloud: boolean;
}

export interface User {
  id: string;
  name: string;
  emailOrPhone: string;
  password?: string;
  createdAt: string;
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'dropdown' | 'radio' | 'checkbox' | 'textarea';
  required: boolean;
  description?: string;
  placeholder?: string;
  options?: string[];
  validation?: 'phone' | 'date' | 'email' | 'number' | 'none';
  dependsOn?: {
    fieldId: string;
    value: string | boolean;
  };
  explanationKey?: string;
}

export interface FormSection {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
}

export interface RequiredDocument {
  id: string;
  name: string;
  required: boolean;
  reason: string;
  explanationKey?: string;
  sampleFileName?: string;
  mockExtractedData?: Record<string, { value: string; confidence: 'high' | 'medium' | 'low' }>;
}

export interface FormSchema {
  id: string;
  formName: string;
  purpose: string;
  sections: FormSection[];
  requiredDocuments: RequiredDocument[];
  demoType: 'senior' | 'education' | 'business' | 'custom';
}

export interface UploadedDocInfo {
  id: string;
  documentId: string; // matches RequiredDocument id
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  previewUrl?: string;
}

export interface OCRResult {
  documentId: string;
  documentName: string;
  confidence: 'high' | 'medium' | 'low';
  extractedFields: Array<{
    key: string;
    label: string;
    value: string;
    confidence: 'high' | 'medium' | 'low';
    targetFieldId?: string;
    targetFieldName?: string;
    confirmed: boolean;
  }>;
}

export interface ApplicationRecord {
  id: string;
  userId: string;
  mode: AppMode;
  formSchema: FormSchema;
  currentStepIndex: number;
  currentSubStep?: string;
  answers: Record<string, any>;
  uploadedDocuments: UploadedDocInfo[];
  ocrResults: Record<string, OCRResult>;
  lastSaved: string;
  status: 'draft' | 'completed';
}

export type PageRoute = 
  | 'welcome'
  | 'login'
  | 'register'
  | 'guest'
  | 'dashboard'
  | 'upload'
  | 'understanding'
  | 'documents'
  | 'ocr'
  | 'guide'
  | 'mapping'
  | 'validation'
  | 'review'
  | 'export'
  | 'applications'
  | 'help'
  | 'privacy';
