const calendar = require('./src/calendar');
const device = require('./src/device');

(async () => {
  try {
    const status = await calendar.listEvents
    console.log(`[${ (new Date()).toISOString() }] Current status: `, status);
    await device.changeColour(status)
  } catch (error) {
    console.log(`[${ (new Date()).toISOString() }] Error: `, error.message);
    await device.changeColour('UNKNOWN')
  }
})();
