const { sequelize: { models: { User, Board, Comment, Liked, Category } } } = require("../../models")
const { sequelize, Sequelize } = require("../../models")

const AdminRepository = require("./admin.repository")
const AdminService = require("./admin.service")
const AdminController = require("./admin.controller")

const adminRepository = new AdminRepository({ User, Board, Comment, Liked, Category, sequelize, Sequelize })
const adminService = new AdminService({ adminRepository })
const adminController = new AdminController({ adminService })

module.exports = { adminController }

console.log('test123')