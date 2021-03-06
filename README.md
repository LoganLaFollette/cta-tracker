# CTATracker Basic Setup

>**Prerequisites:**
>Angular CLI: 9.0.7 (https://cli.angular.io/)
>Node: 12.16.1 (https://nodejs.org/en/download/)

1) Create a new project folder e.g cta-tracker
2) Pull down the repo: ```git clone https://github.com/LoganLaFollette/cta-tracker.git```
3) Install the required node modules: ```npm install```
4) Start up the express cta api server: ```node train-api.js``` this starts an express server that constantly serves API data to localhost:3000/trains
5) Start up the angular application: ```ng serve```
6) Head to localhost:4200 and view train data!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
