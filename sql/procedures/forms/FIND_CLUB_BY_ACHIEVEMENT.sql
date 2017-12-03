DELIMITER $$
CREATE PROCEDURE findClubByAchievement(t BOOLEAN, hga BOOLEAN, lga BOOLEAN, top BOOLEAN, hwp BOOLEAN, llp BOOLEAN)
BEGIN
	  DROP TABLE IF EXISTS ClubCount;
      CREATE TEMPORARY TABLE ClubCount(
		club VARCHAR(30)
      );
	  
	  # No preference
	  IF NOT t AND NOT hga AND NOT lga AND NOT top AND NOT hwp AND NOT llp THEN
		INSERT INTO ClubCount
        SELECT clubName
        FROM Club
        ORDER BY clubName ASC
        LIMIT 10;
      END IF;
	  
	  # Top trophy holders
	  IF t THEN
	    INSERT INTO ClubCount
	    SELECT clubName
		FROM Season
		GROUP BY clubName
		HAVING SUM(numTrophies) > 0
		ORDER BY SUM(numTrophies) DESC, clubName ASC
		LIMIT 10;
	  END IF;	
	  # Highest goal average
	  IF hga THEN
	    INSERT INTO ClubCount
		SELECT clubName
		FROM Season
		GROUP BY clubName
		ORDER BY (SUM(goalsFor)/SUM(gamesPlayed)) DESC
		LIMIT 10;
	  END IF;
	  # Lowest goal conceded average	
	  IF lga THEN
	    INSERT INTO ClubCount
		SELECT clubName
		FROM Season
		GROUP BY clubName
		ORDER BY (SUM(goalsAgainst)/SUM(gamesPlayed)) ASC
		LIMIT 10;	    
	  END IF;
	  # Top 5 finishers	
	  IF top THEN
	    INSERT INTO ClubCount
		SELECT clubName
		FROM Season
		WHERE clubName IN
		(SELECT clubName
			FROM Season
			WHERE leagueStanding <= 5
			AND leagueStanding <> 0)
		GROUP BY clubName
		ORDER BY MIN(leagueStanding) ASC, clubName ASC
		LIMIT 10;	    
	  END IF;
	  # Highest win percentage
	  IF hwp THEN
	    INSERT INTO ClubCount
		SELECT clubName
		FROM Season
		GROUP BY clubName
		ORDER BY (SUM(numWins)/SUM(gamesPlayed))*100 DESC, clubName
		LIMIT 10;	    
	  END IF;
	  # Lowest loss percentage
	  IF llp THEN
	    INSERT INTO ClubCount
		SELECT clubName
		FROM Season
		GROUP BY clubName
		ORDER BY (SUM(numLosses)/SUM(gamesPlayed))*100, clubName
		LIMIT 10;	    
	  END IF;
	  
	  IF (t AND NOT hga AND NOT lga AND NOT top AND NOT hwp AND NOT llp) OR
		(NOT t AND hga AND NOT lga AND NOT top AND NOT hwp AND NOT llp) OR
		(NOT t AND NOT hga AND lga AND NOT top AND NOT hwp AND NOT llp) OR
		(NOT t AND NOT hga AND NOT lga AND top AND NOT hwp AND NOT llp) OR
		(NOT t AND NOT hga AND NOT lga AND NOT top AND hwp AND NOT llp) OR
		(NOT t AND NOT hga AND NOT lga AND NOT top AND NOT hwp AND llp) THEN	  
	    SELECT *
	    FROM ClubCount
	    LIMIT 5;
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