# login-register-demo

## What is this?
This is a simple web app. It has login/register functionality.

## How does this work?
It uses passport for user authentication,bcrypt for password hashing and mongo(with mongoose) for the database part

## Prerequisites
* MongoDB(without restricted access)

## How can I run it?
Clone repo.Then open a terminal and type npm install.After eveyrthing is completed you can now run npm start.

## More to know
Each user has the `user` role by default.That means that some areas are not accessible. To create a user with the `admin` role add their email in the array that is in <kbd>/configs/admins.js</kbd>

