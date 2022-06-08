const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
// model 폴더로부터 db 가져오기
const db = require("./models");
const mysql = require('mysql');
require("dotenv").config();

// Post Router
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);

// Comment Router
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);

// 75
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);

// Foods Router
const foodsRouter = require('./routes/Foods');
app.use("/api", foodsRouter);

// Foods Router
const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter);

// db sequlize 연결 (1)
db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT || 3001,()=>{
        // 서버 구동 확인
        console.log("running on server 3001");
    })
}).catch((error)=>{
    console.log(error);
});
