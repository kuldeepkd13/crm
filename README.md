# Employee and Enquiry Management System

This backend application provides a Customer Relationship Management (CRM) system for managing employees and handling client enquiries. It's designed with Node.js, Express.js, and MongoDB 

## Table of Contents

 - [Features](#features)
 - [Technologies](#technologies-used)
 - [Installation](#installation)
 - [Routes](#routes)
   - [Employee Management](#employee-management)
   - [Enquiry Management](#enquiry-management)


## Features

### Employee Management:

- Register new employees
- Authenticate and login existing employees
- Secure password storage using bcrypt
- Generate JWT tokens for authenticated users

### Enquiry Management:

- Allow prospective clients to submit enquiries through a public form.
- Enable employees to claim and manage enquiries.
- Retrieve unclaimed enquiries.
- Fetch enquiries claimed by logged-in users.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT-based authentication



## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/crm.git
   cd crm
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB connection by creating a `.env` file in the root directory with the following content:

   ```env
   MONGOURL=your-mongodb-connection-string
 
   ```

   Replace `your-mongodb-connection-string` with your MongoDB connection string .

4. Run the application:

   ```bash
   npm run server
   ```

   The server will be running on http://localhost:8080 by default.

## Routes

### Employee Management

| Method | Endpoint             | Description              | Authentication Required  |
| ------ | ---------------------| ------------------------ | ------------------------ |
| POST   | `/employee/register` | Create a new user        | No                       |
| POST   | `/employee/login`    | Log in an existing user  | No                       |

### Enquiry Management

| Method | Endpoint                   | Description                                     | Authentication Required |
| ------ | ---------------            | -----------------------------------             | ------------------------ |
| POST   | `/enquiry/publicform`      | Submit an enquiry through a public form         | No                       |
| PATCH  | `/enquiry/claim/:enquiryId`| Claim an enquiry by an authenticated employee   | Yes                      |
| GET    | `/enquiry/unclaimed`       | Get all unclaimed enquiries                     | Yes                      |
| GET    | `/enquiry/myClaim`         | Get enquiries claimed by the logged-in employee | Yes                      |                     |
