const express=require('express');
const cors=require('cors');
const app=express();
const port=5000;

app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Second Life Commerce API");
});

app.get("/health", (req, res) => {
  res.json({
    status: "running",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});