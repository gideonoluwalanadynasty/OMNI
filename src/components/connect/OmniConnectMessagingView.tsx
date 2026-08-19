import React, { useState, useEffect } from 'react';
import { OmniConnectEngine } from '../../engine/omni_connect_engine';
import {
  ConnectConversation,
  ConnectMessage,
  ConnectProfile
} from '../../types/omni_connect';
import {
  OmniConversation,
  OmniMessage,
  MessageType,
  ConversationType,
  CrmPipelineStage
} from '../../types/omni_messenger';
import { OmniMessengerSidebar } from './messenger/OmniMessengerSidebar';
import { OmniMessengerChatPane } from './messenger/OmniMessengerChatPane';
import { OmniMessengerInfoDrawer } from './messenger/OmniMessengerInfoDrawer';
import { OmniMessengerNewChatModal } from './messenger/OmniMessengerNewChatModal';
import { OmniMessengerSettingsModal } from './messenger/OmniMessengerSettingsModal';
import { OmniMessengerTestSuiteModal } from './messenger/OmniMessengerTestSuiteModal';

interface Props {
  conversations?: ConnectConversation[];
  activeProfile: ConnectProfile;
  onSendMessage?: (
    conversationId: string,
    content: string,
    kind?: ConnectMessage['messageKind'],
    voiceDurationSec?: number,
    payRequest?: ConnectMessage['payRequest']
  ) => void;
  getMessages?: (conversationId: string) => ConnectMessage[];
  onOpenMeeting?: (roomId: string) => void;
  engine?: OmniConnectEngine;
}

export const OmniConnectMessagingView: React.FC<Props> = ({
  activeProfile,
  onOpenMeeting,
  engine: propEngine
}) => {
  // If engine is not provided via props, instantiate or maintain local engine instance
  const [engine] = useState(() => propEngine || new OmniConnectEngine());

  // Messenger State
  const [conversations, setConversations] = useState<OmniConversation[]>(() =>
    engine.getMessengerConversations()
  );
  const [selectedConvId, setSelectedConvId] = useState<string>(() => {
    const list = engine.getMessengerConversations();
    return list[0]?.id || 'conv_meridian_sarah';
  });
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState<boolean>(false);
  const [aiSummaryText, setAiSummaryText] = useState<string | null>(null);

  // Modals state
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTestSuiteOpen, setIsTestSuiteOpen] = useState(false);

  // Refresh conversation list & current messages
  const refreshMessengerState = () => {
    const updated = engine.getMessengerConversations(
      activeFilter as any,
      searchQuery
    );
    setConversations(updated);
  };

  useEffect(() => {
    refreshMessengerState();
  }, [activeFilter, searchQuery]);

  const activeConversation =
    conversations.find(c => c.id === selectedConvId) ||
    conversations[0] ||
    engine.getMessengerConversations()[0];

  const currentMessages = activeConversation
    ? engine.getMessengerMessages(activeConversation.id)
    : [];

  const smartReplies = activeConversation
    ? engine.generateMessengerSmartReplies(activeConversation.id)
    : [];

  // Handlers
  const handleSendMessage = (content: string, type: MessageType = 'text', extra?: any) => {
    if (!activeConversation) return;
    engine.sendMessengerMessage({
      conversationId: activeConversation.id,
      senderProfileId: activeProfile.id,
      senderUsername: activeProfile.username,
      senderDisplayName: activeProfile.displayName,
      senderAvatar: activeProfile.avatarUrl,
      senderVerificationBadge: activeProfile.verificationBadge,
      messageType: type,
      content,
      ...extra
    });
    refreshMessengerState();
  };

  const handleReactToMessage = (messageId: string, emoji: string) => {
    engine.reactToMessengerMessage(messageId, activeProfile.id, emoji);
    refreshMessengerState();
  };

  const handleDeleteMessage = (messageId: string) => {
    engine.deleteMessengerMessage(messageId, activeProfile.id);
    refreshMessengerState();
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    engine.editMessengerMessage(messageId, newContent, activeProfile.id);
    refreshMessengerState();
  };

  const handlePinMessage = (messageId: string) => {
    engine.pinMessengerMessage(messageId);
    refreshMessengerState();
  };

  const handleVotePoll = (messageId: string, optionId: string) => {
    engine.voteInMessengerPoll(messageId, optionId, activeProfile.id);
    refreshMessengerState();
  };

  const handleRsvpEvent = (messageId: string, status: 'going' | 'maybe' | 'declined') => {
    engine.rsvpToMessengerEvent(messageId, status, activeProfile.id);
    refreshMessengerState();
  };

  const handleTranscribeVoiceNote = (messageId: string, lang: string) => {
    engine.transcribeAndTranslateVoiceNote(messageId, lang);
    refreshMessengerState();
  };

  const handleUpdateEphemeralTimer = (seconds: number) => {
    if (!activeConversation) return;
    engine.setMessengerEphemeralTimer(activeConversation.id, seconds);
    refreshMessengerState();
  };

  const handleAdvanceCrmStage = (stage: CrmPipelineStage, dealValue?: number) => {
    if (!activeConversation) return;
    engine.advanceMessengerCrmStage(activeConversation.id, stage, dealValue);
    refreshMessengerState();
  };

  const handleSummarizeConversation = () => {
    if (!activeConversation) return;
    const summary = engine.summarizeMessengerConversation(activeConversation.id);
    setAiSummaryText(summary);
  };

  const handleCreateConversation = (
    type: ConversationType,
    title: string,
    memberProfileIds: string[],
    extra?: any
  ) => {
    const newConv = engine.createMessengerConversation(
      type,
      title,
      [activeProfile.id, ...memberProfileIds],
      extra
    );
    setSelectedConvId(newConv.id);
    refreshMessengerState();
  };

  return (
    <div id="omni-messenger-container" className="flex h-[750px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* 1. Left Sidebar: Channels, Contacts, CRM Deals & E2EE Chats */}
      <OmniMessengerSidebar
        conversations={conversations}
        selectedConvId={selectedConvId}
        onSelectConversation={(id) => {
          setSelectedConvId(id);
          setAiSummaryText(null);
        }}
        onOpenNewChatModal={() => setIsNewChatOpen(true)}
        onOpenSettingsModal={() => setIsSettingsOpen(true)}
        onOpenTestSuite={() => setIsTestSuiteOpen(true)}
        activeFilter={activeFilter}
        onChangeFilter={(f) => setActiveFilter(f)}
        searchQuery={searchQuery}
        onSearchQueryChange={(q) => setSearchQuery(q)}
      />

      {/* 2. Center Chat Pane */}
      {activeConversation ? (
        <OmniMessengerChatPane
          conversation={activeConversation}
          messages={currentMessages}
          currentProfileId={activeProfile.id}
          onSendMessage={handleSendMessage}
          onReactToMessage={handleReactToMessage}
          onDeleteMessage={handleDeleteMessage}
          onEditMessage={handleEditMessage}
          onPinMessage={handlePinMessage}
          onVotePoll={handleVotePoll}
          onRsvpEvent={handleRsvpEvent}
          onTranscribeVoiceNote={handleTranscribeVoiceNote}
          onAdvanceCrmStage={handleAdvanceCrmStage}
          onOpenMeeting={onOpenMeeting}
          onToggleInfoDrawer={() => setIsInfoDrawerOpen(!isInfoDrawerOpen)}
          isInfoDrawerOpen={isInfoDrawerOpen}
          smartReplies={smartReplies}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
          Select or start a conversation to begin sovereign messaging.
        </div>
      )}

      {/* 3. Right Details & CRM Drawer */}
      {isInfoDrawerOpen && activeConversation && (
        <OmniMessengerInfoDrawer
          conversation={activeConversation}
          messages={currentMessages}
          onClose={() => setIsInfoDrawerOpen(false)}
          onUpdateEphemeralTimer={handleUpdateEphemeralTimer}
          onAdvanceCrmStage={handleAdvanceCrmStage}
          onSummarizeConversation={handleSummarizeConversation}
          aiSummaryText={aiSummaryText}
        />
      )}

      {/* New Chat Modal */}
      <OmniMessengerNewChatModal
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        onCreateConversation={handleCreateConversation}
      />

      {/* Settings Modal */}
      <OmniMessengerSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        devices={engine.getMessengerDevices(activeProfile.id)}
        settings={engine.getMessengerSettings(activeProfile.id)}
        adminPolicies={engine.getMessengerAdminPolicies()}
        onRevokeDevice={(devId) => {
          engine.revokeMessengerDevice(devId);
          refreshMessengerState();
        }}
        onUpdateSettings={(newSet) => {
          engine.updateMessengerSettings(activeProfile.id, newSet);
          refreshMessengerState();
        }}
        onUpdateAdminPolicies={(newPol) => {
          engine.updateMessengerAdminPolicies(newPol);
          refreshMessengerState();
        }}
      />

      {/* Real-Time Automated Test Suite Modal */}
      <OmniMessengerTestSuiteModal
        isOpen={isTestSuiteOpen}
        onClose={() => setIsTestSuiteOpen(false)}
        onRunTestSuite={async () => {
          return engine.runMessengerTestSuite();
        }}
      />
    </div>
  );
};
