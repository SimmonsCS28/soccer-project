SELECT Club.clubName, SUM(gamesPlayed) AS totalGamesPlayed,
	SUM(goalsAgainst) AS totalGoalsAgainst, 
    (SUM(goalsAgainst)/SUM(gamesPlayed)) AS goalConcedeAvg,
    League.leagueName, region
FROM Club, League, Season
WHERE Club.leagueName = League.leagueName
AND Club.clubName = Season.clubName
GROUP BY Club.clubName
ORDER BY goalConcedeAvg ASC;