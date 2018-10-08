<?php
    include('log4php/Logger.php');
    Logger::configure('log4php/configurators/config.xml');
	class db {
		private $dbHost;
		private $dbName;
		private $dbUser;
		private $dbPassword;
		private $dbConnection;
		private $backEndLog;
        
		public $dbReturn;
		public function __construct ( ) {
			$this->dbHost 		=  'oniddb.cws.oregonstate.edu';
			$this->dbName 		=  'yangz4-db';
			$this->dbUser 		=  'yangz4-db';
			$this->dbPassword 	=  'UohGqmxgTWPMs1zv';
            $this->backEndLog = Logger::getLogger("myLogger");
		}
		
		public function dbConnect() {
			$this->dbConnection = new mysqli($this->dbHost, $this->dbUser, 
											 $this->dbPassword, $this->dbName);
			
            $this->backEndLog->info('Estiblishing Database Connection.');								 
			
            if (mysqli_connect_error()){
				$this->dbReturn->status  = -1;
				$this->dbReturn->msg = mysqli_connect_error();	
                
                $this->backEndLog->error('Database Connection Fail.');
			}
			else {
				$this->dbReturn->status = 0;
				$this->dbReturn->msg = "Connection Estiblished";
                
                $this->backEndLog->info('Database Connection Estiblished.');	                
			}
			return json_encode($this->dbReturn);
		}
		
		public function dbExecute ($statement) {
            $this->backEndLog->info('Estiblishing Query ::' + $statement);
			$this->dbReturn = mysqli_querry($this->dbConnection, $statement);
			if (!$this->dbReturn){
				$this->dbReturn->status = -1;
				$this->dbReturn->msg = mysqli_error($this->dbConnection);
                
                $this->backEndLog->error('Query Failed :: ' + $this->dbReturn->msg );
			}
			else {
				$this->dbReturn->status = 0;
				$queryResult = 0;
				$this->dbReturn->msg = $queryResult;
                
                $this->backEndLog->info('Query Success ::' + $queryResult);
			}
			return json_encode($this->dbReturn);
		}
	}

?>