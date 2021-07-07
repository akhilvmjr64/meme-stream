# MEME-STREAM BACKEND APPLICATION

## **Backend**

### **Installation**

Download the git repo and change the present working directory to backend and use the following command

```
npm install
```

### **Configuring the backend application**
For configuring the application you need to either set the environmental variables or use a `.env` file where you need to give the environmental variables

- `PORT` - Enivronmental variable to set the port for the backend application

- `HOST` - Hostname for the database this backed application is built for mysql database hence installation of mysql is a prerequisite

- `DATABASE` - Database name you need to create a database in which there should be a table with name xmeme with 4 columns id, name, caption and url where id column should be auto incremented when a row is added

- `USER` - Username for the database

- `PASSWORD` - Password for the database

Instead of creating the environmental variable you can use the file template `.env.template` and create a `.env` file

**Note**: By default the `swagger` will be running on port 8080 you can change the port in the `swagger.js` file by changing the value of `port` variable in line 4

### **Starting the backend application**
You can start the application after installing and configuring the application. Using the following command it will execute the commands `node backend.js` and `node swagger.js` both pararallelly

```
npm start
```