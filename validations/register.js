const validator = require('validator');
const isEmpty = require('../validations/is-empty');
module.exports = function (data){
  let errors = {};
  if(!validator.isLength(data.name,{min: 2, max : 30})){
      errors.name = 'The length of name is invalid'
  }
  return {errors,isValid: isEmpty(errors)}
}