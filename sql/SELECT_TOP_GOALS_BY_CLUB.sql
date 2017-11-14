SELECT Club.clubName, SUM(goalsScored) AS totalGoalsScored, Club.leagueName, League.region
FROM Player, Club, League
WHERE Player.clubName=Club.clubName
AND Club.leagueName=League.leagueName
GROUP BY Club.clubName
ORDER BY totalGoalsScored DESC;