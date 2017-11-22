DELIMITER $$
CREATE PROCEDURE findClubByStats(goalsChoice INT(1), discChoice INT(1), xpChoice INT(1))
  BEGIN
	  DROP TABLE IF EXISTS ClubCount;
      CREATE TEMPORARY TABLE ClubCount(
		club VARCHAR(30)
      );

      #No preferences selected
      IF goalsChoice = 0 AND discChoice = 0 AND xpChoice = 0 THEN
		INSERT INTO ClubCount
        SELECT clubName
        FROM Club
        ORDER BY clubName ASC
        LIMIT 10;
      END IF;	  

	  #Goal scoring
	  IF goalsChoice = 1 THEN
	    INSERT INTO ClubCount
	    SELECT Club.clubName
		FROM Player, Club, League
		WHERE Player.clubName=Club.clubName
		AND Club.leagueName=League.leagueName
		GROUP BY Club.clubName
		ORDER BY SUM(goalsScored) DESC LIMIT 10;
	  ELSEIF goalsChoice = 2 THEN
		INSERT INTO ClubCount
		SELECT Club.clubName
		FROM Player, Club, League
		WHERE Player.clubName=Club.clubName
		AND Club.leagueName=League.leagueName
		GROUP BY Club.clubName
		ORDER BY (SUM(goalsScored)/SUM(gamesPlayed)) DESC LIMIT 10;
	  END IF;
	  
	  #Discipline
	  IF discChoice = 1 THEN
	    INSERT INTO ClubCount
		SELECT Club.clubName
		FROM Player, Club, League
		WHERE Player.clubName=Club.clubName
		AND Club.leagueName=League.leagueName
		GROUP BY Club.clubName
		ORDER BY ((SUM(yellowCards)+SUM(redCards)*3)) DESC LIMIT 10;
	  ELSEIF discChoice = 2 THEN
	    INSERT INTO ClubCount
		SELECT Club.clubName
		FROM Player, Club, League
		WHERE Player.clubName=Club.clubName
		AND Club.leagueName=League.leagueName
		GROUP BY Club.clubName
		ORDER BY ((SUM(yellowCards)+SUM(redCards)*3)/SUM(gamesPlayed)) DESC
		LIMIT 10;
	  ELSEIF discChoice = 3 THEN
		INSERT INTO ClubCount
		SELECT Club.clubName
		FROM Player, Club, League
		WHERE Player.clubName=Club.clubName
		AND Club.leagueName=League.leagueName
		GROUP BY Club.clubName
		ORDER BY ((SUM(yellowCards)+SUM(redCards)*3)) ASC LIMIT 10;
	  ELSEIF discChoice = 4 THEN
		INSERT INTO ClubCount
		SELECT Club.clubName
		FROM Player, Club, League
		WHERE Player.clubName=Club.clubName
		AND Club.leagueName=League.leagueName
		GROUP BY Club.clubName
		ORDER BY ((SUM(yellowCards)+SUM(redCards)*3)/SUM(gamesPlayed)) ASC
		LIMIT 10;
	  END IF;
	  
	  #Experience
	  IF xpChoice = 1 THEN
		INSERT INTO ClubCount
		SELECT c.clubName
		FROM
			(
			SELECT Club.clubName AS club, SUM(gamesPlayed) AS totalGamesPlayed,
			League.leagueName AS league, region
			FROM Player, Club, League
			WHERE Player.clubName = Club.clubName
			AND Club.leagueName=League.leagueName
			GROUP BY Club.clubName
			) sumByTeam, Club c,
			(
			SELECT MAX(totalGamesPlayed) AS maxXP
			FROM
				(
					SELECT Club.clubName AS club, SUM(gamesPlayed) AS totalGamesPlayed,
						League.leagueName AS league, region
					FROM Player, Club, League
					WHERE Player.clubName = Club.clubName
					AND Club.leagueName=League.leagueName
					GROUP BY Club.clubName
				) sumByTeam
			) maxPlayed
		WHERE c.clubName=sumByTeam.club
		GROUP BY c.clubName
		ORDER BY (totalGamesPlayed/maxXP) DESC
		LIMIT 10; 		
	  ELSEIF xpChoice = 2 THEN
		INSERT INTO ClubCount
		SELECT c.clubName
		FROM
			(
			SELECT Club.clubName AS club, SUM(gamesPlayed) AS totalGamesPlayed,
			League.leagueName AS league, region
			FROM Player, Club, League
			WHERE Player.clubName = Club.clubName
			AND Club.leagueName=League.leagueName
			GROUP BY Club.clubName
			) sumByTeam, Club c,
			(
			SELECT MAX(totalGamesPlayed) AS maxXP
			FROM
				(
					SELECT Club.clubName AS club, SUM(gamesPlayed) AS totalGamesPlayed,
						League.leagueName AS league, region
					FROM Player, Club, League
					WHERE Player.clubName = Club.clubName
					AND Club.leagueName=League.leagueName
					GROUP BY Club.clubName
				) sumByTeam
			) maxPlayed
		WHERE c.clubName=sumByTeam.club
		GROUP BY c.clubName
		ORDER BY (totalGamesPlayed/maxXP) ASC
		LIMIT 10; 
	  END IF;
	  
	IF (goalsChoice <> 0 AND discChoice = 0 AND xpChoice = 0)
	   OR (goalsChoice = 0 AND discChoice <> 0 AND xpChoice = 0)
	   OR (goalsChoice = 0 AND discChoice = 0 AND xpChoice <> 0) THEN
	    SELECT * FROM ClubCount LIMIT 5;
	ELSE
		SELECT *
		FROM ClubCount
		GROUP BY ClubCount.club
		ORDER BY COUNT(*) DESC
		LIMIT 5;
	END IF;  
	
	DROP TABLE ClubCount;
	
  END $$
  
DELIMITER ; 
