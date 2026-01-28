CREATE TABLE users (
    id SERIAL PRIMARY KEY,               
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, 
    password_hash TEXT NOT NULL,  
    first_name VARCHAR(50),     
    last_name VARCHAR(50),
    bio TEXT,                       
    avatar_url TEXT,    
    created_at TIMESTAMP DEFAULT NOW(),   
    updated_at TIMESTAMP DEFAULT NOW(),  
    last_login TIMESTAMP   
);
