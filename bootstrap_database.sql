create table accounts (
    user_id  int         auto_increment, -- not null, unique by primary key
    username varchar(25) not null,
    password char(128)   not null,
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
    constraint pk_attendance primary key (user_id, event_id)
);
