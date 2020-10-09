
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var eventDoc, doc, body;
        event = event || window.event; 
        var returnedFunction = debounce(function() {
            setElePosition(event.pageX,event.pageY);
            setBoundsforCursor(event.pageX,event.pageY);
        }, 100);
        returnedFunction();
    }
    function setElePosition(x,y){
        var smallCircle = document.querySelector('.small-circle');
        var circle = document.querySelector('.circle');
        smallCircle.style.top = (y-5) +'px';
        smallCircle.style.left = (x-5) +'px';
        circle.style.top = (y - 100) +'px';
        circle.style.left = (x -100) +'px';  
    }
    function setBoundsforCursor(x,y){
        var coordinates = {
            x:200,
            y:200,
            x1: window.innerWidth -200,
            y1: window.innerHeight - 200
        }
        var smallCircle = document.querySelector('.small-circle');
        var circle = document.querySelector('.circle');
        if(x > coordinates.x && x < coordinates.x1 && y > coordinates.y && y < coordinates.y1){
            circle.style.transform ="scale(1)";
            smallCircle.style.transform ="scale(0)";
            detectText(circle,x,y);
        }else{
            circle.style.transform ="scale(0)";
            smallCircle.style.transform ="scale(1)";
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
          }
          var callNow = immediate && !timeout;        
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);       
          if (callNow) func.apply(context, args);
        }
    }
    
    function detectText(circle,x,y){
        var textEle = document.querySelector('.main-title');
        var clientBounds =textEle.getBoundingClientRect();
        if(x >= clientBounds.x && x <= (clientBounds.x + clientBounds.width) && 
            y >= clientBounds.y && y <= (clientBounds.y + clientBounds.height)){
            circle.style.transform = "scale(1.5)";
            textEle.classList.remove('outline');
        }else{
           circle.style.transform = "scale(1)";
            textEle.classList.add('outline');
        }
    }
    








  