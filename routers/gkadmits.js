const { GKUser } = require('../models/gkUser');
const { GKProgram } = require('../models/gkProgram');
const { GKAdmit } = require('../models/gkadmit');
const express = require('express');
const { GKTutor } = require('../models/gkTutor');
const router = express.Router();
const mongoose = require('mongoose');



router.get(`/`, async (req, res) =>{
    const gkAdmitList = await GKAdmit.find().populate('gkuser').populate('gkprogram');

    if(!gkAdmitList){
        res.status(500).json({success: false})
    }
    res.send(gkAdmitList);
})

router.post(`/`,  async (req, res) =>{
    const gkuser = await GKUser.findById(req.body.gkuser);
    if(!gkuser) return res.status(400).send("Invlaid User");
    
    const gkprogram = await GKProgram.findById(req.body.gkprogram);
    if(!gkprogram) return res.status(400).send("Invlaid Program");
    
 
    let gkAdmit = new GKAdmit({
        gkstatus: req.body.gkstatus,
        gkuser: req.body.gkuser,
        gkprogram: req.body.gkprogram,

    })

    gkAdmit = await gkAdmit.save();

    if(!gkAdmit)
    return res.status(404).send('The Admittance cannot be created')
    
    res.send(gkAdmit);
 
 });


 router.put('/:id',async (req, res)=> {
    if(mongoose.isValidObjectId(req.params.id)){
        res.status(400).send("Invlaid Admittance ID");
    }
    const gkuser = await GKUser.findById(req.body.gkuser);
    if(!gkuser) return res.status(400).send("Invlaid User");
    
    const gkprogram = await GKProgram.findById(req.body.gkprogram);
    if(!gkprogram) return res.status(400).send("Invlaid Program");
    
    const gkAdmit = await GKAdmit.findByIdAndUpdate(
        req.params.id,
        {
            gkstatus: req.body.gkstatus,
            gkuser: req.body.gkuser,
            gkprogram: req.body.gkprogram,
        },
        { new: true}
    )

    if(!gkAdmit)
    return res.status(400).send('the admittance cannot be Updated!')

    res.send(gkAdmit);
})


router.get(`/get/count`, async (req, res) =>{
    try {
        const gkAdmitListCount = await GKAdmit.countDocuments();

        if(!gkAdmitListCount){
            return res.status(500).json({success: false});
        }
        
        res.send({
            gkAdmitListCount: gkAdmitListCount
        });
    } catch (error) {
        console.error("Error getting Admittance count:", error);
        res.status(500).json({success: false, error: error.message});
    }
})


router.delete('/:id', async (req, res)=>{
    try {
        const admit = await GKAdmit.findByIdAndDelete(req.params.id);
        if (!admit) {
            return res.status(404).send('Could not find the Admittance');
        }
        res.send(admit);
    } catch (error) {
        res.status(500).send(error.message);
    }
});



module.exports = router;


