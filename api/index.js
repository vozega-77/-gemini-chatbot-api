import express from "express";
import cors from "cors";
import gemini from "./GemiBot.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ status: "berhasil" });
});

app.post("/gemini", async (req, res) => {
  const { prompt } = req.body;
  //console.log(prompt)
  try {
    return res.status(200).json({
      text: await gemini(prompt),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unusually high traffics",
      error: err,
    });
    console.log(err)
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});

export default app;
