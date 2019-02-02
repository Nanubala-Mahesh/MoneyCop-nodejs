const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validatePackage = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new Schema ({
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 128,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(value) {
        return validatePackage.isEmail(value)
      },
      message: function() {
        return 'invalid email format'
      }
    }
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(value){
        return validatePackage.isNumeric(value)
      },
      message: function(){
        return 'invalid mobile format'
      }
    }
  }
})



userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        userId: user._id
    }
    const token = jwt.sign(tokenData, 'moneycop')
    user.tokens.push({
        token
    })
    return user.save().then((user) => {
        return Promise.resolve(token)
    })
}

userSchema.statics.findByToken = function(token){
  let User = this
  let tokenData
  try {
    tokenData = jwt.verify(token, 'moneycop')
  } catch (e) {
    return Promise.reject(e)
  }

  return User.findOne({
    '_id': tokenData.userId,
    'tokens.token': token
  })

}



userSchema.statics.findByCredentials = function(email, password){
  let User = this 
  return User.findOne({ email: email}).then(function(user){
      if(!user){
          return Promise.reject('invalid email ')
          // return new Promise(function(resolve, reject){
          //     reject('invalid email or password')
          // })
      }

      // return new Promise(function(resolve, reject){
      //     bcrypt.compare(password, user.password).then(function(res){
      //         if(res) {
      //             resolve(user)
      //         } else {
      //             reject('invalid password')
      //         }
      //     })
      // })
      
      return bcrypt.compare(password, user.password).then(function(result){
          if(result) {
            return Promise.resolve(user)
          } else {
            console.log(result);
            
            return Promise.reject('invalid email or password')
          }
      })

      // [] / new Array()
      // {} / new Object()

  })
}

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}