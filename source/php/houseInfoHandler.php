<?php  

    include('dbConnection.php');
    $houseServiceLog = Logger::getLogger("myLogger");
    $db = new db();
	$connection_state = $db->dbConnect();
	$connection_state = json_decode($connection_state);
	$response->status = 0;
    $response->msg = '';
    /*Check if the database connection is set or not*/
	if ($connection_state->status !=0){
    /*Report Error if the database connecation is failed*/
		$houseServiceLog->error('houseService :: Database Connection Failed');
        $response->status = 600;
		$response->msg = "Database Coneection Failed";    
	}
	else {
    /*Process user acation services if the database connection is successed*/
        /*Check if front-end pass service name to server side*/
        if (!isset($_POST['houseService'])){
            /*Report Error wheno no service name is sent via POST*/
            $houseServiceLog->warn('houseService :: No Service Selected');
            $response->status = 400;
            $response->msg = "No Service Selected";
        }
        else {
            /*Get service name and match it with service if service name is sent via POST*/
            $service = $_POST['houseService'];
            switch($service) {
                case "uploadHouseInfo":   /*Perform Service -uploadHouseInfo- if it is called*/                   
                    $houseServiceLog->info('houseService :: uploadHouseInfo Called.');
                    if (isset($_POST['userName']) && isset($_POST['address'])
                    && isset($_POST['city']) && isset($_POST['state'])
                    && isset($_POST['bath']) && isset($_POST['bed'])
                    && isset($_POST['price']) && isset($_POST['imageUrl'])
                    && isset($_POST['livingSpace']) && isset($_POST['zipCode'])){
                        /*Get all required data ---> Query Databaes ---> Return callback*/
                        $userName = $_POST['userName'];
                        $address = $_POST['address'];
                        $city = $_POST['city'];
                        $state = $_POST['state'];
                        $bath = $_POST['bath'];
                        $bed = $_POST['bed'];
                        $price = $_POST['price'];
                        $imageUrl = $_POST['imageUrl'];
                        $buildTime = $_POST['buildTime'];
                        $livingSpace = $_POST['livingSpace'];
                        $lotSpace = $_POST['lotSpace'];
                        $description = $_POST['description'];
                        $zipCode = $_POST['zipCode'];
                        
                        $statement = "INSERT INTO `Houses2` (`User_id`, `Zipcode`, `Address`, `City`, `State`,`Price`,`Beds`, `Baths`, `Built`,`description`,`Space`,`Lot_space`) 
                        VALUES((SELECT `User_id` FROM `User_info` WHERE `User_name` = '$userName'),'$zipCode',
                        '$address','$city', '$state', '$price', '$bed','$bath','$buildTime','$description','$livingSpace','$lotSpace')"; #Houses2 will be modified in the final verson

                        $dbResult  =$db->dbExecute($statement);
                        

                        if ($dbResult){
                           $statement = "INSERT INTO `Houses_images` (`House_id`,`User_id`, `Url`) 
                           VALUES((SELECT `House_id` FROM `Houses2` ORDER BY `House_id` DESC LIMIT 1),(SELECT `User_id` FROM `Houses2` ORDER BY `House_id` DESC LIMIT 1),'$imageUrl')";
                           $dbResult =$db->dbExecute($statement);
                            if($dbResult){
                                $response->status   = 200;
                                $response->msg      ='SUCCESS';
                                $houseServiceLog->info('houseService :: uploadHouseInfo Send dbResponse back.');
                            }
                            else{
                                $response->status   = 601;
                                $response->msg      = 'Unknown error in database';
                                $houseServiceLog->warn('houseService ::uploadHouseInfo fail in database');
                            }
                        }
                       else {
                           /*Report error back if the query is failed*/
                           //COVERED
                           $response->status   = 601;
                           $response->msg      = 'Unknown error in database';
                           $houseServiceLog->warn('houseService ::uploadHouseInfo fail in database');
                        }
                   }
                    else {
                        /*No enough data ---> Return callback*/
                        // COVERED
                       $houseServiceLog->warn('houseService ::uploadHouseInfo Called Failed. No enought info passed back via POST');
                       $response->status   = 406;
                       $response->msg      = 'houseService: uploadHouseInfo requires enough variable';
                    }
                    break;

               default: //COVERED
                    $houseServiceLog->warn('houseService :: '.$service.' Not Found');
                    $response->status = 404;
                    $response->msg =$service." Not Found";
            }
        }         
	}
	echo(json_encode($response));
	
?>