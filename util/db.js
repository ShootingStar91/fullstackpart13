const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");
const sequelize = new Sequelize(DATABASE_URL);
const { Umzug, SequelizeStorage } = require("umzug");

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console
  });

  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((migration) => migration.name)
  })

};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations()
    console.log("database connected");
  } catch (err) {
    console.log("connecting database failed", {err});
    return process.exit(1);
  }

  return null;
};


module.exports = { connectToDatabase, sequelize };
