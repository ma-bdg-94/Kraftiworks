import express from 'express';
const router = express.Router()

// test route
router.get('/test', (req, res) => res.send('auth route: SUCCESS'))

export default router
