var itemContainer = document.querySelector('.item-container');
var button_create = document.getElementById('createItemButton');
// console.log(button_create)
// json object sample
// TOdo : 1. unit for log space 2. buidlTime buit in...
  
var objSample = 
      { "address":"5454 SW Chicken St Corvallis, OR 97333", 
  	    "price":"20000000" ,
  	    "bed": "2",
  	   	"bath": "1",
  	    "lotSpace":"1075",
  	    "buildTime":"1992",
  		"imgUrl":"https://cdn.vox-cdn.com/thumbor/9KHtq2E7Ua18ok5qlLnAv5kXLfY=/0x0:4256x2163/1200x800/filters:focal(1731x758:2411x1438)/cdn.vox-cdn.com/uploads/chorus_image/image/58387913/Flex_House_Exterior_6_13_17.0.jpg",
  		"description":"This home has everything!  Just renovated, 4 bedroom home with formal dining room and super large den with corner fireplace. Upstairs has 3 large bedrooms and separate den/landing area.  All rooms have nice sized closets and lots of natural light.  Master suite is on the lower level with large corner garden tub, separate shower, double vanities and very large walk in closet.  Outside you have an incredibly large deck for grilling and entertainment and an extra large yard that can easily fit a swimming pool."
	   }

/**
 * @function: Create new HTML nodes for Item (show house infomation)
 * @param obj: an JSON that contains house infomation
 * @return: a DOM object (essential to list a single house info) 
 */
function generateitem(obj){

	var newP = document.createElement('p');
	var newDiv = document.createElement('div');
	var newA = document.createElement('a');

	var itemElem = document.createElement('article');
	itemElem.classList.add('item');
	var imgContainer = newDiv;
	imgContainer.classList.add('image-container');
	var newImg = document.createElement('img');
	newImg.classList.add('image');
	newImg.setAttribute('src','');
	newImg.src = obj.imgUrl;
	imgContainer.appendChild(newImg);
	itemElem.appendChild(imgContainer);
	

	var itemContentElem = document.createElement('div');
	var itemTextElem = document.createElement('p');
	var itemAElem = document.createElement('a');

	itemContentElem.classList.add('item-content');
	itemElem.appendChild(itemContentElem);

	var itemLocation = document.createElement('p');
	itemLocation.classList.add('item-location');
	itemContentElem.appendChild(itemLocation)
	var address = document.createElement('a');
	address.classList.add('larger');
	address.setAttribute('hred', '#');
	// add address text to DOM 
	var addressText =  document.createTextNode(obj.address);
	address.appendChild(addressText);	
	itemLocation.appendChild(address);


	var price = document.createElement('p') ;
	price.classList.add('larger');
	price.classList.add('item-price');
	// add price text to DOM
	var priceText = document.createTextNode("$" + obj.price);
	price.appendChild(priceText);
	itemContentElem.appendChild(price);

	var itemTitleContainer = document.createElement('div');
	itemTitleContainer.classList.add('item-title-container');
	itemContentElem.appendChild(itemTitleContainer);

	var faBedElem = document.createElement('i');
	faBedElem.classList.add('item-title');
	faBedElem.classList.add('fa');
	faBedElem.classList.add('fa-bed');
	var faBedText = document.createTextNode(obj.bed );
	faBedElem.appendChild(faBedText);
	itemTitleContainer.appendChild(faBedElem);

	var faBathElem = document.createElement('i');
	faBathElem.classList.add('item-title');
	faBathElem.classList.add('fa');
	faBathElem.classList.add('fa-bath');
	// add bed count text t to DOM
	var faBathText = document.createTextNode(obj.bath);
	faBathElem.appendChild(faBathText);
	itemTitleContainer.appendChild(faBathElem);

	// space 
	var itemTitleArea = document.createElement('p');
	itemTitleArea.classList.add('item-title');
	itemTitleContainer.appendChild(itemTitleArea);
	var space = document.createElement('a');

	var spaceText = document.createTextNode(obj.lotSpace + " sqft");
	space.appendChild(spaceText);
	itemTitleArea.appendChild(space);

	// built year
	var itemTitleYear = document.createElement('p');
	itemTitleYear.classList.add('item-title');
	itemTitleYear.classList.add('item-builtTime');
	itemTitleContainer.appendChild(itemTitleYear);
	var builtTime = document.createElement('a');
	itemTitleYear.appendChild(builtTime);

	var buildYearText = document.createTextNode("Build in " + obj.buildTime);
	builtTime.appendChild(buildYearText);

	var itemDescriptionTitle = document.createElement('p');
	itemDescriptionTitle.classList.add('item-description-title');
	itemContentElem.appendChild(itemDescriptionTitle);
	var descriptionTitleText = document.createTextNode("Description ");
	itemDescriptionTitle.appendChild(descriptionTitleText);

	var itemDescriptionContainer = document.createElement('div');
	itemDescriptionContainer.classList.add('item-description-container');
	itemContentElem.appendChild(itemDescriptionContainer);

	var itemDescription = document.createElement('p');
	itemDescription.classList.add('item-description');
	itemDescriptionContainer.appendChild(itemDescription);
	var descriptionText = document.createTextNode(obj.description);
	itemDescription.appendChild(descriptionText);

	return itemElem;
}

function handleCreateItem(){
	var itemElem = generateitem(objSample);
	itemContainer.appendChild(itemElem);
	// backupitems = document.querySelectorAll('.item');
}

button_create.addEventListener('click',function(){
	console.log("accept create button");
	handleCreateItem();
})
