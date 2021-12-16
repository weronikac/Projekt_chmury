const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const neo4j = require('neo4j-driver');

// @route  POST api/users
// @desc   Register user

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, bio } = req.body;

    try {
      session = neo4j.driver.session();
      const user = await session.run(
        `MATCH (p:Person WHERE p.email = \'${email}\') RETURN COUNT(p) as count`,
        { email }
      );
      console.log(user);
      if (user.records[0].get('count') != 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      // if (!bio) bio = ' ';
      // if (!location) location = ' ';

      const salt = await bcrypt.genSalt(10);
      const cryptpassword = await bcrypt.hash(password, salt);

      // save to DB
      let save = await session.run(
        `CREATE (p:Person {name: $name, email: $email, password: $cryptpassword, avatar: $avatar, bio: $bio }) RETURN id(p) as id`,
        { name, email, cryptpassword, avatar, bio }
      );

      const payload = {
        user: {
          id: save.records[0].get('id'),
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '24h' },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// router.post('/update', auth, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { name, email, avatar, password, bio, specialization, location } =
//     req.body;

//   //build profile object
//   const userFields = {};
//   if (avatar) userFields.avatar = avatar;
//   if (specialization) userFields.specialization = specialization;
//   if (location) userFields.location = location;
//   if (bio) userFields.bio = bio;

//   try {
//     let updatedUser = await User.findById(req.user.id);
//     if (updatedUser) {
//       //update
//       updatedUser = await User.findByIdAndUpdate(
//         req.user.id,
//         { $set: userFields },
//         { new: true }
//       );
//       return res.json(updatedUser);
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// router.get('/block/:id', async (req, res) => {
//   try {
//     //update
//     updatedUser = await User.findByIdAndUpdate(
//       { _id: req.params.id },
//       { $set: { isBlocked: true } },
//       { new: true }
//     );
//     return res.json('updatedUser');
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// router.get('/unblock/:id', async (req, res) => {
//   try {
//     updatedUser = await User.findByIdAndUpdate(
//       { _id: req.params.id },
//       { $set: { isBlocked: false } },
//       { new: true }
//     );
//     return res.json('updatedUser');
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// router.post(
//   '/sendMessage/',
//   [auth, [check('content', 'Content is required').not().isEmpty()]],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { content } = req.body;
//     const messageFields = {};
//     if (content) messageFields.content = content;

//     try {
//       let us = await User.findById(req.user.id);
//       let admin = await User.findOne({ name: 'admin' });
//       messageFields.name = us.name;
//       messageFields.avatar = us.avatar;
//       if (us) {
//         var array = [];
//         array.push(messageFields);
//         for (let mes of admin.messages) {
//           array.push(mes);
//         }
//         user2 = await User.findOneAndUpdate(
//           { name: 'admin' },
//           { $set: { messages: array } },
//           { new: true }
//         );
//         return res.json(user2);
//       }
//       res.json(user);
//     } catch (err) {
//       console.error(err.message);
//       if (err.kind == 'ObjectId') {
//         return res.status(400).json({ msg: 'Profile not found' });
//       }
//       res.status(500).send('Server error');
//     }
//   }
// );

// router.delete('/deleteMessage/:message', auth, async (req, res) => {
//   try {
//     let admin = await User.findOne({ name: 'admin' });
//     if (admin) {
//       var array = [];
//       let afterDelete = admin.messages.filter(
//         (a) => a._id != req.params.message
//       );
//       // array.push(commentFields);
//       for (let mes of afterDelete) {
//         array.push(mes);
//       }
//       user2 = await User.findOneAndUpdate(
//         { name: 'admin' },
//         { $set: { messages: array } },
//         { new: true }
//       );
//       return res.json('user2');
//     }
//     res.json('admin');
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind == 'ObjectId') {
//       return res.status(400).json({ msg: 'User not found' });
//     }
//     res.status(500).send('Server error');
//   }
// });

module.exports = router;
