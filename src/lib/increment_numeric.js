/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/


'use strict';

module.exports = function incrementNumeric(x, delta) {
    if(!delta) return x;

    // Note 1:
    // 0.3 != 0.1 + 0.2 == 0.30000000000000004
    // but 0.3 == (10 * 0.1 + 10 * 0.2) / 10
    // Attempt to use integer steps to increment
    var scale = 1 / Math.abs(delta);
    if(scale < 1) scale = 1;
    var newX = (
        scale * x +
        scale * delta
    ) / scale;

    // Note 2:
    // now we may also consider rounding to cover few more edge cases
    // e.g. 0.3 * 3 = 0.8999999999999999
    var lenDt = ('' + delta).length;
    var lenX0 = ('' + x).length;
    var lenX1 = ('' + newX).length;

    if(lenX1 >= lenX0 + lenDt) { // likely a rounding error!
        newX = +parseFloat(newX).toPrecision(12);
    }

    return newX;
};
