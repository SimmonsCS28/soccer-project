SELECT playerName, yellowCards, redCards, 
	(yellowCards+(redCards*3)) AS disciplinePoints,
    Club.clubName, League.leagueName, region
FROM Player, Club, League
WHERE Player.clubName = Club.clubName
AND Club.leagueName = League.leagueName
AND (yellowCards > 0 OR redCards > 0)
ORDER BY disciplinePoints DESC;