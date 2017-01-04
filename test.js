'use strict';

var viewer = require('./index');

var str = `Is this This?`;
var regex = /is/gi;

viewer(str, regex)