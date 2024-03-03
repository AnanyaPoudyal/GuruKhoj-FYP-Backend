
const {GKProgram} = require('../models/gkProgram');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const gkProgramList = await GKProgram.find();

    if(!gkProgramList){
        res.status(500).json({success: false})
    }
    res.send(gkProgramList);
})

router.post(`/`,  async (req, res) =>{
    let gkProgram = new GKProgram({
        gkprogramArea: req.body.gkprogramArea,
        gkprogramSubject: req.body.gkprogramSubject,
        gkprogramAddress: req.body.gkprogramaddress,
        gkprogramStartTime: req.body.gkprogramStartTime,
        gkprogramEndTime: req.body.gkprogramEndTime,
        gkprogramPrice: req.body.gkprogramPrice,
        gkprogramStudentCapacity: req.body.gkprogramStudentCapacity,
        gkprogramHomeTution: req.body.gkprogramHomeTution,
    })

    gkProgram = await gkProgram.save();

    if(!gkProgram)
    return res.status(404).send('The Program cannot be created')
    
    res.send(gkProgram);
 
 });


router.put('/:id',async (req, res)=> {
    const gkProgram = await GKProgram.findByIdAndUpdate(
        req.params.id,
        {
            gkprogramArea: req.body.gkprogramArea,
            gkprogramSubject: req.body.gkprogramSubject,
            gkprogramAddress: req.body.gkprogramaddress,
            gkprogramStartTime: req.body.gkprogramStartTime,
            gkprogramEndTime: req.body.gkprogramEndTime,
            gkprogramPrice: req.body.gkprogramPrice,
            gkprogramStudentCapacity: req.body.gkprogramStudentCapacity,
            gkprogramHomeTution: req.body.gkprogramHomeTution,
        },
        { new: true}
    )

    if(!gkProgram)
    return res.status(400).send('the category cannot be created!')

    res.send(gkProgram);
})


router.delete('/:id', async (req, res)=>{
    try {
        const program = await GKProgram.findByIdAndDelete(req.params.id);
        if (!program) {
            return res.status(404).send('Program not found');
        }
        res.send(program);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;