# **Meme Stream - Application**

## This is an application that is built with Express backend, React frontend and MySQL database

## **About Repo :**
This is a repo of the meme stream application.


### **Installation :**
You can install this application in a local machine or cloud for the installation you can use the scripts `install.sh` or you can follow the steps below

- Firstly, you need to install MySQL database on your system
- You need to configure it also and as using the root user in the database is not recommended create a new user and create a database
- Then you need to install nodejs and npm
- Now Clone the repo and change your present working directory to the backend
- Now either you can create environmental variables directly on ur shell or u can use the `.env.template` provide in backend create a .env file in the backend folder
- Now you need to install the required packages using `npm install` command
- After the installation is done start the application using `npm start` which will run `nodejs backend.js` and `nodejs swagger.js` parallelly
- You can follow the README.md file in the `backend` folder if needed to know in detail about the installtion of the backend
- For installation of the frontend you need to change the present working directory to `frontend` then you need to install the required software using npm start
- Then you can start the application using npm start
- Then you can start the frontend of the application by first changing the present working directory to frontend then we can install the application using `npm install` then we can start the application using `npm start`

**Note :** The scripts available on this repo have some limitations

### **To install the server on bare metal:**
You can use the follwing the to start your application on bare metal in the root directory of the project(This will start only the backend and MySQL database)
```bash
sudo chmod +x install.sh
sudo ./install.sh

sudo chmod +x server_run.sh
sudo ./server_run.sh
```

### **To install the server on docker :**
You can use the `Dockerfile` present in the root directory of the appication and run the following commands
```bash
sudo docker build -t <image_name>:<version> . 
docker run -dit <image_name>:<version> 
```