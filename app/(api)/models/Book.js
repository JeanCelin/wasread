import { DataTypes } from "sequelize";

import sequelize from "../lib/database";
const Book = sequelize.define("Book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM("read", "notRead", "wantRead"),
    allowNull: false,
    defaultValue: "wantRead",
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pages: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  publication_year: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  theme: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Book;
