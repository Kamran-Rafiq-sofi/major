const express=require('express');
const router = express.Router();
const likesController=require('../controllers/like_controller');
// router.get('/loved',likesController.loved);
router.post('/toggle',likesController.toggleLike);
module.exports = router;