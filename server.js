const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const inexPage = fs.readFileSync(path.resolve(__dirname, 'dist', 'index.html'));

app.use(express.static('dist'));

app.get('*', (req, res) => res.set('Content-Type', 'text/html').send(inexPage));

app.listen(PORT, () => {
  console.log(`Server running  http://localhost:${PORT}`);
});
