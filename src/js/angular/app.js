'use strict';

const angular = require('angular');
const ngRoute = require('angular-route');

import MainController  from './controllers/MainController';
import { Config, Run } from './config';

var app = angular.module('chat', [ngRoute]);
app.config(Config);
app.run(Run);

app.controller('MainController', MainController);