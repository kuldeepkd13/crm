const express = require("express");

// Import the EnquiryModel and auth middleware
const { EnquiryModel } = require("../models/enquiryModel");
const { auth } = require("../middleware/authMiddleware");

// Create an Express router
const enquiryRoute = express.Router();

// Route to handle form submissions
enquiryRoute.post("/publicform", async (req, res) => {
    try {
        // Extract data from the request body
        const { name, email, courseInterest } = req.body;

        // Create a new enquiry using the EnquiryModel
        const enquiry = new EnquiryModel({
            name,
            email,
            courseInterest
        });

        // Save the enquiry to the database
        await enquiry.save();

        
        res.status(201).json({ message: 'Enquiry submitted successfully.' });

    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// API to claim leads
enquiryRoute.patch('/claim/:enquiryId', auth, async (req, res) => {
    try {
        // Extract enquiryId from the request parameters and userId from the authenticated user
        const { enquiryId } = req.params;
        const claimedBy = req.body.userId;

        // Check if the enquiry exists
        const enquiry = await EnquiryModel.findById(enquiryId);
        if (!enquiry) {
            // Respond with a not found message if the enquiry is not found
            return res.status(404).send({ message: 'Enquiry not found.' });
        }

        // Update the enquiry with the claimedBy field
        enquiry.claimedBy = claimedBy;
        await enquiry.save();

        
        res.status(200).send({ message: 'Enquiry claimed successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// API to fetch unclaimed leads
enquiryRoute.get('/unclaimed', auth, async (req, res) => {
    try {
        // Find all unclaimed enquiries (where claimedBy field does not exist)
        const unclaimedEnquiries = await EnquiryModel.find({ claimedBy: { $exists: false } });

        // Respond with the unclaimed enquiries
        return res.status(200).send(unclaimedEnquiries);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// API to fetch leads claimed by logged-in users
enquiryRoute.get("/myClaim", auth, async (req, res) => {
    try {
        // Extract userId from the authenticated user
        const claimedBy = req.body.userId;

        // Find all enquiries claimed by the user
        const myClaimedEnquiry = await EnquiryModel.find({ claimedBy });

        // Respond with the claimed enquiries
        if (myClaimedEnquiry.length === 0) {
            
            return res.status(400).send({ "message": "No Enquiry is claimed by you" });
        }

        res.status(200).send({ myClaimedEnquiry });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = { enquiryRoute };
