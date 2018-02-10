import React, { Component } from 'react';
import { connect } from 'react-redux';

class CampaignDetails extends Component {
  render() {
    if (!this.props.campaign) {
      return (
        <div>Click one of the campaigns to see details.</div>
      );
    }
    return (
      <div>
        <h4>Details for: {this.props.campaign.name}</h4>
        <div>Budget: {this.props.campaign.budget}</div>
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
