const express = require('express');
const router = express.Router();
const Player = require('../models/playerModel');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  const { name, number, position } = req.body;
  try {
    const player = await Player.create({ name, number, position });
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  const players = await Player.find();
  res.status(200).json(players);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Player does not exist.' });
  }
  const player = await Player.findById(id);
  if (!player) {
    return res.status(404).json({ error: 'Player does not exist.' });
  }
  res.status(200).json(player);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Player does not exist.' });
  }
  const player = await Player.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!player) {
    return res.status(404).json({ error: 'Player does not exist.' });
  }
  res.status(200).json(player);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Player does not exist.' });
  }
  const player = await Player.findOneAndDelete({ _id: id });
  if (!player) {
    return res.status(404).json({ error: 'Player does not exist.' });
  }
  res.status(200).json(player);
});

module.exports = router;