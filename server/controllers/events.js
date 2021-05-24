import express from 'express';
import mongoose from 'mongoose';

import EventMessage from '../models/eventMessage.js';

export const getEvents = async (req, res) => {
    try {
        const eventMessages = await EventMessage.find();

        res.status(200).json(eventMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createEvent = async (req, res) => {
    const event = req.body;

    const newEvent = new EventMessage(event);

    try {
        await newEvent.save();

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateEvent = async (req, res) => {
    const { id: _id } = req.params;
    const event = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedEvent = await EventMessage.findByIdAndUpdate(_id, event, { new: true });

    res.json(updatedEvent);
}

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await EventMessage.findByIdAndRemove(id);

    res.json({ message: 'Event deleted successfully' });
}

export const likeEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const event = await EventMessage.findById(id);

    const upatedEvent = await EventMessage.findByIdAndUpdate(id, { likeCount: event.likeCount + 1 }, { new: true });

    res.json(upatedEvent);
}