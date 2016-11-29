'use strict';

const angular = require('angular');
const ngRoute = require('angular-route');

// App config
import { Config, Run } from './config';

// App Controllers
import LoginController from './controllers/LoginController';
import ChatController  from './controllers/ChatController';

// App Services
import Socket from './services/SocketService';

var app = angular.module('chat', [ngRoute]);

app.config(Config);
app.run(Run);

app.factory('SocketService', Socket);
app.controller('LoginController', LoginController);
app.controller('ChatController', ChatController);