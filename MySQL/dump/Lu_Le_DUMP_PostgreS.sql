-- Table structure for table `joinrequest`



DROP TABLE IF EXISTS joinrequest;
CREATE TABLE joinrequest (
  status BOOLEAN NOT NULL,
  userlukittu_userid INT NOT NULL,
  watchgroup_groupid INT NOT NULL,
  PRIMARY KEY (userlukittu_userid, watchgroup_groupid),
  CONSTRAINT fk_invitation_userlukittu1 FOREIGN KEY (userlukittu_userid) REFERENCES userlukittu (userid),
  CONSTRAINT fk_invitation_watchgroup1 FOREIGN KEY (watchgroup_groupid) REFERENCES watchgroup (groupid)
);

-- Table structure for table `userlukittu`

DROP TABLE IF EXISTS userlukittu;
CREATE TABLE userlukittu (
  userid SERIAL PRIMARY KEY,
  username TEXT NOT NULL CHECK (LENGTH(username) <= 30), --'Username less than 30'
  pwd TEXT NOT NULL,
  UNIQUE (userid),
  UNIQUE (username)
);

ALTER Table userlukittu
alter COLUMN username set not null, add check (length(username) <= 30);
-- Table structure for table `watchgroup`

DROP TABLE IF EXISTS watchgroup;
CREATE TABLE watchgroup (
  groupid SERIAL PRIMARY KEY,
  groupname TEXT NOT NULL,
  moderatorid INT NOT NULL,
  description TEXT,
  UNIQUE (groupid),
  UNIQUE (groupname)
);

-- Table structure for table `watchhistory`

DROP TABLE IF EXISTS watchhistory;
CREATE TABLE watchhistory (
  movieid INT NOT NULL,
  userlukittu_userid INT NOT NULL,
  PRIMARY KEY (movieid),
  CONSTRAINT fk_watchhistory_userlukittu1 FOREIGN KEY (userlukittu_userid) REFERENCES userlukittu (userid)
);

-- Table structure for table `watchlist`

DROP TABLE IF EXISTS watchlist;
CREATE TABLE watchlist (
  movieid INT NOT NULL,
  userlukittu_userid INT NOT NULL,
  PRIMARY KEY (movieid),
  CONSTRAINT fk_watchlist_userlukittu1 FOREIGN KEY (userlukittu_userid) REFERENCES userlukittu (userid)
);

-- Table structure for table `watchreviews`

DROP TABLE IF EXISTS watchreviews;
CREATE TABLE watchreviews (
  reviewid SERIAL PRIMARY KEY,
  reviewtext TEXT,
  rating FLOAT NOT NULL,
  reviewdate TIMESTAMP,
  watchhistory_movieid INT NOT NULL,
  CONSTRAINT fk_watchreviews_watchhistory1 FOREIGN KEY (watchhistory_movieid) REFERENCES watchhistory (movieid)
);