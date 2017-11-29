DELIMITER $$

CREATE PROCEDURE findClubByMisc(color VARCHAR(20), location VARCHAR(30))
BEGIN
	  DROP TABLE IF EXISTS ClubCount;
      CREATE TEMPORARY TABLE ClubCount(
		club VARCHAR(30)
      );
	  
	  # No preferences
	  IF color = 'No preference' AND location = 'No preference' THEN
	    INSERT INTO ClubCount
		SELECT clubName
		FROM Club
		ORDER BY worldRanking
		LIMIT 10;
	  END IF;

	  # Jersey color
	  IF color <> 'No preference' THEN
	    INSERT INTO ClubCount
	    SELECT clubName
		FROM Club
		WHERE colors LIKE concat('%', color,'%')
		ORDER BY clubName;
	  END IF;
	  
	  # Region
	  IF location <>'No preference' THEN
	    INSERT INTO ClubCount
		SELECT clubName
		FROM Club, League
		WHERE Club.leagueName = League.leagueName
		AND region LIKE concat('%', location,'%')
		ORDER BY clubName;
	  END IF;
	  
	  SELECT *
	  FROM ClubCount
	  GROUP BY ClubCount.club
	  ORDER BY COUNT(*) DESC
	  LIMIT 5;
	  
	  DROP TABLE ClubCount;
END$$

DELIMITER ;