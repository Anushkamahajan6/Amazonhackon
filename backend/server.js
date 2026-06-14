require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const returnRoutes = require("./routes/returnRoutes");
const marketplaceRoutes = require("./routes/marketplaceRoutes");
const creditRoutes = require("./routes/creditRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const marketplaceListingRoutes = require("./routes/marketplaceListingRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();
app.use(require("cors")())
app.use(express.json());

app.use("/api/returns", returnRoutes);

app.use("/api/marketplace", marketplaceRoutes);

app.use("/api/credits", creditRoutes);

app.use("/api/admin/analytics", analyticsRoutes);

app.use("/api/recommendations", recommendationRoutes);

app.use("/api/listings", marketplaceListingRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});