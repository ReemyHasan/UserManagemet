const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.get('/users', async (req, res) => {// http://localhost:5000/api/users/
    try {
        const users = await User.find();
        res.json({ Status: "Success", users: users });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/adminCount', async (req, res) => {// http://localhost:5000/api/adminCount/
    try {
        const count = await User.count({ role: 'admin' });
        res.json({ Status: "Success", count: count });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/userCount', async (req, res) => {// http://localhost:5000/api/userCount/
    try {
        const count = await User.count({ role: 'user' });
        res.json({ Status: "Success", count: count });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/users/:id', (req, res) => { // http://localhost:5000/api/users/6449175a7c4d6e8e2ce443b2
    User.findById({ _id: req.params.id })
        .then(user => res.status(200).json({ Status: "Success", user: user }))
        .catch(err => res.status(404).json({ error: 'No user found by this id' }));
});
router.post('/register', async (req, res) => {// http://localhost:5000/api/register/
    try {
        const { userName, email, password, role } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        // let isAdmin = false;
        // if (Role == "admin"){
        //     isAdmin = true;
        // }
        const user = new User({ userName, email, password: hashedPassword, role });
        await user.save();
        return res.json({ Status: "Success" });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/register/:id', async (req, res) => { // http://localhost:5000/api/register/6449175a7c4d6e8e2ce443b2
    try {
        const { userName, email, password, role } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.findByIdAndUpdate(req.params.id,
            { userName, email, password: hashedPassword, role }, { new: true });
        if (!user) throw new Error('User not found');
        res.json({ Status: "Success" })
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) throw new Error('User not found');
        res.json({ Status: "Success" })
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/searchUser', async (req, res) => {
    try {
        const users = await User.find(req.body);
        res.json(users);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.post('/login', async (req, res) => {

    const { userName, password } = req.body
    const user = await User.findOne({ userName });
    if (user) {
        const isMatch = await bcryptjs.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign(
                {
                    role: user.role,
                    id: user._id,
                },
                'secret-key',
                { expiresIn: '1h' }
            );
            res.cookie('token', token);
            return res.json({ Status: "Success" })
        }
        else {
            return res.json({ Status: "Error", Error: "Wrong userName or Password" });
        }
    } else {
        return res.json({ Status: "Error", Error: "Wrong userName or Password" });
    }

});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You are not Authenticated"});
    } else {
        jwt.verify(token, "secret-key", (err, decoded) => {
            if(err) 
            return res.json({Error: "Token wrong"});
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        } )
    }
}
router.get('/dashboard',verifyUser, (req, res) => {

    return res.json({ Status: "Success", role: req.role, id: req.id })
})
module.exports = router;