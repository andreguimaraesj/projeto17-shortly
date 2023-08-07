import Joi from "joi";

const schemaSignIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default schemaSignIn;
