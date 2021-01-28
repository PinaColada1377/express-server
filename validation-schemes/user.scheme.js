const Joi = require('joi');

class UserShema {
    createUserSchema = Joi.object({
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        role: Joi.string()
            .min(3)
            .max(30)
            .required(),
        
        login: Joi.string()
            .min(3)
            .max(30)
            .required(),
        
        avatar: Joi.string()
            .required()
    })
        .with('email', 'password')


    updateUserSchema = Joi.object({        
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            
        role: Joi.string()
            .min(3)
            .max(30),
            
        login: Joi.string()
            .min(3)
            .max(30)
    })
        .xor('email', 'password');
}

module.exports = new UserShema();
