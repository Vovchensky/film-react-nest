CREATE TABLE IF NOT EXISTS films (
    id UUID PRIMARY KEY,
    rating REAL,
    director VARCHAR(255),
    tags TEXT[] DEFAULT '{}',
    image VARCHAR(255),
    cover VARCHAR(255),
    title VARCHAR(255),
    about TEXT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS schedules (
    id UUID PRIMARY KEY,
    daytime VARCHAR(255) NOT NULL,
    hall INTEGER NOT NULL,
    "rows" INTEGER NOT NULL,
    seats INTEGER NOT NULL,
    price INTEGER NOT NULL,
    taken TEXT[] DEFAULT '{}',
    film_id UUID REFERENCES films(id) ON DELETE CASCADE
);