module.exports = {
  "type": process.env.type,
  "host": process.env.host,
  "port": process.env.port,
  "username": process.env.username,
  "password": process.env.password,
  "database": process.env.database,
  "entities": ["dist/**/*.entity{ .ts,.js}"],
  "synchronize": true
}
