const exibirValor = document.getElementById("exibirConvertido");

const valor = document.getElementById("valor");
const botaoConverter = document.getElementById("converter");
const moedaOrigem = document.getElementById("moedaOrigem");
const moedaDestino = document.getElementById("moedaDestino");
    let ultimoValorValido = "";
valor.addEventListener("input", function(){
    if (/^\d*[.,]?\d{0,2}$/.test(valor.value)) {
        ultimoValorValido = valor.value;
    } else{
        valor.value = ultimoValorValido;
    }
});

botaoConverter.addEventListener("click", function(){
const valorDigitado = Number(valor.value.replace(",","."));
const origemEscolhida = moedaOrigem.value;
const destinoEscolhido = moedaDestino.value;
if (valor.value ===""){
return;
}
const url = `https://api.frankfurter.dev/v2/rate/${origemEscolhida}/${destinoEscolhido}`;

    fetch(url)
    .then(function(resposta){
        return resposta.json();
    }).then(function(dados){
        const cotacao = dados.rate;
        const resultadoConvertido = valorDigitado * cotacao;
        exibirValor.textContent = resultadoConvertido;
    })

    
    
});
fetch("https://api.frankfurter.dev/v2/currencies").then(function(resposta) {
    return resposta.json();})
    .then(function(dados){
    dados.forEach(function(moeda){
       const optionOrigem = document.createElement("option");
       const optionDestino = document.createElement("option");
       optionOrigem.value = moeda.iso_code;
       optionOrigem.textContent = moeda.name;
       optionDestino.value = moeda.iso_code;
       optionDestino.textContent = moeda.name;
       moedaOrigem.appendChild(optionOrigem);
       moedaDestino.appendChild(optionDestino)});
})
