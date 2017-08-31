# collabo.tv

## Requirements
* node.js
* npm (included in node.js)

## Usage
* `git clone` repo
* `cd` to repo
* `npm install` to fetch dependencies for server side

## Standalone build
* copy `build` directory with generated static files from frontend project to `public` directory
* `npm start` to start standalone server
* access website at [https://localhost:3000](http://localhost:3000)

## Development build (with frontend server)
* start frontend server in `collabo-2.0-frontend` project: `npm start`
* start backend server on port 3001: `PORT=3001 npm start`
* access website at [http://localhost:3000](http://localhost:3000)

Every request from frontend project is proxied to backend server.