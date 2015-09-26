CREATE TABLE flag_descriptions (
_id SERIAL PRIMARY KEY,
name VARCHAR(80)) ;

CREATE TABLE reports (
    _id SERIAL PRIMARY KEY,
    flag INTEGER REFERENCES flag_descriptions,
    time_reported TIMESTAMP WITH TIME ZONE NOT NULL,
    comment TEXT,
    active BOOLEAN DEFAULT TRUE -- Gives ability to "delete" a flag without removing it from history
)

