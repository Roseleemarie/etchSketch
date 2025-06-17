// colour button doesn't work with class contains
//  any fill option cannot go over opacity fully
let btnCont = document.querySelector("#btnCont");
let gridCont = document.querySelector("#gridCont");
let gridBox = document.querySelector(".gridBox");
size(16);
function size (currentSize){
    sizeVal=(600/currentSize);
    for (let i=0;i<currentSize*currentSize;i++){
        let gridBox = document.createElement("div")
        gridBox.className = 'gridBox'
        gridBox.setAttribute("style", 
            `width: ${sizeVal}px;
            height: ${sizeVal}px;`);
        gridCont.appendChild(gridBox);
    };
};
let colourBtnOn = false;
let eraseBtnOn = false;
let rgbBtnOn = false;
let opacityBtnOn = false;
function fillBoxBlack(Event){
    let hasBoxClass = Event.target.classList.contains('gridBox');
    let hasOpacityClass = Event.target.classList.contains('opacity');
    if(hasBoxClass){
        Event.target.classList.add('fill');
        Event.target.style.backgroundColor = 'black'
        if (hasOpacityClass && !opacityBtnOn){
            Event.target.classList.remove('opacity');
            Event.target.style.opacity = 'unset';
        };
    };
};
gridCont.addEventListener('mouseover', fillBoxBlack);
const colourBtn = document.querySelector('#colour');
colourBtn.addEventListener('click',colourBtnHandler);
let getUserColour;
function colourBtnHandler (){
    if (!colourBtnOn){
        getUserColour = prompt ('Enter a valid HEX# or colour name');
        colourBtnOn = true
        gridCont.removeEventListener('mouseover', fillBoxBlack);
        gridCont.addEventListener('mouseover', setUserColour);
    } else {
        colourBtnOn = false
        gridCont.addEventListener('mouseover', fillBoxBlack);
        gridCont.removeEventListener('mouseover', setUserColour);
    };
};
function setUserColour (Event){
    let hasBoxClass = Event.target.classList.contains('gridBox');
    let hasOpacityClass = Event.target.classList.contains('opacity');
    if(hasBoxClass){
        Event.target.classList.add('fill');
        Event.target.style.backgroundColor = `${getUserColour}`;
        if (hasOpacityClass && !opacityBtnOn){
            Event.target.classList.remove('opacity');
            Event.target.style.opacity = 'unset';
        }
    };
};
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener('click', ()=> gridClear('16'));
function gridClear (currentSize){
    let gridBoxArray = document.querySelectorAll(".gridBox");
    [...gridBoxArray].forEach( (gridBox) => {
        gridCont.removeChild(gridBox);
    });
    return size(currentSize);
};
const resizeBtn = document.querySelector("#size")
resizeBtn.addEventListener('click',() => gridClear(""));
resizeBtn.addEventListener('click',() => {
    currentSize = prompt ("Enter a number from 2-100");
    currentSize = parseInt(currentSize);
    if (currentSize>=2 && currentSize<=100 && typeof(currentSize)==='number'){
        return size(currentSize);
    }   else {
        alert("Not a valid value!");
        return size (16);
    };
});
const eraseBtn = document.querySelector('#erase');
eraseBtn.addEventListener('click',()=>{
    eraseBtnOn = !eraseBtnOn;
    gridCont.addEventListener('mouseover', erase);
});
function erase (Event){
    if (eraseBtnOn == true){
        let hasBoxClass = Event.target.classList.contains('gridBox');
        if(hasBoxClass){
        Event.target.classList.remove('fill');
        Event.target.classList.remove('opacity');
        Event.target.style.opacity = 'unset';
        Event.target.style.backgroundColor = 'unset';
        };
    }else if (eraseBtnOn == false){
        gridCont.removeEventListener('mouseover', erase);
        if (rgbBtnOn){
        gridCont.addEventListener('mouseover',getRandomRgbColour);
        }else if(colourBtnOn){
        gridCont.addEventListener('mouseover', setUserColour);        
        }else{
        gridCont.removeEventListener('mouseover', fillBoxBlack);
        }
    };
};
const rgbBtn = document.querySelector('#rgb');
rgbBtn.addEventListener('click',()=>{
    gridCont.removeEventListener('mouseover', fillBoxBlack);
    rgbBtnOn = !rgbBtnOn;
    gridCont.addEventListener('mouseover',getRandomRgbColour);
});
function getRandomRgbColour(Event) {
    if (rgbBtnOn){
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        rgbColour =  `rgb(${r}, ${g}, ${b})`;
        let hasBoxClass = Event.target.classList.contains('gridBox');
        let hasOpacityClass = Event.target.classList.contains('opacity');
        if(hasBoxClass){
            Event.target.classList.add('fill');
            Event.target.style.backgroundColor = `${rgbColour}`;
            if (hasOpacityClass && !opacityBtnOn){
                Event.target.classList.remove('opacity');
                Event.target.style.opacity = 'unset';
            }
        };
    }else if (rgbBtnOn == false){
        gridCont.removeEventListener('mouseover', getRandomRgbColour);
        gridCont.addEventListener('mouseover', fillBoxBlack);
    };
};
const opacityBtn = document.querySelector('#opacity');
opacityBtn.addEventListener('click',opacityBtnHandler)
function opacityBtnHandler(){
    opacityBtnOn = !opacityBtnOn
    if(opacityBtnOn){
    gridCont.addEventListener('mouseover',setOpacity);
    }else{
     gridCont.removeEventListener('mouseover',setOpacity);
    }
};
function setOpacity(Event){
    let compStyles = window.getComputedStyle(Event.target);
    function getCurrentOpacity (){
        return compStyles.getPropertyValue("opacity");
    };
    let hasBoxClass = Event.target.classList.contains('gridBox');
    let hasOpacityClass = Event.target.classList.contains('opacity');
    if (!hasOpacityClass && hasBoxClass){
        Event.target.style.opacity = 0.1
        Event.target.classList.add('opacity');
    } else {
    if(hasBoxClass){
        let newOpacity = parseFloat(getCurrentOpacity ()) + 0.1
        Event.target.style.opacity = `${newOpacity}`;
        };
    };
};
