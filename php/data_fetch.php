<?php

 include('pdo_connect.php');
 include('model.php');

  // Search type
  if(isset($_POST['type'])){
    switch($_POST['type']){
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
     default:
        echo 'An unknown error has occurred.';
    }
  }
  else{echo 'A server error has occurred.';}

?>
