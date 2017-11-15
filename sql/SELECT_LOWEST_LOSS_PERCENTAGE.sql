SELECT Club.clubName, SUM(gamesPlayed) AS totalGamesPlayed, SUM(numLosses) AS totalLosses,
	(SUM(numLosses)/SUM(gamesPlayed))*100 AS lossPercentage, League.leagueName, region
FROM Club, Season, League
WHERE Club.clubName = Season.clubName
AND League.leagueName = Club.leagueName
GROUP BY Club.clubName
ORDER BY lossPercentage, Club.clubName;