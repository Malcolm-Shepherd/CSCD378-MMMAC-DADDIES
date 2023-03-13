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
values ("testuser", "$2a$10$jARaZ.Q/Gq24itrkWFpSnuJyxcyclDM0CaoSjzd9oNZR4ZwSZEbUm")
