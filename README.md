# Customer Portal & Employee International Payments Portal

## Overview

This project includes two portals: one for customers and one for employees. It allows customers to register, log in, and process international payments securely. The app is built with **Express.js** for the backend, **React.js** for the frontend, and **MongoDB** for data storage. The customer portal lets customers create and manage their payments, while the employee portal provides administrative functions to manage and verify transactions.

## Team 
- Darius Dylan Govender (ST10144906)
- Jaden Peramul (ST10204523)
- Jordan Farrell (ST10069637)
- Cael Botha-Richards (ST10108175)
- Ryan Taylor (ST10063915)

## Prerequisites

Before starting the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (MongoDB Atlas or local setup)
- [VS Code](https://code.visualstudio.com/)



## Setup Instructions

### Backend Setup

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/ST10144906/APDS7321-POE.git

   
## Setup Backend

To set up the backend of the application, follow these steps:

1. Open a new terminal window.
2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Create a new file named `.env` in the backend directory. This file will hold your environment variables. You can obtain your MongoDB URI from the MongoDB Atlas website. The URI will be unique to your MongoDB account.

   - Add the following line to your `.env` file, replacing the placeholders with your actual MongoDB credentials:

     ```plaintext
     MONGO_URI=mongodb://your_username:your_password@your_host:your_port/your_database_name
     ```

4. Install the necessary dependencies by running the following command:

   ```bash
   npm install
   ```

5. Start the backend server:

   ```bash
   npm start
   ```

   The backend server should now be running on [http://localhost:5000](http://localhost:5000) and this should be the output text
   ```
   ``Server running on port 5000
   ``MongoDB connected
   ```

## Setup Frontend

To set up the frontend of the application, follow these steps:

1. Open a new terminal window.
2. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

3. Install the necessary dependencies by running the following command:

   ```bash
   npm install
   ```

4. Start the frontend application:

   ```bash
   npm start
   ```

   The frontend application should now be running on [http://localhost:3000](http://localhost:3000).

## Running the Application
- The backend server should be running on http://localhost:5000.
- The frontend application should be running on http://localhost:3000.
- Ensure both servers are running simultaneously to interact with the app.


## Note: install the following dependecies for protecting against atacks

```bash 
npm install express mongoose cors dotenv helmet express-rate-limit express-session xss-clean express-brute morgan bcryptjs
```

## Security Considerations
### The app implements several security features to protect user data and prevent attacks:

- Helmet:Adds security-related HTTP headers to prevent various types of attacks (e.g., clickjacking, XSS).
- Rate Limiting: Limits the number of requests a user can make in a given time frame, helping to prevent brute force attacks.
- Input Sanitization: Utilizes xss-clean to sanitize user input and prevent XSS attacks.
- Password Hashing: Passwords are hashed using bcrypt for secure storage.
- CSRF Protection: Cross-Site Request Forgery protection to prevent unauthorized requests.
- Secure Cookies: Uses httpOnly cookies to store session tokens, preventing client-side access.
- Session Management: Uses session cookies to maintain user sessions, with security configurations based on environment.

## Technology Stack
- Frontend: React.js, React Router
- Backend: Express.js, Node.js, MongoDB
- Database: MongoDB
- Authentication: bcryptjs, express-session, JSON Web Tokens (JWT)
- Security: helmet, xss-clean, rate-limiting, express-brute
