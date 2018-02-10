import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCampaignAction } from '../actions/select_campaign';
import { bindActionCreators } from 'redux';

class CampaignList extends Component {
  renderList() {
    return this.props.campaignList.map((campaign) => {
      return (
        <li
          key={campaign.id}
          onClick={() => {
            this.props.selectCampaign(campaign);
            this.props.history.push('/details');
          }}
          className="list-group-item">{campaign.name}
        </li>
      );
    });
  }
  render() {
    return (
      <ul className="list-group">
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaignList: state.campaigns
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectCampaign: selectCampaignAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);
