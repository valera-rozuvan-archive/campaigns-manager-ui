import { combineReducers } from 'redux';
import { CampaignReducer } from './campaign';
import { ActiveCampaignReducer } from './active_campaign';

const rootReducer = combineReducers({
  campaigns: CampaignReducer,
  activeCampaign: ActiveCampaignReducer
});

export { rootReducer };
