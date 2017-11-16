<?php

 ### THESE FUNCTIONS RETRIEVE RESULTS WITH pdo_connect.php ###

/**
  Returns all results as an indexed array of associative arrays
*/
function getAllRecords($sql, $data=NULL){
      global $db;
        // Prepare SQL statement
        $stm = $db->prepare($sql);
        // Execute SQL statement
        $stm->execute($data);
        // Fetch all the records
        $results = $stm->fetchAll(PDO::FETCH_ASSOC);
        // return values
        return $results;
}

/**
  Returns a single result at a time to save memory.
*/
function getRecord($sql, $data=NULL){
      global $db;
        // Prepare SQL statement
        $stm = $db->prepare($sql);
        // Execute SQL statement
        $stm->execute($data);
        // Fetch all the records
        $result = $stm->fetch(PDO::FETCH_ASSOC);
        // return values
        return $result;
}

/**
  Returns the getAllRecords() function as a JSON object.
*/
function getJSON($sql){
  $results = getAllRecords($sql);
  return json_encode($results);
}

?>
