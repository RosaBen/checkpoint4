CREATE DATABASE IF NOT EXISTS 4checkpoint;

USE 4checkpoint;

CREATE TABLE student (
    id int PRIMARY KEY AUTO_INCREMENT,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(100) NOT NULL,
    level ENUM(
        'Débutant',
        'Intermédiaire',
        'Avancé'
    ) NOT NULL
);

CREATE TABLE instructor (
    id int PRIMARY KEY AUTO_INCREMENT,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(100) NOT NULL,
    description Text,
    photo text
);

CREATE TABLE location (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    room VARCHAR(100),
    capacity INT,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postCode VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL
);

CREATE TABLE workshop (
    id int PRIMARY KEY AUTO_INCREMENT,
    workshopDate DATE NOT NULL,
    duration INT NOT NULL,
    workshopTime TIME NOT NULL,
    level enum(
        'Débutant',
        'Intermédiaire',
        'Avancé'
    ) NOT NULL,
    locationId INT
);

CREATE TABLE attending (
    PRIMARY KEY (studentId, workshopId),
    studentId INT,
    workshopId INT
);

ALTER TABLE attending
ADD FOREIGN KEY (studentId) REFERENCES student (id) ON DELETE CASCADE;

ALTER TABLE attending
ADD FOREIGN KEY (workshopId) REFERENCES workshop (id) ON DELETE CASCADE;

INSERT INTO
    student (
        lastname,
        firstname,
        email,
        phone,
        level
    )
VALUES (
        'Doe',
        'John',
        'test@test.com',
        '0642222222',
        'Débutant'
    ),
    (
        'Doe',
        'Jane',
        'test2@mail.com',
        '0642222223',
        'Intermédiaire'
    ),
    (
        'Doe',
        'Jack',
        'jac@test.fr',
        '0642222224',
        'Avancé'
    );

INSERT INTO
    location (
        room,
        capacity,
        address,
        city,
        postCode,
        country
    )
VALUES (
        'Room 1',
        20,
        '7 rue de la paix',
        'paris',
        '75002',
        'France'
    ),
    (
        'Room 2',
        30,
        '456 Main St',
        'Los Angeles',
        '90001',
        'USA'
    );

INSERT INTO
    workshop (
        workshopDate,
        duration,
        workshopTime,
        level,
        locationId
    )
VALUES (
        '2021-12-01',
        60,
        '10:00:00',
        'Débutant',
        1
    ),
    (
        '2021-12-24',
        30,
        '11:00:00',
        'Intermédiaire',
        2
    ),
    (
        '2021-11-03',
        45,
        '12:00:00',
        'Avancé',
        1
    );

INSERT INTO attending (studentId, workshopId) VALUES (1, 1), (2, 2);

INSERT INTO
    instructor (
        lastname,
        firstname,
        email,
        phone,
        description,
        photo
    )
VALUES (
        'Lounis',
        'Rosa',
        'rosa@gmail.com',
        '0642222222',
        'I am a professional rollerdancer',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F840836192688013%2F&psig=AOvVaw3Q'
    ),
    (
        'Doe',
        'John',
        'john@gmail.com',
        '0642222222',
        'I am a professional slalomer',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F840836192688013%2F&psig=AOvVaw3Q'
    );