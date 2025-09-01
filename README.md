# MetaWebSocial

**The purpose is building a social media meta 2D-world for youngblud**

# MERN Stack Template for Public Use

## Description

No nonsense, extremely simplistic MERN stack boilerplate

#Structure
File Structure

```
.
├──client
│   ├──...
│   └──...
├──server
│   ├──...
│   └──...
└──Readme.md
```

The "client" folder runs the frontend of the app

The "server" folder runs the backend of the app

Installation (in dev stage, this is essential(mandatory)!!!)
run the following commands in order to set up the client and server properly.

```
For root:
cd ./
npm install
```

```
For client:
cd ./client
npm install
```

```
For server:
cd ./server
npm install
```

Additionally, you will need to connect the server to a mongoDB database using the .env file. To be more specific, you will need the .env to contain the variable MONGO_URI configured to your database with associated Username and Password.
Please place your own .env file in /server/. location by default.

### Set the packages in the package.json file for the application run dev && deploy.

Dev stage: npm run dev
