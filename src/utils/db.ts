import pgPromise from 'pg-promise';
import env from '@/config/env.js';

const dbURL = env.DB_URL || '';

const pgp = pgPromise();
const db = pgp({
  connectionString: dbURL,
});

db.one('SELECT 1')
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

export default db;
