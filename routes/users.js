import express from 'express';
const router = express.Router()

// test route
router.get('/test', (req, res) => res.send('users route: SUCCESS'))

export default router