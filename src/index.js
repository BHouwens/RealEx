'use strict';

require('./index.html');

var Elm = require('./main.elm'),
    mountNode = document.getElementById('main');
    
var app = Elm.embed(Elm.main, mountNode);