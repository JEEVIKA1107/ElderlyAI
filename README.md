# AI Form Assistant for Elderly Users

A modern, highly accessible web application designed to help elderly users understand and complete complicated digital forms with ease, dignity, and confidence.

---

## 🌟 Primary Features

1. **Elderly-Friendly Access Screen**:
   - High-contrast, large-button interface welcoming users immediately.
   - Clear choice between **Log In**, **Create Account**, **Continue as Guest**, and **Exit**.
   - No forced account creation: guest users enjoy the full workflow (upload, auto-fill, OCR, guide me, validation, final review, and export).

2. **Persistent Accessibility Toolbar**:
   - **Font Size Scaling**: Dynamic 3-level typography toggle (`[- A]`, `[A]`, `[+ A]`).
   - **High Contrast Mode**: Accessible high-contrast theme (dark background, bold yellow accents, crisp white text, high-visibility focus borders).
   - **Multi-Language Support**: Complete interface translation for **English**, **Tamil (தமிழ்)**, and **Hindi (हिंदी)**.
   - **Text-to-Speech (TTS)**: Built with the browser `SpeechSynthesis` API to read aloud instructions, questions, and summaries.
   - **Voice Input (STT)**: Built with the browser `SpeechRecognition` API allowing seniors to speak their answers.

3. **True Dynamic Form Schemas**:
   - The uploaded form is the **sole source of truth**.
   - **Zero Hardcoding**: Never demands irrelevant documents (like Aadhaar, PAN, or Bank details) unless the form strictly requires them.
   - Built-in testable demo forms:
     - **Senior Citizen Assistance Application** (includes conditional employment questions and age/pension documents).
     - **Higher Education Scholarship Application** (education, institution, and marksheet documents).
     - **Small Business Support Application** (trade name, GSTIN, bank details, and registration certificate).
     - **Custom Form Upload**: Dynamically parses uploaded arbitrary PDFs/images.

4. **Dual Interaction Modes**:
   - **Auto-Fill Mode**: Form upload ➔ AI Understanding ➔ Document OCR ➔ Field Mapping ➔ Validation ➔ Review ➔ Export.
   - **Guide Me Mode**: Asks **one question at a time** ➔ Voice input ➔ Answer Confirmation ("I understood your answer as: [Answer]. Is that correct?") ➔ Dynamic conditional branching ➔ Validation ➔ Review ➔ Export.

5. **Plain-Language Explanations**:
   - **"? Explain This"** button on complicated terminology (e.g., *Domicile, Annual Income, IFSC Code, GST Number, Marksheet, Registration Certificate*).
   - Clear descriptions with concrete real-world examples in all 3 languages.

6. **Gentle Validation & Contradiction Detection**:
   - Non-technical, friendly messages (never exposes `401`, `TypeError`, or `Invalid input parameter`).
   - Detects mismatches between entered information and scanned documents without making automated assumptions.

7. **Printable Export**:
   - Clean printable application preview with prototype export watermark.
   - 1-click **Export PDF / Print Form** via standard browser print styles.

---

## 📁 Project Architecture

```text
d:/ai-form-assistant/
├── index.html                  # Accessible HTML5 root with responsive meta tags
├── package.json                # Dependencies: React 18, Vite 5, Tailwind CSS, Lucide icons
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind theme with elderly font scale & high-contrast colors
├── tsconfig.json               # TypeScript compiler options
├── vite.config.ts              # Vite server & build settings
│
└── src/
    ├── main.tsx                # Entry point mounting AppProvider and global styles
    ├── App.tsx                 # Master view router and dialog container
    ├── index.css               # Global accessibility styles, high-contrast rules, print CSS
    │
    ├── types/
    │   └── index.ts            # FormSchema, FormField, User, ApplicationRecord, OCRResult
    │
    ├── data/
    │   ├── demoForms.ts        # 3 distinct test forms with dynamic fields & mock documents
    │   ├── translations.ts     # Complete dictionaries for English, Tamil, and Hindi
    │   └── explanations.ts     # Plain-language dictionary for administrative & legal terms
    │
    ├── services/
    │   ├── storageService.ts   # LocalStorage persistence for users, drafts, and settings
    │   ├── authService.ts      # Mock authentication and session manager
    │   ├── speechService.ts    # Web Speech Synthesis (TTS) & Recognition (STT) adapter
    │   ├── formUnderstandingService.ts # AI form schema analyzer
    │   ├── ocrService.ts       # Document OCR reader with confidence ratings
    │   └── validationService.ts# Gentle validation and contradiction detection
    │
    ├── context/
    │   └── AppContext.tsx      # Central React Context (Auth, Language, Font, Active App)
    │
    ├── components/
    │   ├── AccessibilityControls.tsx # Top accessibility toolbar
    │   ├── Header.tsx          # Clean navigation header with user greeting
    │   ├── LargeButton.tsx     # High-contrast, touch-friendly accessible button
    │   ├── VoiceControls.tsx   # Microphone & audio playback controls
    │   ├── ExplainModal.tsx    # Plain-language term explanation dialog
    │   ├── ExitDialog.tsx      # Safe exit confirmation modal
    │   ├── LogoutDialog.tsx    # Logout modal preserving saved drafts
    │   └── Toast.tsx           # Auto-save and status toast alerts
    │
    └── pages/
        ├── WelcomePage.tsx     # Elderly-friendly start screen
        ├── LoginPage.tsx       # Accessible login with demo credentials shortcut
        ├── RegisterPage.tsx    # Account creation with explicit consent checkbox
        ├── GuestPage.tsx       # Guest mode feature overview
        ├── DashboardPage.tsx   # Mode selection (Auto-Fill vs Guide Me)
        ├── FormUploadPage.tsx  # Upload form or select built-in sample forms
        ├── FormUnderstandingPage.tsx # AI analysis of detected sections and fields
        ├── DocumentRequirementsPage.tsx # Dynamic document checklist with explanations
        ├── OCRPage.tsx         # Document scan results, confidence, Accept/Edit/Reject
        ├── FieldMappingPage.tsx# Visual document-to-form field mapping connector
        ├── GuideMePage.tsx     # Step-by-step wizard (1 question at a time)
        ├── ValidationPage.tsx  # Real-time checks and contradiction alerts
        ├── FinalReviewPage.tsx # Overview of all answers and AI verification checks
        ├── ExportPage.tsx      # Printable export with prototype watermark
        ├── ApplicationsPage.tsx# "My Applications" resuming saved progress
        ├── HelpPage.tsx        # Step-by-step user guide and FAQs
        └── PrivacyPage.tsx     # Plain-language data safety guarantee
```

---

## 🚀 Installation & Running

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. Install Dependencies
```bash
cd d:/ai-form-assistant
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port displayed in the terminal).

### 3. Build & Preview Production Bundle
```bash
npm run build
npm run preview
```

---

## 🔌 Connecting Real AI & OCR APIs Later

The codebase is built with modular service adapters so real cloud AI endpoints can be connected easily without touching UI components:

### 1. Connecting Real Form Understanding
In [`src/services/formUnderstandingService.ts`](file:///d:/ai-form-assistant/src/services/formUnderstandingService.ts):
- Replace the mock timer in `analyzeForm()` with a call to:
  - **Google Cloud Document AI** (Form Parser processor)
  - **Gemini 1.5 Pro / Flash Vision** via `@google/genai`
  - **Azure AI Document Intelligence**
- Pass the uploaded file as a base64 string or FormData, and map the returned JSON into the `FormSchema` interface.

### 2. Connecting Real Document OCR
In [`src/services/ocrService.ts`](file:///d:/ai-form-assistant/src/services/ocrService.ts):
- Replace `readDocument()` with a call to:
  - **Google Cloud Vision API** (`images:annotate`)
  - **Tesseract.js** (for in-browser client-side OCR)
  - **AWS Textract**
- Return the extracted key-value pairs and confidence scores into the `OCRResult` interface.

---

## 🔒 Mock Authentication Implementation

- **Location**: [`src/services/authService.ts`](file:///d:/ai-form-assistant/src/services/authService.ts) and [`src/services/storageService.ts`](file:///d:/ai-form-assistant/src/services/storageService.ts).
- **Preloaded Demo Account**:
  - Email / Username: `ramesh@example.com`
  - Password: `password123`
  - (A one-click shortcut button *"Use Demo Account"* is provided directly on the Login screen for instant access).
- **Registration**: Users can register with any Full Name, Email/Phone, and Password. Account data is saved to LocalStorage under `afa_all_users`.
- **Friendly Errors**: If an email or password does not match, the app presents:
  > *"We couldn't log you in. Please check your email or phone number and password."*
  (Technical error codes like `401 Unauthorized` are never displayed).
- **Session Continuity**: When logging out, the user's saved drafts and completed forms remain safely stored in LocalStorage for their next visit.

---

## 💾 LocalStorage Persistence & Auto-Save

- **State Storage Keys**:
  - `afa_current_user`: Active logged-in user profile.
  - `afa_all_users`: Registered user accounts.
  - `afa_applications`: List of all applications with answers, uploaded documents, OCR records, and progress.
  - `afa_active_app_id`: Currently active form draft.
  - `afa_accessibility_settings`: Active font size, high-contrast preference, active language, and TTS setting.
- **Auto-Save Mechanism**:
  - In **Guide Me Mode**, after every confirmed answer, the active application record is automatically saved.
  - In **Auto-Fill Mode**, every uploaded document, OCR extraction, and field confirmation is saved automatically.
  - A friendly toast appears notifying the user: *"Your progress has been saved."*
- **Draft Recovery**:
  - Users can resume from the exact question or step where they left off by clicking **"CONTINUE PREVIOUS APPLICATION"** on the Dashboard or visiting **"My Applications"**.

---

## 🧪 Acceptance Test Scenarios

### Scenario A: New User & Auto-Fill Mode
1. Open App ➔ Welcome Screen.
2. Click **CREATE ACCOUNT** ➔ enter Name, Email, Password, check consent ➔ Click **CREATE ACCOUNT**.
3. View success screen ➔ Click **CONTINUE** to Dashboard.
4. Click **AUTO-FILL** ➔ on Form Upload, click Sample A (**Senior Citizen Assistance**).
5. Watch **Form Understanding** analyze sections and detect 8+ fields and 2 documents.
6. Click **CONTINUE** to view **Document Requirements**.
7. Click **Use Sample Document** or **Upload Document** ➔ Proceed to **OCR Reading**.
8. Inspect extracted fields with confidence badges ➔ Accept, Edit, or Reject.
9. Click **CONTINUE TO FIELD MAPPING** ➔ Confirm matched fields into the form.
10. Proceed through **Validation** ➔ review completeness checklist.
11. Inspect **Final Review** with AI checks ➔ Click **EXPORT FORM**.
12. Review the printable completed form with prototype watermark and click **PRINT FORM**.

### Scenario B: Guest User & Guide Me Mode
1. Open App ➔ Welcome Screen.
2. Click **CONTINUE AS GUEST** ➔ Review guest features ➔ Click **CONTINUE AS GUEST**.
3. Click **GUIDE ME** on Dashboard.
4. Select Sample B (**Higher Education Scholarship**).
5. Step through questions **one at a time**:
   - Hear questions read aloud with 🔊 **Hear Question**.
   - Click ? **Explain This** for terms like *Domicile* or *Marksheet*.
   - Speak answers via 🎤 **Speak** or type into the input.
   - Confirm each answer via the confirmation card.
6. Observe dynamic conditional logic (e.g. employment fields skipping if "No").
7. Proceed through **Validation** and **Final Review** ➔ **Export Form**.

### Scenario C: Dynamic Form Behavior Verification
1. Test with Form A (*Senior Citizen*): Note fields like *Date of Birth*, *Employment Status*, *Pension Certificate*.
2. Test with Form C (*Small Business*): Note fields change dynamically to *Business Name*, *GSTIN*, *Bank Account*, *IFSC Code*, and *Registration Certificate*.
3. Notice that no universal hard-coded questions (such as Aadhaar or PAN) are ever forced.
