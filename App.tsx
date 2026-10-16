import React from 'react';
import { useApp } from './context/AppContext';
import { WelcomePage } from './pages/WelcomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { GuestPage } from './pages/GuestPage';
import { DashboardPage } from './pages/DashboardPage';
import { FormUploadPage } from './pages/FormUploadPage';
import { FormUnderstandingPage } from './pages/FormUnderstandingPage';
import { DocumentRequirementsPage } from './pages/DocumentRequirementsPage';
import { OCRPage } from './pages/OCRPage';
import { FieldMappingPage } from './pages/FieldMappingPage';
import { GuideMePage } from './pages/GuideMePage';
import { ValidationPage } from './pages/ValidationPage';
import { FinalReviewPage } from './pages/FinalReviewPage';
import { ExportPage } from './pages/ExportPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { HelpPage } from './pages/HelpPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ExplainModal } from './components/ExplainModal';
import { ExitDialog } from './components/ExitDialog';
import { LogoutDialog } from './components/LogoutDialog';
import { Toast } from './components/Toast';
import { FloatingVoiceBar } from './components/FloatingVoiceBar';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';

export const App: React.FC = () => {
  const { currentPage, isVoiceAssistantOpen, closeVoiceAssistant } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'guest':
        return <GuestPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'upload':
        return <FormUploadPage />;
      case 'understanding':
        return <FormUnderstandingPage />;
      case 'documents':
        return <DocumentRequirementsPage />;
      case 'ocr':
        return <OCRPage />;
      case 'mapping':
        return <FieldMappingPage />;
      case 'guide':
        return <GuideMePage />;
      case 'validation':
        return <ValidationPage />;
      case 'review':
        return <FinalReviewPage />;
      case 'export':
        return <ExportPage />;
      case 'applications':
        return <ApplicationsPage />;
      case 'help':
        return <HelpPage />;
      case 'privacy':
        return <PrivacyPage />;
      default:
        return <WelcomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200 pb-20">
      {renderPage()}
      
      {/* Global Accessibility Dialogs & Overlays */}
      <ExplainModal />
      <ExitDialog />
      <LogoutDialog />
      <Toast />

      {/* Floating Bottom Voice Assistant Bar & Modal */}
      <FloatingVoiceBar />
      <VoiceAssistantModal 
        isOpen={isVoiceAssistantOpen} 
        onClose={closeVoiceAssistant} 
      />
    </div>
  );
};
