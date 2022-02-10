# Contrio

## Set up Virtual Environment
1. Install virtualenv
```pip install virtualenv```
1. Create a virtualenv. Navigate to the root directory of this project (or wherever you want the virtual env to live) and do
```virtualenv [name of venv]```
e.g.
```virtualenv venv```
1. Activate the virtual environment. On Windows, navigate to the virtual environment folder
```.\venv\Scripts\activate```
You might need to run activate.bat or activate.ps1 instead depending on the terminal you use
1. You should see `(venv) [whatever you normally see]`
1. Now you can do `pip install ...` and finish setting up

## **Set up Backend Server**
1. Ensure flask installed, preferably by activating the venv you already set up. You can also run
```pip install -r requirements.txt```
1. Navigate to the `\server\` folder and start the server with the command
```flask run```

## **Set up Amplify Cognito**
1. Run `npm install -g @aws-amplify/cli`
2. Run `amplify configure`
3. Skip the step to log into AWS console
4. Select `us-west-2` for Region
5. Skip the step to create new IAM user
6. Enter accessId
7. Enter accessKey
8. Run `amplify pull`
9. Enter accessId again
10. Enter accessKey again
11. Run `npm start`