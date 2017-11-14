SELECT playerName, goalsScored, Club.clubName, League.leagueName, region
FROM Player, Club, League
WHERE Player.clubName = Club.clubName
AND Club.leagueName = League.leagueName
AND goalsScored > 0
ORDER BY goalsScored DESC;