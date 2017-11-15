SELECT Club.clubName, SUM(gamesPlayed) AS totalGamesPlayed,
	SUM(goalsFor) AS totalGoalsFor, (SUM(goalsFor)/SUM(gamesPlayed)) AS goalAvg,
    League.leagueName, region
FROM Club, League, Season
WHERE Club.leagueName = League.leagueName
AND Club.clubName = Season.clubName
GROUP BY Club.clubName
ORDER BY goalAvg DESC;