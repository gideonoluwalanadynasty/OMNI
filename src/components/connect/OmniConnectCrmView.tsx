import React from 'react';
import { ConnectContact, ConnectCrmDeal, ConnectProfile } from '../../types/omni_connect';
import { OmniCrmRoot, CrmSubTab } from './crm/OmniCrmRoot';
import { SEED_CONNECT_PROFILES } from '../../data/omni_connect_seed';

interface Props {
  contacts?: ConnectContact[];
  deals?: ConnectCrmDeal[];
  onUpdateDealStage?: (dealId: string, stage: any) => void;
  activeProfile?: ConnectProfile;
  initialSubTab?: CrmSubTab;
}

export const OmniConnectCrmView: React.FC<Props> = ({
  activeProfile = SEED_CONNECT_PROFILES[0],
  initialSubTab = 'crm_pipeline'
}) => {
  return (
    <div id="omni-connect-crm-wrapper" className="space-y-6">
      <OmniCrmRoot
        activeProfile={activeProfile}
        initialSubTab={initialSubTab}
      />
    </div>
  );
};
