\# Flight Reservation Project



This project is a flight reservation system with a frontend and backend integrated with a MySQL database. The frontend handles user interactions, while the backend manages user authentication, flight searches, and database operations.



\## Project Structure



\- \*\*Frontend (`webfiles`)\*\*: Contains HTML, CSS, and JS files for user interfaces (login, signup, flight search, booking, etc.).

\- \*\*Backend (`server.js`)\*\*: Express server handling API endpoints for login, signup, and flight searches.

\- \*\*Database (`skytrail\_database`)\*\*: MySQL database containing tables:

&nbsp; - `uss\_pass`: Stores user credentials and info.

&nbsp; - `alinfo`: Stores flight information.

&nbsp; - `customers`: Stores customer data.



\## Features Implemented



\- User signup and login (matching backend schema).

\- Flight search based on departure and arrival.

\- Integration with MySQL database.



\## How to Run



1\. Make sure MySQL server is running and the `skytrail\_database` is imported.

2\. Open a terminal in the project folder.

3\. Start the backend server:



&nbsp;  ```bash

&nbsp;  node server.js



