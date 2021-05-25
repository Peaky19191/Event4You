import express from 'express';

import { getEvents, getEvent, createEvent, updateEvent, likeEvent, deleteEvent } from '../controllers/events.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getEvents);
router.post('/', auth, createEvent);
router.patch('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);
router.patch('/:id/likeEvent', auth, likeEvent);

export default router;