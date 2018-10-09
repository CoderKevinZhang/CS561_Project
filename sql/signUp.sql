
INSERT INTO User_info (User_name, Password, User_role, Email, Phone) VALUES ('A', '123', 'Buyer', 'xx@gmail.com', '54122222');

SELECT CASE ( SELECT COUNT(`User_name`) FROM `User_info` WHERE `User_name` = "A") 
	WHEN 0 THEN CONCAT ('{"Code":'   ,  -1 , ','  '"msg":', '"Sign up Failed!"}')
    ELSE CONCAT ('{"Code":'   ,  0 , ','  '"msg":', '"Sign up succeed!"}') 
    END; 


