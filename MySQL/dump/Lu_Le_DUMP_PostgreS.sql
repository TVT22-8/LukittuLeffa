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

alter table joinrequest drop constraint fk_invitation_watchgroup1;

DROP TABLE  EXISTS group_membership;
CREATE TABLE group_membership (
  user_id INT,
  group_id INT,
  is_admin BOOLEAN DEFAULT false,
  PRIMARY KEY (user_id, group_id),
  FOREIGN KEY (user_id) REFERENCES userlukittu(userid),
  FOREIGN KEY (group_id) REFERENCES watchgroup(groupid)
);

-- Table structure for table `userlukittu`

DROP TABLE IF EXISTS userlukittu;
CREATE TABLE userlukittu (
  userid SERIAL PRIMARY KEY,
  username TEXT NOT NULL CHECK (LENGTH(username) <= 30), --'Username has to be less than 30'
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
  description TEXT,
  owner_userid INT NOT NULL, -- Added column for the owner (references userlukittu)
  UNIQUE (groupid),
  UNIQUE (groupname),
  FOREIGN KEY (owner_userid) REFERENCES userlukittu (userid)
);

--ALTER Table watchgroup
--ADD COLUMN members INT[] DEFAULT ARRAY[]::INT[];
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
  userlukittu_userid INT NOT NULL,
CONSTRAINT fk_watchreviews_userlukittu FOREIGN KEY (userlukittu_userid) REFERENCES userlukittu (userid),
CONSTRAINT fk_watchreviews_watchhistory1 FOREIGN KEY (watchhistory_movieid) REFERENCES watchhistory (movieid)
);

ALTER Table watchreviews
ALTER COLUMN rating TYPE INT, --changed the precise float to INT
ADD CONSTRAINT check_rating CHECK (rating >= 1 AND rating <= 10); --Ensure that the rating of the movie stays between 1 and 10