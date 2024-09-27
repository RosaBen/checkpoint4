CREATE TABLE Student (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(100) NOT NULL,
    level VARCHAR(100) NOT NULL
);

CREATE TABLE Class (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    location text NOT NULL,
    DATE DATE NOT NULL,
    duration INT NOT NULL,
    TIME TIME NOT NULL,
    capacity INT
);

CREATE TABLE attending (
    PRIMARY KEY (studentId, classId),
    studentId INT NOT NULL,
    classId INT NOT NULL
);

CREATE TABLE Level (level VARCHAR(100) NOT NULL);

CREATE TABLE Instructor (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(100) NOT NULL,
    description TEXT,
    picture TEXT
);

CREATE TABLE Media (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    url TEXT
);

CREATE TABLE posting (
    PRIMARY KEY (mediaId, instructorId),
    mediaId int NOT NULL,
    instructorId int NOT NULL
);

ALTER TABLE attending
ADD FOREIGN KEY (studentId) REFERENCES Student (id);

ALTER TABLE attending
ADD FOREIGN KEY (classId) REFERENCES Class (id);

ALTER TABLE posting ADD FOREIGN KEY (mediaId) REFERENCES Media (id);

ALTER TABLE posting
ADD FOREIGN KEY (instructorId) REFERENCES Instructor (id);

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
        'doe@gmail.com',
        '0642355252',
        'Beginner'
    ),
    (
        'Doe',
        'Jane',
        'jane@gmail.com',
        '0642355252',
        'Intermediate'
    );

INSERT INTO
    class (
        location,
        DATE,
        duration,
        TIME,
        capacity
    )
VALUES (
        'Amsterdam',
        '2021-12-12',
        60,
        '12:00:00',
        20
    ),
    (
        'Rotterdam',
        '2021-12-12',
        60,
        '12:00:00',
        20
    );

INSERT INTO
    instructor (
        lastname,
        firstname,
        email,
        phone,
        description,
        picture
    )
VALUES (
        'Doudou',
        'Johnpierre',
        'dou@gmail.com',
        '0642355252',
        'I am a professional dancer',
        'https://picsum.photos/200 '
    ),
    (
        'Doudou',
        'Jane',
        'jandou@gmail.com',
        '0642355252',
        'I am a professional dancer',
        'https://picsum.photos/200 '
    );

INSERT INTO
    media (name, description, url)
VALUES (
        'Dance',
        'Dance video',
        'https://picsum.photos/id/237/200/300 '
    ),
    (
        'Dance',
        'Dance video',
        'https://picsum.photos/id/237/200/300 '
    );

INSERT INTO
    level (level)
VALUES ('Beginner'),
    ('Intermediate'),
    ('Advanced');