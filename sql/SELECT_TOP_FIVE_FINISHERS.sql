SELECT Club.clubName, MIN(leagueStanding) AS highestFinish, 
	League.leagueName, region
FROM Club, League, Season
WHERE Club.clubName = Season.clubName
AND Club.leagueName = League.leagueName
AND Club.clubName IN
  (SELECT clubName
   FROM Season
   WHERE leagueStanding <= 5
   AND leagueStanding <> 0)
GROUP BY Club.clubName
ORDER BY highestFinish ASC, clubName ASC;