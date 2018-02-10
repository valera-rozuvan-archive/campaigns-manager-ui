import React, { Component } from 'react';
import CampaignList from '../containers/campaign-list';
import CampaignDetails from '../containers/campaign-details';

export class App extends Component {
  render() {
    return (
      <div>
        <CampaignList />
        <CampaignDetails />
      </div>
    );
  }
}
