const validator = require('validator');
const isEmpty = require('../validations/is-empty');

const validateprofileinput = function (data) {
    const errors = {};
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    if(!validator.isLength(data.handle,{min: 2, max : 40})){
        errors.handle = 'Handle length is invalid'
    }
    if(validator.isEmpty(data.handle)){
       errors.handle = 'Handle is Required'
    }
    if(validator.isEmpty(data.status)){
        errors.status = 'status is Required'
     }
     if(validator.isEmpty(data.skills)){
        errors.skills = 'skills is Required'
     }
     if(!isEmpty(data.website)){
        if(!validator.isUrl(data.website)){
            errors.website = 'Invalid URL'
        }
     }
     if(!isEmpty(data.facebook)){
        if(!validator.isUrl(data.facebook)){
            errors.facebook = 'Invalid URL'
        }
     }
     if(!isEmpty(data.instagram)){
        if(!validator.isUrl(data.instagram)){
            errors.instagram = 'Invalid URL'
        }
     }
     if(!isEmpty(data.twitter)){
        if(!validator.isUrl(data.twitter)){
            errors.twitter = 'Invalid URL'
        }
     }
     if(!isEmpty(data.linkedin)){
        if(!validator.isUrl(data.linkedin)){
            errors.linkedin = 'Invalid URL'
        }
     }
     if(!isEmpty(data.youtube)){
        if(!validator.isUrl(data.youtube)){
            errors.youtube = 'Invalid URL'
        }
     }
    return {errors,isValid : isEmpty(errors)};
}
module.exports = validateprofileinput;