const { GKUser } = require('../models/gkUser');
const { GKRole } = require('../models/gkRole');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { reset } = require('nodemon');
const authJwt = require('../helpers/jwt')

router.get(`/`, async (req, res) =>{
    const gkUserList = await GKUser.find().populate('gkrole').select('-password');

    if(!gkUserList){
        res.status(500).json({success: false})
    }
    res.send(gkUserList);
})

router.get('/:id', async (req, res) => {
    try {
        const gkUser = await GKUser.findById(req.params.id).select('-password').populate('gkrole');

        if (!gkUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, data: gkUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


router.post(`/`,  async (req, res) =>{
    const gkrole = await GKRole.findById(req.body.gkrole);
    if(!gkrole) return res.status(400).send("Invlaid Role");
    
    let gkUser = new GKUser({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        isAdmin: req.body.isAdmin,
        address: req.body.address,
        contact_number: req.body.contact_number,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        gkrole: req.body.gkrole
    })

    gkUser = await gkUser.save();

    if(!gkUser)
    return res.status(404).send('The User cannot be created')
    
    res.send(gkUser);
 
 });


router.put('/:id',async (req, res)=> {
    const gkrole = await GKRole.findById(req.body.gkrole);
    if(!gkrole) return res.status(400).send("Invlaid Role");

    const gkUser = await GKUser.findByIdAndUpdate(
        req.params.id,
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            isAdmin: req.body.isAdmin,
            address: req.body.address,
            contact_number: req.body.contact_number,
            email: req.body.email,
            password: req.body.password,
            gkrole: req.body.gkrole
        },
        { new: true}
    )

    if(!gkUser)
    return res.status(400).send('the User cannot be Updated!')

    res.send(gkUser);
})

router.get(`/get/count`, async (req, res) =>{
    try {
        const gkUserListCount = await GKUser.countDocuments();

        if(!gkUserListCount){
            return res.status(500).json({success: false});
        }
        
        res.send({
            gkUserListCount: gkUserListCount
        });
    } catch (error) {
        console.error("Error getting User count:", error);
        res.status(500).json({success: false, error: error.message});
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        const user = await GKUser.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('Could not find the User');
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Login Logic / POST
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email.trim().toLowerCase(); // Normalize email
        const user = await GKUser.findOne({ email });
        const secret = process.env.secret;

        if (!user) {
            return res.status(404).send('Could not find the User');
        }

        console.log('Stored Password:', user.password);
        console.log('Input Password:', req.body.password);

        const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
        
        if (passwordMatch) {

            const token = jwt.sign(
                {
                    userID: user.id,
                    // isAdmin: user.isAdmin
                },
                secret,
                {
                    expiresIn : '1d'
                }
            )

            return res.status(200).send({ user: { email: user.email, gkrole: user.gkrole, userID: user._id }, token });
        } else {
            return res.status(400).send('The password is wrong!');
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).send('An error occurred during login');
    }
});

router.post(`/register`,  async (req, res) =>{
    const gkrole = await GKRole.findById(req.body.gkrole);
    if(!gkrole) return res.status(400).send("Invlaid Role");
    
    let gkUser = new GKUser({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        isAdmin: req.body.isAdmin,
        address: req.body.address,
        contact_number: req.body.contact_number,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        gkrole: req.body.gkrole
    })

    gkUser = await gkUser.save();

    if(!gkUser)
    return res.status(404).send('The User cannot be created')
    
    res.send(gkUser);
 
 });

 //Search
 router.get('/search', async (req, res) => {
    try {
        // Log the query parameters to check if 'first_name' is received
        console.log('Query parameters:', req.query);

        // Extract the first name from the query parameters
        const { first_name } = req.query;
        console.log('Searching for users with first name:', first_name);

        // Perform the search based on the first name
        const users = await GKUser.find({
            first_name: { $regex: new RegExp(first_name, 'i') } // Case-insensitive search
        });

        res.json(users);
    } catch (error) {
        console.error('Error searching for users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;
