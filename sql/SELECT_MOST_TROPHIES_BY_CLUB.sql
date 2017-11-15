SELECT Club.clubName, SUM(numTrophies) AS trophiesWon, League.leagueName, region
FROM Club, League, Season
WHERE Club.leagueName = League.leagueName
AND Club.clubName = Season.clubName
GROUP BY Club.clubName
HAVING trophiesWon > 0
ORDER BY trophiesWon DESC, Club.clubName ASC;