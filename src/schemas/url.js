import Joi from "joi";

const schemaUrl = Joi.object({
  url: Joi.string().uri().required(),
});

export default schemaUrl;
