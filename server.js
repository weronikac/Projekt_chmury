const express = require('express');
const neo4j = require('neo4j-driver');

const app = express();
const path = require('path');

const uri = 'neo4j+s://beab01e4.databases.neo4j.io';
const user = 'neo4j';
const password = 'dQd6k30XHDug-wpccajjlobRS5Lj4DQIv33IBa3utFg';

neo4j.driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
  disableLosslessIntegers: true,
});

// const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

neo4j.driver.verifyConnectivity().then((msg) => {
  console.log(msg);
});

app.use(express.json({ extended: false }));

// // Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/post', require('./routes/api/post'));

// ... other app.use middleware
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// ...
// Right before your app.listen(), add this:

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
