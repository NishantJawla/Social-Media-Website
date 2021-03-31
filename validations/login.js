const validator = require('validator');
const isEmpty = require('../validations/is-empty');
module.exports = function validatelogininput(data){
  let errors = {};
  data.email = !isEmpty(data.email)? data.email: '';
  data.password = !isEmpty(data.password)? data.password: '';
  if(!validator.isEmail(data.email)){
    errors.email = 'Invalid email';
  }
  if(validator.isEmpty(data.password)) {
    errors.password = 'password field is Required'
  }
  if(validator.isEmpty(data.email)) {
    errors.email = 'Email field is Required'
  }
 return {errors,isValid: isEmpty(errors)}
}