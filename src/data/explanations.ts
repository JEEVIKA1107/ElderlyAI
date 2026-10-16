import { AppLanguage } from '../types';

export interface ExplanationEntry {
  title: Record<AppLanguage, string>;
  explanation: Record<AppLanguage, string>;
  example: Record<AppLanguage, string>;
}

export const explanations: Record<string, ExplanationEntry> = {
  domicile: {
    title: {
      en: 'What does "Domicile" mean?',
      ta: '"இருப்பிடம் (Domicile)" என்றால் என்ன?',
      hi: '"अधिवास (Domicile)" का क्या अर्थ है?'
    },
    explanation: {
      en: 'Domicile simply means the state or region where you officially live and have your permanent home.',
      ta: 'இருப்பிடம் என்பது நீங்கள் அதிகாரப்பூர்வமாக நிரந்தரமாக வசிக்கும் மாநிலம் அல்லது ஊரைக் குறிக்கிறது.',
      hi: 'अधिवास का सीधा अर्थ वह राज्य या क्षेत्र है जहां आप आधिकारिक तौर पर स्थायी रूप से रहते हैं।'
    },
    example: {
      en: 'For example: Tamil Nadu, Maharashtra, or Delhi.',
      ta: 'எடுத்துக்காட்டு: தமிழ்நாடு, கேரளா, அல்லது டெல்லி.',
      hi: 'उदाहरण के लिए: उत्तर प्रदेश, महाराष्ट्र, या दिल्ली।'
    }
  },
  grossIncome: {
    title: {
      en: 'What is "Annual Income"?',
      ta: '"ஆண்டு வருமானம்" என்றால் என்ன?',
      hi: '"वार्षिक आय" क्या होती है?'
    },
    explanation: {
      en: 'This is the total money earned in one whole year before any deductions or expenses.',
      ta: 'இது ஒரு முழு ஆண்டில் உங்களுக்கு கிடைக்கும் மொத்த வருமானத் தொகை ஆகும்.',
      hi: 'यह एक पूरे वर्ष में बिना किसी कटौती के कमाई गई कुल राशि है।'
    },
    example: {
      en: 'For example: ₹1,50,000 per year from pension or family support.',
      ta: 'எடுத்துக்காட்டு: ஓய்வூதியம் அல்லது குடும்ப உதவி மூலம் ஆண்டுக்கு ₹1,50,000.',
      hi: 'उदाहरण के लिए: पेंशन या सहायता से प्रति वर्ष ₹1,50,000।'
    }
  },
  ifsc: {
    title: {
      en: 'What is an "IFSC Code"?',
      ta: '"IFSC குறியீடு" என்றால் என்ன?',
      hi: '"IFSC कोड" क्या है?'
    },
    explanation: {
      en: 'An IFSC code is an 11-character code that identifies your specific bank branch. It is printed clearly on your bank cheque or passbook.',
      ta: 'IFSC குறியீடு என்பது உங்கள் வங்கிக் கிளையை அடையாளம் காணும் 11 எழுத்துக் குறியீடு ஆகும். இது உங்கள் வங்கிக் கணக்குப் புத்தகத்தில் இருக்கும்.',
      hi: 'IFSC कोड 11 अक्षरों का एक कोड है जो आपकी बैंक शाखा की पहचान करता है। यह आपकी बैंक पासबुक या चेक पर लिखा होता है।'
    },
    example: {
      en: 'For example: SBIN0001234 on the first page of your passbook.',
      ta: 'எடுத்துக்காட்டு: உங்கள் பாஸ்புத்தகத்தின் முதல் பக்கத்தில் உள்ள SBIN0001234.',
      hi: 'उदाहरण के लिए: आपकी पासबुक के पहले पन्ने पर SBIN0001234।'
    }
  },
  gstNumber: {
    title: {
      en: 'What is a "GST Number"?',
      ta: '"ஜி.எஸ்.டி (GST) எண்" என்றால் என்ன?',
      hi: '"जीएसटी (GST) नंबर" क्या है?'
    },
    explanation: {
      en: 'GSTIN is a 15-digit official business tax identification number given when registering a business in India.',
      ta: 'இது இந்தியாவில் வணிகப் பதிவு செய்யும் போது அரசாங்கத்தால் வழங்கப்படும் 15 இலக்க வரி அடையாள எண் ஆகும்.',
      hi: 'यह भारत में व्यवसाय पंजीकृत करते समय दिया जाने वाला 15 अंकों का आधिकारिक व्यापार कर नंबर है।'
    },
    example: {
      en: 'For example: 33AAAAA0000A1Z5 found on your tax certificate.',
      ta: 'எடுத்துக்காட்டு: உங்கள் வணிகச் சான்றிதழில் உள்ள 33AAAAA0000A1Z5.',
      hi: 'उदाहरण के लिए: आपके टैक्स सर्टिफिकेट पर लिखा 33AAAAA0000A1Z5।'
    }
  },
  employmentStatus: {
    title: {
      en: 'What is "Employment Status"?',
      ta: '"வேலை நிலை" என்றால் என்ன?',
      hi: '"रोजगार की स्थिति" क्या है?'
    },
    explanation: {
      en: 'This tells whether you are currently working, retired, running your own work, or a homemaker.',
      ta: 'நீங்கள் தற்போது பணிபுரிகிறீர்களா, ஓய்வு பெற்றுவிட்டீர்களா அல்லது சுயதொழில் செய்கிறீர்களா என்பதைக் குறிக்கிறது.',
      hi: 'यह बताता है कि क्या आप वर्तमान में कार्यरत हैं, सेवानिवृत्त (रिटायर्ड) हैं, या गृहिणी हैं।'
    },
    example: {
      en: 'For example: Select "Retired" if you are no longer working.',
      ta: 'எடுத்துக்காட்டு: நீங்கள் இனி பணிபுரியவில்லை என்றால் "ஓய்வு பெற்றவர்" என்பதைத் தேர்ந்தெடுக்கவும்.',
      hi: 'उदाहरण के लिए: यदि आप अब काम नहीं कर रहे हैं तो "सेवानिवृत्त" चुनें।'
    }
  },
  supportingDocument: {
    title: {
      en: 'What is a "Supporting Document"?',
      ta: '"ஆவணச் சான்று" என்றால் என்ன?',
      hi: '"सहायक दस्तावेज" क्या होता है?'
    },
    explanation: {
      en: 'A supporting document is a paper or certificate that proves what you have written in the form is true.',
      ta: 'நீங்கள் படிவத்தில் எழுதிய தகவல்கள் உண்மையானவை என்பதை நிரூபிக்கும் சான்றிதழ் அல்லது ஆவணம் ஆகும்.',
      hi: 'सहायक दस्तावेज वह कागज या प्रमाण पत्र है जो साबित करता है कि आपने फॉर्म में जो लिखा है वह सही है।'
    },
    example: {
      en: 'For example: A birth certificate proves your date of birth.',
      ta: 'எடுத்துக்காட்டு: பிறப்புச் சான்றிதழ் உங்கள் பிறந்த தேதியை நிரூபிக்கிறது.',
      hi: 'उदाहरण के लिए: जन्म प्रमाण पत्र आपकी जन्म तिथि को प्रमाणित करता है।'
    }
  },
  marksheet: {
    title: {
      en: 'What is a "Marksheet"?',
      ta: '"மதிப்பெண் பட்டியல்" என்றால் என்ன?',
      hi: '"अंकतालिका (मार्कशीट)" क्या है?'
    },
    explanation: {
      en: 'A marksheet or grade sheet is the official document from your school or college showing grades or marks obtained.',
      ta: 'மதிப்பெண் பட்டியல் என்பது நீங்கள் பள்ளி அல்லது கல்லூரியில் பெற்ற மதிப்பெண்களைக் காட்டும் அதிகாரப்பூர்வ ஆவணம்.',
      hi: 'अंकतालिका वह आधिकारिक दस्तावेज है जो आपके स्कूल या कॉलेज द्वारा प्राप्त अंकों या ग्रेड को दर्शाता है।'
    },
    example: {
      en: 'For example: 10th or 12th Standard Board Exam Marksheet.',
      ta: 'எடுத்துக்காட்டு: 10 அல்லது 12 ஆம் வகுப்பு பொதுத்தேர்வு மதிப்பெண் பட்டியல்.',
      hi: 'उदाहरण के लिए: 10वीं या 12वीं बोर्ड परीक्षा की मार्कशीट।'
    }
  },
  registrationCertificate: {
    title: {
      en: 'What is a "Registration Certificate"?',
      ta: '"பதிவுச் சான்றிதழ்" என்றால் என்ன?',
      hi: '"पंजीकरण प्रमाण पत्र" क्या है?'
    },
    explanation: {
      en: 'This is the government paper certifying that a shop, enterprise, or organization is legally registered.',
      ta: 'ஒரு கடை அல்லது நிறுவனம் சட்டப்பூர்வமாக பதிவு செய்யப்பட்டுள்ளது என்பதை உறுதிப்படுத்தும் அரசு ஆவணம்.',
      hi: 'यह वह सरकारी कागज है जो प्रमाणित करता है कि कोई दुकान या उद्यम कानूनी रूप से पंजीकृत है।'
    },
    example: {
      en: 'For example: Udyam Registration or Shop & Establishment License.',
      ta: 'எடுத்துக்காட்டு: உதயம் (Udyam) பதிவு அல்லது கடை உரிமம்.',
      hi: 'उदाहरण के लिए: उद्यम रजिस्ट्रेशन या दुकान लाइसेंस।'
    }
  }
};
