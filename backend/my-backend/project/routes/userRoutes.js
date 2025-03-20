const express = require('express');
const users = require('../project/MOCK_DATA.json');

const router = express.Router();

router.get('/users', (req, res) => {
  return res.json(users);
});

router.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json(user);
});

router.post('/api/users', (req, res) => {
  return res.json({ status: 'pending' });
});

router.patch('/api/users/:id', (req, res) => {
  return res.json({ status: 'pending' });
});

router.delete('/api/users/:id', (req, res) => {
  return res.json({ status: 'deleted' });
});

module.exports = router;
