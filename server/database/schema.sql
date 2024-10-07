USE 4checkpoint;

CREATE TABLE student (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
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
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    workshopDate DATE NOT NULL,
    duration INT NOT NULL,
    description TEXT,
    workshopTime TIME NOT NULL,
    level enum(
        'Débutant',
        'Intermédiaire',
        'Avancé'
    ) NOT NULL,
    locationId INT NOT NULL
);

CREATE TABLE attending (
    PRIMARY KEY (studentId, workshopId),
    studentId INT NOT NULL,
    workshopId INT NOT NULL
);

ALTER TABLE attending
ADD FOREIGN KEY (studentId) REFERENCES student (id);

ALTER TABLE attending
ADD FOREIGN KEY (workshopId) REFERENCES workshop (id);

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
        description,
        workshopTime,
        level,
        locationId
    )
VALUES (
        '2021-12-01',
        2,
        'Introduction to programming',
        '10:00:00',
        'Débutant',
        1
    ),
    (
        '2021-12-24',
        3,
        'Intermediate programming',
        '11:00:00',
        'Intermédiaire',
        2
    ),
    (
        '2021-11-03',
        4,
        'Advanced programming',
        '12:00:00',
        'Avancé',
        1
    );

INSERT INTO attending (studentId, workshopId) VALUES (1, 1), (2, 2);