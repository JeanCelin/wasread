import { Sequelize } from "sequelize";

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (!DB_NAME || !DB_USERNAME || !DB_PASSWORD) {
  throw new Error("Variáveis de ambiente não setadas");
}

const connectDB = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  logging: false, // evita poluição no console
});

 connectDB.sync({ alter: true });

export default connectDB;