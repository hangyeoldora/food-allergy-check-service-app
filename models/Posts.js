// Post 테이블 생성
module.exports = (sequelize, DataTypes)=> {
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postContent: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            //해당 게시물과 관련된 모든 댓글 삭제
            onDelete: "cascade"
        });
        // 136
        Posts.hasMany(models.Likes, {
            onDelete: "cascade"
        });
    }

    return Posts;
}