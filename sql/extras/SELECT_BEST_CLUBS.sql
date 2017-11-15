SELECT worldRanking, clubName, League.leagueName, region
FROM Club, League
WHERE League.leagueName = Club.leagueName
ORDER BY worldRanking ASC;
