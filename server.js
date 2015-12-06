var express     = require('express'),
    compression = require('compression');

var app = express();

var shouldCompress = function(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
};

app.use(compression({filter: shouldCompress}))
app.use(express.static('dist'));

var server = app.listen(process.env.PORT || 8080, function() {
  console.log('server started');
});
