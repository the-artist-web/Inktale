'use strict';

const AVG_READ_WPM = 200;
const getReadingTime = (text) => Math.ceil(text.split(" ").length / AVG_READ_WPM);

module.exports = getReadingTime;