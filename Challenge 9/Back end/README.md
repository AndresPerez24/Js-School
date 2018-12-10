## Challenge 07

### prerequisites

- clone the repository
- Install the dependencies:
  ```
      npm install
  ```
- Set your own environmental variables in the file .env
- download MongoDB, install it, open a terminal and run:
  ```
      mongod
  ```
- To autofill the database:

  ```
    npm run populate
  ```

- Preparing the environment:

  open .env file and change the values when required, the environment is already set with default values for developers

- Run the project with:
  ```
      npm start
  ```
- Create a user using postman in order to have access to the Bookshelf:

    -   Open postman and make a post request to http://localhost:{PORT}/signup

        Go to body and use the following syntax in order to create a new user:
        {
            "email": "",
            "password" : ""
        }

                In order to see if the user was succesfully created, paste the following code in the termial were mongo is currently running
    ```
        db.users.find().pretty()
    ```
