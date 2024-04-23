<h1>AssetTracker :man_technologist: :woman_technologist:</h1>

<h3>Overview</h3>
This project is a web application developed for ACME, allowing an administrator to manage company assets, developers, and users. The application provides a dashboard to view and manipulate data, including assets, developers, and users.

<h3>Features</h3>
<h4>Dashboard:</h4> 
Provides an overview of company assets, developers, and users.  
<h4>Asset Management:</h4>
View all company assets in a table.
Edit, delete, and create new assets.
<h4>Developer Management:</h4> 
View all developers and their assigned assets.
Edit, delete, and create new developers.
Assign assets to developers.
<h4>User Management:</h4>
View all users and their details.
Edit, delete, and create new users.
Disable/enable users, preventing login if disabled.
- Login: Users can log in using their username and password. Once logged in, a token is stored in local storage to avoid repeated login requests.
- Toasts: Utilizes toast notifications for user feedback.

<h3>Installation :gear:</h3>
The project can be installed and run in two different ways: using npm directly or via Docker.

<h4>Installation with npm</h4>

Clone the repository:
git clone <REPOSITORY_URL>
Navigate to the project directory:
cd project_name
Install dependencies:
npm install
Run the project:
npm start
This will start the backend server and frontend in development mode.

<h4>Installation with Docker</h4>

Clone the repository:
git clone <REPOSITORY_URL>
Navigate to the project directory:
cd project_name
Build the Docker image:
docker build -t image_name .
Run the container:
docker run -p 3000:3000 image_name
This will start the Docker container and run the application on port 3000.

<h3>Usage :computer:</h3>
Once the application is installed and running, you can access it from your web browser by visiting http://localhost:3000 (or the port where the application is configured).
