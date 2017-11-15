DELIMITER $$
CREATE PROCEDURE getPlayerInfo(IN pName VARCHAR(30))
BEGIN
  SELECT *
  FROM Player
  WHERE (playerName LIKE CONCAT('%',pName,'%') OR pName LIKE CONCAT('%',playerName,'%'));
END$$
DELIMITER ;
