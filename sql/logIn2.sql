SELECT COUNT( * ) 
FROM  `User_info` 
WHERE  `User_name` =  "H"
AND  `Password` = ( AES_ENCRYPT(  "123", UNHEX( SHA2(
'My secret passphrase', 512
) ) ) )