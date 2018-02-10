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
        <tr key={campaign.id}>
          <td>{campaign.status}</td>
          <td>{campaign.name}</td>
          <td>{campaign.daily_budget}</td>
          <td>{campaign.total_budget}</td>
          <td>
            <button onClick={() => {
              this.props.selectCampaign(campaign);
              this.props.history.push('/details');
            }}>Stats</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="campaign-list">
        <thead>
          <tr>
            <td>Status</td>
            <td>Name</td>
            <td>Daily Budget</td>
            <td>Total Budget</td>
            <td></td>
          </tr>
        </thead>
        <tbody>{this.renderList()}</tbody>
      </table>
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
