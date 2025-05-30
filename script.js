let btnCont = document.querySelector("#btnCont");
let gridCont = document.querySelector("#gridCont");
let button = document.querySelectorAll("button");
let gridBox = document.createElement("div");


let changecolor = "black";

size = 25


sizeVal=(600/size);
    for (let i=0;i<size*size;i++){
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




