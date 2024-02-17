import * as Joi from 'joi'

// valida que sea el objeto exactamente como lo estoy esperando 
export const JoiValidationSchema = Joi.object({
    MONGODB:Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT:Joi.number().default(6)
})

