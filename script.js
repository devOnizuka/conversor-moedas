const exibirValor = document.getElementById("exibirConvertido");
const exibirValorOriginal = document.getElementById("exibirOriginal");
const valor = document.getElementById("valor");
const botaoConverter = document.getElementById("converter");
const moedaOrigem = document.getElementById("moedaOrigem");
const moedaDestino = document.getElementById("moedaDestino");
const botaoInverter = document.getElementById("inverter");
const mensagemErro = document.getElementById("mensagemErro");
const exibirCotacao = document.getElementById("valorCotacao");
const exibirData = document.getElementById("dataCotacao");
    let ultimoValorValido = "";
valor.addEventListener("input", function(){
    if (valor.value === "") {
        ultimoValorValido = "";
        return;
    }
    if (/^\d+[.,]?\d{0,2}$/.test(valor.value)) {
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
        if(resposta.ok){
        return resposta.json();
        } else{
            throw new Error("Site Indisponível");
        }
    }).then(function(dados){
        const cotacao = dados.rate;
        const dataSeparada = dados.date.split("-");
        const dataFormatada = dataSeparada[2] + "/" + dataSeparada[1] + "/" + dataSeparada[0];
        exibirCotacao.textContent =  "1 "  + origemEscolhida +  "  =  " + cotacao.toFixed(2).replace(".", ",")  + " " + destinoEscolhido;
        exibirData.textContent = "Data da cotação: " + dataFormatada;
        const resultadoConvertido = valorDigitado * cotacao;
        exibirValorOriginal.textContent = valorDigitado.toFixed(2).replace(".",",") + " " + origemEscolhida;
        exibirValor.textContent = resultadoConvertido.toFixed(2).replace(".",",") + " " + destinoEscolhido;
        valor.value = "";
        exibirValorOriginal.style.fontSize = "";
        exibirValor.style.fontSize = "";    
        let tamanhoFonte = parseFloat(getComputedStyle(exibirValor).fontSize);
        let tamanhoFonteOriginal = parseFloat(getComputedStyle(exibirValorOriginal).fontSize);
        while (exibirValor.scrollWidth > exibirValor.clientWidth && tamanhoFonte > 10) {
        tamanhoFonte--;
        exibirValor.style.fontSize = tamanhoFonte + "px";
    }
        
        while (exibirValorOriginal.scrollWidth > exibirValorOriginal.clientWidth && tamanhoFonteOriginal > 10) {
        tamanhoFonteOriginal--;
        exibirValorOriginal.style.fontSize = tamanhoFonteOriginal + "px";
}


    })

.catch(function(erro){
    exibirValorOriginal.textContent = "";
    exibirValor.textContent = "";
    exibirData.textContent = "";
    exibirCotacao.textContent = "Não foi possível realizar a conversão."
});
    
});
fetch("https://api.frankfurter.dev/v2/currencies").then(function(resposta) {
     if(resposta.ok){
        return resposta.json();
        } else{
            throw new Error("Não foi possível carregar a lista de moedas.");
        }
    })
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
.catch(function(erro){
        document.getElementById("mensagemErro").textContent = "Não foi possível carregar a lista de moedas.";
    });

botaoInverter.addEventListener("click", function(){
    const moedaTemporaria = moedaOrigem.value;
    moedaOrigem.value = moedaDestino.value;
    moedaDestino.value = moedaTemporaria;
    const exibirValorTemporario = exibirValor.textContent;
    exibirValor.textContent = exibirValorOriginal.textContent;
    exibirValorOriginal.textContent = exibirValorTemporario;
    const origemEscolhida = moedaOrigem.value;
    const destinoEscolhido = moedaDestino.value;

    const urlInvertida = `https://api.frankfurter.dev/v2/rate/${origemEscolhida}/${destinoEscolhido}`;
    fetch(urlInvertida)
    .then(function(resposta){
        if(resposta.ok){
        return resposta.json();
        } else{
            throw new Error("Site Indisponível");
        }
    })
    .then(function(dados){
        const cotacaoInvertida = dados.rate;
        exibirCotacao.textContent = " 1 " + origemEscolhida + " = " + cotacaoInvertida.toFixed(2).replace(".", ",") + " " + destinoEscolhido;
        const dataSeparada = dados.date.split("-");
        const dataFormatada = dataSeparada[2] + "/" + dataSeparada[1] + "/" + dataSeparada[0];
         exibirData.textContent = "Data da cotação: " + dataFormatada;
    })
    .catch(function(erro){
        
        exibirData.textContent = "";
        exibirCotacao.textContent = "Não foi possível atualizar a conversão."
    });
});

