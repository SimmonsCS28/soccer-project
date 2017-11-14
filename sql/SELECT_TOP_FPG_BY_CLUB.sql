SELECT Club.clubName, SUM(yellowCards) AS cautions, SUM(redCards) AS ejections,
  ((SUM(yellowCards)+SUM(redCards)*3)/SUM(gamesPlayed)) AS foulPlayIndex, Club.leagueName, League.region
FROM Player, Club, League
WHERE Player.clubName=Club.clubName
AND Club.leagueName=League.leagueName
GROUP BY Club.clubName
ORDER BY foulPlayIndex DESC;