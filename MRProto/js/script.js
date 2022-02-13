const setDots = ()=>{
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
    const contElts = document.querySelectorAll('.aside__y--dot-container');
    //SCROLL
    const scroll = window.scrollY;
    const yearsCont = document.querySelectorAll('.singleYear__container');
    console.log(Array.from(yearsCont)[0].offsetTop > scroll,Array.from(yearsCont)[0].offsetTop , scroll);
    const yearFocusInd = Array.from(yearsCont).findIndex(yearElt => yearElt.offsetTop >= scroll);
    console.log(yearFocusInd);
    //DRAW
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Setup :
    contElts.forEach((contElt,index) =>{

        const dotElt = contElt.querySelector('.aside__y--dot');
        const yearElt = contElt.querySelector('.aside__y--text');

        if (index === yearFocusInd) {
            yearElt.classList.add('aside__y--text-show');
            contElt.classList.add('aside__y--dot-container-focus');
        }
        else {
            yearElt.classList.remove('aside__y--text-show');
            contElt.classList.remove('aside__y--dot-container-focus');}

        const leftLineOffset = dotElt.offsetLeft + (dotElt.offsetWidth/2);
        console.log(contElt,dotElt,yearElt);
        // Line
        // if (index < contElts.length -1){
        // ctx.lineWidth = 3;
        // ctx.lineCap = "round";
        // ctx.beginPath();
        // ctx.moveTo(leftLineOffset,contElt.offsetTop+contElt.offsetHeight/2);
        // ctx.lineTo(leftLineOffset,contElts[index+1].offsetTop+contElt.offsetHeight/2);
        // ctx.stroke();
        // }
        // //Marker
        // const 
        // ctx.lineWidth = 3;
        // ctx.lineCap = "round";
        // ctx.beginPath();
        // ctx.arc(markerOffsetLeft + dotElt.offsetWidth/2.5,
        //         dotElt.offsetTop + (dotElt.offsetHeight/2),
        //         (dotElt.offsetHeight/2)+2,
        //         Math.PI*-0.4,Math.PI*0.4);
        // ctx.stroke();
    });
    
}



document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('main').appendChild(mainConstructor());
    document.getElementById('aside').appendChild(asideConstructor());
    setDots();
    listeners.init();
});
