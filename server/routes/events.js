import express from 'express';

import { getEvents, createEvent, updateEvent, deleteEvent, likeEvent } from '../controllers/events.js'

const router = express.Router();

router.get('/', getEvents);
router.post('/', createEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.patch('/:id/likeEvent', likeEvent);

export default router;