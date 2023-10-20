# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `Docker run`
We can simply build our <b>Frontend</b> with this command

`docker build -t react-app`.

To verify everything is fine, we run our newly built container using the command:

`docker run -p 3000:3000 react-app`. 

This will run just the Frontend.


We can simply build our <b>Backend</b> with this command:

`docker build -t node-app` .


### `Docker Compose`

Creating the Build
To create the build for the entire application, we need to run the following command: 

`docker-compose build`


### `Starting the Services`

We can start the multi-container system using the following simple command: 

`docker-compose up`

    http://localhost:3000  --> React Frontend.

.

    Backend server --> http://localhost:5000
.

    MongoDB is running -->  http://localhost:27017