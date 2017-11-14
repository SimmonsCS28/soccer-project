SELECT playerName, position, (gamesPlayed/xp.most) AS experienceIndex,
	Club.clubName, League.leagueName, region
FROM Player, Club, League,
	(SELECT MAX(gamesPlayed) AS most FROM Player) xp
WHERE Player.clubName = Club.clubName
AND Club.leagueName = League.leagueName
ORDER BY experienceIndex DESC;