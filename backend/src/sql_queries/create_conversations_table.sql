CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,  
    created_at TIMESTAMP DEFAULT NOW()
);