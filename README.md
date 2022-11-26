# Virtual Classroom

A virtual classroom web application built using MERN tech stack. The website is responsive and can be used in mobile browser as well. Find the [live version here](https://virtual-classroom-mern.herokuapp.com/)

---

## Requirements for starting the project

### .env file

* ATLAS_URI=mongodb_atlas_uri
* COOKIE_SECRET=cookie_secret
* REDIS_URL=redis_url
* REDIS_PASSWORD=redisdb_password
* GOOGLE_CLIENT_ID=google_client_id

---

## How to start

Install the dependencies of backend from root folder
    
    npm install
    
Start the backend

    node server.js
    
In the client folder, install the dependencies of frontend

    npm install
    
Start the frontend

    npm start
    
---

## Website Features:
* Users can login as a teacher or as a student.
* Teachers can create or delete classrooms. New assignments and tests can be easily added and evaluated.
* Students can join classrooms using the unique classroom code. The can submit tests/assignments and also see their score
* Current, upcoming, and submitted tests/assignments along with submissions can be easily viewed on the website.
* Student can see/leave the classrooms joined.

---

## Authentication Features:
* Users can login and register using their **email** and verifying it or they can also login with **Google**.
* The password is stored in database in a hashed format using **BcryptJs**. 
* For **Authorization**, Sessions are used with cookies for storing unique **sessionID**. All major requests to the server, send response only after verifying the session ID of user, which gets assigned to the user on successful login.

---

## Technologies and APIs Used:

## FrontEnd
* The FrontEnd is built using **Reactjs, CSS/Bootstrap, HTML** and **Hooks API** for state management in React.
* **Axios** Library for API integration and making requests to backend.

## Backend
* The Backend is built using **Nodejs** with **Express** framework.
* For database, **MongoDB** Atlas is used for storing data and querying is done via **Mongoose** ORM.
* **Redis** for mapping sessionID to user data, for authentication and authorization.
* **Google OAuth2 API** for adding authentication with google.

---

## Other Features:
* Fully reusable react components have been created and used in the website.
* Extensive **Error Handling** has been used for handling corner cases.
* Code is well **structured**, **modularized** and **refactored**, all the buisness logic part is separated from the APIs, middlewares, models etc. 

The Website is deployed on **Heroku** platform.

---


    
## SNAPSHOTS

Login Page
![Login](https://user-images.githubusercontent.com/66271249/131503776-310c83be-1ea2-45da-b4d0-e0bf9fb3270b.PNG)

Register Page
![regsister](https://user-images.githubusercontent.com/66271249/131503784-263b216d-38e6-4c0a-bacf-ddb131bf6c0a.PNG)

Home Page (Teacher)
![teacherHome](https://user-images.githubusercontent.com/66271249/131504058-0231cd7f-d2c1-4aa0-a3d7-dd328389e68b.PNG)

Home Page (Student)
![studentHome](https://user-images.githubusercontent.com/66271249/131504066-3bd5a356-3881-46c9-97e2-5b5ee96d07c9.PNG)

Create a New Subject (Teacher)
![createSubject](https://user-images.githubusercontent.com/66271249/131504172-769935a4-3644-4e15-b81b-921852d85aab.PNG)

Subject Page showing details of the subject along with the tests/assignments:
![classPage - 1](https://user-images.githubusercontent.com/66271249/131504545-7316bfc7-72f8-45f8-b636-88cd5582ad25.PNG)
![classPage - 2](https://user-images.githubusercontent.com/66271249/131504525-cb1e1f34-daf7-4e2c-b682-980c0d69ea15.PNG)

Create a Test (Teacher)
![createTest](https://user-images.githubusercontent.com/66271249/131504164-03b5b468-78a3-4df0-9e3a-2c2238acd615.PNG)

Create Assignment (Teacher)
![createAss](https://user-images.githubusercontent.com/66271249/131504171-60c5f8f8-0dda-4bac-9486-14c91de47e34.PNG)

Test Page (Previous Test):
![previous test](https://user-images.githubusercontent.com/66271249/131504349-d4bfd949-8b54-4e38-96cd-b21187c943dd.PNG)

Assignments
Assignment to be submitted (Student)
![assignmentStudent](https://user-images.githubusercontent.com/66271249/131504444-662e311d-4b4b-41fc-a0d1-8060b7b2b53d.PNG)

Evaluated Assignment (Student)
![submittedAssignment](https://user-images.githubusercontent.com/66271249/131504452-58c9f871-00b1-47c0-9d62-365854f82dfd.PNG)

Assignment Page (Teacher)
![assignmentSubmissions](https://user-images.githubusercontent.com/66271249/131504458-ba4c9b54-54f3-49ec-a7c7-8c6c029cc7fc.PNG)
