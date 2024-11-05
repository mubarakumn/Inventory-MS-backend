const express = require('express')
const { createUser, loginUser, getUsers, deleteUser, updateUser, logout, checkAuth } = require('../Controllers/UserCtrl');
const VerifyJWT = require('../Middleware/VerifyJWT');
const AuthorizedRole = require('../Middleware/AuthorizedRole');
const router = express.Router();

router.post('/register', VerifyJWT, AuthorizedRole('admin'), createUser);
router.post('/login', loginUser);
router.get('/checkAuth', VerifyJWT, checkAuth);
router.get('/logout', VerifyJWT, logout);
router.get('/getUsers', VerifyJWT, AuthorizedRole('admin'), getUsers);
router.put('/updateUser/:id', VerifyJWT, AuthorizedRole('admin'), updateUser)
router.delete('/deleteUser/:id', VerifyJWT, deleteUser);


module.exports = router