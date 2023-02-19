class AdminController {
  constructor({ adminService }){
    this.adminService = adminService
  }
  async getUsers(req,res,next){
    try {
      const users = await adminService.getUsers()
      res.status(201).json(users)
    } catch (e) {
      next(e)
    }
  }

  async updateUser(req,res,next){
    const userId = req.params.id
    const data = req.body
    try {
      const updatedUser = await adminService.updateUser(userId, data)
      res.status(201).json(updatedUser)
    } catch (e) {
      next(e)
    }
  }
  async getBoards(req,res,next){
    try {
      const boards = await adminService.getBoards()
      console.log(111245231,boards)
      res.status(201).json(boards)
    } catch (e) {
      next(e)
    }  
  }
  async updateBoardLevel(req,res,next){
    const boardId = req.params.id
    const boardLevel = req.body.boardLevel
    try {
      const updatedBoard = await adminService.updateBoardLevel(boardId, boardLevel)
      res.status(201).json(updatedBoard)
    } catch (e) {
      next(e)
    }
  }
  async getCategories(req,res,next){
    try {
      const categories = await adminService.getCategories()
      res.status(201).json(categories)
    } catch (e) {
      next(e)
    }
  }
  async createCategory(req,res,next){
    const data = req.body
    try {
      const createdCategory = await adminService.createCategory(data)
      res.status(201).json(createdCategory)
    } catch (e) {
      next(e)
    }
  }
  async updateCategory(req,res,next){
    const categoryId = req.params.id
    const data = req.body
    try {
      const updatedCategory = await adminService.updateCategory(categoryId, data)
      res.status(201).json(updatedCategory)
    } catch (e) {
      next(e)
    }
  }
  async deleteCategory(req,res,next){
    const categoryId = req.params.id
    try {
      const deletedCategory = await adminService.deleteCategory(categoryId)
      res.status(201).json(deletedCategory)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = AdminController;