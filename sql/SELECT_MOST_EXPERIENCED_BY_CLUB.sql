SELECT c.clubName, (totalGamesPlayed/maxXP) AS experienceIndex,
  league, region
FROM
	(
		SELECT Club.clubName AS club, SUM(gamesPlayed) AS totalGamesPlayed,
			League.leagueName AS league, region
		FROM Player, Club, League
		WHERE Player.clubName = Club.clubName
		AND Club.leagueName=League.leagueName
		GROUP BY Club.clubName
	) sumByTeam, Club c,
    (
      SELECT MAX(totalGamesPlayed) AS maxXP
      FROM
      	(
		SELECT Club.clubName AS club, SUM(gamesPlayed) AS totalGamesPlayed,
			League.leagueName AS league, region
		FROM Player, Club, League
		WHERE Player.clubName = Club.clubName
		AND Club.leagueName=League.leagueName
		GROUP BY Club.clubName
	    ) sumByTeam
    
    ) maxPlayed
 WHERE c.clubName=sumByTeam.club
 GROUP BY c.clubName
 ORDER BY experienceIndex DESC
;    