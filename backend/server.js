const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Server is running on http://localhost:${PORT}`);
});
