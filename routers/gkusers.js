const { GKUser } = require('../models/gkUser');
const { GKRole } = require('../models/gkRole');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const gkUserList = await GKUser.find();

    if(!gkUserList){
        res.status(500).json({success: false})
    }
    res.send(gkUserList);
})


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
        password: req.body.password,
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

module.exports = router;
