//94
// 토큰이 올바른지 확인하는 verify
const { verify } = require('jsonwebtoken');

// next는 요청이 이동하기를 원할 때 사용
const validateToken = (req, res, next) => {
    // header에 저장해서 패스
    const accessToken = req.header("accessToken")

    if (!accessToken) {
        return res.json({error: "User not logged in!"});
    } else {
         try{
             // users.js에서 생성한 importantsecret된 토큰과 비교
            const validToken = verify(accessToken, "importantsecret");
            // 100, validtoken 접속을 위해 req.user라고 선언. router/comment 등 req.user로 부름
            req.user = validToken;
            if (validToken) {
                return next();
            }
         } catch (err) {
            return res.json({error: err});
         }
    }
};

module.exports = {validateToken};