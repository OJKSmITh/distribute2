class AdminService {
  constructor({ adminRepository }) {
    this.adminRepository = adminRepository
  }

  async getUsers() {
    try {
      const response = await this.adminRepository.getUsers()
      return response
    } catch (e) {
      throw new Error(e)
    }
  }

  async updateUser(userId, data) {
    try {
      const response = await this.adminRepository.updateUser(userId, data)
      return response
    } catch (e) {
      throw new Error(e)
    }
  }

  async getBoards() {
    try {
      const response = await this.adminRepository.getBoards()
      console.log('service', response)
      return response
    } catch (e) {
      throw new Error(e)
    }
  }

  async updateBoardLevel(boardId, boardLevel) {
    try {
      const response = await this.adminRepository.updateBoardLevel(boardId, boardLevel)
      return response
    } catch (e) {
      throw new Error(e)
    }
  }

  async getCategories() {
    try {
      const response = await this.adminRepository.getCategories()
      return response
    } catch (e) {
      throw new Error(e)
    }
  }

  async createCategory(data) {
    try {
      const response = await this.adminRepository.createCategory(data)
      return response
    } catch (e) {
      throw new Error(e)
    }
  }

  async updateCategory(categoryId, data) {
    try {
      const response = await this.adminRepository.updateCategory(categoryId, data)
      return response
    } catch (e) {
      throw new Error(e)
    }
  }

  async deleteCategory(categoryId) {
    try {
      const response = await this.adminRepository.deleteCategory(categoryId)
      return response
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = AdminService
