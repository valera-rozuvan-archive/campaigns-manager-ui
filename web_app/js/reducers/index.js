import { combineReducers } from 'redux';
import { CampaignReducer } from './campaign';
import { ActiveCampaignReducer } from './active_campaign';
import { ChartDataReducer } from './chart_data';

const rootReducer = combineReducers({
  campaigns: CampaignReducer,
  activeCampaign: ActiveCampaignReducer,
  chartData: ChartDataReducer
});

export { rootReducer };
