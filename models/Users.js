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
      // allergyList: {
      //   type: DataTypes.STRING,

      // },
    });
  
    Users.associate = (models) => {
      Users.hasMany(models.Posts, {
          onDelete: "cascade",
      });
      Users.hasMany(models.Likes, {
          onDelete: "cascade"
      });
  }
    return Users;
  };