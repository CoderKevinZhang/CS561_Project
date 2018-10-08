<?php 
    include 'dbConnection.php';
    $userServiceLog = Logger::getLogger("myLogger");
    
	$db = new db();
	$connection_state = $db->dbConnect();
	$connection_state = json_decode($connection_state);
	$response->status = 0;
    $response->msg = '';
    
	if ($connection_state->status !=0){
		$userServiceLog->error('userService :: Database Connection Failed');
        $response->status = 406;
		$response->msg = "Database Coneection Failed";    
	}
	else {
        
        if (!isset($_POST['userService'])){
            $userServiceLog->warn('userService :: No Service Selected');
            $response->status = 400;
            $response->msg = "No Service Selected";
         }
        else {
            $service = $_POST['userService'];
            switch($service) {
                case 'isDuplicate':
                /*Check wheter a given user name is duplicate*/
                    $userServiceLog->info('userService :: isDuplicate Called');
                
                    $response->status = 200;
                    $response->msg = 'userService: isDuplicate Service Called';
                    break;
                case 'signUp':
                /*Store New user's infomration*/
                    $userServiceLog->info('userService :: signUp Called');
                    
                    $response->status = 200;
                    $response->msg = 'Service: signUp Service Called';
                    break;
                default:
                    $userServiceLog->warn('userService :: ' + $service + ' Not Found');
                    
                    $response->status = 404;
                    $response->msg = "Service Not Found";
            }
        }         
	}
	echo json_encode($response);
	
?>