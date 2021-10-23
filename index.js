const calendar = require('./src/calendar');
const device = require('./src/device');

(async () => {
  try {
    const status = await calendar.listEvents
    console.log('Current status: ', status);
    await device.changeColour(status)
  } catch (error) {
    console.error('there was an error');
    await device.changeColour('UNKNOWN')
  }
})();
