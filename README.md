# Create React Express App

## About This Boilerplate

This setup allows for a Node/Express/React/JWT app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

An article on how the server is setup with JWT can be found [here](https://hptechblogs.com/using-json-web-token-for-authentication/). This has been modified to use a mongo database instead of hardcoded array of users.

The front end has been setup to use JWT as a way of authenticating users and routes. To understand it's structure better please refer to the following article [here](https://hptechblogs.com/using-json-web-token-react/)

Please feel free to modify this code in anyway you see fit for your project. It is a boilerplate setup that tries to make sure you can get something up and running without having to worry about setting up user authentication from scratch.
I highly suggest you read the articles before jumping in so you can have an better understanding of how everything works in the code. 

Server-side article and using JWT: https://hptechblogs.com/using-json-web-token-for-authentication/

Front End article on using the JWT on a react application: https://hptechblogs.com/using-json-web-token-react/

## Starting the app locally

Add a .env at the top level of this project.

Then inside of the .env add a SERVER_SECRET set to any value you'd like

```
SERVER_SECRET = 123456
```

First off make sure you have a local version of MongoDB running on your machine. This project will make a local database for you called `appDB`.

```
mongod
```

Start by installing front and backend dependencies. While in the root directory, run the following command:

```
npm install
```

After all installations complete, run the following command in your terminal:

```
npm start
```

That's it, your app should be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

### Create a Git Repo

Once you're ready to deploy, start by making sure your project is a git repository. If so, proceed to the next section, otherwise run the following commands in your terminal:

```
git init
git add .
git commit -m "Initial commit"
```

### Deploying

1. Go onto your heroku account and link your repository through the UI
2. Go to resources and find mLab as a Add-on
3. Provision a Mongo Database
4. Go back and click "Deploy"
