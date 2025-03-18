const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  // db 기본키
  // postid 컬럼과 같은 것만 가쟈오기
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

// 댓글 생성
// 96 - validateToken 추가
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
});

// 129, 130 - 댓글 삭제
router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });
  res.json("삭제 성공");
})


module.exports = router;