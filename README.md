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

## **Set up AWS Dynamo Database**
1. Create access keys for IAM user with Programmatic Access that has permissions for Dynamo
1. Having ran the `pip install -r requirements.txt` you should have installed `awscli` package.
1. Run `aws configure` in the command line.
1. Enter your `AWS ACCESS KEY ID`
1. Enter your `AWS SECRET ACCESS KEY`
1. Enter region name `us-west-2`
1. Enter default output format `json`

You should be able to now run the `create_table.py` in the `./server/scripts` directory and create a Table for your contracts!