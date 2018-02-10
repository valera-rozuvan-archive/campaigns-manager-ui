import React, { Component } from 'react';
import { connect } from 'react-redux';

class CampaignDetails extends Component {
  render() {
    let noDetailsMessage = '';
    let details = '';

    if (!this.props.campaign) {
      noDetailsMessage = <div>No campaign selected.</div>;
    } else {
      details = <div>
        <h4>Details for: {this.props.campaign.name}</h4>
        <div>Budget: {this.props.campaign.budget}</div>
      </div>;
    }

    return (
      <div>
        <button onClick={() => this.props.history.push('/')}>All campaigns</button>
        {noDetailsMessage}
        {details}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.activeCampaign
  };
}

export default connect(mapStateToProps)(CampaignDetails);
