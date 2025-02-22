import axios from "axios";
const API_URL = process.env.API_URL

export const getRandomActivity = async (req, res) => {
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
}

export const postActivity = async (req, res) => {
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
}