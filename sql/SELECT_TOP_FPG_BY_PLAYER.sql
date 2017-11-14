SELECT playerName, gamesPlayed, yellowCards, redCards, 
	(yellowCards+(redCards*3))/gamesPlayed AS disciplinePerGameIndex,
    Club.clubName, League.leagueName, region
FROM Player, Club, League
WHERE Player.clubName = Club.clubName
AND Club.leagueName = League.leagueName
AND (yellowCards > 0 OR redCards > 0)
ORDER BY disciplinePerGameIndex DESC;