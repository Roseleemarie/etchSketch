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
gridCont.addEventListener('mouseover', fillBoxBlack)
function fillBoxBlack(event){
    let gridBoxEvent = event.target.className;
    if(gridBoxEvent === 'gridBox'){
        event.target.classList.add('fill');
        event.target.style.backgroundColor = 'black'
    };
};
const colourBtn = document.querySelector('#colour');
let colourBtnOn = false
colourBtn.addEventListener('click',()=>{
    console.log('colour pressed');
    colourBtnOn = !colourBtnOn
    gridCont.removeEventListener('mouseover', fillBoxBlack);
    chosenColour = prompt ('Enter a valid colour HEX or Name');
    gridCont.addEventListener('mouseover', (event) => fillBoxColour(chosenColour,event));
});
function fillBoxColour (chosenColour,event){
    let gridBoxEvent = event.target.className;
    if(gridBoxEvent === 'gridBox'|| gridBoxEvent === 'gridBox fill'){
        event.target.classList.add('fill');
        console.log(chosenColour);
        event.target.style.backgroundColor = `${chosenColour}`;
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
let eraseBtnOn = false;
eraseBtn.addEventListener('click',()=>{
    gridCont.removeEventListener('mouseover', fillBoxBlack);
    gridCont.removeEventListener('mouseover', (event) => fillBoxColour(chosenColour,event));
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
        gridCont.addEventListener('mouseover', (event) => fillBoxColour(chosenColour,event));
        }else{
        gridCont.addEventListener('mouseover', fillBoxBlack);
        }
    }
};
