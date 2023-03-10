create table accounts (
    user_id  int         auto_increment, -- not null, unique by primary key
    username varchar(25) not null,
    password char(60)    not null,
    primary key (user_id),
    unique (username)
);

create table users (
    user_id    int, -- not null, unique, auto_increment by foreign key.
    first_name varchar(25) not null,
    last_name  varchar(25) not null,
    email      varchar(50) unique,
    primary key (user_id),
    foreign key (user_id) references accounts(user_id)
);

create table items (
    item_id    int          auto_increment, -- not null, unique by primary key
    name       varchar(25)  not null,
    short_desc varchar(100) not null,
    image      varchar(50)  not null,
    price      decimal(5,2) not null,
    stock      int          not null,
    primary key (item_id),
    check (stock >= 0)
);

create table events (
    event_id   int         auto_increment, -- not null, unique by primary key
    name       varchar(50)  not null,
    short_desc varchar(100) not null,
    start_time datetime     not null,
    end_time   datetime     not null,
    primary key (event_id),
    check (end_time >= start_time)
);

create table attendance (
    user_id  int, -- not null, unique, auto increment by foreign key
    event_id int, -- not null, unique, auto increment by foreign key
    foreign key (user_id) references accounts(user_id),
    foreign key (event_id) references events(event_id),
    constraint pk_attendance primary key (user_id, event_id)
);

create table log (
    time    timestamp default current_timestamp,
    message varchar(500),
    primary key (time)
);

-- user "root" password "root"
insert into accounts (username, password)
values ("root", "$2a$10$kE9qg/GLYf8AALD7gn7/9uua2LAwDOsGTd67pPzI6eGRj3iOz1wGu");

-- user "testuser" password "testpass"
insert into accounts (username, password)
values ("testuser", "$2a$10$jARaZ.Q/Gq24itrkWFpSnuJyxcyclDM0CaoSjzd9oNZR4ZwSZEbUm");

insert into events (name, short_desc, start_time, end_time)
values ("1st MMMAC Conference",
        "Meet members and help guide the future! (not April Fools!)",
        "2023-04-01 10:00:00", "2023-04-01 14:00:00");

insert into events(name, short_desc, start_time, end_time)
values ("1st MAC Donation Drive",
        "Donate old MAC items here!",
        "2023-03-24 12:00:00", "2023-03-24 18:00:00");

insert into events(name, short_desc, start_time, end_time)
values ("Macaque Showcase",
        "We have like 8 of these guys.",
        "2023-04-10 08:00:00", "2023-04-10 15:00:00");

insert into events(name, short_desc, start_time, end_time)
values ("Macintosh giveaway",
        "The fruit, not the computer.",
        "2023-04-23 11:00:00", "2023-04-23 15:00:00");
INSERT INTO `items` (`item_id`, `name`, `short_desc`, `image`, `price`, `stock`)
VALUES (1, 'MacItem1', 'Mac and Cheese', 'MacAndCheese', 2.00, 3),
    (2, 'MacItem2', 'Mac and Cheese', 'MacShirt', 2.00, 1);