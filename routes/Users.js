// 74
const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
// 90~91
const { sign } = require('jsonwebtoken');
const {validateToken} = require('../middlewares/AuthMiddleware');

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  // password 해쉬처리
  // hash == password임
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("success");
  });
});

// 로그인
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // 아이디 중복 확인, 없다면 user는 empty
  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    // password를 다시 해시
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong Username And Password Combination" });
      } else {
        // 92, 로그인 jsonwebtoken 생성
        const accessToken = sign(
          {username: user.username, id: user.id}, "importantsecret"
        );
        // 127, 세션 스토리지에 저장하기 위해 accessToken 보내기 (xss취약)
        res.json({token: accessToken, username: username, id: user.id});
      }
    });
  }
});
// 114
router.get("/checkUser", validateToken, (req, res) => {
  res.json(req.user);
})

module.exports = router;
