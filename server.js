const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/dist'));
app.get('/*', (req, res) => {
  const contents = fs.readFileSync(
    path.resolve(__dirname, './dist', 'index.html'),
    'utf8'
  );
  res.send(contents);
});

app.listen(process.env.PORT || 8080);
