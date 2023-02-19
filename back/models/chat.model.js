module.exports = (sequelize, Sequelize) => {
    class Chat extends Sequelize.Model {
        static initialize() {
            return this.init({
                chatContent : {
                    type : Sequelize.STRING(255)
                }
            },
            {
                sequelize,
            })
        }
    }
    Chat.initialize();
};