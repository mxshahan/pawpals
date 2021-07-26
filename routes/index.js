// const path = require("path");
const router = require("express").Router();

const animalRoutes = require('./animalRoutes');
const authRoutes = require('./authRoutes');
const newsRoutes = require('./newsRoutes');
const userRoutes = require('./usersRoutes');

// API Routes
// router.use("/api", apiRoutes);
router.use('/api', animalRoutes);
router.use('/auth', authRoutes);
router.use('/api', newsRoutes);
router.use('/api', userRoutes);

// If no API routes are hit, send the React app 
// to-do: move all routes here or leave some in server??
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;
