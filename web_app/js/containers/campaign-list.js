import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCampaignAction } from '../actions/select_campaign';
import { updateAllCampaignsAction } from '../actions/update_all_compaigns';
import { bindActionCreators } from 'redux';

class CampaignList extends Component {
  componentWillMount() {
    if (!this.props.campaignList || this.props.campaignList.length === 0) {
      axios.get('/api/campaigns')
        .then((response) => {
          this.props.getCampaigns(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.error(error.response.data);
          }
          console.error(error);
        });
    }
  }

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
  return bindActionCreators({
    selectCampaign: selectCampaignAction,
    getCampaigns: updateAllCampaignsAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);
