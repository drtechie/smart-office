/* eslint-disable consistent-return */
const { google } = require('googleapis');
const utils = require('./utils');

const DND_EVENT_NAMES = [
  'DND',
  'Do Not Disturb',
  'Block',
  'block',
  'Do not disturb',
];

const BUSY_EVENT_STATUSES = [
  'needsAction',
  'accepted',
];

const TOKEN_PATH = '../config/token.json';
const CREDENTIALS_PATH = '../config/client_secret.json';

/**
 * Check if any event is present in the next 2 minutes and return an appropriate status
 */
const listEvents = new Promise((resolve, reject) => {
  let status = 'FREE';
  try {
    const token = utils.getFile(TOKEN_PATH);
    const credentials = utils.getFile(CREDENTIALS_PATH);
    const { client_secret, client_id, redirect_uris } = JSON.parse(credentials).web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0],
    );
    oAuth2Client.setCredentials(JSON.parse(token));
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    const timeMin = new Date();
    const timeMax = new Date(timeMin);
    timeMax.setMinutes(timeMin.getMinutes() + 2);
    calendar.events.list({
      calendarId: 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      maxResults: 2,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      const events = res.data.items;
      if (events.length) {
        const eventNames = events.map((event) => event.summary);
        const isDnd = eventNames.some((eventName) => DND_EVENT_NAMES.includes(eventName));
        const isAttending = events.some((event) => {
          const { attendees } = event;
          if (!attendees) {
            return true;
          }
          const self = attendees.find((attendee) => attendee.self === true);
          return BUSY_EVENT_STATUSES.includes(self.responseStatus);
        });
        if (isDnd) {
          status = 'DND';
        } else if (isAttending) {
          status = 'BUSY';
        }
      }
      resolve(status);
    });
  } catch (error) {
    console.error('Error', error);
    reject(error);
  }
});

exports.listEvents = listEvents;
