import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import { ChartOptions } from './details-chart-options';

class CampaignDetails extends Component {
  componentDidMount() {
    let chartCanvas = this.refs.chart;

    let myChart = new Chart(chartCanvas, {
      type: 'line',
      data: this.props.data,
      options: ChartOptions
    });

    this.setState({ chart: myChart });
  }

  componentDidUpdate() {
    let chart = this.state.chart;
    let data = this.props.data;

    data.datasets.forEach((dataset, i) => chart.data.datasets[i].data = dataset.data);

    chart.data.labels = data.labels;
    chart.update();
  }

  render() {
    let noDetailsMessage = '';
    let details = '';

    if (!this.props.campaign) {
      noDetailsMessage = <div>No campaign selected.</div>;
    } else {
      details = <div>
        <h4>Details for: {this.props.campaign.name}</h4>
        <div>Budget: {this.props.campaign.total_budget}</div>
      </div>;
    }

    return (
      <div>
        <button onClick={() => this.props.history.push('/')}>All campaigns</button>
        {noDetailsMessage}
        {details}
        <canvas ref={'chart'} width={400} height={300}></canvas>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.activeCampaign,
    data: state.chartData
  };
}

export default connect(mapStateToProps)(CampaignDetails);
