DROP TABLE IF EXISTS team;
CREATE TABLE team (
	team_id INTEGER AUTOINCREMENT,
	name TEXT NOT NULL,
	coach_name TEXT NOT NULL,
	logo TEXT NOT NULL,
	field_id INTEGER NOT NULL,
	PRIMARY KEY (team_id),
	FOREIGN KEY (field_id) REFERENCES field(field_id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS player;
CREATE TABLE player (
	player_id INTEGER AUTOINCREMENT,
	name TEXT NOT NULL,
	age INTEGER NOT NULL,
	nationality TEXT DEFAULT NULL,
	position TEXT NOT NULL,
	jersey_number INTEGER NOT NULL,
	team_id INTEGER NOT NULL,
	PRIMARY KEY (player_id),
	FOREIGN KEY (team_id) REFERENCES team(team_id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS field;
CREATE TABLE field (
	field_id INTEGER AUTOINCREMENT,
	name TEXT NOT NULL,
	location TEXT NOT NULL,
	capacity INTEGER DEFAULT NULL,
	PRIMARY KEY (field_id)
);

DROP TABLE IF EXISTS match;
CREATE TABLE match (
	match_id INTEGER AUTOINCREMENT,
	datetime DATE NOT NULL,
	duration INTEGER NOT NULL DEFAULT 90,
	end_phase TEXT NOT NULL DEFAULT 'regular',
	PRIMARY KEY (match_id)
);

DROP TABLE IF EXISTS referee;
CREATE TABLE referee (
	referee_id INTEGER AUTOINCREMENT,
	name TEXT NOT NULL,
	role TEXT NOT NULL DEFAULT 'main referee',
	nationality TEXT DEFAULT NULL,
	PRIMARY KEY (referee_id)
);

DROP TABLE IF EXISTS statistic;
CREATE TABLE statistic (
	statistic_id INTEGER AUTOINCREMENT,
	type TEXT NOT NULL DEFAULT 'goal',
	minute INTEGER NOT NULL,
	PRIMARY KEY (statistic_id)
);

DROP TABLE IF EXISTS participates_in;
CREATE TABLE participates_in (
	team_id INTEGER,
	match_id INTEGER,
	role TEXT NOT NULL,
	PRIMARY KEY (team_id, match_id),
	FOREIGN KEY (team_id) REFERENCES team(team_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (match_id) REFERENCES match(match_id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS officiates;
CREATE TABLE officiates (
	match_id INTEGER,
	referee_id INTEGER,
	PRIMARY KEY (match_id, referee_id),
	FOREIGN KEY (match_id) REFERENCES match(match_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (referee_id) REFERENCES referee(referee_id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS records;
CREATE TABLE records (
	player_id INTEGER,
	statistic_id INTEGER,
	PRIMARY KEY (player_id, statistic_id),
	FOREIGN KEY (player_id) REFERENCES player(player_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (statistic_id) REFERENCES statistic(statistic_id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS person;
CREATE TABLE person (
	person_id INTEGER AUTOINCREMENT,
	username TEXT NOT NULL,
	age INTEGER DEFAULT NULL,
	password TEXT NOT NULL,
	email TEXT NOT NULL,
	role TEXT NOT NULL DEFAULT 'user',
	PRIMARY KEY (person_id)
);