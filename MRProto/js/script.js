const setDots = ()=>{
    if (document.querySelector('.lineDom') === null){  
    const asideElt = document.querySelector('.aside__container');

    // const canvas = document.createElement('canvas');
    // canvas.classList.add('aside__y--canvas');

    // const svg = document.createElement('svg');
    // svg.classList.add('svg');
    // const line = document.createElement('line');
    // line.classList.add('line');
    // svg.appendChild(line);

   
    }
    //SET CANVAS
    const asideElt = document.querySelector('.aside__container');
    const lineDom = document.querySelector('.lineDom');
    console.log(lineDom);
 
    // const canvas = document.querySelector('.aside__y--canvas');
    // const svg = document.querySelector('.svg');
    // svg.setAttribute('width',`${asideElt.offsetWidth}px`);
    // svg.setAttribute('height',`${asideElt.offsetHeight}px`);
    // const line = svg.querySelector('.line');
    // line.setAttribute('id','line2');
    // line.setAttribute('x1','5');
    // line.setAttribute('y1','0');
    // line.setAttribute('x2','5');
    // line.setAttribute('y2','100');
    // line.setAttribute("style", "stroke:rgb(255,0,0);stroke-width:2");
    // canvas.width = asideElt.offsetWidth;
//     canvas.height = asideElt.offsetHeight;
    //GET DOM DOTS
    const contElts = document.querySelectorAll('.aside__y--dot-container');
    //SCROLL
    const scroll = window.scrollY;
    const yearsCont = document.querySelectorAll('.singleYear__container');
    const yearFocusInd = Array.from(yearsCont).findIndex(yearElt => yearElt.offsetTop >= scroll);
    //DRAW

    // const ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Setup :
    const topDot = contElts[0].querySelector('.aside__y--dot');
    const lineTop = topDot.offsetTop;
    const lineBottom = contElts[contElts.length-1].querySelector('.aside__y--dot').offsetTop;
    const lineHeight = lineBottom-lineTop;
    console.log(lineTop,lineBottom,lineHeight);
    // lineDom.style.top = lineTop+'px';
    // lineDom.style.left = topDot.offsetLeft+(topDot.offsetWidth/2) +'px';
    // lineDom.style.height = lineHeight+'px';
    // lineDom.style.width = '3px';

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

        // const leftLineOffset = dotElt.offsetLeft + (dotElt.offsetWidth/2);
        //console.log(contElt,dotElt,yearElt);
      
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
    //   //Line
        // const dotZero = contElts[0].querySelector('.aside__y--dot');
        // const leftLineOffset = dotZero.offsetLeft + (dotZero.offsetWidth/2);
        // ctx.lineWidth = 3;
        // ctx.lineCap = "round";
        // ctx.beginPath();
        // ctx.moveTo(leftLineOffset,contElts[0].offsetTop+contElts[0].offsetHeight/2);
        // ctx.lineTo(leftLineOffset,contElts[contElts.length-1].offsetTop+contElts[contElts.length-1].offsetHeight/2);
        // ctx.stroke();
    
}



document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('main').appendChild(mainConstructor());
    document.getElementById('aside').appendChild(asideConstructor());
    setDots();
    listeners.init();
});
