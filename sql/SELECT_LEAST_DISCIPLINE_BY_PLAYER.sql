SELECT playerName, yellowCards, redCards, 
	(yellowCards+(redCards*3)) AS disciplinePoints,
    Club.clubName, League.leagueName, region
FROM Player, Club, League
WHERE Player.clubName = Club.clubName
AND Club.leagueName = League.leagueName
ORDER BY disciplinePoints ASC;