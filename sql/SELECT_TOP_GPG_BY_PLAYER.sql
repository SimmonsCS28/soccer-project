SELECT playerName, gamesPlayed, goalsScored,
	(goalsScored/gamesPlayed) AS goalsPerGame, Club.clubName, League.leagueName, region
FROM Player, Club, League
WHERE Player.clubName = Club.clubName
AND Club.leagueName = League.leagueName
AND goalsScored > 0
ORDER BY goalsPerGame DESC;