require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const detailsRoute = require("./project/routes/DetailsRoute");
const placeRoute = require("./project/routes/PlaceRoute");
const categoryRoute = require("./project/routes/categoryRoute");
const blogRoute = require("./project/routes/BlogRoutes");

const app = express();

app.use(express.json());

// ✅ Updated CORS configuration (No CORS error)
app.use(cors({
  origin: "*",  // Or specify your frontend URL
  credentials: true,
}));

// PostgreSQL connection pool setup
const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DATABASE || "Travelnepal",
  password: process.env.PG_PASSWORD || "adminbibek",
  port: process.env.PG_PORT || 5432,

});

const sequelize = require('./project/config/db');
const Blog = require('./project/models/BlogModel');
const Category = require('./project/models/CategoryModel');
const Details = require('./project/models/DetailsModel');
const Place = require('./project/models/PlaceModel');

sequelize.sync({ force: true }) // This will drop existing tables and recreate them (useful during development)
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => console.log('Error syncing with database:', err));

  
// Routes
app.use("/api/categories", categoryRoute(pool));
app.use("/api/place", placeRoute(pool));
app.use("/api/details", detailsRoute(pool));
app.use("/api/blog", blogRoute(pool));

// Static files for uploaded images
app.use("/uploads", express.static("uploads"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
