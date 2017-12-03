<?php

 include('pdo_connect.php');
 include('model.php');

  // Search type
  if(isset($_GET['type'])){
    switch($_GET['type']){
     case 'byclub':
      getByClub();
      break;
     case 'byplayer':
      getByPlayer();
      break;
     case 'byachievement':
      getByAchievement();
      break;
     case 'bymisc':
      getByMisc();
      break;
     case 'getclub':
      getClubStats();
      break;
     case 'getplayers':
      getPlayerStats();
      break;
     case 'clublist':
      getClubList();
      break;
     default:
        echo 'An unknown error has occurred.';
    }
  }
  else{echo 'A server error has occurred.';}

?>
