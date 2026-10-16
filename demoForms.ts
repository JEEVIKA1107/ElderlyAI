import { FormSchema } from '../types';

export const seniorCitizenForm: FormSchema = {
  id: 'form-senior-citizen',
  formName: 'Senior Citizen Assistance Application',
  purpose: 'Provide monthly welfare assistance and healthcare support for senior citizens residing in the state.',
  demoType: 'senior',
  sections: [
    {
      id: 'sec-personal',
      name: 'Personal Details',
      description: 'Your identity and basic contact information',
      fields: [
        {
          id: 'applicant_name',
          name: 'Full Name',
          label: 'What is your full legal name?',
          type: 'text',
          required: true,
          placeholder: 'e.g. Ramesh Kumar',
          validation: 'none',
          explanationKey: 'supportingDocument'
        },
        {
          id: 'date_of_birth',
          name: 'Date of Birth',
          label: 'What is your date of birth?',
          type: 'date',
          required: true,
          placeholder: 'YYYY-MM-DD',
          validation: 'date'
        },
        {
          id: 'phone_number',
          name: 'Phone Number',
          label: 'What is your mobile phone number?',
          type: 'text',
          required: true,
          placeholder: 'e.g. 9876543210',
          validation: 'phone'
        },
        {
          id: 'residential_address',
          name: 'Permanent Address',
          label: 'What is your permanent home address and state of domicile?',
          type: 'textarea',
          required: true,
          placeholder: 'House No, Street, City, State, PIN',
          validation: 'none',
          explanationKey: 'domicile'
        }
      ]
    },
    {
      id: 'sec-employment',
      name: 'Employment & Income',
      description: 'Your current work status and financial details',
      fields: [
        {
          id: 'employment_status',
          name: 'Employment Status',
          label: 'Are you currently employed or working?',
          type: 'radio',
          required: true,
          options: ['Yes', 'No'],
          explanationKey: 'employmentStatus'
        },
        {
          id: 'employer_name',
          name: 'Employer Name',
          label: 'What is the name of your current employer or company?',
          type: 'text',
          required: true,
          placeholder: 'e.g. State Transport Corp',
          dependsOn: {
            fieldId: 'employment_status',
            value: 'Yes'
          }
        },
        {
          id: 'employer_address',
          name: 'Employer Address',
          label: 'Where is your employer located?',
          type: 'text',
          required: false,
          placeholder: 'Office address or branch',
          dependsOn: {
            fieldId: 'employment_status',
            value: 'Yes'
          }
        },
        {
          id: 'annual_income',
          name: 'Annual Income',
          label: 'What is your total estimated annual income (in ₹)?',
          type: 'number',
          required: true,
          placeholder: 'e.g. 80000',
          validation: 'number',
          explanationKey: 'grossIncome'
        }
      ]
    },
    {
      id: 'sec-education',
      name: 'Educational Background',
      description: 'Highest level of education completed',
      fields: [
        {
          id: 'education_qualification',
          name: 'Educational Qualification',
          label: 'What is your highest completed educational qualification?',
          type: 'dropdown',
          required: true,
          options: [
            'Primary School (Up to 5th)',
            'Secondary School (10th Standard)',
            'Higher Secondary (12th Standard)',
            'Bachelor of Arts (B.A.)',
            'Bachelor of Science (B.Sc.)',
            'Bachelor of Commerce (B.Com)',
            'Post Graduate / Professional',
            'No Formal Schooling'
          ]
        }
      ]
    }
  ],
  requiredDocuments: [
    {
      id: 'doc-age-proof',
      name: 'Age and Identity Proof',
      required: true,
      reason: 'To confirm that the applicant is 60 years of age or older as required by state welfare rules.',
      explanationKey: 'supportingDocument',
      sampleFileName: 'Sample_Age_Proof_Certificate.pdf',
      mockExtractedData: {
        'Full Name': { value: 'Ramesh Kumar', confidence: 'high' },
        'Date of Birth': { value: '1954-03-12', confidence: 'high' },
        'Permanent Address': { value: '45 Gandhi Road, Coimbatore, Tamil Nadu - 641001', confidence: 'high' }
      }
    },
    {
      id: 'doc-income-cert',
      name: 'Pension or Income Certificate',
      required: true,
      reason: 'To verify financial eligibility for the senior citizen pension subsidy.',
      explanationKey: 'grossIncome',
      sampleFileName: 'Sample_Income_Pension_Certificate.pdf',
      mockExtractedData: {
        'Applicant Name': { value: 'Ramesh Kumar', confidence: 'high' },
        'Annual Income': { value: '75000', confidence: 'high' },
        'Employment Status': { value: 'No', confidence: 'medium' }
      }
    }
  ]
};

export const educationAssistanceForm: FormSchema = {
  id: 'form-education-assistance',
  formName: 'Higher Education Scholarship & Assistance Application',
  purpose: 'Financial assistance and stipend for eligible students pursuing higher education degrees.',
  demoType: 'education',
  sections: [
    {
      id: 'sec-student-info',
      name: 'Student Information',
      description: 'Basic student details and contact information',
      fields: [
        {
          id: 'student_name',
          name: 'Student Full Name',
          label: 'What is the student\'s full legal name?',
          type: 'text',
          required: true,
          placeholder: 'e.g. Priya Sundaram'
        },
        {
          id: 'student_dob',
          name: 'Date of Birth',
          label: 'What is the student\'s date of birth?',
          type: 'date',
          required: true,
          validation: 'date'
        },
        {
          id: 'student_address',
          name: 'Home Address',
          label: 'What is your permanent residential address?',
          type: 'textarea',
          required: true,
          placeholder: 'Door No, Street, City, State, PIN',
          explanationKey: 'domicile'
        }
      ]
    },
    {
      id: 'sec-academic-info',
      name: 'Academic Details',
      description: 'Details of current study and previous performance',
      fields: [
        {
          id: 'institution_name',
          name: 'Current College or Institution',
          label: 'What is the name of your college or university?',
          type: 'text',
          required: true,
          placeholder: 'e.g. Government Arts & Science College'
        },
        {
          id: 'degree_pursued',
          name: 'Degree / Course of Study',
          label: 'Which degree or course are you currently studying?',
          type: 'dropdown',
          required: true,
          options: [
            'Bachelor of Science (Computer Science)',
            'Bachelor of Commerce',
            'Bachelor of Arts (Literature)',
            'Bachelor of Engineering / Technology',
            'Diploma in Polytechnic',
            'Master of Science'
          ]
        },
        {
          id: 'previous_percentage',
          name: 'Previous Exam Percentage / GPA',
          label: 'What was your percentage or GPA in the qualifying examination?',
          type: 'number',
          required: true,
          placeholder: 'e.g. 84.5',
          explanationKey: 'marksheet'
        },
        {
          id: 'family_annual_income',
          name: 'Family Annual Income',
          label: 'What is your total family annual income (in ₹)?',
          type: 'number',
          required: true,
          placeholder: 'e.g. 120000',
          explanationKey: 'grossIncome'
        }
      ]
    }
  ],
  requiredDocuments: [
    {
      id: 'doc-marksheet',
      name: 'Official Marksheet / Grade Card',
      required: true,
      reason: 'To verify academic merit and eligibility percentage.',
      explanationKey: 'marksheet',
      sampleFileName: 'Sample_12th_Grade_Marksheet.pdf',
      mockExtractedData: {
        'Student Full Name': { value: 'Priya Sundaram', confidence: 'high' },
        'Current College or Institution': { value: 'Government Arts & Science College', confidence: 'high' },
        'Previous Exam Percentage / GPA': { value: '86.4', confidence: 'high' },
        'Date of Birth': { value: '2004-08-19', confidence: 'high' }
      }
    },
    {
      id: 'doc-bonafide',
      name: 'College Bonafide Student Certificate',
      required: true,
      reason: 'To confirm that the applicant is currently an enrolled active student.',
      explanationKey: 'supportingDocument',
      sampleFileName: 'Sample_College_Bonafide_Certificate.pdf',
      mockExtractedData: {
        'Student Full Name': { value: 'Priya Sundaram', confidence: 'high' },
        'Current College or Institution': { value: 'Government Arts & Science College', confidence: 'high' },
        'Degree / Course of Study': { value: 'Bachelor of Science (Computer Science)', confidence: 'high' }
      }
    }
  ]
};

export const smallBusinessForm: FormSchema = {
  id: 'form-small-business',
  formName: 'Small Business Support & Grant Application',
  purpose: 'Financial assistance and working capital grant for micro and small local business enterprises.',
  demoType: 'business',
  sections: [
    {
      id: 'sec-enterprise-info',
      name: 'Enterprise & Registration Details',
      description: 'Identification of the business entity',
      fields: [
        {
          id: 'business_name',
          name: 'Business Enterprise Name',
          label: 'What is the registered trade name of your business or shop?',
          type: 'text',
          required: true,
          placeholder: 'e.g. Murugan Provision Stores'
        },
        {
          id: 'gst_number',
          name: 'GST Identification Number (GSTIN)',
          label: 'What is your 15-digit GSTIN (if applicable)?',
          type: 'text',
          required: false,
          placeholder: 'e.g. 33AAAAA0000A1Z5',
          explanationKey: 'gstNumber'
        },
        {
          id: 'enterprise_type',
          name: 'Enterprise Type',
          label: 'What type of business do you operate?',
          type: 'dropdown',
          required: true,
          options: [
            'Micro Retail / Grocery Shop',
            'Handicrafts / Handloom Weaving',
            'Small Scale Manufacturing',
            'Food & Catering Stall',
            'Tailoring & Garments Workshop',
            'Service & Repair Center'
          ]
        },
        {
          id: 'business_address',
          name: 'Business Premise Address',
          label: 'Where is your shop or business located?',
          type: 'textarea',
          required: true,
          placeholder: 'Shop No, Market Road, Town, PIN'
        }
      ]
    },
    {
      id: 'sec-bank-details',
      name: 'Business Bank Account',
      description: 'Account where grant funds will be transferred directly',
      fields: [
        {
          id: 'bank_name',
          name: 'Bank Name',
          label: 'Which bank holds your business or trade account?',
          type: 'text',
          required: true,
          placeholder: 'e.g. State Bank of India'
        },
        {
          id: 'account_number',
          name: 'Bank Account Number',
          label: 'What is your bank account number?',
          type: 'text',
          required: true,
          placeholder: 'e.g. 10023456789'
        },
        {
          id: 'ifsc_code',
          name: 'Bank IFSC Code',
          label: 'What is your bank branch IFSC code?',
          type: 'text',
          required: true,
          placeholder: 'e.g. SBIN0001234',
          explanationKey: 'ifsc'
        }
      ]
    }
  ],
  requiredDocuments: [
    {
      id: 'doc-business-reg',
      name: 'Business Registration Certificate (Udyam / Trade License)',
      required: true,
      reason: 'To verify legal registration and trade establishment under municipal laws.',
      explanationKey: 'registrationCertificate',
      sampleFileName: 'Sample_Udyam_Registration_Certificate.pdf',
      mockExtractedData: {
        'Business Enterprise Name': { value: 'Murugan Provision Stores', confidence: 'high' },
        'GST Identification Number (GSTIN)': { value: '33AAAAA0000A1Z5', confidence: 'high' },
        'Enterprise Type': { value: 'Micro Retail / Grocery Shop', confidence: 'high' },
        'Business Premise Address': { value: 'Shop 12, Market Bazaar, Madurai - 625001', confidence: 'high' }
      }
    },
    {
      id: 'doc-bank-proof',
      name: 'Bank Passbook Front Page or Cancelled Cheque',
      required: true,
      reason: 'To ensure government grant transfers reach the authentic applicant bank account.',
      explanationKey: 'ifsc',
      sampleFileName: 'Sample_Bank_Passbook_Front_Page.pdf',
      mockExtractedData: {
        'Bank Name': { value: 'State Bank of India', confidence: 'high' },
        'Bank Account Number': { value: '10023456789', confidence: 'high' },
        'Bank IFSC Code': { value: 'SBIN0001234', confidence: 'high' }
      }
    }
  ]
};

export const allDemoForms: FormSchema[] = [
  seniorCitizenForm,
  educationAssistanceForm,
  smallBusinessForm
];
