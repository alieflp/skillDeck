"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {}
  Project.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      skills: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0, // Minimum value of 0
          max: 100, // Maximum value of 100
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Assuming the User model is defined in the same sequelize instance
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      githubLink: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true, // Validates that the string is a URL
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isIn: [[
          "Web Development",
          "Mobile Development",
          "Backend Development",
          "Frontend Development",
          "Fullstack",
          "API Development",
          "DevOps",
          "Database",
          "Machine Learning",
          "Artificial Intelligence",
          "Data Science",
          "Cybersecurity",
          "Game Development",
          "Embedded Systems",
          "Desktop App",
          "Blockchain",
          "Scripting/Automation",
          "Testing/QA",
          "Cloud Computing",
          "Other"
        ]], // Validates that the category is one of the predefined options
        },
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
