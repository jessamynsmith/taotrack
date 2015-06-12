taotrack
==============

[![Build Status](https://circleci.com/gh/jessamynsmith/taotrack.svg?style=shield)](https://circleci.com/gh/jessamynsmith/taotrack)
[![Coverage Status](https://coveralls.io/repos/jessamynsmith/taotrack/badge.svg?branch=master)](https://coveralls.io/r/jessamynsmith/taotrack?branch=master)

Open-source web/mobile app to provide personalized recommendations based on Taoist philosophy.
Check out the live app: https://taotrack.herokuapp.com/


Development
-----------

    ionic platform add ios android

    node server.js
    ionic run android

    ./create_apks.sh

Heroku
------

    heroku addons:create newrelic:wayne
    heroku addons:create papertrail:chokla

    heroku config:set NODE_ENV=production
