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

//TODO: CHANGE GET VARS
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


function getByAchievement(){

}


function getByMisc(){

}
?>
