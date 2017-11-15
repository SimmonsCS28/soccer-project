DELIMITER $$
CREATE PROCEDURE getClubInfo(IN cName VARCHAR(30))
BEGIN
  SELECT clubName, worldRanking, colors, League.leagueName, region
  FROM Club, League
  WHERE Club.leagueName = League.leagueName
  AND (clubName LIKE CONCAT('%', cName, '%') OR cName LIKE CONCAT('%', clubName, '%'));
END$$
DELIMITER ;
