const {GKTutor} = require('../models/gkTutor');
const {GKUser} = require('../models/gkUser');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const gkTutorList = await GKTutor.find().populate('gkuser');

    if(!gkTutorList){
        res.status(500).json({success: false})
    }
    res.send(gkTutorList);
})

router.post(`/`,  async (req, res) =>{

    const gkuser = await GKUser.findById(req.body.gkuser);
    if(!gkuser) return res.status(400).send("Invlaid User");
    
    
    let gkTutor = new GKTutor({
        instiuteName: req.body.instiuteName,
        degree: req.body.degree,
        area: req.body.area,
        gpa: req.body.gpa,
        graduatedDate: req.body.graduatedDate,
        gkuser: req.body.gkuser
    })

    gkTutor = await gkTutor.save();

    if(!gkTutor)
    return res.status(404).send('The Tutor details are not valid')
    
    res.send(gkTutor);
 
 });


router.put('/:id',async (req, res)=> {

    const gkuser = await GKUser.findById(req.body.gkuser);
    if(!gkuser) return res.status(400).send("Invlaid User");
    
    const gkTutor = await GKTutor.findByIdAndUpdate(
        req.params.id,
        {
        instiuteName: req.body.instiuteName,
        degree: req.body.degree,
        area: req.body.area,
        gpa: req.body.gpa,
        graduatedDate: req.body.graduatedDate,
        gkuser: req.body.gkuser
        },
        { new: true}
    )

    if(!gkTutor)
    return res.status(400).send('the category cannot be created!')

    res.send(gkTutor);
})

router.get(`/get/count`, async (req, res) =>{
    try {
        const gkTutorListCount = await GKTutor.countDocuments();

        if(!gkTutorListCount){
            return res.status(500).json({success: false});
        }
        
        res.send({
            gkTutorListCount: gkTutorListCount
        });
    } catch (error) {
        console.error("Error getting Tutor count:", error);
        res.status(500).json({success: false, error: error.message});
    }
})


router.delete('/:id', async (req, res)=>{
    try {
        const tutor = await GKTutor.findByIdAndDelete(req.params.id);
        if (!tutor) {
            return res.status(404).send('Tutor Details not found');
        }
        res.send(tutor);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;