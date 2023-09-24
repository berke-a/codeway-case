# Project

## Table of Contents  
<ul>
   <li><a href="#description">Description</a></li>
   <li><a href="#installation">Installation</a></li>
   <li><a href="#authorization">Authorization</a></li>
   <li><a href="#api-endpoints">API Endpoints</a></li>
   <li><a href="#project-structure">Project Structure</a></li>
</ul>



## Description 
This is a full stack application that allows users to create, read, update, and delete configuration items. I've used `NodeTS` and `Express` to create a RESTful API, `VueJS` to create the front end, and `Firebase` for the database and authentication. 

I didn't utilize `typescript` for the front end because I didn't have prior experience with VueJS. I wanted to get the application up and running as quickly as possible.

I've deployed the fullstack application to `Google Cloud Platform`. The application is running on `https://frontend-dot-codeway-task-399914.lm.r.appspot.com/`.

## Installation
1. Clone the repository
2. Run `npm install` in the root directory. This will concurrently install the server and client dependencies.
3. Run `npm start` in the root directory. This will concurrently start the server and client.
4. The application will be running on `http://localhost:8080/`

## Authorization
Login with an existing account. 
   - Email: `berke@codeway.com`
   - Password: `codeway`


## Screenshots

### Desktop
<img src="https://imgur.com/LGz0U5j.jpeg" width="600"/>
<img src="https://imgur.com/8X5xjCK.jpeg" width="600"/>
<img src="https://imgur.com/lFTVvmY.jpeg" width="600"/>

### Mobile
<img src="https://imgur.com/Uvl55RZ.jpeg" width="600"/>


## API Endpoints
| Method | Endpoint       | Description                       |
| ------ | -------------- | --------------------------------- |
| POST   | /signing       | Sign in                           |
| GET    | /              | Get all configurations            |
| GET    | /json          | Get configurations in JSON format |
| PUT    | /:parameterKey | Update a configuration            |
| POST   | /              | Create a configuration            |
| DELETE | /:parameterKey | Delete a configuration            |


## Project Structure
```
.
├── app-ui (frontend)
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── views
│   │   ├── App.vue
│   │   ├──
│   │   ├── firebaseConfig.js
│   │   ├── main.js
│   │   ├── router.js
│   │   ├── store.js
│   │   └── utils.js
│   ├──
│   ├── app.yaml
│   ├── package.json
│   └── .env
│
├── app (backend)
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├──
│   │   ├── firebaseConfig.ts
│   │   ├── middlewares.ts
│   │   └── utils.ts
│   ├──
│   ├── app.ts
│   ├── app.yaml
│   ├── package.json
│   └── .env
│
├── package.json
└── README.md
```

