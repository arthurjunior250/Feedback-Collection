const Joi = require("joi");

//User validation
exports.registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(2).required(),
        profilePicture: Joi.string(),
        email: Joi.string().min(6).required().email(),
        role: Joi.string().min(2),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};
