import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import env from "dotenv";

const app = express();
env.config();
const port = process.env.APPLICATION_PORT;
const API_URL = process.env.API_URL

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// We have to make sure that when a user visits the home page,
//   it shows a random activity.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/random`);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  let activityType = req.body.type;
  let noOfparticipants = req.body.participants;
  try {
    const response = await axios.get(
      `${API_URL}/filter?type=${activityType}&participants=${noOfparticipants}`
    );
    const result =
      response.data[Math.round(Math.random() * response.data.length)];
    console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error(error.message);
    res.render("index.ejs", {
      error: error.message || "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
