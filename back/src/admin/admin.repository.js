class adminRepository {
    constructor({sequelize, Sequelize}){
        this.User = sequelize.models.User
        this.Board = sequelize.models.Board
        this.Comment = sequelize.models.Comment
        this.Liked = sequelize.models.Liked
        this.Category = sequelize.models.Category
        this.sequelize = sequelize
        this.Sequelize = Sequelize
    }
    async getUsers() {
        try{
            const response =  await this.User.findAll()
            return response
        }catch(e){
            throw new Error(e)
        }
    }
    
    async updateUser(userId, data) {
        try{
            const user = await this.User.findByPk(userId)
            if (!user) {
                throw new Error('User not found')
            }
            const response = await user.update(data)
            return response
        }catch(e){
            throw new Error(e)
        }
    }
    
    async getBoards() {
        try{
            const response = await this.Board.findAll()
            console.log('reposit', response)
            return response
        }catch(e){
            throw new Error(e)
        }
    }
    
    async updateBoardLevel(boardId, boardLevel) {
        try{
            const board = await this.Board.findByPk(boardId)
            if (!board) {
                throw new Error('Board not found')
            }
            const response = await board.update({ boardLevel })
            return response
        }catch(e){
            throw new Error(e)
        }
    }

    async getCategories() {
        try{
            const response = await this.Category.findAll()
            return response
        } catch(e){
            throw new Error(e)
        }
    }
    
    async createCategory(data) {
        try{
            const response = await this.Category.create(data)
            return response 
        } catch(e){
            throw new Error(e)
        }
        
    }
    
    async updateCategory(categoryId, data) {
        try{
            const category = await this.Category.findByPk(categoryId)
            if (!category) {
                throw new Error('Category not found')
            }
            const response =  await category.update(data)
            return response
        }catch(e){
        throw new Error(e)
        }
    }
    async deleteCategory(categoryId) {
        try{
            const category = await this.Category.findByPk(categoryId)
            if (!category) {
                throw new Error('Category not found')
            }
            const response = await category.destroy()
            return response
        }catch(e){
            throw new Error(e)
        }
    }
}

module.exports = adminRepository