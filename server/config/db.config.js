const { Sequelize } = require("sequelize");
let sequelize;

if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize("rapid-api-db-test", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
  });
} else {
  sequelize = new Sequelize("rapid-api-db", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
  });
}

const initDb = async (db) => {
  // set up Sequelize to log SQL queries
  try {
    if (process.env.NODE_ENV === "test") {
      db.sync({ force: true }); // Sync models with database
    }
    //db.sync({ force: true }); // Sync models with database
    await db.authenticate();
    console.log("Connected to the database.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }

  db.options.logging = (sql) => {
    console.log(sql);
  };
};

module.exports = {
  db: sequelize,
  initDb,
};
