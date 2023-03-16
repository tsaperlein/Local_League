CREATE TABLE TEAM (
	team_id INTEGER,
	name TEXT NOT NULL,
	coach_name TEXT NOT NULL,
	logo TEXT NOT NULL,
	field_id INTEGER NOT NULL,
	PRIMARY KEY (team_id),
	FOREIGN KEY (field_id) REFERENCES FIELD(field_id)
);

CREATE TABLE PLAYER (
	player_id INTEGER,
	name TEXT NOT NULL,
	age INTEGER NOT NULL,
	nationality TEXT DEFAULT NULL,
	position TEXT NOT NULL,
	jersey_number INTEGER NOT NULL,
	team_id INTEGER NOT NULL,
	PRIMARY KEY (player_id),
	FOREIGN KEY (team_id) REFERENCES TEAM(team_id)
);

CREATE TABLE FIELD (
	field_id INTEGER,
	name TEXT NOT NULL,
	location TEXT NOT NULL,
	capacity INTEGER DEFAULT NULL,
	PRIMARY KEY (field_id)
);

CREATE TABLE MATCH (
	match_id INTEGER,
	datetime TEXT NOT NULL,
	duration INTEGER NOT NULL DEFAULT 90,
	end_phase TEXT NOT NULL DEFAULT 'regular',
	PRIMARY KEY (match_id)
);

CREATE TABLE REFEREE (
	referee_id INTEGER,
	name TEXT NOT NULL,
	role TEXT NOT NULL DEFAULT 'main referee',
	nationality TEXT DEFAULT NULL,
	PRIMARY KEY (referee_id)
);

CREATE TABLE STATISTIC (
	statistic_id INTEGER,
	type TEXT NOT NULL DEFAULT 'goal',
	minute INTEGER NOT NULL,
	PRIMARY KEY (statistic_id)
);

CREATE TABLE PARTICIPATES_IN (
	team_id INTEGER,
	match_id INTEGER,
	role TEXT NOT NULL,
	PRIMARY KEY (team_id, match_id),
	FOREIGN KEY (team_id) REFERENCES TEAM(team_id),
	FOREIGN KEY (match_id) REFERENCES MATCH(match_id)
);

CREATE TABLE OFFICIATES (
	match_id INTEGER,
	referee_id INTEGER,
	PRIMARY KEY (match_id, referee_id),
	FOREIGN KEY (match_id) REFERENCES MATCH(match_id),
	FOREIGN KEY (referee_id) REFERENCES REFEREE(referee_id)
);

CREATE TABLE RECORDS (
	player_id INTEGER,
	statistic_id INTEGER,
	PRIMARY KEY (player_id, statistic_id),
	FOREIGN KEY (player_id) REFERENCES PLAYER(player_id),
	FOREIGN KEY (statistic_id) REFERENCES STATISTIC(statistic_id)
);

CREATE TABLE PERSON (
	person_id INTEGER,
	username TEXT NOT NULL,
	age INTEGER DEFAULT NULL,
	password TEXT NOT NULL,
	email TEXT NOT NULL,
	role TEXT NOT NULL DEFAULT 'user',
	PRIMARY KEY (person_id)
);











