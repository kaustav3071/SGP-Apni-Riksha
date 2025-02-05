const userModel = require('../models/user.model');

// Create a new user in the database with the provided user object data


module.exports.CreateUser = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !lastName || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = await userModel.create({  // Added `await`
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    });
    return user;
};
