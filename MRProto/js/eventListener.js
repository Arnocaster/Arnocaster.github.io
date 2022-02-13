const listeners =  {
    init : function(){
        listeners.mainListener();
        //listeners.asideListener();
    },
    mainListener : function(){
        window.addEventListener('resize', setDots);
        document.addEventListener('scroll',(e)=>{setDots()});
            document.addEventListener('animationstart',()=>{console.log('start');setDots()});
        const singleYearElt = document.querySelectorAll('.conferences__container');
        for (let thisYear of singleYearElt){
            // console.log(thisYear);
            thisYear.addEventListener('mouseenter', function(){
                document.body.style.overflowY = "hidden";
                event.target.style.overflowX = "scroll";
                listeners.toggleScroll(event.target,event.target);
            });

            thisYear.addEventListener('mouseleave', function(){
                document.body.style.overflowY = "scroll";
                event.target.style.overflowX = "hidden";
                listeners.toggleScroll(event.target,event.target);
            });
        }
    },
    // FONCTION SUPPRIME LE SCOLL DU BODY AU HOVER DE ASIDE
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
            let scrollPx = 100;
            if (event.deltaY > 0 || Event.deltaX>0){
                eltToScroll.scrollLeft += scrollPx;
            } else if (event.deltaY < 0 || Event.deltaX<0){
                eltToScroll.scrollLeft -= scrollPx;
            } else {
                console.log("possible un mousewheel neutre?");
            }
            //console.log(event);
        });
        
    }
};