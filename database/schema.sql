-- this is my first command of github 
CREATE DATABASE resume_builder;

USE resume_builder;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE resumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    personal_details JSON,
    education JSON,
    experience JSON,
    skills JSON,
    projects JSON,
    extracurricular JSON,
    certifications JSON,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

