
const {GKProgram} = require('../models/gkProgram');
const express = require('express');
const { GKUser } = require('../models/gkUser');
const router = express.Router();


const getUserIdFromStorage = async () => {
    try {
        const token = await AsyncStorage.getItem('AccessToken');
        if (token) {
            // Decode the token to extract the user ID
            const decodedToken = decode(token); // You need to implement a decode function
            if (decodedToken && decodedToken.userID) {
                return decodedToken.userID;
            }
        }
        return null;
    } catch (error) {
        console.error('Error retrieving user ID from AsyncStorage:', error);
        return null;
    }
};


router.get(`/`, async (req, res) =>{
    const gkProgramList = await GKProgram.find();

    if(!gkProgramList){
        res.status(500).json({success: false})
    }
    res.send(gkProgramList);
})

router.post(`/`,  async (req, res) =>{
    const gkuser =  await GKUser.findById(req.body.gkuser);
    if(!GKUser) return res.status(400).send("Invlaid Tutor");
    let gkProgram = new GKProgram({
        gkprogramArea: req.body.gkprogramArea,
        gkprogramSubject: req.body.gkprogramSubject,
        gkprogramAddress: req.body.gkprogramAddress,
        gkprogramStartTime: req.body.gkprogramStartTime,
        gkprogramEndTime: req.body.gkprogramEndTime,
        gkprogramPrice: req.body.gkprogramPrice,
        gkprogramStudentCapacity: req.body.gkprogramStudentCapacity,
        gkprogramHomeTution: req.body.gkprogramHomeTution,
        gkuser: gkuser
    })

    gkProgram = await gkProgram.save();

    if(!gkProgram)
    return res.status(404).send('The Program cannot be created')
    
    res.send(gkProgram);
 
 });


router.put('/:id',async (req, res)=> {
    const gkuser =  await GKUser.findById(req.body.gkuser);
    if(!gkuser) return res.status(400).send("Invlaid Tutor");

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
            gkuser: req.body.gkuser
        },
        { new: true}
    )

    if(!gkProgram)
    return res.status(400).send('the category cannot be created!')

    res.send(gkProgram);
})

router.get(`/get/count`, async (req, res) =>{
    try {
        const gkProgramListCount = await GKProgram.countDocuments();

        if(!gkProgramListCount){
            return res.status(500).json({success: false});
        }
        
        res.send({
            gkProgramListCount: gkProgramListCount
        });
    } catch (error) {
        console.error("Error getting program count:", error);
        res.status(500).json({success: false, error: error.message});
    }
})
// Home tution api
router.get('/get/homeTution', async (req, res) =>{
    try {
        const gkhomeTution = await GKProgram.find({gkprogramHomeTution: true})

        if(!gkhomeTution){
            return res.status(500).json({success: false});
        }
        
        res.send(gkhomeTution);
    } catch (error) {
        console.error("Error getting Home Tutioned Program ", error);
        res.status(500).json({success: false, error: error.message});
    }
})
// Category Filter api
// router.get('/get/homeTution', async (req, res) =>{
//     let gkProgramFilter = []

//     try {
//         if(req.query.gkprogramArea)
//     } catch (error) {
//         console.error("Error getting Home Tutioned Program ", error);
//         res.status(500).json({success: false, error: error.message});
//     }
// })

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