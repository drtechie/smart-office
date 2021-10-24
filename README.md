<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
        <a href="#prerequisites">Prerequisites</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li>
      <a href="#colours">Colours</a>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>


## About The Project

A NodeJS script that can be run periodically to check your calendar and change the colour of a smart bulb to Red-Amber-Green depending on your availability.

<p align="right">(<a href="#top">back to top</a>)</p>


### Prerequisites

1. A [Tuya](https://www.tuya.com/) supported smart bulb.
2. Follow instructions [here](https://github.com/codetheweb/tuyapi/blob/master/docs/SETUP.md) to get the `localKey` for your light.
3. Create a [Google Cloud Project](https://developers.google.com/calendar/api/quickstart/nodejs) with access to Google Calendar API and place the `client_secret.json` in `config/` folder.
  
## Getting Started

1. Install all dependencies
   ```sh
   yarn install
   ```
2. Authorize your Google Project to access your calendar. 
   ```sh
   yarn authorize
   ```
3. Create `device.json` file in `config` folder with id and localKey
   ```json
   {
      "id": "xxxxx",
      "localKey": "yyyyy"
   }
   ```
4. Execute `node index.js` to change the colour of the bulb.
5. Configure a cron job to run the script every 2 minutes (check attached launchd plist).


<p align="right">(<a href="#top">back to top</a>)</p>


## Colours

The following colour changes are supported.

 - 🔴 : DND mode; An event name in calendar contains `DND_EVENT_NAMES` in `calendar.js`
 - 🟠 : Amber; Meeting ongoing.
 - 🟢 : Available. 
 - 🔵 : Error.


<p align="right">(<a href="#top">back to top</a>)</p>


## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


