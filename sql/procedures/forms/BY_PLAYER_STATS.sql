DROP PROCEDURE IF EXISTS findClubByPlayer;
DELIMITER $$

CREATE PROCEDURE findClubByPlayer(goalsChoice INT(1), discChoice INT(1), xpChoice INT(1))
  BEGIN
    DROP TABLE IF EXISTS PlayerClub;
	CREATE TEMPORARY TABLE PlayerClub(
	  player VARCHAR(30),
	  club VARCHAR(30)
    );
	
	  #No preferences selected
      IF goalsChoice = 0 AND discChoice = 0 AND xpChoice = 0 THEN
		INSERT INTO PlayerClub
		SELECT playerName, clubName
		FROM Player
		ORDER BY playerName ASC
		LIMIT 10;
	
	  END IF;
	  
	  #Goal scoring
	  IF goalsChoice = 1 THEN
	    INSERT INTO PlayerClub
	    SELECT playerName, Club.clubName
		FROM Player, Club
		WHERE Player.clubName = Club.clubName
		AND goalsScored > 0
		ORDER BY goalsScored DESC
		LIMIT 10;
	  ELSEIF goalsChoice = 2 THEN
		INSERT INTO PlayerClub
		SELECT playerName, Club.clubName
		FROM Player, Club
		WHERE Player.clubName = Club.clubName
		AND goalsScored > 0
		ORDER BY (goalsScored/gamesPlayed) DESC
		LIMIT 10;
	  END IF;
	  
	  #Discipline
	  IF discChoice = 1 THEN
		INSERT INTO PlayerClub
	    SELECT playerName, Club.clubName
		FROM Player, Club
		WHERE Player.clubName = Club.clubName
		AND (yellowCards > 0 OR redCards > 0)
		ORDER BY (yellowCards+(redCards*3)) DESC
		LIMIT 10;
	  ELSEIF discChoice = 2 THEN
	    INSERT INTO PlayerClub
		SELECT playerName, Club.clubName
		FROM Player, Club
		WHERE Player.clubName = Club.clubName
		AND (yellowCards > 0 OR redCards > 0)
		ORDER BY (yellowCards+(redCards*3))/gamesPlayed DESC
		LIMIT 10;
	  ELSEIF discChoice = 3 THEN
	    INSERT INTO PlayerClub
	    SELECT playerName, Club.clubName
		FROM Player, Club
		WHERE Player.clubName = Club.clubName
		ORDER BY (yellowCards+(redCards*3)) ASC, playerName ASC	
		LIMIT 10;		
	  ELSEIF discChoice = 4 THEN
	    INSERT INTO PlayerClub
		SELECT playerName, Club.clubName
		FROM Player, Club
		WHERE Player.clubName = Club.clubName
		ORDER BY (yellowCards+(redCards*3))/gamesPlayed ASC, playerName ASC	
		LIMIT 10;		
	  END IF;
	  
	  #Experience
	  IF xpChoice = 1 THEN
 	    INSERT INTO PlayerClub
		SELECT playerName, Club.clubName
		FROM Player, Club, 
		 (SELECT MAX(gamesPlayed) AS most FROM Player) xp
		WHERE Player.clubName = Club.clubName
		ORDER BY (gamesPlayed/xp.most) DESC
		LIMIT 10;		
	  ELSEIF xpChoice = 2 THEN
		INSERT INTO PlayerClub
		SELECT playerName, Club.clubName
		FROM Player, Club, 
		 (SELECT MAX(gamesPlayed) AS most FROM Player) xp
		WHERE Player.clubName = Club.clubName
		ORDER BY (gamesPlayed/xp.most) ASC		
		LIMIT 10;
	  END IF;	
	
	IF (goalsChoice <> 0 AND discChoice = 0 AND xpChoice = 0)
	   OR (goalsChoice = 0 AND discChoice <> 0 AND xpChoice = 0)
	   OR (goalsChoice = 0 AND discChoice = 0 AND xpChoice <> 0) THEN
	    SELECT player, club, logo, website FROM PlayerClub, ClubInfo WHERE club=clubName LIMIT 5;
	ELSE
		SELECT DISTINCT player, club, logo, website
		FROM PlayerClub, ClubInfo
        WHERE club = clubName
		GROUP BY player
		ORDER BY COUNT(player) DESC
		LIMIT 5;
	END IF;
	
	DROP TABLE PlayerClub;
  END$$
  
DELIMITER ;
