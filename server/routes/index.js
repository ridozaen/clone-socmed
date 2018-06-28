const express = require('express');
const router = express.Router();
const twitterController = require('../controller/twitterControllers')

router.get('/',twitterController.getAllTwitt);
router.post('/',twitterController.postTwitt);
router.post('/retweet/:id',twitterController.retweet);
router.post('/favorites/:id',twitterController.favorites);
router.get('/search',twitterController.searchTwitt);
router.get('/timeline',twitterController.getTimeLine);

module.exports = router;