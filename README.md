# Final Project Fall 2024 - UpLeveled

## RaterHood 🌍

RaterHood is a platform where users can share reviews about cities and neighborhoods. Whether you want to explore a new city or provide feedback on your own, RaterHood connects users with the collective experiences of others.

### Features

- User Authentication and Authorization: Sign up and log in securely with session cookies for logged-in users.
- Interactive Map: Choose cities to review using an embedded map powered by MapLibre and MapTiler.
- Write Reviews: Authenticated users can write reviews for selected cities, including ratings and additional feedback.
- Recent Reviews: Non-logged-in users can view the 4 most recent reviews, encouraging engagement.
- Responsive Design: Fully optimized for all devices, ensuring a seamless experience on desktops, tablets, and mobiles.
  
### Screenshots


(Add a link to a screenshot of your app here.)

### Tech Stack

RaterHood is built using modern technologies to deliver a smooth and engaging user experience:

** Frontend **
- React with TypeScript: To build a scalable and type-safe user interface.
Next.js: For server-side rendering and seamless routing.
SCSS/SASS: For styling the app, allowing for modular and maintainable CSS.
Backend
Node.js: The runtime for server-side logic.
Next.js API Routes: For handling server-side requests and logic.
Database
PostgreSQL: For robust and structured data storage.
Geospatial and Maps
MapLibre: Open-source map rendering library.
MapTiler: For map tiles and styles, providing a visually appealing and interactive map experience.
Authentication
Session Cookies: Secure session management for logged-in users.
Installation

Follow these steps to run RaterHood on your local machine:

Prerequisites
Node.js v16+
PostgreSQL
Steps
Clone the repository:
git clone https://github.com/your-username/raterhood.git
cd raterhood
Install dependencies:
npm install
Set up environment variables:
Create a .env file and add the following:
DATABASE_URL=your_database_url
MAPTILER_API_KEY=your_maptile_api_key
SESSION_SECRET=your_session_secret
Set up the database:
Create a PostgreSQL database.
Run migrations or use an ORM (like Prisma) to initialize your schema.
Run the development server:
npm run dev
The app will be available at http://localhost:3000.
Usage

For Visitors
Browse the landing page.
View the most recent reviews without logging in.
For Registered Users
Sign up or log in.
Select a city from the dropdown or the interactive map.
Submit reviews, including a rating, comments, and tags.
Challenges and Learnings

Dynamic Mapping: Learning and integrating MapLibre and MapTiler for an interactive map experience.
Authentication & Authorization: Implementing secure session-based authentication using cookies.
Styling: Mastering SCSS/SASS to create responsive, maintainable, and clean designs.
Asynchronous Programming: Handling multiple API requests and optimizing data fetching with React hooks.
Future Features

Neighborhood Reviews: Extend reviews to specific neighborhoods within cities.
User Profile: Add personal dashboards to view user-submitted reviews.
Search Functionality: Enable search by city or keyword.
Contributing

Contributions are welcome! To contribute:

Fork the repository.
Create a new branch.
Make your changes and submit a pull request.
Acknowledgments

OpenAI: For guidance and problem-solving during development.
MapLibre & MapTiler: For the open-source tools that powered the interactive map.
Contact

Developed by Mercedesz (Merci). Feel free to connect with me:

LinkedIn
GitHub
License
This project is licensed under the MIT License.


