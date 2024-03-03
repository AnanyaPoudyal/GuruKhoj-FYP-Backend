const {GKRole} = require('../models/gkRole');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const gkRoleList = await GKRole.find();

    if(!gkRoleList){
        res.status(500).json({success: false})
    }
    res.send(gkRoleList);
})

router.post(`/`, (req, res) =>{
   const gkRole = new GKRole({
    gkUserRole: req.body.gkUserRole,
   })

   gkRole.save().then((createdGKUserRole=> {
        res.status(201).json(createdGKUserRole)
   })).catch((err)=>{
    res.status(500).json({
        error: err,
        success: false
    })
   })

});

module.exports = router;