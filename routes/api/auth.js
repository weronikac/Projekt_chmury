const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const neo4j = require('neo4j-driver');

// @route  GET api/auth
// @desc   Test route

router.get('/me', auth, async (req, res) => {
  try {
    session = neo4j.driver.session();
    const user = await session.run(
      `MATCH (p:Person WHERE id(p) = ${req.user.id}) RETURN p, id(p) `
    );

    const result = user.records[0].get('p');
    result.properties._id = user.records[0].get('id(p)');

    res.json(result.properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:name', async (req, res) => {
  try {
    session = neo4j.driver.session();
    const user = await session.run(
      `MATCH (p:Person WHERE p.name = \'${req.params.name}\') RETURN p `
    );

    const result = user.records[0].get('p');

    res.json(result.properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route  POST api/auth
// @desc   Authenticate user and get token

router.post(
  '/',
  [
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      session = neo4j.driver.session();
      const user = await session.run(
        `MATCH (p:Person WHERE p.email = \'${email}\') RETURN COUNT(p) as count, p.password as password, id(p) as id`,
        { email }
      );
      console.log(user.records[0].get('count'));
      if (user.records[0].get('count') == 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User doesn't exist" }] });
      }

      const isMatch = await bcrypt.compare(
        password,
        user.records[0].get('password')
      );

      console.log(isMatch);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        user: {
          id: user.records[0].get('id'),
        },
      };

      console.log(payload);

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '24h' },
        (err, token) => {
          if (err) throw err;
          console.log(token);
          res.json(token);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
