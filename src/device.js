const TuyAPI = require('tuyapi');
const utils = require('./utils');

const COLOURS = {
  FREE: '007703e801f6',
  BUSY: '002d03e801f6',
  DND: '000203e801f6',
  UNKNOWN: '00cb03e801f6',
};

const changeColour = async (colour) => {
  const deviceDetails = JSON.parse(utils.getFile('../config/device.json'));
  const device = new TuyAPI({
    id: deviceDetails.id,
    key: deviceDetails.localKey,
    issueGetOnConnect: false,
  });

  const nextColour = COLOURS[colour];

  await device.find();

  await device.connect();

  await device.set({
    multiple: true,
    data: {
      21: 'colour',
      24: nextColour,
    },
  });

  await device.disconnect();
};

exports.changeColour = changeColour;
