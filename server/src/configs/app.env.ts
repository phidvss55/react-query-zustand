export const AppEnv = {
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUsername: process.env.DB_USER,
  dbPassword: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  dbDebug: process.env.DB_DEBUG,

  secret: process.env.JWT_SECRET,
  accessTokenExpired: process.env.ACCESS_TOKEN_EXPIRE,
};
