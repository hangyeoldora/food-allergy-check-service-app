require('dotenv').config();

const env = process.env;
const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  port: '3306'
};

const test = {
  username: env.TEST_USERNAME,
  password: env.TEST_PASSWORD,
  database: env.TEST_DATABASE,
  host: env.TEST_HOST,
}

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  port: '3306'
}

module.exports = {development, test, production};