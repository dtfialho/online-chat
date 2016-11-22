'use strict';

const angular = require('angular');
const ngRoute = require('angular-route');

// App config
import { Config, Run } from './config';

// App Controllers
import MainController from './controllers/MainController';

// App Services
import Socket       from './services/SocketService';
import LocalStorage from './services/LocalStorageService';


var app = angular.module('chat', [ngRoute]);
app.config(Config);
app.run(Run);

app.factory('SocketService', Socket);
app.factory('LocalStorageService', LocalStorage);
app.controller('MainController', MainController);