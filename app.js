import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import activityRoutes from "./routes/activityRoutes.js"

const app = express();
env.config();
const port = process.env.APPLICATION_PORT;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(activityRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
