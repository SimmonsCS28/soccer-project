SELECT playerName, gamesPlayed, yellowCards, redCards, 
	(yellowCards+(redCards*3))/gamesPlayed AS disciplinePerGameIndex,
    Club.clubName, League.leagueName, region
FROM Player, Club, League
WHERE Player.clubName = Club.clubName
AND Club.leagueName = League.leagueName
ORDER BY disciplinePerGameIndex ASC, gamesPlayed DESC;