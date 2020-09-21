const host = 'lallah.db.elephantsql.com';
const database = 'zeeualcv';
const user = 'zeeualcv';
const password = 'CZo304u8KZxbSX9GqmmsrDZ2clR9LbLt';




// copy from below

const pgp = require('pg-promise')({
    query: function (event) {
        console.log('QUERY:', event.query);
    }
});

const options = {
    host: host,
    database: database,
    user: user,
    password: password,
}

const db = pgp(options);

module.exports = db;