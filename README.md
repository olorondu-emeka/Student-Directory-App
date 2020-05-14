# Student Directory (Client)
The Front-End(Client) for the Student Directory App. 

## Brief Description
A simple student directory application, built to practice concepts learnt in building front-end applications with React.

These features are summarized below:
* Register students
* Manage courses (Create/Read/Update/Delete)  
* Manage Student (Read/Update/Delete biodata)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### Prerequisites
System requirements for this project to work includes:
* Node.js(v8 or higher)
* MongoDB (v4 or higher)

### Installation
To install the dependencies in the ***package.json*** file, run the following command in the terminal:  

```bash
npm install
```

### Running the project
To run the project on your local machine:
* Ensure that the [Student-Directory-API](https://github.com/olorondu-emeka/Student-Directory-API) project is running on your machine
* Change the **baseURL** property in the ***axios-instance.js*** file contained in the **src** folder to [http://localhost:5000/api/student]().  

* In the project directory, run the following command in the terminal:

 ```bash
 npm start
 ```

This runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Built With
* [React.js](https://reactjs.org/) - The Node.js web framework used
* [Redux](https://redux.js.org/) - State Managment library for React
* [Axios](https://github.com/axios/axios) - HTTP client for the browser
* [NPM](https://www.npmjs.com/) - Dependency Manager for Node.js
