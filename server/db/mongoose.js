const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test@ds137261.mlab.com:37261/projekatpraksa');

module.exports = {mongoose};
