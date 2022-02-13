const setDots = (scroll)=>{
    if (document.querySelector('.aside__y--canvas') === null){  
    const asideElt = document.querySelector('.aside__container');
    const canvas = document.createElement('canvas');
    canvas.classList.add('aside__y--canvas');
    asideElt.appendChild(canvas);
    }
    //SET CANVAS
    const asideElt = document.querySelector('.aside__container');
    const canvas = document.querySelector('.aside__y--canvas');
    canvas.width = asideElt.offsetWidth;
    canvas.height = asideElt.offsetHeight;
    //GET DOM DOTS
    const dotElts = document.querySelectorAll('.aside__y--dot');
    const markerOffsetLeft = dotElts[0].offsetLeft + (dotElts[0].offsetWidth/2) ;
    console.log(scroll);
    const yearsCont = document.querySelectorAll('.singleYear__container')
    console.log(yearsCont);
    //DRAW
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dotElts.forEach((dotElt,index) =>{
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        dotElt.offsetLeft = dotElts[0].offsetLeft;
        if (index < dotElts.length -1){
        ctx.beginPath();
        ctx.moveTo(markerOffsetLeft,dotElt.offsetTop+dotElt.offsetHeight/2);
        ctx.lineTo(markerOffsetLeft,dotElts[index+1].offsetTop+dotElt.offsetHeight/2);
        ctx.stroke();
        }

        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(markerOffsetLeft + dotElt.offsetWidth/2.5,
                dotElt.offsetTop + (dotElt.offsetHeight/2),
                (dotElt.offsetHeight/2)+2,
                Math.PI*-0.4,Math.PI*0.4);
        ctx.stroke();
    });
    
}



document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('main').appendChild(mainConstructor());
    document.getElementById('aside').appendChild(asideConstructor());
    setDots();
    listeners.init();
});
