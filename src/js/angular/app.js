'use strict';

const angular = require('angular');

let app = angular.module('chat', []);

import MainController from './controllers/MainController';

app.controller('MainController', MainController);