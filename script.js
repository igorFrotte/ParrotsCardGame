let nCartas = 1;
let cartas = [];
let cont = 0;

while(nCartas%2 !== 0 || nCartas<4 || nCartas>14){
    nCartas = Number(prompt("Quantas cartas de 4 a 14 você quer? (apenas números pares)"));
}

for(let i = 0; i<nCartas/2;i++){
    cartas.push(i+1);
    cartas.push(i+1);
}

cartas.sort(comparador); 

for(let a = 0; a<nCartas;a++){
    document.querySelector(".pagina").innerHTML += `
    <div class="card">
            <div class="id">${cartas[a]}</div>
            <div class="front-face face" onclick='selecionar(this)'><img src="./imagens/front.png"></div>
            <div class="back-face face"><img src="./imagens/${cartas[a]}.gif"></div>
    </div>`;
}

function selecionar (elemento) {
    cont += 1;
    const pai = elemento.parentNode;
    let viradas = document.querySelectorAll(".card.virada");

    if(viradas.length < 2){
        virar(pai);
        verificar();
    }
}

function virar(elemento){
    elemento.classList.toggle('virada');

    if(elemento.classList.contains("virada")){
        elemento.querySelector(".back-face").style.transform = "rotateY(0deg)";
        elemento.querySelector(".front-face").style.transform = "rotateY(-180deg)";
    }else{
        elemento.querySelector(".back-face").style.transform = "rotateY(180deg)";
        elemento.querySelector(".front-face").style.transform = "rotateY(0deg)";
    }
}

function verificar(){
    let viradas = document.querySelectorAll(".card.virada");
    
    if(viradas.length == 2){
        if(viradas[0].querySelector(".id").innerHTML == viradas[1].querySelector(".id").innerHTML){
            viradas[0].classList.remove("virada");
            viradas[1].classList.remove("virada");
            viradas[0].classList.add("certa");
            viradas[1].classList.add("certa");
        }else{
            setTimeout(function () {
                virar(viradas[0]);
                virar(viradas[1]);
              }, 1000);
        }
    }
    if(document.querySelectorAll(".card.certa").length == nCartas){
        alert("Você ganhou em " + cont + " jogadas!");
    }
}

function comparador() { 
	return Math.random() - 0.5; 
} 

