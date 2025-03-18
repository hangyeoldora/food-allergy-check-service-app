const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  // 144, include를 추가해줌.
  const listOfPosts = await Posts.findAll({include: [Likes]});
  // 154 유효성 검사를 위해 validateToken 추가, 사용자 id를 포함하는 모든 좋아요를 쿼리
  const likedPosts = await Likes.findAll({where: {UserId: req.user.id}})
  // likedPosts 이전
  // res.json(listOfPosts);
  // 163
  res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
});

// 57
router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  // db 기본키
  const post = await Posts.findByPk(id);
  res.json(post);
})

// 본문 게시물 요청
router.post("/", validateToken, async (req, res) => {
  // 게시물 데이터를 가져옴
  const post = req.body;
  post.username = req.user.username;
  // sequelize의 create 함수를 사용하여 mysql에 존재하는 posts라는 테이블에 삽입
  await Posts.create(post);
  // 데이터 insert, return
  res.json(post);
});

// 169
router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
})

module.exports = router;
