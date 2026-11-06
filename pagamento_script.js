const formulario = document.getElementById("form");
const campoNome = document.getElementById("nome");
const campoTelefone = document.getElementById("telefone");
const campoEndereco = document.getElementById("endereco");
const campoNumero = document.getElementById("numero");

// Filtra caracteres enquanto o usuário digita ou cola.
const regexInvalidosNome = /[^\p{L} '’-]/gu;
const regexInvalidosEndereco = /[^\p{L} ]/gu;
const regexNaoDigitos = /\D/g;

// Valida os valores completos antes de confirmar o formulário.
const regexNome = /^(?=(?:[ '’-]*\p{L}){2})\p{L}[\p{L} '’-]*$/u;
const regexTelefone = /^\d{2}-9\d{4}-\d{4}$/;
const regexEndereco = /^\p{L}[\p{L} ]*$/u;
const regexNumero = /^\d+$/;

campoNome.addEventListener("input", function () {
    const nomeFiltrado = campoNome.value
        .normalize("NFC")
        .replace(regexInvalidosNome, "");

    if (campoNome.value !== nomeFiltrado) {
        campoNome.value = nomeFiltrado;
    }

    campoNome.setCustomValidity("");
});

campoTelefone.addEventListener("input", function () {
    const digitos = campoTelefone.value
        .replace(regexNaoDigitos, "")
        .slice(0, 11);

    // Coloca um hífen após o DDD e outro antes do bloco final.
    const telefoneFormatado = digitos
        .replace(/^(\d{2})(\d)/, "$1-$2")
        .replace(/^(\d{2}-\d{5})(\d)/, "$1-$2");

    if (campoTelefone.value !== telefoneFormatado) {
        campoTelefone.value = telefoneFormatado;
    }

    campoTelefone.setCustomValidity("");
});

campoEndereco.addEventListener("input", function () {
    const enderecoFiltrado = campoEndereco.value
        .normalize("NFC")
        .replace(regexInvalidosEndereco, "");

    if (campoEndereco.value !== enderecoFiltrado) {
        campoEndereco.value = enderecoFiltrado;
    }

    campoEndereco.setCustomValidity("");
});

campoNumero.addEventListener("input", function () {
    const numeroFiltrado = campoNumero.value.replace(regexNaoDigitos, "");

    if (campoNumero.value !== numeroFiltrado) {
        campoNumero.value = numeroFiltrado;
    }

    campoNumero.setCustomValidity("");
});

formulario.addEventListener("submit", function (evento) {
    // Mantém a demonstração no navegador.
    evento.preventDefault();

    const nome = campoNome.value.trim().normalize("NFC");
    const telefone = campoTelefone.value;
    const endereco = campoEndereco.value.trim().normalize("NFC");
    const numero = campoNumero.value;

    if (!regexNome.test(nome)) {
        campoNome.setCustomValidity("Digite um nome com pelo menos duas letras.");
        campoNome.reportValidity();
        return;
    }

    if (!regexTelefone.test(telefone)) {
        campoTelefone.setCustomValidity("Digite um celular no formato 21-96408-4028.");
        campoTelefone.reportValidity();
        return;
    }

    if (!regexEndereco.test(endereco)) {
        campoEndereco.setCustomValidity("Digite o endereço usando letras e espaços.");
        campoEndereco.reportValidity();
        return;
    }

    if (!regexNumero.test(numero)) {
        campoNumero.setCustomValidity("Digite o número do endereço usando apenas dígitos.");
        campoNumero.reportValidity();
        return;
    }

    alert("Formulário validado com sucesso!");
});