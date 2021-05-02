# flash

This application is an automated transitioning presentation
of data around various topics:

- Solar System
- Need for Speed video games franchise

## Data sources

At the moment data was collected manually for the demo purposes. It is possible to connect it to an API server.

## Requirements

- React.js

See package.json in root and client folders.

## Installation

Run the following command to install all dependencies:

```
yarn install-all
```

To create a clean environment:

```
yarn clean && yarn install-all
```

It will prune all installed dependencies and fetch the required ones again.
It may help if the environment becomes unstable because of outdated packages.

## Testing

To run all tests once:

```
yarn test
```

## Running the app

```
yarn dev
```
