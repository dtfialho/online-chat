'use strict';

const angular = require('angular');

var app = angular.module('chat', []);

import MainController from './controllers/MainController';

app.controller('MainController', MainController);