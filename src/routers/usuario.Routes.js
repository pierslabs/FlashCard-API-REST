
const express = require('express');
const user = express.Router();
const authtoken = require('../auth/authtoken');
const authlogin = require('../auth/authlogin');
const authRecoveryPassStep2 = require('../auth/authRecoveryPassStep2'); 
const userController = require('../controllers/usuario.Controller')





// insert------------------------------------------------------
user.post('/insert', userController.insert);


// GET-----------------------------------------------------------
user.get('/get', authtoken, userController.getUsusario);

// LOGIN--------------------------------------------------------------------
user.post('/login',authlogin,userController.loginUser);

// UPDATE-------------------------------------------------------------------------------------------
user.post('/update',authtoken, userController.updateUser);


// DELETE-----------------------------------------------------------------------------------------
user.post('/delete',authtoken, userController.deleteUser);




// Recovery password
user.post('/recoveryPassword', userController.recoveryPassword);


// Recovery password Step 2
user.post('/recoveryPasswordStep2',authRecoveryPassStep2, userController.recoveryPasswordStep2);

// Comprobar que tiene token, y no esta caducado, por ejemplo en la presentación de la página  ------------
user.get('/me', authtoken, userController.userMe); 




 module.exports = user;
 