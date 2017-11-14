SELECT Club.clubName, SUM(gamesPlayed) AS totalAppearances, SUM(goalsScored) AS totalGoalsScored,
  (SUM(goalsScored)/SUM(gamesPlayed)) AS totalGPG, Club.leagueName, League.region
FROM Player, Club, League
WHERE Player.clubName=Club.clubName
AND Club.leagueName=League.leagueName
GROUP BY Club.clubName
ORDER BY totalGPG DESC;