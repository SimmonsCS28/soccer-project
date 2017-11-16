DELIMITER $$

CREATE PROCEDURE findClubsByRegion(IN location VARCHAR(30))
BEGIN
  SELECT clubName, worldRanking, League.leagueName
  FROM Club, League
  WHERE Club.leagueName = League.leagueName
  AND (region LIKE CONCAT('%', location, '%') OR location LIKE CONCAT('%', region, '%'))
  ORDER BY worldRanking;  
END$$
DELIMITER ;