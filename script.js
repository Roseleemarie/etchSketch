let btnCont = document.querySelector("#btnCont");
let gridCont = document.querySelector("#gridCont");
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
function fillBoxBlack(event){
    let gridBoxEvent = event.target.className;
    if(gridBoxEvent === 'gridBox'|| gridBoxEvent === 'gridBox fill'){
        event.target.classList.add('fill');
        event.target.style.backgroundColor = 'black'
    };
};
gridCont.addEventListener('mouseover', fillBoxBlack);
const colourBtn = document.querySelector('#colour');
colourBtn.addEventListener('click',colourBtnHandler)
function colourBtnHandler (){
    const userColourController = new AbortController
    const signal = userColourController.signal
    if (!colourBtnOn){
        colourBtnOn = true
        let getUserColour = prompt ('Enter a valid HEX# or colour name');
        gridCont.removeEventListener('mouseover', fillBoxBlack);
        gridCont.addEventListener('mouseover', ()=>{
            setUserColour(getUserColour,event)},{signal});
    } else if (colourBtnOn){
        colourBtnOn = false
        gridCont.addEventListener('mouseover', fillBoxBlack);
        userColourController.abort();        
    }
}
function setUserColour(getUserColour,event){
        let gridBoxEvent = event.target.className;
        if(gridBoxEvent === 'gridBox'|| gridBoxEvent === 'gridBox fill'){
            event.target.classList.add('fill');
            event.target.style.backgroundColor = `${getUserColour}`;
        };
}
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
function erase (event){
    if (eraseBtnOn == true){
        let gridBoxEvent = event.target.className;
        if(gridBoxEvent === 'gridBox fill'){
        event.target.classList.remove('fill');
        event.target.style.backgroundColor = 'unset';
        };
    }else if (eraseBtnOn == false){
        gridCont.removeEventListener('mouseover', erase);
        if(colourBtnOn == true){
         gridCont.addEventListener('mouseover', colourEventHandler);        
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
    if (rgbBtnOn == true){
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        rgbColour =  `rgb(${r}, ${g}, ${b})`;
        let gridBoxEvent = Event.target.className;
        if(gridBoxEvent === 'gridBox'|| gridBoxEvent === 'gridBox fill'){
            Event.target.classList.add('fill');
            Event.target.style.backgroundColor = `${rgbColour}`;
        };
    }else if (rgbBtnOn == false){
        gridCont.removeEventListener('mouseover', getRandomRgbColour);
        gridCont.addEventListener('mouseover', fillBoxBlack);
    };
};
const opacityBtn = document.querySelector('#opacity');