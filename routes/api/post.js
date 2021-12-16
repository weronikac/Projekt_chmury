const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const neo4j = require('neo4j-driver');

// create post
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('content', 'Content is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, category } = req.body;

    try {
      session = neo4j.driver.session();
      const date = neo4j.types.DateTime.fromStandardDate(new Date());

      let save = await session.run(
        `MATCH (p:Person WHERE id(p) = ${req.user.id}) CREATE (p)-[:POSTED]->(po:Post { title: $title, content: $content, category: $category, date: $date }) `,
        { title, content, category, date }
      );

      res.json(save);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// add comment
router.post(
  '/:id/',
  [auth, [check('content', 'Content is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content } = req.body;

    try {
      const session = neo4j.driver.session();
      const date = neo4j.types.DateTime.fromStandardDate(new Date());
      const post = await session.run(
        `MATCH (p:Person), (po:Post) WHERE id(p) = ${req.user.id} AND id(po) = ${req.params.id} CREATE (p)-[:COMMENTED {date: $date, content: $content}]->(po)`,
        { date, content }
      );
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// like post
router.get('/likes/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const session = neo4j.driver.session();
    const date = neo4j.types.DateTime.fromStandardDate(new Date());
    console.log(req.params.id);
    const post = await session.run(
      `MATCH (p:Person), (po:Post) WHERE id(p) = ${req.user.id} AND id(po) = ${req.params.id} CREATE (p)-[:LIKED]->(po)`
    );
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/dislikes/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const session = neo4j.driver.session();
    console.log('gg');
    const post = await session.run(
      `MATCH (po:Post) where id(po) = ${req.params.id}  OPTIONAL MATCH (po:Post)<-[like:LIKED]-(pl:Person) where id(pl) = ${req.user.id} DETACH DELETE like`
    );
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
  try {
    const session = neo4j.driver.session();
    const posts = await session.run(
      `MATCH (p:Person)-[ps:POSTED]->(po:Post) OPTIONAL MATCH (po:Post)<-[com:COMMENTED]-(pc:Person)  CALL {with po MATCH (po)<-[like:LIKED]-(pl:Person) RETURN COUNT(like) as likes} RETURN  id(p), p.name, p.avatar, po, id(po), collect({com:com.content,name: pc.name, avatar: pc.avatar}) as comments, likes, EXISTS((p)-[:LIKED]->(po)) as mylike ORDER BY po.date DESC`
    );
    let result = [];
    for (i in posts.records) {
      const post = {};
      const user = {};
      user._id = posts.records[i]._fields[0];
      user.name = posts.records[i]._fields[1];
      user.avatar = posts.records[i]._fields[2];
      post.user = user;
      post._id = posts.records[i]._fields[4];
      post.title = posts.records[i]._fields[3].properties.title;
      post.content = posts.records[i]._fields[3].properties.content;
      post.number_of_likes = posts.records[i]._fields[6];
      post.mylike = posts.records[i]._fields[7];
      post.category = posts.records[i]._fields[3].properties.category;
      let comments = [];
      if (posts.records[i]._fields[5][0].name != null)
        for (j in posts.records[i]._fields[5]) {
          const comment = {};
          comment.content = posts.records[i]._fields[5][j].com;
          comment.name = posts.records[i]._fields[5][j].name;
          comment.avatar = posts.records[i]._fields[5][j].avatar;
          comments.push(comment);
        }
      post.comments = comments;

      result.push(post);
    }
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/by_likes', async (req, res) => {
  try {
    const session = neo4j.driver.session();
    const posts = await session.run(
      `MATCH (p:Person)-[ps:POSTED]->(po:Post) OPTIONAL MATCH (po:Post)<-[com:COMMENTED]-(pc:Person)  CALL {with po MATCH (po)<-[like:LIKED]-(pl:Person) RETURN COUNT(like) as likes} RETURN  id(p), p.name, p.avatar, po, id(po), collect({com:com.content,id: id(com),name: pc.name, avatar: pc.avatar}) as comments, likes, EXISTS((p)-[:LIKED]->(po)) as mylike ORDER BY likes DESC`
    );
    let result = [];
    for (i in posts.records) {
      const post = {};
      const user = {};
      user._id = posts.records[i]._fields[0];
      user.name = posts.records[i]._fields[1];
      user.avatar = posts.records[i]._fields[2];
      post.user = user;
      post._id = posts.records[i]._fields[4];
      post.title = posts.records[i]._fields[3].properties.title;
      post.content = posts.records[i]._fields[3].properties.content;
      post.number_of_likes = posts.records[i]._fields[6];
      post.mylike = posts.records[i]._fields[7];
      post.category = posts.records[i]._fields[3].properties.category;
      let comments = [];
      if (posts.records[i]._fields[5][0].name != null)
        for (j in posts.records[i]._fields[5]) {
          const comment = {};
          comment._id = posts.records[i]._fields[5][j].id;
          comment.content = posts.records[i]._fields[5][j].com;
          comment.name = posts.records[i]._fields[5][j].name;
          comment.avatar = posts.records[i]._fields[5][j].avatar;
          comments.push(comment);
        }
      post.comments = comments;

      result.push(post);
    }
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/by_comments', async (req, res) => {
  try {
    const session = neo4j.driver.session();
    const posts = await session.run(
      `MATCH (p:Person)-[ps:POSTED]->(po:Post) OPTIONAL MATCH (po:Post)<-[com:COMMENTED]-(pc:Person)  CALL {with po MATCH (po)<-[like:LIKED]-(pl:Person) RETURN COUNT(like) as likes} RETURN  id(p), p.name, p.avatar, po, id(po), collect({com:com.content,name: pc.name, avatar: pc.avatar}) as comments, likes, EXISTS((p)-[:LIKED]->(po)) as mylike ORDER BY comments`
    );
    let result = [];
    for (i in posts.records) {
      const post = {};
      const user = {};
      user._id = posts.records[i]._fields[0];
      user.name = posts.records[i]._fields[1];
      user.avatar = posts.records[i]._fields[2];
      post.user = user;
      post._id = posts.records[i]._fields[4];
      post.title = posts.records[i]._fields[3].properties.title;
      post.content = posts.records[i]._fields[3].properties.content;
      post.number_of_likes = posts.records[i]._fields[6];
      post.mylike = posts.records[i]._fields[7];
      post.category = posts.records[i]._fields[3].properties.category;
      let comments = [];
      if (posts.records[i]._fields[5][0].name != null)
        for (j in posts.records[i]._fields[5]) {
          const comment = {};
          comment.content = posts.records[i]._fields[5][j].com;
          comment.name = posts.records[i]._fields[5][j].name;
          comment.avatar = posts.records[i]._fields[5][j].avatar;
          comments.push(comment);
        }
      post.comments = comments;

      result.push(post);
    }
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/category/date/:cat', async (req, res) => {
  try {
    const session = neo4j.driver.session();
    const posts = await session.run(
      `MATCH (p:Person)-[ps:POSTED]->(po:Post) WHERE po.category = \'${req.params.cat}\'  OPTIONAL MATCH (po:Post)<-[com:COMMENTED]-(pc:Person) CALL {with po MATCH (po)<-[like:LIKED]-(pl:Person) RETURN COUNT(like) as likes} RETURN  id(p), p.name, p.avatar, po, id(po), collect({com:com.content,name: pc.name, avatar: pc.avatar}) as comments, likes, EXISTS((p)-[:LIKED]->(po)) as mylike ORDER BY po.date DESC`
    );
    let result = [];
    for (i in posts.records) {
      const post = {};
      const user = {};
      user._id = posts.records[i]._fields[0];
      user.name = posts.records[i]._fields[1];
      user.avatar = posts.records[i]._fields[2];
      post.user = user;
      post._id = posts.records[i]._fields[4];
      post.title = posts.records[i]._fields[3].properties.title;
      post.content = posts.records[i]._fields[3].properties.content;
      post.number_of_likes = posts.records[i]._fields[6];
      post.mylike = posts.records[i]._fields[7];
      post.category = posts.records[i]._fields[3].properties.category;
      let comments = [];
      if (posts.records[i]._fields[5][0].name != null)
        for (j in posts.records[i]._fields[5]) {
          const comment = {};
          comment.content = posts.records[i]._fields[5][j].com;
          comment.name = posts.records[i]._fields[5][j].name;
          comment.avatar = posts.records[i]._fields[5][j].avatar;
          comments.push(comment);
        }
      post.comments = comments;

      result.push(post);
    }
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/category/likes/:cat', async (req, res) => {
  try {
    const session = neo4j.driver.session();
    const posts = await session.run(
      `MATCH (p:Person)-[ps:POSTED]->(po:Post) WHERE po.category = \'${req.params.cat}\'  OPTIONAL MATCH (po:Post)<-[com:COMMENTED]-(pc:Person) CALL {with po MATCH (po)<-[like:LIKED]-(pl:Person) RETURN COUNT(like) as likes} RETURN  id(p), p.name, p.avatar, po, id(po), collect({com:com.content,name: pc.name, avatar: pc.avatar}) as comments, likes, EXISTS((p)-[:LIKED]->(po)) as mylike ORDER BY likes DESC`
    );
    let result = [];
    for (i in posts.records) {
      const post = {};
      const user = {};
      user._id = posts.records[i]._fields[0];
      user.name = posts.records[i]._fields[1];
      user.avatar = posts.records[i]._fields[2];
      post.user = user;
      post._id = posts.records[i]._fields[4];
      post.title = posts.records[i]._fields[3].properties.title;
      post.content = posts.records[i]._fields[3].properties.content;
      post.number_of_likes = posts.records[i]._fields[6];
      post.mylike = posts.records[i]._fields[7];
      post.category = posts.records[i]._fields[3].properties.category;
      let comments = [];
      if (posts.records[i]._fields[5][0].name != null)
        for (j in posts.records[i]._fields[5]) {
          const comment = {};
          comment.content = posts.records[i]._fields[5][j].com;
          comment.name = posts.records[i]._fields[5][j].name;
          comment.avatar = posts.records[i]._fields[5][j].avatar;
          comments.push(comment);
        }
      post.comments = comments;

      result.push(post);
    }
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/category/comments/:cat', async (req, res) => {
  try {
    const session = neo4j.driver.session();
    const posts = await session.run(
      `MATCH (p:Person)-[ps:POSTED]->(po:Post) WHERE po.category = \'${req.params.cat}\'  OPTIONAL MATCH (po:Post)<-[com:COMMENTED]-(pc:Person) CALL {with po MATCH (po)<-[like:LIKED]-(pl:Person) RETURN COUNT(like) as likes} RETURN  id(p), p.name, p.avatar, po, id(po), collect({com:com.content,name: pc.name, avatar: pc.avatar}) as comments, likes, EXISTS((p)-[:LIKED]->(po)) as mylike ORDER BY comments`
    );
    let result = [];
    for (i in posts.records) {
      const post = {};
      const user = {};
      user._id = posts.records[i]._fields[0];
      user.name = posts.records[i]._fields[1];
      user.avatar = posts.records[i]._fields[2];
      post.user = user;
      post._id = posts.records[i]._fields[4];
      post.title = posts.records[i]._fields[3].properties.title;
      post.content = posts.records[i]._fields[3].properties.content;
      post.number_of_likes = posts.records[i]._fields[6];
      post.mylike = posts.records[i]._fields[7];
      post.category = posts.records[i]._fields[3].properties.category;
      let comments = [];
      if (posts.records[i]._fields[5][0].name != null)
        for (j in posts.records[i]._fields[5]) {
          const comment = {};
          comment.content = posts.records[i]._fields[5][j].com;
          comment.name = posts.records[i]._fields[5][j].name;
          comment.avatar = posts.records[i]._fields[5][j].avatar;
          comments.push(comment);
        }
      post.comments = comments;

      result.push(post);
    }
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/deleteComment/:id/:comment', auth, async (req, res) => {
  try {
    const session = neo4j.driver.session();
    console.log(req.params.id, req.params.comment);
    const result = await session.run(
      `MATCH (po:Post) where id(po) = ${req.params.id} OPTIONAL MATCH (po:Post)<-[com:COMMENTED]-(pc:Person) WHERE id(com) = ${req.params.comment} DETACH DELETE com`
    );
    res.json('delete');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id/', auth, async (req, res) => {
  const session = neo4j.driver.session();
  try {
    const result = await session.run(
      `MATCH (po:Post) where id(po) = ${req.params.id} DETACH DELETE po`
    );
    res.json('delete');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const session = neo4j.driver.session();
    const posts = await session.run(
      `MATCH (p:Person)-[ps:POSTED]->(po:Post) WHERE id(po) = ${req.params.id}  OPTIONAL MATCH (po:Post)<-[com:COMMENTED]-(pc:Person) CALL {with po MATCH (po)<-[like:LIKED]-(pl:Person) RETURN COUNT(like) as likes} RETURN  id(p), p.name, p.avatar, po, id(po), collect({com:com.content, id: id(com),name: pc.name, avatar: pc.avatar}) as comments, likes, EXISTS((p)-[:LIKED]->(po)) as mylike ORDER BY po.date DESC`
    );

    const post = {};
    const user = {};
    user._id = posts.records[0]._fields[0];
    user.name = posts.records[0]._fields[1];
    user.avatar = posts.records[0]._fields[2];
    post.user = user;
    post._id = posts.records[0]._fields[4];
    post.title = posts.records[0]._fields[3].properties.title;
    post.content = posts.records[0]._fields[3].properties.content;
    post.number_of_likes = posts.records[0]._fields[6];
    post.mylike = posts.records[0]._fields[7];
    post.category = posts.records[0]._fields[3].properties.category;
    let comments = [];
    if (posts.records[0]._fields[5][0].name != null)
      for (j in posts.records[0]._fields[5]) {
        const comment = {};
        comment._id = posts.records[0]._fields[5][j].id;
        comment.content = posts.records[0]._fields[5][j].com;
        comment.name = posts.records[0]._fields[5][j].name;
        comment.avatar = posts.records[0]._fields[5][j].avatar;
        comments.push(comment);
      }
    post.comments = comments;
    console.log(post);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/auth/:id', auth, async (req, res) => {
  try {
    const session = neo4j.driver.session();
    const posts = await session.run(
      `MATCH (p:Person)-[ps:POSTED]->(po:Post) WHERE id(po) = ${req.params.id}  OPTIONAL MATCH (po:Post)<-[com:COMMENTED]-(pc:Person) CALL {with po MATCH (po)<-[like:LIKED]-(pl:Person) RETURN COUNT(like) as likes} RETURN  id(p), p.name, p.avatar, po, id(po), collect({com:com.content, id: id(com),name: pc.name, avatar: pc.avatar}) as comments, likes, EXISTS((p)-[:LIKED]->(po)) as mylike ORDER BY po.date DESC`
    );

    const like = await session.run(
      `MATCH (p:Person)-[ps:LIKED]->(po:Post) where id(p)=${req.user.id} and id(po)=${req.params.id} return ps`
    );

    const post = {};
    const user = {};
    user._id = posts.records[0]._fields[0];
    user.name = posts.records[0]._fields[1];
    user.avatar = posts.records[0]._fields[2];
    post.user = user;
    post._id = posts.records[0]._fields[4];
    post.title = posts.records[0]._fields[3].properties.title;
    post.content = posts.records[0]._fields[3].properties.content;
    post.number_of_likes = posts.records[0]._fields[6];
    if (like.records.length != 0) post.mylike = true;
    else post.mylike = false;
    post.category = posts.records[0]._fields[3].properties.category;
    let comments = [];
    if (posts.records[0]._fields[5][0].name != null)
      for (j in posts.records[0]._fields[5]) {
        const comment = {};
        comment._id = posts.records[0]._fields[5][j].id;
        comment.content = posts.records[0]._fields[5][j].com;
        comment.name = posts.records[0]._fields[5][j].name;
        comment.avatar = posts.records[0]._fields[5][j].avatar;
        comments.push(comment);
      }
    post.comments = comments;
    console.log(post);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
