<?php

#############################################################
# These functions handle directly with the database queries #
#############################################################

/**
  Returns all results as an indexed array of associative arrays
*/
function getAll($sql, $data=NULL){
  global $db;
  $stm = $db->prepare($sql);
  $stm->execute($data);
  $results = $stm->fetchAll(PDO::FETCH_ASSOC);
  return $results;
}

/**
  Returns a single result at a time to save memory.
*/
function get($sql, $data=NULL){
  global $db;
  $stm = $db->prepare($sql);
  $stm->execute($data);
  $result = $stm->fetch(PDO::FETCH_ASSOC);
  return $result;
}

/**
  Returns the getAll() function as a JSON object.
*/
function getJSON($sql, $data=NULL){
  $results = getAll($sql, $data);
  return json_encode($results);
}
####################################################

##########################################################################
# These functions handle raw form data and  echo back JSON object arrays #
##########################################################################

/**
  Echoes back JSON object for getting club by stats
*/
function getByClub(){
  $data = array(':goals' => 0, ':disc' => 0, ':xp' => 0);
  if(isset($_GET['goals'])&&sizeof($_GET['goals'])>0){
    $data[':goals'] = $_GET['goals'];
  }
  if(isset($_GET['disc'])&&sizeof($_GET['disc'])>0){
    $data[':disc'] = $_GET['disc'];
  }
  if(isset($_GET['xp'])&&sizeof($_GET['xp'])>0){
    $data[':xp'] = $_GET['xp'];
  }
  $sql = "CALL findClubByStats(:goals, :disc, :xp);";
  echo getJSON($sql, $data);
}

/**
  Echoes back JSON object for getting club by player
*/
function getByPlayer(){
  $data = array(':goals' => 0, ':disc' => 0, ':xp' => 0);
  if(isset($_GET['goals'])&&sizeof($_GET['goals'])>0){
    $data[':goals'] = $_GET['goals'];
  }
  if(isset($_GET['disc'])&&sizeof($_GET['disc'])>0){
    $data[':disc'] = $_GET['disc'];
  }
  if(isset($_GET['xp'])&&sizeof($_GET['xp'])>0){
    $data[':xp'] = $_GET['xp'];
  }
  $sql = "CALL findClubByPlayer(:goals, :disc, :xp);";
  echo getJSON($sql, $data);

}

/**
  Echoes back JSON object for getting club by achievement
*/
function getByAchievement(){
  $data = array(':trophies' => isset($_GET['trophies']),
                ':goalavg' => isset($_GET['goalavg']),
                ':conavg' => isset($_GET['conavg']),
                ':topfive' => isset($_GET['topfive']),
                ':winper' => isset($_GET['winper']),
                ':lossper' => isset($_GET['lossper']));
  $sql = "CALL findClubByAchievement(:trophies, :goalavg, :conavg, :topfive, :winper, :lossper);";
  echo getJSON($sql, $data);
}

/**
  Echoes back JSON object for getting club by misc. properties
*/
function getByMisc(){
  $data = array(':color' => 'No preference', ':region' => 'No preference');
  if(isset($_GET['color'])){
    $data[':color'] = $_GET['color'];
  }
  if(isset($_GET['region'])){
    $data[':region'] = $_GET['region'];
  }
  $sql = "CALL findClubByMisc(:color, :region);";
  echo getJSON($sql, $data);
}

/**
  Gets the club stats as a JSON object
*/
function getClubStats(){
  $data = array(':team' => 'FC Barcelona');
  if(isset($_GET['team'])){
    $data[':team'] = $_GET['team'];
  }
  $sql = "SELECT * FROM Club WHERE clubName=:team;";
  echo getJSON($sql, $data);
}

/**
  Gets the stats for a specific team as a JSON object
*/
function getPlayerStats(){
  $data = array(':team' => 'FC Barcelona');
  if(isset($_GET['team'])){
    $data[':team'] = $_GET['team'];
  }
  $sql = "SELECT playerName, position, gamesPlayed, goalsScored, (goalsScored/gamesPlayed) AS gpg,
            yellowCards, redCards
          FROM Player
          WHERE clubName=:team;";
  echo getJSON($sql, $data);
}

/**
  Returns the list of clubs
*/
function getClubList(){
  $sql = "SELECT clubName
          FROM Club
          ORDER BY leagueName, clubName;";
  echo getJSON($sql);
}

?>
