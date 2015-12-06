import express     from 'express';
import compression from 'compression';

let app = express();

let shouldCompress = function(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
};

app.use(compression({filter: shouldCompress}))
app.use(express.static('dist'));

let server = app.listen(process.env.PORT || 8080, () => {
  console.log('server started');
});
