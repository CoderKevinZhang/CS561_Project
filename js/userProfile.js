function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// User stored cookie to get user info
function getUserInfo(){
    var userName = getCookie("username");
    console.log(userName);
    $.ajax({
                type: "POST",
                url: "../php/userActionHandler.php" , //url
                data: {
                    'userService' : 'getUserInfo', 
                    'userName': userName,                    
                },
                success: function(result) {
                    console.log(result);
                    result = JSON.parse(result);
                    console.log(result.msg);
                    user = result.msg;
                    console.log(user.User_role);
                    if (user.User_role == 1){
                        document.getElementById('sellerAction').style.display = "inline";
                        document.getElementById('buyerAction').style.display = "none";
                    }
                    else if (user.User_role == 2){
                        document.getElementById('sellerAction').style.display = "none";
                        document.getElementById('buyerAction').style.display = "inline";
                    }
                    document.getElementById('userName').placeholder = user.User_name;
                    document.getElementById('userEmail').placeholder = user.Email;
                    document.getElementById('userPhone').placeholder = user.Phone;
                    document.getElementById('userRole').placeholder = ( (user.User_role <2) ? 'Seller' : 'Buyer');
                },
                error : function(error) {
                    alert("bad request");  
                }
            });    
}

function getUploadedHouses(){
    var userName = getCookie("username");
    var itemContainer = document.getElementById('uploadedHousesPlace');
    
    console.log(userName);
    $.ajax({
                type: "POST",
                url: "../php/houseInfoHandler.php" , //url
                data: {
                    'houseService' : 'getUploadedHouses', 
                    'userName': userName,
                },
                success: function(result) {
                    result = JSON.parse(result);
                    console.log(result);
                    while (itemContainer.hasChildNodes()){
                        itemContainer.removeChild(itemContainer.firstChild);
                    }
                    
                },
                error : function(error) {
                    alert("bad request");  
                }
            }); 
}

function getFavoriteHouses(){
    var userName = getCookie("username");
    var itemContainer = document.getElementById('favoriteHousesPlace');
    console.log(userName);
    $.ajax({
                type: "POST",
                url: "../php/houseInfoHandler.php" , //url
                data: {
                    'houseService' : 'getFavoriteHouses', 
                    'userName': userName,                    
                },
                success: function(result) {
                    while (itemContainer.hasChildNodes()){
                        itemContainer.removeChild(itemContainer.firstChild);
                    }    
                },
                error : function(error) {
                    alert("bad request");  
                }
            });     
}

/*
 * This function displays the modal for adding a photo to a user page.
 */
function displayAddPhotoModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addPhotoModalElem = document.getElementById('create-item-modal');

  // Show the modal and its backdrop.
  backdropElem.classList.remove('hidden');
  addPhotoModalElem.classList.remove('hidden');

}


/*
 * This function closes the modal for adding a photo to a user page, clearing
 * the values in its input elements.
 */
function closeAddPhotoModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addPhotoModalElem = document.getElementById('create-item-modal');

  // Hide the modal and its backdrop.
  backdropElem.classList.add('hidden');
  addPhotoModalElem.classList.add('hidden');

  clearPhotoInputValues();

}

/*
 * This function clears the values of all input elements in the photo modal.
 */
function clearPhotoInputValues() {

  var inputElems = document.getElementsByClassName('wrap-input100 validate-input m-b-26');
  for (var i = 0; i < inputElems.length; i++) {
    var input = inputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}

document.addEventListener('DOMContentLoaded', function(){
    getUserInfo();
    var addPhotoButton = document.getElementById('create-item-button');
    if (addPhotoButton) {
        addPhotoButton.addEventListener('click', displayAddPhotoModal);
    }

    var modalCloseButton = document.querySelector('#create-item-modal .modal-close-button');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeAddPhotoModal);
    }

    var modalCancalButton = document.querySelector('#create-item-modal .modal-cancel-button');
    if (modalCancalButton) {
        modalCancalButton.addEventListener('click', closeAddPhotoModal);
    }

}, false);