// 137
const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// 139, validateToken에 ID와 username 포함되있음
router.post("/", validateToken, async (req, res) => {
    const { PostId } = req.body;
    const UserId = req.user.id;

    // 140, 이미 좋아요 눌렀는지 체크, 정확한 필드인지
    const found = await Likes.findOne({ 
        where: { PostId: PostId, UserId: UserId}
    });
    if(!found){
        // 좋아요 생성
        await Likes.create({PostId: PostId, UserId: UserId});
        // 147
        res.json({liked: true});
    } else{
        // 이미 눌렸다면 좋아요 삭제
        await Likes.destroy({
            where: {
                PostId: PostId, UserId: UserId
            },
          });
          res.json({liked: false});
    }
    
});


module.exports = router;