const { GKUser } = require('../models/gkUser');
const { GKFeedback } = require('../models/gkFeedback');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/:userId/feedbacks`, async (req, res) => {
    try {
        const feedbacks = await GKFeedback.find({ gkuser: req.params.userId });
        res.json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get(`/`, async (req, res) => {
    try {
        const feedbacks = await GKFeedback.find();
        res.json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post(`/`,  async (req, res) =>{
    const gkuser = await GKUser.findById(req.body.gkuser);
    if(!gkuser) return res.status(400).send("Invlaid User");
    
    
 
    let gkFeedback = new GKFeedback({
        feedback: req.body.feedback,
        stars: req.body.stars,
        gkuser: req.body.gkuser,
    })

    gkFeedback = await gkFeedback.save();

    if(!gkFeedback)
    return res.status(404).send('The Feedback cannot be created')
    
    res.send(gkFeedback);
 
 });


router.delete('/:id', async (req, res)=>{
    try {
        const feedbacks = await GKFeedback.findByIdAndDelete(req.params.id);
        if (!feedbacks) {
            return res.status(404).send('Could not find the feedback');
        }
        res.send(feedbacks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get feedbacks for a specific user
router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const feedbacks = await GKFeedback.find({ gkuser: userId });
        res.json({ success: true, data: feedbacks });
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;


