const {GKTutor} = require('../models/gkTutor');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const gkTutorList = await GKTutor.find();

    if(!gkTutorList){
        res.status(500).json({success: false})
    }
    res.send(gkTutorList);
})

router.post(`/`,  async (req, res) =>{
    let gkTutor = new GKTutor({
        instiuteName: req.body.instiuteName,
        degree: req.body.degree,
        area: req.body.area,
        gpa: req.body.gpa,
        graduatedDate: req.body.graduatedDate,
    })

    gkTutor = await gkTutor.save();

    if(!gkTutor)
    return res.status(404).send('The Tutor details are not valid')
    
    res.send(gkTutor);
 
 });


router.put('/:id',async (req, res)=> {
    const gkTutor = await GKTutor.findByIdAndUpdate(
        req.params.id,
        {
        instiuteName: req.body.instiuteName,
        degree: req.body.degree,
        area: req.body.area,
        gpa: req.body.gpa,
        graduatedDate: req.body.graduatedDate,

        },
        { new: true}
    )

    if(!gkTutor)
    return res.status(400).send('the category cannot be created!')

    res.send(gkTutor);
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