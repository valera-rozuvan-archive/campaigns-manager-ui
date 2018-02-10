import React, { Component } from 'react';
import { render } from 'react-dom';

import { Advertiser } from './advertiser';
import { CampaignList } from './campaign-list';

class App extends Component {
  render() {
    return (
      <div>
        <Advertiser></Advertiser>
        <CampaignList></CampaignList>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));

console.log('All is OK.');
