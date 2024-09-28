USE 4checkpoint;

CREATE TABLE student (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(100) NOT NULL,
    level ENUM(
        'beginner',
        'intermediate',
        'advanced'
    )
);

CREATE TABLE workshop (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    location text NOT NULL,
    workshopDate DATE NOT NULL,
    duration INT NOT NULL,
    workshopTime TIME NOT NULL,
    capacity INT
);

CREATE TABLE attending (
    PRIMARY KEY (studentId, workshopId),
    studentId INT NOT NULL,
    workshopId INT NOT NULL
);

CREATE TABLE instructor (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(100) NOT NULL,
    description TEXT,
    picture TEXT
);

CREATE TABLE media (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type ENUM(
        'tutorial',
        'évènement',
        'photo',
        'vidéo'
    ),
    description TEXT,
    url TEXT
);

CREATE TABLE posting (
    PRIMARY KEY (mediaId, instructorId),
    mediaId int NOT NULL,
    instructorId int NOT NULL
);

ALTER TABLE attending
ADD FOREIGN KEY (studentId) REFERENCES student (id);

ALTER TABLE attending
ADD FOREIGN KEY (workshopId) REFERENCES workshop (id);

ALTER TABLE posting ADD FOREIGN KEY (mediaId) REFERENCES media (id);

ALTER TABLE posting
ADD FOREIGN KEY (instructorId) REFERENCES instructor (id);

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
    workshop (
        location,
        workshopDate,
        duration,
        workshopTime,
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
    media (type, description, url)
VALUES (
        'tutorial',
        'Dance video',
        'https://picsum.photos/id/237/200/300 '
    ),
    (
        'photo',
        'Dance video',
        'https://picsum.photos/id/237/200/300 '
    );