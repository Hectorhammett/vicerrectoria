var knex = require('knex')({
  client: 'sqlite3',
  debug: true,
  connection: {
    filename: global.sqlite
  }
});

module.exports = require('bookshelf')(knex);
