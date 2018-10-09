
SELECT CASE ((SELECT AES_DECRYPT (`Password`,UNHEX(SHA2('My secret passphrase',512))) FROM `User_info` WHERE `User_name` = "H")= "1243")
	WHEN 1 THEN CONCAT ('{"Code":'   ,  0 , ','  '"msg":', '"log in succeed"}')
    ELSE CONCAT ('{"Code":'   ,  -1 , ','  '"msg":', '"log in Failed!"}') 
    END;
