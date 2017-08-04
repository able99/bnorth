/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';

let fs = require('fs-extra');
let path = require('path');

let appPath = process.cwd();
let name = process.argv[2];

fs.copySync(path.join(appPath,'www'),path.join(appPath,"release/h5"));
