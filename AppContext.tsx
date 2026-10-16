import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  AccessibilitySettings, 
  AppLanguage, 
  AppMode, 
  ApplicationRecord, 
  FontSize, 
  FormSchema, 
  OCRResult, 
  PageRoute, 
  UploadedDocInfo, 
  User 
} from '../types';
import { storageService } from '../services/storageService';
import { authService } from '../services/authService';
import { speechService, SpeechRate } from '../services/speechService';
import { translations } from '../data/translations';
import { seniorCitizenForm } from '../data/demoForms';

interface AppContextType {
  // Accessibility
  settings: AccessibilitySettings;
  setFontSize: (size: FontSize) => void;
  toggleHighContrast: () => void;
  setLanguage: (lang: AppLanguage) => void;
  t: (key: string) => string;
  readAloudText: (text: string) => void;
  stopAudio: () => void;
  pauseSpeaking: () => void;
  resumeSpeaking: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  activeSpeakingText: string | null;
  speechRate: SpeechRate;
  setSpeechRate: (rate: SpeechRate) => void;
  readCurrentScreen: () => void;

  // Voice Assistant Modal
  isVoiceAssistantOpen: boolean;
  openVoiceAssistant: () => void;
  closeVoiceAssistant: () => void;

  // Auth & Guest
  currentUser: User | null;
  isGuest: boolean;
  loginUser: (emailOrPhone: string, password?: string) => { success: boolean; errorMessage?: string };
  registerUser: (name: string, emailOrPhone: string, password?: string) => { success: boolean; errorMessage?: string };
  logoutUser: () => void;
  continueAsGuest: () => void;

  // Navigation
  currentPage: PageRoute;
  navigateTo: (page: PageRoute) => void;
  goBack: () => void;

  // Active Application & Mode
  activeApp: ApplicationRecord | null;
  setAppMode: (mode: AppMode) => void;
  startNewApplication: (schema: FormSchema, mode: AppMode) => void;
  updateAnswer: (fieldId: string, value: any) => void;
  addUploadedDocument: (doc: UploadedDocInfo) => void;
  saveOCRResult: (docId: string, result: OCRResult) => void;
  saveCurrentProgress: () => void;
  loadApplication: (id: string) => void;
  deleteSavedApplication: (id: string) => void;
  savedApplications: ApplicationRecord[];

  // Modals & Feedback
  explainTermKey: string | null;
  openExplain: (key: string) => void;
  closeExplain: () => void;
  isExitDialogOpen: boolean;
  openExitDialog: () => void;
  closeExitDialog: () => void;
  isLogoutDialogOpen: boolean;
  openLogoutDialog: () => void;
  closeLogoutDialog: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Accessibility State
  const [settings, setSettings] = useState<AccessibilitySettings>(() => storageService.getSettings());
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeSpeakingText, setActiveSpeakingText] = useState<string | null>(null);
  const [speechRate, setSpeechRateState] = useState<SpeechRate>('slow');

  // Voice Assistant Modal State
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState<boolean>(false);

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => storageService.getCurrentUser());
  const [isGuest, setIsGuest] = useState<boolean>(false);

  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageRoute>('welcome');
  const [navigationHistory, setNavigationHistory] = useState<PageRoute[]>(['welcome']);

  // Active Application State
  const [activeApp, setActiveApp] = useState<ApplicationRecord | null>(null);
  const [savedApplications, setSavedApplications] = useState<ApplicationRecord[]>(() => storageService.getApplications());

  // Dialog & Modal State
  const [explainTermKey, setExplainTermKey] = useState<string | null>(null);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState<boolean>(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Accessibility with HTML Document Element
  useEffect(() => {
    const root = document.documentElement;
    
    // Update font size class
    root.classList.remove('font-size-normal', 'font-size-large', 'font-size-xlarge');
    root.classList.add(`font-size-${settings.fontSize}`);

    // Update high contrast class
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    storageService.saveSettings(settings);
  }, [settings]);

  // Try resuming last active application if any
  useEffect(() => {
    const activeId = storageService.getActiveAppId();
    if (activeId) {
      const found = storageService.getApplicationById(activeId);
      if (found) {
        setActiveApp(found);
      }
    }
  }, []);

  // Accessibility Actions
  const setFontSize = (size: FontSize) => {
    setSettings(prev => ({ ...prev, fontSize: size }));
  };

  const toggleHighContrast = () => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const setLanguage = (lang: AppLanguage) => {
    setSettings(prev => ({ ...prev, language: lang }));
  };

  const setSpeechRate = (rate: SpeechRate) => {
    setSpeechRateState(rate);
    speechService.setRate(rate);
  };

  const t = useCallback((key: string): string => {
    const langDict = translations[settings.language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  }, [settings.language]);

  const readAloudText = (text: string) => {
    if (!text) return;
    setActiveSpeakingText(text);
    setIsSpeaking(true);
    setIsPaused(false);
    speechService.speak(
      text,
      settings.language,
      () => {
        setIsSpeaking(true);
        setIsPaused(false);
      },
      () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveSpeakingText(null);
      }
    );
  };

  const stopAudio = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
    setIsPaused(false);
    setActiveSpeakingText(null);
  };

  const pauseSpeaking = () => {
    speechService.pauseSpeaking();
    setIsPaused(true);
  };

  const resumeSpeaking = () => {
    speechService.resumeSpeaking();
    setIsPaused(false);
  };

  const readCurrentScreen = () => {
    // Collect visible main headings, instructions, or body summary
    const headings = Array.from(document.querySelectorAll('h1, h2, label, p'))
      .filter(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden' && el.textContent && el.textContent.trim().length > 3;
      })
      .slice(0, 5)
      .map(el => el.textContent?.trim())
      .filter(Boolean)
      .join('. ');

    const screenSummary = headings || t('welcomeHeading');
    readAloudText(screenSummary);
  };

  const openVoiceAssistant = () => setIsVoiceAssistantOpen(true);
  const closeVoiceAssistant = () => setIsVoiceAssistantOpen(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Navigation Actions
  const navigateTo = (page: PageRoute) => {
    stopAudio();
    setNavigationHistory(prev => [...prev, page]);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    stopAudio();
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // remove current
      const prevPage = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentPage(prevPage);
    } else {
      setCurrentPage('dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Actions
  const loginUser = (emailOrPhone: string, password?: string) => {
    const res = authService.login(emailOrPhone, password);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setIsGuest(false);
      setSavedApplications(storageService.getApplications());
      showToast(`Welcome back, ${res.user.name}!`);
      navigateTo('dashboard');
    }
    return res;
  };

  const registerUser = (name: string, emailOrPhone: string, password?: string) => {
    const res = authService.register(name, emailOrPhone, password);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setIsGuest(false);
      setSavedApplications(storageService.getApplications());
    }
    return res;
  };

  const logoutUser = () => {
    authService.logout();
    setCurrentUser(null);
    setIsGuest(false);
    setActiveApp(null);
    closeLogoutDialog();
    navigateTo('welcome');
    showToast('You have been logged out safely.');
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setCurrentUser(null);
    navigateTo('dashboard');
  };

  // Application Progress Actions
  const setAppMode = (mode: AppMode) => {
    if (activeApp) {
      const updated = { ...activeApp, mode };
      setActiveApp(updated);
      storageService.saveApplication(updated);
    }
  };

  const startNewApplication = (schema: FormSchema, mode: AppMode) => {
    const newRecord: ApplicationRecord = {
      id: 'app-' + Date.now(),
      userId: currentUser ? currentUser.id : 'guest',
      mode,
      formSchema: schema,
      currentStepIndex: 0,
      answers: {},
      uploadedDocuments: [],
      ocrResults: {},
      lastSaved: new Date().toISOString(),
      status: 'draft'
    };

    setActiveApp(newRecord);
    storageService.saveApplication(newRecord);
    storageService.setActiveAppId(newRecord.id);
    setSavedApplications(storageService.getApplications());
  };

  const updateAnswer = (fieldId: string, value: any) => {
    if (!activeApp) return;
    const updatedAnswers = { ...activeApp.answers, [fieldId]: value };
    const updated = {
      ...activeApp,
      answers: updatedAnswers,
      lastSaved: new Date().toISOString()
    };
    setActiveApp(updated);
    storageService.saveApplication(updated);
    setSavedApplications(storageService.getApplications());
  };

  const addUploadedDocument = (doc: UploadedDocInfo) => {
    if (!activeApp) return;
    const existing = activeApp.uploadedDocuments.filter(d => d.documentId !== doc.documentId);
    const updatedDocs = [...existing, doc];
    const updated = {
      ...activeApp,
      uploadedDocuments: updatedDocs,
      lastSaved: new Date().toISOString()
    };
    setActiveApp(updated);
    storageService.saveApplication(updated);
    setSavedApplications(storageService.getApplications());
  };

  const saveOCRResult = (docId: string, result: OCRResult) => {
    if (!activeApp) return;
    const updatedOcr = { ...activeApp.ocrResults, [docId]: result };
    
    // Auto-prefill answers from confirmed extracted fields
    const updatedAnswers = { ...activeApp.answers };
    result.extractedFields.forEach(field => {
      if (field.targetFieldId && field.value && (updatedAnswers[field.targetFieldId] === undefined || updatedAnswers[field.targetFieldId] === '')) {
        updatedAnswers[field.targetFieldId] = field.value;
      }
    });

    const updated = {
      ...activeApp,
      ocrResults: updatedOcr,
      answers: updatedAnswers,
      lastSaved: new Date().toISOString()
    };
    setActiveApp(updated);
    storageService.saveApplication(updated);
    setSavedApplications(storageService.getApplications());
  };

  const saveCurrentProgress = () => {
    if (activeApp) {
      storageService.saveApplication(activeApp);
      setSavedApplications(storageService.getApplications());
      showToast('Your progress has been saved.');
    }
  };

  const loadApplication = (id: string) => {
    const app = storageService.getApplicationById(id);
    if (app) {
      setActiveApp(app);
      storageService.setActiveAppId(app.id);
      if (app.mode === 'guide-me') {
        navigateTo('guide');
      } else {
        navigateTo('documents');
      }
      showToast('Resuming saved application.');
    }
  };

  const deleteSavedApplication = (id: string) => {
    storageService.deleteApplication(id);
    if (activeApp && activeApp.id === id) {
      setActiveApp(null);
      storageService.setActiveAppId(null);
    }
    setSavedApplications(storageService.getApplications());
    showToast('Application removed.');
  };

  // Modals & Dialogs
  const openExplain = (key: string) => setExplainTermKey(key);
  const closeExplain = () => setExplainTermKey(null);
  const openExitDialog = () => setIsExitDialogOpen(true);
  const closeExitDialog = () => setIsExitDialogOpen(false);
  const openLogoutDialog = () => setIsLogoutDialogOpen(true);
  const closeLogoutDialog = () => setIsLogoutDialogOpen(false);

  return (
    <AppContext.Provider
      value={{
        settings,
        setFontSize,
        toggleHighContrast,
        setLanguage,
        t,
        readAloudText,
        stopAudio,
        pauseSpeaking,
        resumeSpeaking,
        isSpeaking,
        isPaused,
        activeSpeakingText,
        speechRate,
        setSpeechRate,
        readCurrentScreen,

        isVoiceAssistantOpen,
        openVoiceAssistant,
        closeVoiceAssistant,

        currentUser,
        isGuest,
        loginUser,
        registerUser,
        logoutUser,
        continueAsGuest,

        currentPage,
        navigateTo,
        goBack,

        activeApp,
        setAppMode,
        startNewApplication,
        updateAnswer,
        addUploadedDocument,
        saveOCRResult,
        saveCurrentProgress,
        loadApplication,
        deleteSavedApplication,
        savedApplications,

        explainTermKey,
        openExplain,
        closeExplain,
        isExitDialogOpen,
        openExitDialog,
        closeExitDialog,
        isLogoutDialogOpen,
        openLogoutDialog,
        closeLogoutDialog,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
