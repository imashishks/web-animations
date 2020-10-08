(function() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        // if (event.pageX == null && event.clientX != null) {
        //     eventDoc = (event.target && event.target.ownerDocument) || document;
        //     doc = eventDoc.documentElement;
        //     body = eventDoc.body;

        //     event.pageX = event.clientX +
        //       (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        //       (doc && doc.clientLeft || body && body.clientLeft || 0);
        //     event.pageY = event.clientY +
        //       (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
        //       (doc && doc.clientTop  || body && body.clientTop  || 0 );
        // }

        // Use event.pageX / event.pageY here
        // console.log(event.pageX,event.pageY);
        
        var returnedFunction = debounce(function() {
            // The function's code
            setPosition(event.pageX,event.pageY);
            setBoundsforCursor(event.pageX,event.pageY);
        }, 100);
        returnedFunction();
    }
    
})();

function setPosition(x,y){
    var circle = document.querySelector('.small-circle');
    var video = document.querySelector('.circle');
    circle.style.top = (y-5) +'px';
    circle.style.left = (x-5) +'px';
    video.style.top = (y - 100) +'px';
    video.style.left = (x -100) +'px';
    detectText(video,x,y);
}

// function autoPlayVideo(){
//     document.querySelector('.circle').play();
// }
// autoPlayVideo();
 console.log(window.innerWidth,window );
function setBoundsforCursor(x,y){
    var coordinates = {
        x:200,
        y:200,
        x1: window.innerWidth -200,
        y1: window.innerHeight - 200
    }
    var circle = document.querySelector('.small-circle');
    var video = document.querySelector('.circle');
    if(x > coordinates.x && x < coordinates.x1 && y > coordinates.y && y < coordinates.y1){
        console.log('inside',x,y,coordinates);
        // video.style.opacity ='1';
        video.style.transform ="scale(1)";
        circle.style.transform ="scale(0)";
    }else{
        console.log('outside',x,y,coordinates);
        // circle.style.transform = "scale(1)";
        // video.style.opacity ='0';
        video.style.transform ="scale(0)";
        circle.style.transform ="scale(1)";

    }
}



function debounce(func, wait, immediate) {
    var timeout;
  
    return function executedFunction() {
      var context = this;
      var args = arguments;
          
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      var callNow = immediate && !timeout;
      
      clearTimeout(timeout);
  
      timeout = setTimeout(later, wait);
      
      if (callNow) func.apply(context, args);
    };
  };

 function detectText(circle,x,y){
    var textEle = document.querySelector('.main-title');

    //  console.log(textEle.getBoundingClientRect());
    var clientBounds =textEle.getBoundingClientRect();
    if(x >= clientBounds.x && x <= (clientBounds.x + clientBounds.width) && 
        y >= clientBounds.y && y <= (clientBounds.y + clientBounds.height)) 
    {
        // console.log('here');
        // circle.style.width = "250px";
        // circle.style.height = "250px";
        circle.style.transform = "scale(1.5)";
        
        textEle.classList.remove('outline');


    }else{
        // circle.style.opacity = 0;
        // circle.style.width = "200px";
        // circle.style.height = "200px";
        circle.style.transform = "scale(1)";
        textEle.classList.add('outline');
    }

 }
  