const express = require('express');
const router = express.Router()

const passport = require('passport');
const Users = require('../models/userModel')


// Get all 
router.get('/', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users)
    } 
    catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

// Get one
router.get('/:id', getUser, async (req, res) => {
    try {
        res.status(201).json(res.user)
    } 
    catch (error) {
        console.error(error.message);
    }
})


// Register new user
router.post('/register', async (req, res) => {
    const user = new Users({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        rooms: []
    })

    try {
        const userExists = await Users.findOne({ email: req.body.email })

        if(userExists){
            return res.status(400).json({
                msg: "Email already in use."
            })
        }

        const newUser = await user.save();
        res.status(200).json({
            msg: 'New user registered.'
        })
    } 
    catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        })
    }
})


// Update one
router.patch('/:id', getUser, async (req, res) => {
    try {
        const newRoomsArray = [...res.user.rooms];
        newRoomsArray.push(req.body.newRoom);

        res.user.rooms = newRoomsArray;
        const updatedUser = await res.user.save();

        res.status(200).json({
            msg: 'User updated',
            "user": res.user
        })
    } 
    catch (error) {
        res.status(400).json({
            message: err.message
        })
    }
})




// Delete one
router.delete('/:id', getUser, async (req, res) => {
    try{ 
        await res.user.deleteOne()
        res.json({
            message: `Deleted user with id: ${req.params.id}`
        })
    }
    catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})



// Login authentication
router.post('/login', passport.authenticate('local', { session: false }), async function (req, res) {
    try{
        const user = req.user;
        res.status(200)
        res.json({
            message: `Login successful`,
            "user": user
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})






async function getUser(req, res, next) {
    let user;
    try{
        user = await Users.findById(req.params.id);
        if(user == null){
            return res.status(404).json({
                message: `No user found with the id: ${req.params.id}`
            })
        }
    }
    catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
    
    res.user = user;
    next();
}



module.exports = router;