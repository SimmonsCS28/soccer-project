SELECT Club.clubName, SUM(gamesPlayed) AS totalGamesPlayed, SUM(numWins) AS totalWins,
	(SUM(numWins)/SUM(gamesPlayed))*100 AS winPercentage, League.leagueName, region
FROM Club, Season, League
WHERE Club.clubName = Season.clubName
AND League.leagueName = Club.leagueName
GROUP BY Club.clubName
ORDER BY winPercentage DESC, Club.clubName;