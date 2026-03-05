import sequelize from "./database";
import "../models/Book";

export async function syncDatabase() {
  await sequelize.sync({ alter: true });
}