-- Get the count of house belong to the user_name

SELECT COUNT(*) FROM `Houses2` H  WHERE 1;

--page show for house info  

SELECT H.`House_id`, H.`Address`,H.`City`,H.`State`,H.`Zipcode`,H.`Price`,H.`Beds`,H.`Baths`,H.`Built`,H.`Space`, H.`description` FROM `Houses2` H  WHERE 1 limit 10, 20
-- get house images
SELECT `Url` FROM `Houses_images` WHERE `House_id` = "2105"