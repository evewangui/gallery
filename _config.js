var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://gallery-user:<Gallery_user>@clusterg.mhghrr0.mongodb.net/gallery-prod?retryWrites=true&w=majority',
    development: 'mongodb+srv://gallery-user:<db_password>@clusterg.mhghrr0.mongodb.net/gallery-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://gallery-user:<db_password>@clusterg.mhghrr0.mongodb.net/gallery-dev?retryWrites=true&w=majority',
}
module.exports = {
    mongoURI: process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/darkroom',
    port: process.env.PORT || 3000
};