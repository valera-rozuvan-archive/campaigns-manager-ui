export function CampaignReducer(state = null, action) {
  if (state === null) {
    return [];
  }

  switch (action.type) {
    case 'UPDATE_ALL_CAMPAIGNS':
      return action.payload;
  }

  return state;
}
