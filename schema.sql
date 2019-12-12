CREATE TABLE IF NOT EXISTS cityLocation(
    id SERIAL PRIMARY KEY,
    searchQuery VARCHAR(255),
    formattedQuery VARCHAR(255),
    latitude VARCHAR(255),
    longitude VARCHAR(255)

);

CREATE TABLE IF NOT EXISTS weather(
    searchQuery VARCHAR(255),
    summary TEXT,
    timeDay DATE
);

CREATE TABLE IF NOT EXISTS events(
    searchQuery VARCHAR(255),
    link VARCHAR(255),
    eventName VARCHAR(255),
    eventDate DATE,
    eventDetails TEXT
);



