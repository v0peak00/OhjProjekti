# Assignment for passing the course

## PostgreSQL
### Command for car table creation
    CREATE TABLE car (
    car_id SERIAL PRIMARY KEY,
    branch VARCHAR(50),
    model VARCHAR(50)
    );
##  Qt Application
Qt is a cross-platform application framework that allows developers to create applications for desktop and mobile platforms. It provides a set of libraries and tools for building graphical user interfaces, handling network requests, working with databases, and more.

This sample Qt application demonstrates how to fetch, display, add, update, and delete data using REST API calls. It includes a user interface with various widgets such as push buttons, line edits, and text edits. The application connects to a server using HTTP requests and processes the JSON data returned by the server. The application can be easily modified to work with other REST APIs and can be extended to include more features and functionality.

### How to run the application
To run the application, follow these steps:

Open the project in Qt Creator.
Build and run the application.
The application requires an active internet connection and a server that supports REST API calls.

### Application features
The application includes the following features:

    1. Fetch data from a REST API and display it in a text edit widget with **GET** request
    2. Add new data to the REST API by sending a **POST** request.
    3. Update existing data in the REST API by sending a **PUT** request.
    4. Delete data from the REST API by sending a **DELETE** request.
    5. Check the HTTP response code and display a message in the text edit widget.
