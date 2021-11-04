const listeners =  {
    init : function(){
        listeners.mainListener();
        listeners.asideListener();
    },
    mainListener : function(){
        const singleYearElt = document.querySelectorAll('.singleYear__container');
        for (let thisYear of singleYearElt){
            // console.log(thisYear);
            thisYear.addEventListener('mouseenter', function(){
                let listenArea = event.target;
                let eltToScroll = event.target.querySelector('.conferences__container');
                listeners.toggleScroll(listenArea,eltToScroll,true);
            });
        }
    },
    asideListener : function(){
        document.getElementById('aside').addEventListener('mouseenter', () => {
            document.body.style.overflowY = "scroll";
        });
        document.getElementById('aside').addEventListener('mouseleave', () => {
            document.body.style.overflowY = "hidden";
        });

    },
    toggleScroll : function(listenArea,eltToScroll){
        listenArea.addEventListener('wheel',function(){
            if (event.deltaY > 0){
                eltToScroll.scrollLeft += 200;
            } else if (event.deltaY < 0){
                eltToScroll.scrollLeft -= 200;
            } else {
                console.log("possible un mousewheel neutre?");
            }
            console.log(event);
        });
        
    }
};