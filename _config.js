const config = {
    uploadPath: 'public/uploads/',
}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://gallery-user:<Gallery_user>@clusterg.mhghrr0.mongodb.net/gallery-prod?retryWrites=true&w=majority',
    development: 'mongodb+srv://gallery-user:<db_password>@clusterg.mhghrr0.mongodb.net/gallery-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://gallery-user:<db_password>@clusterg.mhghrr0.mongodb.net/gallery-dev?retryWrites=true&w=majority',
}

export default config;