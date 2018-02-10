import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chart from 'chart.js';
import { ChartOptions } from './details-chart-options';
import { updateChartDataAction } from '../actions/update_chart_data';

class CampaignDetails extends Component {
  componentWillMount() {
    if (!this.props.campaign) {
      return;
    }

    if (!this.props.data[this.props.campaign.id]) {
      axios.get(`/api/campaigns/${this.props.campaign.id}/stats`)
        .then((response) => {
          this.props.getCampaignData(this.props.campaign.id, response.data);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.error(error.response.data);
          }
          console.error(error);
        });
    }
  }

  componentDidMount() {
    if (!this.props.campaign) {
      return;
    }

    let initialData = {};
    if (this.props.data[this.props.campaign.id]) {
      initialData = this.props.data[this.props.campaign.id];
    }

    let chartCanvas = this.refs.chart;

    let myChart = new Chart(chartCanvas, {
      type: 'line',
      data: initialData,
      options: ChartOptions
    });

    this.setState({ chart: myChart });
  }

  componentDidUpdate() {
    if (!this.props.campaign || !this.props.data[this.props.campaign.id]) {
      return;
    }

    let chart = this.state.chart;
    let data = this.props.data[this.props.campaign.id];

    chart.data = data;

    chart.update();
  }

  render() {
    let noDetailsMessage = '';
    let details = '';
    let campaignChart = '';

    if (!this.props.campaign) {
      noDetailsMessage = <div className="no-campaign-details">No campaign selected.</div>;
    } else {
      details = <div className="campaign-details">
        <h4>Details for: {this.props.campaign.name}</h4>
        <div>Budget: {this.props.campaign.total_budget}</div>
      </div>;
      campaignChart = <canvas className="campaign-chart" ref={'chart'} width="400" height="300"></canvas>;
    }

    return (
      <div>
        <button onClick={() => this.props.history.push('/')}>All campaigns</button>
        {noDetailsMessage}
        {details}
        {campaignChart}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.activeCampaign,
    data: state.campaignData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCampaignData: updateChartDataAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetails);
