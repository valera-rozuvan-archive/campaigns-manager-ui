const fs = require('fs');

const Router = {};

const projRoot = __dirname + '/..';

Router.index = (request, response) => {
  response.sendFile('index.html', { root: projRoot + '/web_app' });
};

Router.error = (request, response) => {
  throw new Error('Oops!');
};

Router.notFound = (request, response) => {
  response.sendFile('not_found.html', { root: projRoot + '/web_app' });
};

Router.campaigns = (request, response) => {
  fs.readFile(__dirname + '/data/campaigns.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    response.json(JSON.parse(data));
  });
};

Router.campaignData = (request, response) => {
  console.log(`request.url = ${request.url}`);
  console.log(`campaignData: campaignId = ${request.params.campaignId}`);

  fs.readFile(__dirname + `/data/${request.params.campaignId}/data.json`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    response.json(JSON.parse(data));
  });
};

Router.unknownApiError = (request, response) => {
  response.status(404);
  response.send('The API does not contain a "' + request.url + '" route.');
};

module.exports = Router;
