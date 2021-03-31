const validator = require('validator');
const isEmpty = require('../validations/is-empty');
module.exports = function validateregisterinput(data){
  let errors = {};
  data.name = !isEmpty(data.name)? data.name: '';
  data.email = !isEmpty(data.email)? data.email: '';
  data.password = !isEmpty(data.password)? data.password: '';
  data.password2 = !isEmpty(data.password2)? data.password2: '';
  if(!validator.isLength(data.name,{min: 2, max : 30})){
      errors.name = 'The length of name is invalid'
  }
  if(validator.isEmpty(data.name)) {
    errors.name = 'Name field is Required'
  }
  if(validator.isEmpty(data.email)) {
    errors.email = 'Email field is Required'
  }
  if(!validator.isEmail(data.email)){
    errors.email = 'Invalid email';
  }
  if(validator.isEmpty(data.password)) {
    errors.password = 'password field is Required'
  }
  if(!validator.isLength(data.password,{min: 6, max : 30})){
    errors.password = 'The length of password is invalid'
}
  if(validator.isEmpty(data.password2)) {
    errors.password2 = 'confirm password field is Required'
  }
  if(!validator.isLength(data.password2,{min: 6, max : 30})){
    errors.password2 = 'The length of confirm password field is invalid'
}
if(!validator.equals(data.password,data.password2)){
  errors.password2 = 'Confirm Password should match' 
}
  return {errors,isValid: isEmpty(errors)}
}