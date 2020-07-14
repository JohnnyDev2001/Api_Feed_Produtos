'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profiles', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    bio:{
        type: Sequelize.TEXT,
    },
    link:{
      type: Sequelize.STRING,
    },
    photo: {
      type: Sequelize.STRING,
    },
    created_at:{
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at:{
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profiles');
  }
};
