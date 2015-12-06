import express from 'express';

let app = express();

app.use(express.static('dist'));

let server = app.listen(process.env.PORT || 8080, () => {
  console.log('server started');
});
