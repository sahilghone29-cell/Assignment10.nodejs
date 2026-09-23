const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Determine service account key file path
const defaultKeyPath = path.join(__dirname, '../serviceAccountKey.json');
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || defaultKeyPath;

try {
  if (admin.apps.length === 0) {
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        })
      });
    } else {
      // Initialize with default credentials
      admin.initializeApp();
    }
    console.log('Firebase Firestore connected successfully');
  }
} catch (error) {
  console.error('Firebase connection error:', error.message);
}

const db = admin.firestore();

module.exports = db;
