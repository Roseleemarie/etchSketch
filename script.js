let btnCont = document.querySelector("#btnCont");
let gridCont = document.querySelector("#gridCont");
//let gridBox = document.createElement("div");
let changeColor = "black";
size(16);
function size (currentSize){
    sizeVal=(600/currentSize);
    for (let i=0;i<currentSize*currentSize;i++){
        let gridBox = document.createElement("div")
        gridBox.className = 'gridBox'
        gridBox.setAttribute("style", 
            `width: ${sizeVal}px;
            height: ${sizeVal}px;`);
        gridBox.addEventListener("mouseenter", function () {
            gridBox.style.background = 'black';
        });
        gridCont.appendChild(gridBox);
    };
    gridCont.addEventListener('mouseover',(event,changeColor) => {
    let gridBoxEvent = event.target.className
    if(gridBoxEvent === 'gridBox'){
        event.target.classList.add('filled');
        event.target.classList.add(changeColor);
    };
    });
};
let clearBtn = document.querySelector("#clear");

clearBtn.addEventListener('click', ()=> gridClear('16'));
function gridClear (currentSize){
    let gridBoxArray = document.querySelectorAll(".gridBox");
    [...gridBoxArray].forEach( (gridBox) => {
        gridCont.removeChild(gridBox);
    });
    return size(currentSize);
};
let resizeBtn = document.querySelector("#size")
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


