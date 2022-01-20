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
