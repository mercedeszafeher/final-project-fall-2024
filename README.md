# Final Project Fall 2024 - UpLeveled

## RaterHood 🌍

RaterHood is a platform where users can share reviews about cities and neighborhoods. Whether you want to explore a new city or provide feedback on your own, RaterHood connects users with the collective experiences of others.

### Features

- User Authentication and Authorization: Sign up and log in securely with session cookies for logged-in users.
- Interactive Map: Choose cities to review using an embedded map powered by MapLibre and MapTiler.
- Write Reviews: Authenticated users can write reviews for selected cities, including ratings and additional feedback.
- Recent Reviews: Non-logged-in users can view the 3 most recent reviews, encouraging engagement.
- Responsive Design: Fully optimized for all devices, ensuring a seamless experience on desktops, tablets, and mobiles.
  
### Screenshots

_Frontend Design_

<img width="1049" alt="Screenshot 2024-11-29 at 14 34 12" src="https://github.com/user-attachments/assets/a15de004-1de4-4d14-8444-93f3f095b769">


<img width="1276" alt="Screenshot 2024-11-29 at 15 59 37" src="https://github.com/user-attachments/assets/ee79f2ee-e7c6-4b55-abb7-1a6c4e3e2a72">



<img width="1275" alt="Screenshot 2024-11-29 at 14 35 38" src="https://github.com/user-attachments/assets/e88a029c-211c-432e-bb47-8a307785ef79">

_Database setup_

<img width="637" alt="Screenshot 2025-01-08 at 18 59 03" src="https://github.com/user-attachments/assets/15891d16-16b4-4a83-aede-c7ecc0058b5b" />


![Screenshot 2024-10-28 at 18 32 37](https://github.com/user-attachments/assets/ce5b6ec7-8f7b-476b-aafc-289c63ffd5f6)

_Database tables & relations_

![Screenshot 2025-01-08 at 18 02 08](https://github.com/user-attachments/assets/f263f91d-2152-488b-a7a8-39ea63b0548e)


### Tech Stack

RaterHood is built using modern technologies to deliver a smooth and engaging user experience:

_Frontend_
- React with TypeScript: To build a scalable and type-safe user interface.
- Next.js: For server-side rendering and seamless routing.
- SCSS/SASS: For styling the app, allowing for modular and maintainable CSS.
  
_Backend_
- Node.js: The runtime for server-side logic.
- Next.js API Routes: For handling server-side requests and logic.
  
_Database_
- PostgreSQL: For robust and structured data storage.
  
_Geospatial and Maps_
- MapLibre: Open-source map rendering library.
- MapTiler: For map tiles and styles, providing a visually appealing and interactive map experience.
  
_Authentication_
- Session Cookies: Secure session management for logged-in users


### Usage
#### For Visitors
- Browse the landing page.
- View the most recent reviews without logging in.
#### For Registered Users
- Sign up or log in.
- Select a city from the dropdown or the interactive map.
- Submit reviews, including a rating, comments, and tags.
- User Profile: personal dashboards to view user-submitted reviews.


### Installation

Follow these steps to run RaterHood on your local machine:

#### Prerequisites
  - Node.js v16+
  - PostgreSQL
    
#### Steps
1) Clone the repository:
```
git clone git@github.com:mercedeszafeher/final-project-fall-2024.git
cd final-project-fall-2024
```
2) Install dependencies:
```
npm install
```
3) Set up environment variables:
Create a .env file and add the following:
```
DATABASE_URL=your_database_url
MAPTILER_API_KEY=your_maptile_api_key
SESSION_SECRET=your_session_secret
```
4) Set up the database:
  - Create a PostgreSQL database.
  - Run migrations or use an ORM (like Prisma) to initialize your schema.
5) Run the development server:
```
npm run dev
```

The app will be available at http://localhost:3000.
  
### Challenges and Learnings

- Dynamic Mapping: Learning and integrating MapLibre and MapTiler for an interactive map experience.
- Authentication & Authorization: Implementing secure session-based authentication using cookies.
- Styling: Mastering SCSS/SASS to create responsive, maintainable, and clean designs.
- Asynchronous Programming: Handling multiple API requests and optimizing data fetching with React hooks.
  
### Future Features

- Neighborhood Reviews: Extend reviews to specific neighborhoods within cities.
- Individual City Pages with Map. A dedicated page for each city, showing detailed neighborhood maps and filtered reviews.
- Advanced Review Filters. Filter reviews based on multiple attributes (e.g., parking, infrastructure, building condition).
- Search Functionality: Enable search by city or keyword. And later implement search functionality to find cities/neighborhoods by criteria (e.g., cheapest rent, best public transport).
-  Build an admin panel for managing reviews, users, and city data.

## Acknowledgments
MapLibre & MapTiler: For the open-source tools that powered the interactive map.

### Contact

Developed by Mercedesz A. Feher. Feel free to connect with me:

👤[LinkedIn](www.linkedin.com/in/mercedesz-a-feher)

👩🏼‍💻[GitHub](https://github.com/mercedeszafeher)


#### License

Copyright © 2024 Mercedesz A. Feher. All rights reserved.


