CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_pic TEXT,
    location VARCHAR(100),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Cities (
    city_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    description TEXT,
    map_url TEXT
);

-- Stores data about neighborhoods within each city, linked to the Cities table
CREATE TABLE Neighborhoods (
    neighborhood_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    city_id INTEGER REFERENCES Cities(city_id) ON DELETE CASCADE,
    description TEXT,
    popularity INTEGER DEFAULT 0
);

-- Define an ENUM type for ratings to ensure consistent values between 1 and 5
CREATE TYPE rating_level AS ENUM ('1', '2', '3', '4', '5');

-- Stores user reviews for neighborhoods. Each review is linked to a user and a neighborhood
CREATE TABLE Reviews (
    review_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER REFERENCES Users(user_id) ON DELETE CASCADE,
    neighborhood_id INTEGER REFERENCES Neighborhoods(neighborhood_id) ON DELETE CASCADE,
    rating rating_level NOT NULL,  -- Using ENUM type for rating
    text TEXT,
    tags JSONB,  -- JSONB column for flexible tags and additional attributes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores general characteristics or attributes that describe a neighborhood, such as "Parking" or "Safety"
CREATE TABLE Features (
    feature_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

-- A join table that links neighborhoods to their features, with a score for each feature
-- We use rating_level ENUM here to enforce ratings between 1 and 5
CREATE TABLE Neighborhood_Features (
    neighborhood_id INTEGER REFERENCES Neighborhoods(neighborhood_id) ON DELETE CASCADE,
    feature_id INTEGER REFERENCES Features(feature_id) ON DELETE CASCADE,
    score rating_level NOT NULL,  -- Using ENUM type for score, values between 1 and 5
    PRIMARY KEY (neighborhood_id, feature_id)
);

-- Stores the available filter options for reviews
CREATE TABLE Filters (
    filter_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL
);

-- A join table connecting reviews to filters that apply to them
CREATE TABLE Review_Filters (
    review_id INTEGER REFERENCES Reviews(review_id) ON DELETE CASCADE,
    filter_id INTEGER REFERENCES Filters(filter_id) ON DELETE CASCADE,
    PRIMARY KEY (review_id, filter_id)
);
