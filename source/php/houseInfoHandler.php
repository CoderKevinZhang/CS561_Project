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
                case "getHouseInfo":   /*Perform Service -getHouseInfo- if it is called*/                   
                    $houseServiceLog->info('houseService :: getHouseInfo Called.');
                    if(isset($_POST['filtered']) && $_POST['filtered'] == 0
                     && isset($_POST['pageNum']) && isset($_POST['itemPerPage'])){
                        $X = ($_POST['pageNum'] - 1) * $_POST['itemPerPage'];
                        $Y = $_POST['itemPerPage'];
                        $statement = "SELECT H.`House_id`, H.`Address`,H.`City`,H.`State`,H.`Zipcode`,H.`Price`,H.`Beds`,H.`Baths`,H.`Built`,H.`Space`, H.`description`, Hi.`Url` FROM `Houses2` H  INNER JOIN  `Houses_images` Hi
     ON Hi.`House_id`= H.`House_id` GROUP BY H.`House_id` HAVING 1 limit $X,$Y";
                        $dbResult  =$db->dbExecute($statement);
                        if ($dbResult->num_rows > 0) {
                            while($row = $dbResult->fetch_assoc()) {
                                $houseId = $row['House_id'];
                              
                                $arr[] = $row; 
                            }
                        }
                        $response->status   = 200;
                        $response->msg      = "SUCCESS";
                        $response->foundHouse = $arr;
                    }
                    elseif(isset($_POST['filtered']) && $_POST['filtered'] == 1){
                        $filterVariables = json_decode($_POST['filterVariables']);

                        if(isset($filterVariables->city) && isset($filterVariables->state) && isset($filterVariables->zipCode)
                         && isset($filterVariables->livingSpace->min) && isset($filterVariables->livingSpace->max)
                         && isset($filterVariables->price->min) && isset($filterVariables->price->max)
                         && isset($filterVariables->bed) && isset($filterVariables->bath)
                         && isset($_POST['pageNum']) && isset($_POST['itemPerPage'])){
                            $city = $filterVariables->city;
                            $state = $filterVariables->state;
                            $zipCode = $filterVariables->zipCode;
                            $livingSpaceMin = $filterVariables->livingSpace->min;
                            $livingSpaceMax = $filterVariables->livingSpace->max;
                            $priceMin = $filterVariables->price->min;
                            $priceMax = $filterVariables->price->max;
                            $bed = $filterVariables->bed;
                            $bath = $filterVariables->bath;

                            $X = ($_POST['pageNum'] - 1) * $_POST['itemPerPage'];
                            $Y = $_POST['itemPerPage'];

                            $statement = "SELECT H.`House_id`, H.`Address`,H.`City`,H.`State`,H.`Zipcode`,H.`Price`,H.`Beds`,
                            H.`Baths`,H.`Built`,H.`Space`, H.`description` FROM `Houses2` H WHERE H.`City`= '$city' 
                            AND H.`State`= '$state' AND H.`Zipcode`='$zipCode' AND H.`Price`>=$priceMin AND H.`Price`<=$priceMax
                            AND H.`Beds`=$bed AND H.`Baths`=$bath AND H.`Space`>=$livingSpaceMin AND H.`Space`<=$livingSpaceMax LIMIT $X, $Y";

                            $dbResult  =$db->dbExecute($statement);
                            if ($dbResult->num_rows > 0) {
                                while($row = $dbResult->fetch_assoc()) {
                                    $houseId = $row['House_id'];
                                    $url = $db->dbExecute("SELECT `Url` FROM `Houses_images` WHERE `House_id` = '$houseId'");
                                    
                                    while($dd = $url->fetch_assoc()){
                                        array_push($row,$dd);
                                    }
                                    $arr[] = $row;
                                }
                            }
                            $response->status   = 200;
                            $response->msg      = "SUCCESS";
                            $response->foundHouse = $arr;
                         }else {
                            $houseServiceLog->warn('houseService ::getHouseInfo Called Failed. No enought info passed back via POST');
                            $response->status   = 406;
                            $response->msg      = 'houseService: getHouseInfo requires enough variable';
                         }
                    }
                    else {
                        /*No enough data ---> Return callback*/
                        // COVERED
                       $houseServiceLog->warn('houseService ::getHouseInfo Called Failed. No enought info passed back via POST');
                       $response->status   = 406;
                       $response->msg      = 'houseService: getHouseInfo requires enough variable';
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