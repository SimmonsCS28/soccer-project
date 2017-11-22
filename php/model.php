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

//TODO: CHANGE POST VARS
function getByClub(){
  $data = array(':goals' => 0, ':disc' => 0, ':xp' => 0);
  if(isset($_POST['goals'])&&sizeof($_POST['goals'])>0){
    $data[':goals'] = $_POST['goals'];
  }
  if(isset($_POST['disc'])&&sizeof($_POST['disc'])>0){
    $data[':disc'] = $_POST['disc'];
  }
  if(isset($_POST['xp'])&&sizeof($_POST['xp'])>0){
    $data[':xp'] = $_POST['xp'];
  }
  $sql = "CALL findClubByStats(:goals, :disc, :xp);";
  echo getJSON($sql, $data);
}


function getByPlayer(){
  $data = array(':goals' => 0, ':disc' => 0, ':xp' => 0);
  if(isset($_POST['goals'])&&sizeof($_POST['goals'])>0){
    $data[':goals'] = $_POST['goals'];
  }
  if(isset($_POST['disc'])&&sizeof($_POST['disc'])>0){
    $data[':disc'] = $_POST['disc'];
  }
  if(isset($_POST['xp'])&&sizeof($_POST['xp'])>0){
    $data[':xp'] = $_POST['xp'];
  }
  $sql = "CALL findClubByPlayer(:goals, :disc, :xp);";
  echo getJSON($sql, $data);

}


function getByAchievement(){

}


function getByMisc(){

}
?>
