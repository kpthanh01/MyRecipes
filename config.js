exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://demo:12345@ds161529.mlab.com:61529/my-recipes-node-capstone';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
    'mongodb://demo:12345@ds161529.mlab.com:61529/my-recipes-node-capstone';
exports.PORT = process.env.PORT || 8080;