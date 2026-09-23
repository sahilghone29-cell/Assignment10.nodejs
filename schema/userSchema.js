const Joi = require('joi');

// Define schema validation for user data
const userSchema = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    'string.base': 'Name must be a valid string',
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  email: Joi.string().trim().email().required().messages({
    'string.base': 'Email must be a valid string',
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required'
  }),
  age: Joi.number().integer().min(18).max(100).required().messages({
    'number.base': 'Age must be a valid number',
    'number.integer': 'Age must be an integer',
    'number.min': 'Age must be at least 18',
    'number.max': 'Age must be between 18 and 100',
    'any.required': 'Age is required'
  }),
  course: Joi.string().trim().min(1).required().messages({
    'string.base': 'Course must be a valid string',
    'string.empty': 'Course is required',
    'any.required': 'Course is required'
  })
});

module.exports = userSchema;
