module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    // 연관, 각 유저마다 다양한 포스트
    Users.associate = (models) => {
      Users.hasMany(models.Posts, {
          onDelete: "cascade",
      });
      // 136
      Users.hasMany(models.Likes, {
          //해당 게시물과 관련된 모든 댓글 삭제
          onDelete: "cascade"
      });
  }
    return Users;
  };