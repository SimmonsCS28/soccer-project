<?php

  /*
    Include this script to connect to this database
  */
  
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  
  $user = 'houshce29';
  $pass = '******';
  $db_info = 'mysql:host=washington.uww.edu; dbname=cs366-2177_houshce29';

  try{
    $db = new PDO($db_info, $user, $pass);
  }catch(PDOException $e){
    print "Error!: ".$e->getMessage()."<br>";
    die();
  }
  
  /*
  
    TESTING CONNECTION
  
    ##############################include('pdo_connect.php');#####################################

    if(isset($db))
        echo "Connected to DB!";
    else
        echo "Error! Not connected.";
        
  */
  
?>
