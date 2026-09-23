const express = require('express');
const router = express.Router();
const db = require('../config/firebase');
const userSchema = require('../schema/userSchema');

/**
 * @route   POST /api/users
 * @desc    Validate and store user data in Firebase Firestore
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    // 1. Validate incoming user data using Joi schema
    const { error, value } = userSchema.validate(req.body, { abortEarly: false });

    // 2. If validation fails, return 400 Bad Request with error list
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // 3. Store validated data in Firestore "users" collection
    const docRef = await db.collection('users').add({
      ...value,
      createdAt: new Date().toISOString()
    });

    // 4. Return success response with generated Firestore document ID
    return res.status(201).json({
      success: true,
      message: 'User data stored successfully',
      userId: docRef.id
    });
  } catch (err) {
    console.error('Error storing user in Firestore:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to store user data',
      error: err.message
    });
  }
});

module.exports = router;
