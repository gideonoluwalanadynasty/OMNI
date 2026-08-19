import { useState, useEffect } from 'react';
import { useOmni } from './hooks/useOmni';
import { ToastSystem } from './components/ToastSystem';
import { AiCommandBar } from './components/AiCommandBar';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { DashboardShell } from './components/DashboardShell';
import { AccountDashboardPage } from './components/AccountDashboardPage';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { SystemStatusPage } from './components/SystemStatusPage';
import { AppSettingsPage } from './components/AppSettingsPage';
import { AppLauncherPage } from './components/AppLauncherPage';
import { PassportDashboardPage } from './components/PassportDashboardPage';
import { DeveloperConsolePage } from './components/DeveloperConsolePage';
import OMNIDeveloperPortalPage from './components/OMNIDeveloperPortalPage';
import AiOperatingSystemPage from './components/AiOperatingSystemPage';
import OMNIFinancialPage from './components/OMNIFinancialPage';
import OMNIAffiliatePage from './components/OMNIAffiliatePage';
import OMNIWhiteLabelPage from './components/OMNIWhiteLabelPage';
import OMNISharedServicesPage from './components/OMNISharedServicesPage';
import OMNICapitalPortalPage from './components/OMNICapitalPortalPage';
import OMNISuperAdminPage from './components/OMNISuperAdminPage';
import OMNIMigrationPage from './components/OMNIMigrationPage';
import OMNIDemoAppPage from './components/OMNIDemoAppPage';
import OMNISecurityAuditPage from './components/OMNISecurityAuditPage';
import OMNIAiAppPage from './components/OMNIAiAppPage';
import { OmniBrowserAppPage } from './components/browser/OmniBrowserAppPage';
import OmniFinanceRoot from './components/finance/OmniFinanceRoot';
import { OmniConnectRoot } from './components/connect/OmniConnectRoot';


export default function App() {
  const omni = useOmni();
  const {
    state,
    toasts,
    triggerToast,
    setView,
    switchOrg,
    addTransaction,
    createOrg,
    toggleMfa,
    toggleFeatureFlag,
    addApiCredential,
    deleteApiCredential,
    addWebhook,
    deleteWebhook,
    registerApp,
    toggleTheme,
    clearNotifications,
    loginUser,
    signupUser,
    completeOnboarding,
    runAiCommand,
    // OMNI Passport actions
    updateUserProfile,
    switchProfileType,
    revokeActiveSession,
    revokeConnectedAppConsent,
    authorizeConnectedApp,
    registerPasskey,
    revokePasskey,
    updateEnterpriseSso,
    runKycKybVerification,
    triggerSuspiciousLoginHook,
    changeOrganizationRole,
    transferOrgOwnership,
    updateVerificationConfig,
    validateAndRegisterAppFromManifest,
    dispatchDomainEvent,
    replayWebhookDelivery,
    retryWebhookDelivery,
    // OMNI Financial Accounting actions
    recordDoubleEntryTransaction,
    updatePaymentIntegration,
    updateSubscription,
    generateInvoice,
    requestPayout,
    processPayoutAction,
    runFinancialReconciliation,
    simulateFailedPayment,
    // OMNI Affiliate actions
    registerAsAffiliate,
    updateAttributionModel,
    simulateAffiliateClick,
    simulateAffiliateLead,
    triggerAffiliateConversion,
    processFraudAlertAction,
    allocateGrowthReward,
    redeemGrowthRewardPoints,
    // OMNI White-Label & Reseller actions
    launchWhiteLabelPlatform,
    updateWhiteLabelBranding,
    updateWhiteLabelDomain,
    updateResellerNodes,
    updateResellerEconomics,
    updateSuperAdminControls,
    verifyDnsRecord,
    provisionSslCertificate,
    // OMNI Developer actions
    registerDeveloper,
    submitMarketplaceApp,
    reviewMarketplaceApp,
    installMarketplaceApp,
    revokeMarketplaceApp,
    submitSandboxApiRequest,
    // OMNI Capital & Ownership actions
    recordValuation,
    proposeInvestmentOffering,
    configureJurisdictionCompliance,
    mockSimulateAmlKycVerification,
    configureExchangeCredentials,
    transitionOfferingStatus,
    // OMNI Super Admin & Governance actions
    updateGovernancePolicy,
    proposeAdminAction,
    processAdminApprovalTask,
    updateAdvancedFeatureFlag,
    adminUpdateAppAvailability,
    adminUpdateUserControl,
    adminUpdateTenantControl
  } = omni;

  const [aiOpen, setAiOpen] = useState(false);

  // Global keyboard shortcut for AI Command Bar: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setAiOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    // Basic session reset
    localStorage.removeItem('omni_platform_state_v1');
    window.location.reload();
  };

  // 1. Guest flow
  if (!state.user) {
    if (state.activeView === 'login') {
      return (
        <>
          <LoginPage onLogin={loginUser} onBack={() => setView('home', null)} />
          <ToastSystem toasts={toasts} />
        </>
      );
    }
    if (state.activeView === 'signup') {
      return (
        <>
          <SignupPage onSignup={signupUser} onBack={() => setView('home', null)} />
          <ToastSystem toasts={toasts} />
        </>
      );
    }
    return (
      <>
        <HomePage
          onLogin={() => setView('login', null)}
          onSignup={() => setView('signup', null)}
          onDemo={() => loginUser('gideonoluwalanadynasty@gmail.com')}
        />
        <ToastSystem toasts={toasts} />
      </>
    );
  }

  // 2. Onboarding state flow
  if (state.activeView === 'onboarding') {
    return (
      <>
        <OnboardingFlow fullName={state.user.fullName} onComplete={completeOnboarding} />
        <ToastSystem toasts={toasts} />
      </>
    );
  }

  // 3. Authenticated system shell chrome
  return (
    <div className={state.theme === 'dark' ? 'dark bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}>
      <DashboardShell
        state={state}
        onLogout={handleLogout}
        setView={setView}
        switchOrg={switchOrg}
        createOrg={createOrg}
        toggleTheme={toggleTheme}
        clearNotifications={clearNotifications}
        onOpenAi={() => setAiOpen(true)}
      >
        {state.activeView === 'admin' && (
          <OMNISuperAdminPage
            state={state}
            updateGovernancePolicy={updateGovernancePolicy}
            proposeAdminAction={proposeAdminAction}
            processAdminApprovalTask={processAdminApprovalTask}
            updateAdvancedFeatureFlag={updateAdvancedFeatureFlag}
            adminUpdateAppAvailability={adminUpdateAppAvailability}
            adminUpdateUserControl={adminUpdateUserControl}
            adminUpdateTenantControl={adminUpdateTenantControl}
            triggerToast={triggerToast}
          />
        )}

        {(state.activeView === 'ai' || (state.activeView === 'app' && (state.activeAppId === 'app_ai' || state.activeAppId === 'ai'))) && (
          <OMNIAiAppPage
            state={state}
            setView={setView}
            switchOrg={switchOrg}
            toggleTheme={toggleTheme}
            triggerToast={triggerToast}
            dispatchDomainEvent={dispatchDomainEvent}
            addTransaction={addTransaction}
          />
        )}

        {(state.activeView === 'browser' || (state.activeView === 'app' && (state.activeAppId === 'app_browser' || state.activeAppId === 'browser'))) && (
          <OmniBrowserAppPage
            onNavigateApp={(appId) => {
              if (appId === 'ai' || appId === 'app_ai') setView('ai', 'app_ai');
              else if (appId === 'passport') setView('passport', null);
              else if (appId === 'finance' || appId === 'app_finance') setView('finance', 'app_finance');
              else if (appId === 'connect' || appId === 'app_connect') setView('connect', 'app_connect');
              else setView('app', appId);
            }}
          />
        )}

        {state.activeView === 'ai_os' && (
          <AiOperatingSystemPage useOmniHook={omni} />
        )}

        {state.activeView === 'status' && <SystemStatusPage state={state} />}

        {state.activeView === 'passport' && (
          <PassportDashboardPage
            state={state}
            updateUserProfile={updateUserProfile}
            switchProfileType={switchProfileType}
            revokeActiveSession={revokeActiveSession}
            revokeConnectedAppConsent={revokeConnectedAppConsent}
            authorizeConnectedApp={authorizeConnectedApp}
            registerPasskey={registerPasskey}
            revokePasskey={revokePasskey}
            updateEnterpriseSso={updateEnterpriseSso}
            runKycKybVerification={runKycKybVerification}
            triggerSuspiciousLoginHook={triggerSuspiciousLoginHook}
            changeOrganizationRole={changeOrganizationRole}
            transferOrgOwnership={transferOrgOwnership}
            updateVerificationConfig={updateVerificationConfig}
            createOrg={createOrg}
            switchOrg={switchOrg}
          />
        )}

        {state.activeView === 'settings' && (
          <AppSettingsPage
            state={state}
            toggleMfa={toggleMfa}
            addApiCredential={addApiCredential}
            deleteApiCredential={deleteApiCredential}
            addWebhook={addWebhook}
            deleteWebhook={deleteWebhook}
          />
        )}

        {state.activeView === 'developer' && (
          <OMNIDeveloperPortalPage
            state={state}
            registerDeveloper={registerDeveloper}
            submitMarketplaceApp={submitMarketplaceApp}
            reviewMarketplaceApp={reviewMarketplaceApp}
            installMarketplaceApp={installMarketplaceApp}
            revokeMarketplaceApp={revokeMarketplaceApp}
            submitSandboxApiRequest={submitSandboxApiRequest}
            triggerToast={triggerToast}
            setView={setView}
          />
        )}

        {state.activeView === 'financial' && (
          <OMNIFinancialPage
            state={state}
            recordDoubleEntryTransaction={recordDoubleEntryTransaction}
            updatePaymentIntegration={updatePaymentIntegration}
            updateSubscription={updateSubscription}
            generateInvoice={generateInvoice}
            requestPayout={requestPayout}
            processPayoutAction={processPayoutAction}
            runFinancialReconciliation={runFinancialReconciliation}
            simulateFailedPayment={simulateFailedPayment}
          />
        )}

        {state.activeView === 'affiliates' && (
          <OMNIAffiliatePage
            state={state}
            registerAsAffiliate={registerAsAffiliate}
            updateAttributionModel={updateAttributionModel}
            simulateAffiliateClick={simulateAffiliateClick}
            simulateAffiliateLead={simulateAffiliateLead}
            triggerAffiliateConversion={triggerAffiliateConversion}
            processFraudAlertAction={processFraudAlertAction}
            allocateGrowthReward={allocateGrowthReward}
            redeemGrowthRewardPoints={redeemGrowthRewardPoints}
          />
        )}

        {state.activeView === 'white_label' && (
          <OMNIWhiteLabelPage
            state={state}
            addAuditLog={useOmni().addAuditLog}
            triggerToast={triggerToast}
            setView={setView}
            launchWhiteLabelPlatform={launchWhiteLabelPlatform}
            updateWhiteLabelBranding={updateWhiteLabelBranding}
            updateWhiteLabelDomain={updateWhiteLabelDomain}
            updateResellerNodes={updateResellerNodes}
            updateResellerEconomics={updateResellerEconomics}
            updateSuperAdminControls={updateSuperAdminControls}
            verifyDnsRecord={verifyDnsRecord}
            provisionSslCertificate={provisionSslCertificate}
            recordDoubleEntryTransaction={recordDoubleEntryTransaction}
          />
        )}

        {state.activeView === 'shared_services' && (
          <OMNISharedServicesPage useOmniHook={useOmni()} />
        )}

        {state.activeView === 'capital' && (
          <OMNICapitalPortalPage
            state={state}
            recordValuation={recordValuation}
            proposeInvestmentOffering={proposeInvestmentOffering}
            configureJurisdictionCompliance={configureJurisdictionCompliance}
            mockSimulateAmlKycVerification={mockSimulateAmlKycVerification}
            configureExchangeCredentials={configureExchangeCredentials}
            transitionOfferingStatus={transitionOfferingStatus}
            triggerToast={triggerToast}
          />
        )}

        {state.activeView === 'migration' && (
          <OMNIMigrationPage
            state={state}
            triggerToast={triggerToast}
          />
        )}

        {state.activeView === 'demo-app' && (
          <OMNIDemoAppPage
            state={state}
            triggerToast={triggerToast}
          />
        )}

        {state.activeView === 'security-audit' && (
          <OMNISecurityAuditPage
            state={state}
            triggerToast={triggerToast}
          />
        )}

        {(state.activeView === 'finance' || state.activeView === 'finance_os' || (state.activeView === 'app' && (state.activeAppId === 'app_finance' || state.activeAppId === 'finance'))) && (
          <OmniFinanceRoot />
        )}

        {(state.activeView === 'connect' || (state.activeView === 'app' && (state.activeAppId === 'app_connect' || state.activeAppId === 'connect'))) && (
          <OmniConnectRoot />
        )}

        {state.activeView === 'app' && state.activeAppId && (
          <AppLauncherPage
            state={state}
            appId={state.activeAppId}
            addTransaction={addTransaction}
            registerApp={registerApp}
            triggerToast={triggerToast}
          />
        )}

        {state.activeView === 'dashboard' && (
          <AccountDashboardPage
            state={state}
            addTransaction={addTransaction}
            toggleFeatureFlag={toggleFeatureFlag}
            setView={setView}
          />
        )}
      </DashboardShell>

      {/* Floating universal systems */}
      <AiCommandBar isOpen={aiOpen} onClose={() => setAiOpen(false)} runAiCommand={runAiCommand} />
      <ToastSystem toasts={toasts} />
    </div>
  );
}
