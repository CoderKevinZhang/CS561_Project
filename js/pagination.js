function generatePagination(count, current){
    var paginationDiv = document.getElementById('pagination');
    var i;
    var link2PreviousPage = document.createElement("a");
    var node = document.createTextNode('<<');
    link2PreviousPage.appendChild(node);
    link2PreviousPage.setAttribute('href', 'javascript: void(0);');
    link2PreviousPage.addEventListener('click',function(){
            updatePageNumbers(-1);
        });
    paginationDiv.appendChild(link2PreviousPage);
    for (i = 1 ; i <= count; i++){
        var link2Page = document.createElement("a");
        var node = document.createTextNode(i);
        link2Page.appendChild(node);
        link2Page.setAttribute('href', 'javascript: void(0);');
        link2Page.setAttribute('class', 'pageNum');
        if (i === current){
            link2Page.className += ( ' active');
        }
        link2Page.addEventListener('click',function(){
            var pageNumber = this.textContent;
            changeActive(pageNumber);
        });
        paginationDiv.appendChild(link2Page);
    }
    var link2NextPage = document.createElement("a");
    var node = document.createTextNode('>>');
    link2NextPage.appendChild(node);
    link2NextPage.setAttribute('href', 'javascript: void(0);');
    link2NextPage.addEventListener('click',function(){
            updatePageNumbers(1);
        });
    paginationDiv.appendChild(link2NextPage);
}

function changeActive(nextPageNumber){
    
    var pageLinks = document.getElementsByClassName('pageNum');
    var currentMinPageNumber =Number(pageLinks[0].textContent);
    var currentMaxPageNumber =Number( pageLinks[pageLinks.length - 1].textContent);
    var nextPageNumber = Number(nextPageNumber);
    var i, currentPageNumber;
    for (i = 0 ; i < pageLinks.length; i++){
        if (pageLinks[i].getAttribute('class').indexOf('active') > -1){
            currentPageNumber = i + Number(currentMinPageNumber);
        }
    }
     //console.log(currentMinPageNumber, currentMaxPageNumber, currentPageNumber, nextPageNumber);
    if (nextPageNumber >= currentMinPageNumber && nextPageNumber <= currentMaxPageNumber) {
        
        // change active tag
        pageLinks[currentPageNumber- currentMinPageNumber].classList.remove('active');
        pageLinks[nextPageNumber - currentMinPageNumber].classList.add('active');
        // reload page based on nextPageNumber ------------------> todo
    }
}

function updatePageNumbers(direction){
    var pageLinks = document.getElementsByClassName('pageNum');
    var currentMinPageNumber =Number(pageLinks[0].textContent);
    var currentMaxPageNumber =Number( pageLinks[pageLinks.length - 1].textContent);
    var i, currentPageNumber;
    
    var Max = 20;
    for (i = 0 ; i < pageLinks.length; i++){
        if (pageLinks[i].getAttribute('class').indexOf('active') > -1){
            currentPageNumber = i + Number(currentMinPageNumber);
        }
    }
    var nextPageNumber = currentPageNumber + direction;
    console.log(nextPageNumber);
    if (direction < 0) {
        if ((currentPageNumber + direction) >= currentMinPageNumber){
            pageLinks[currentPageNumber- currentMinPageNumber].classList.remove('active');
            pageLinks[currentPageNumber- currentMinPageNumber - 1].classList.add('active');
            // reload page based on nextPageNumber ------------------> todo
            
        }else {
            if (currentMinPageNumber != 1){
               for (i = 0 ; i < pageLinks.length; i++){
                    tmp = pageLinks[i].textContent;
                    pageLinks[i].textContent = Number(tmp) - 1;
               }
                // reload page based on nextPageNumber ------------------> todo
            }
        }
    }else {
        if ((currentPageNumber + direction) <=  currentMaxPageNumber){
            pageLinks[currentPageNumber- currentMinPageNumber].classList.remove('active');
            pageLinks[currentPageNumber- currentMinPageNumber + 1].classList.add('active');  
// reload page based on nextPageNumber ------------------> todo            
        }else {
           if (currentMaxPageNumber != Max){
               for (i = 0 ; i < pageLinks.length; i++){
                    tmp = pageLinks[i].textContent;
                    pageLinks[i].textContent = Number(tmp) + 1;
               }
               // reload page based on nextPageNumber ------------------> todo
           } 
        }
    }
}