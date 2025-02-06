const saarthiModel = require('../models/saarthi.model');


module.exports.CreateSaarthi = async ({
    firstName,lastName,email,password,color,plate,capacity,type
}) => {
    if (!firstName || !lastName || !email || !password || !color || !plate || !capacity || !type) {
        throw new Error('All fields are required');
    }
    const saarthi = await saarthiModel.create({  // Added `await`
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehile: {
            color,
            plate,
            capacity,
            type
        }
    });
    
    return saarthi;

};