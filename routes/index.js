const router = require("express").Router();

const animalRoutes = require('./animalRoutes');
const authRoutes = require('./authRoutes');
const newsRoutes = require('./newsRoutes');
const userRoutes = require('./usersRoutes');

// API Routes
router.use('/api', animalRoutes);
router.use('/auth', authRoutes);
router.use('/api', newsRoutes);
router.use('/api', userRoutes);

module.exports = router;
