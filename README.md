# Assignment 10 – Store Data in Firebase Firestore Using Express.js

## Student Details

* **Name:** Sahil Ghone
* **Student ID:** 150096725002
* **Assignment No.:** 10
* **Subject:** Node.js
* **Project Folder:** `Assignment10`

---

## Aim

To create an Express.js backend application that accepts user data via a `POST` HTTP request, validates the data using **Joi** schema validation, and securely stores valid records inside a **Firebase Firestore** collection (`users`).

---

## Problem Statement

Create an Express.js server connected to Firebase Firestore using the Firebase Admin SDK. Before storing any data, validate the incoming payload (`name`, `email`, `age`, `course`). If validation passes, persist the data in Firestore and return a `201 Created` status code with the generated document ID. If validation fails, reject the request with a `400 Bad Request` status and detailed error messages without modifying Firestore.

---

## Technologies Used

* **Node.js** – JavaScript runtime environment
* **Express.js** – Web application framework for Node.js
* **Firebase Admin SDK (`firebase-admin`)** – Server-side SDK for Firebase services
* **Firebase Firestore** – Cloud NoSQL document database
* **Joi** – Data validation library for JavaScript
* **dotenv** – Zero-dependency module that loads environment variables from a `.env` file

---

## Folder Structure

```text
Assignment10/
├── server.js
├── package.json
├── package-lock.json
├── README.md
├── .env.example
├── .gitignore
│
├── config/
│   └── firebase.js
│
├── schema/
│   └── userSchema.js
│
└── router/
    └── userRouter.js
```

---

## Firebase Setup

Follow these steps to configure Firebase Admin SDK for this project:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project (e.g., `NodeJS-Assignment10`).
3. In the project dashboard, navigate to **Build** → **Firestore Database**.
4. Click **Create database**, select a region, and choose **Start in test mode** (or set appropriate security rules).
5. Navigate to **Project Settings** (gear icon) → **Service accounts**.
6. Select **Node.js** and click **Generate new private key**.
7. Download the generated JSON key file and rename it to `serviceAccountKey.json`.
8. Place `serviceAccountKey.json` inside the root directory of `Assignment10/`.
   *(Note: `serviceAccountKey.json` is listed in `.gitignore` to prevent credential exposure).*

---

## Installation

1. Clone or open the repository in your terminal.
2. Navigate to the project directory:

```bash
cd Assignment10
```

3. Install project dependencies:

```bash
npm install
```

---

## Environment Configuration

Create a `.env` file in the project root directory (or copy from `.env.example`):

```bash
cp .env.example .env
```

Set the contents of `.env` as follows:

```env
PORT=5000
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
```

---

## How to Run

To start the server, execute:

```bash
npm start
```

Upon successful initialization, your terminal will display:

```text
Server running on http://localhost:5000
Firebase Firestore connected successfully
```

---

## API Endpoint Details

### 1. Server Health Check

* **Method:** `GET`
* **URL:** `http://localhost:5000/`
* **Response:**

```json
{
  "success": true,
  "message": "Express.js Server is running successfully",
  "assignment": "Assignment 10 - Store Data in Firebase Firestore Using Express.js",
  "student": {
    "name": "Sahil Ghone",
    "id": "150096725002"
  }
}
```

---

### 2. Create User API

* **Method:** `POST`
* **URL:** `http://localhost:5000/api/users`
* **Header:** `Content-Type: application/json`

---

## Schema Validation Rules

Data validation is enforced using **Joi** inside `schema/userSchema.js`:

| Field | Type | Validation Rules |
| :--- | :--- | :--- |
| `name` | String | **Required**, non-empty, whitespace trimmed |
| `email` | String | **Required**, valid email format (`user@example.com`) |
| `age` | Number | **Required**, integer between **18** and **100** |
| `course`| String | **Required**, non-empty, whitespace trimmed |

---

## Sample API Requests & Responses

### Successful Request Example

**Postman Body (raw JSON):**

```json
{
  "name": "Sahil Ghone",
  "email": "sahilghone29@gmail.com",
  "age": 19,
  "course": "B.Tech CSE"
}
```

**HTTP Status:** `201 Created`

**Response Body:**

```json
{
  "success": true,
  "message": "User data stored successfully",
  "userId": "9xK2mP0vL3rQ8aB7z"
}
```

---

### Validation Error Request Example

**Postman Body (raw JSON):**

```json
{
  "name": "",
  "email": "invalid-email-format",
  "age": 15,
  "course": ""
}
```

**HTTP Status:** `400 Bad Request`

**Response Body:**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name is required",
    "Email must be a valid email",
    "Age must be at least 18",
    "Course is required"
  ]
}
```

---

## Firestore Data Structure

Upon a successful `POST /api/users` request, the document is stored in Firestore as follows:

```text
Firestore Database
└── users (Collection)
    └── [generated-document-id] (Document)
        ├── name: "Sahil Ghone"
        ├── email: "sahilghone29@gmail.com"
        ├── age: 19
        ├── course: "B.Tech CSE"
        └── createdAt: "2026-09-23T13:49:05.000Z"
```

---

## Error Handling

* **Validation Failures (HTTP 400):** Requests failing Joi schema validation are caught immediately. An error response with a list of field error messages is returned, and no write operation reaches Firestore.
* **Database / Server Errors (HTTP 500):** Unexpected server or Firestore connectivity errors are caught in `try...catch` blocks and returned as an HTTP `500` JSON response.

---

## Screenshots Required for Submission
<img width="815" height="848" alt="Screenshot 2026-09-23 at 2 09 33 PM" src="https://github.com/user-attachments/assets/f91cf6e9-bd7d-4aca-80fa-f6d208ee2d1c" />
<img width="815" height="848" alt="Screenshot 2026-09-23 at 2 08 53 PM" src="https://github.com/user-attachments/assets/10bcbd2c-f0d3-488b-82f7-9b0b89dbccfe" />
<img width="1470" height="834" alt="Screenshot 2026-09-23 at 2 08 31 PM" src="https://github.com/user-attachments/assets/c362159c-0912-43c5-ae4f-e2f206550526" />
<img width="825" height="152" alt="Screenshot 2026-09-23 at 1 59 07 PM" src="https://github.com/user-attachments/assets/a8b13427-e10e-46be-bda0-bb091b2f6600" />





## Conclusion

This assignment successfully demonstrates connecting an **Express.js** application to **Firebase Firestore** using **Firebase Admin SDK** with mandatory **Joi** schema validation before database persistence.
