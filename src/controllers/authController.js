const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email })) 
      return res.status(400).send({ error: 'Já existe um usuário cadastrado para esse email'})

    const user = await User.create(req.body);

    user.password = undefined;

    res.send({ user });
  } catch (err) {
      return res.status(400).send({ error: 'Falha ao cadastrar usuário' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email}).select('+password');

  if (!user)
    return res.status(400).send({ error: 'Usuário não encontrado' });

  if (! await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Senha inválida encontrado' });
  
  user.password = undefined;

  res.send({ user });
});

module.exports = app => app.use('/auth', router)