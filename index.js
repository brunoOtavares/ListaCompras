// Função para carregar a lista do localStorage
function carregarLista() {
    const UL = document.getElementById('ElementList');
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    let total = 0;

    tarefas.forEach(tarefa => {
        const lisFeita = document.createElement('li');
        lisFeita.className = 'list';
        lisFeita.innerText = `${tarefa.item} - R$ ${parseFloat(tarefa.valor).toFixed(2)} (Qtd: ${tarefa.quantidade})`; // Exibe a quantidade

        const Remove = document.createElement('button');
        Remove.innerText = 'remover';
        Remove.className = 'Btn';
        Remove.onclick = function () {
            UL.removeChild(lisFeita);
            removerTarefa(tarefa.item, parseFloat(tarefa.valor), tarefa.quantidade); // Remove do localStorage
            atualizarTotal(); // Atualiza o total
        };

        lisFeita.appendChild(Remove);
        UL.appendChild(lisFeita);
        
        total += parseFloat(tarefa.valor) * tarefa.quantidade; // Calcula o total considerando a quantidade
    });

    // Atualiza o total na tela
    document.getElementById('total').innerText = total.toFixed(2);
}

// Função para adicionar a tarefa
function adicionar() {
    const itemInput = document.getElementById('item');
    const valorInput = document.getElementById('valor');
    const quantidadeInput = document.getElementById('quantidade');
    const UL = document.getElementById('ElementList');

    if (itemInput.value.trim() === "" || valorInput.value.trim() === "" || quantidadeInput.value.trim() === "") {
        alert("Por favor, insira um item, um valor e uma quantidade.");
        return;
    }

    const valor = parseFloat(valorInput.value); // Converte o valor para número
    const quantidade = parseInt(quantidadeInput.value); // Converte a quantidade para número
    if (isNaN(valor) || isNaN(quantidade) || quantidade <= 0) { // Verifica se a conversão foi bem-sucedida
        alert("Por favor, insira valores válidos.");
        return;
    }

    const lisFeita = document.createElement('li');
    lisFeita.className = 'list';
    lisFeita.innerText = `${itemInput.value} - R$ ${valor.toFixed(2)} (Qtd: ${quantidade})`; // Exibe a quantidade

    const Remove = document.createElement('button');
    Remove.innerText = 'remover';
    Remove.className = 'Btn';
    Remove.onclick = function () {
        UL.removeChild(lisFeita);
        removerTarefa(itemInput.value, valor, quantidade); // Remove do localStorage
        atualizarTotal(); // Atualiza o total
    };

    lisFeita.appendChild(Remove);
    UL.appendChild(lisFeita);

    // Salvar a tarefa no localStorage
    salvarTarefa(itemInput.value, valor, quantidade);
    
    // Atualiza o total
    atualizarTotal();

    itemInput.value = ''; // Limpa o campo de entrada
    valorInput.value = ''; // Limpa o campo de valor
    quantidadeInput.value = '1'; // Reseta a quantidade para 1
}

// Função para salvar a tarefa no localStorage
function salvarTarefa(itemTexto, valor, quantidade) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push({ item: itemTexto, valor: valor, quantidade: quantidade });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para remover a tarefa do localStorage
function removerTarefa(itemTexto, valor, quantidade) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas = tarefas.filter(tarefa => tarefa.item !== itemTexto);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para atualizar o total
function atualizarTotal() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const total = tarefas.reduce((acc, tarefa) => acc + (parseFloat(tarefa.valor) * tarefa.quantidade), 0);
    document.getElementById('total').innerText = total.toFixed(2);
}

// Carregar a lista ao iniciar a aplicação
window.onload = carregarLista;
