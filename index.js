// Carregar dados do arquivo JSON
const dados = [
    { "cargo": "Professor(a) Educação Básica", "setor": "Reg Educação Centro - Fund. 70%", "salario": 3000 },
    { "cargo": "Aux. de Serviços", "setor": "Reg Educação Cipo dos Anjos - Fund. 70%", "salario": 1500 },
    { "cargo": "Aux. de Serviços", "setor": "Reg Educação Cipo dos Anjos - Fund. 70%", "salario": 2500 },
    { "cargo": "Guarda Patrimonial Municipal", "setor": "CRAS - Recursos Federais", "salario": 2000 },
    { "cargo": "Motorista Categoria D", "setor": "Hospital Maternidade Dr. Eudasi", "salario": 1800 }
];

const tabela = document.getElementById('tabela-dados');
const filtroForm = document.getElementById('filtro-form');
const aplicarFiltroBtn = document.getElementById('aplicar-filtro');
const calcularEstatisticasBtn = document.getElementById('calcular-estatisticas');

const mediaSalarialEl = document.getElementById('media-salarial');
const salarioMaximoEl = document.getElementById('salario-maximo');
const salarioMinimoEl = document.getElementById('salario-minimo');

// Função para exibir dados na tabela
function exibirDados(filtrados) {
    tabela.innerHTML = '';
    filtrados.forEach(dado => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
                    <td>${dado.cargo}</td>
                    <td>${dado.setor}</td>
                    <td>R$ ${dado.salario.toFixed(2)}</td>
                `;
        tabela.appendChild(linha);
    });
}

// Exibir todos os dados ao carregar a página
exibirDados(dados);

// Função para aplicar filtros
aplicarFiltroBtn.addEventListener('click', () => {
    const cargoFiltro = document.getElementById('cargo').value.toLowerCase();
    const setorFiltro = document.getElementById('setor').value.toLowerCase();

    const filtrados = dados.filter(dado => {
        const cargoMatch = dado.cargo.toLowerCase().includes(cargoFiltro);
        const setorMatch = dado.setor.toLowerCase().includes(setorFiltro);
        return cargoMatch && setorMatch;
    });

    exibirDados(filtrados);
});

// Função para calcular estatísticas
calcularEstatisticasBtn.addEventListener('click', () => {
    const cargoFiltro = document.getElementById('cargo').value.toLowerCase();
    const setorFiltro = document.getElementById('setor').value.toLowerCase();

    const filtrados = dados.filter(dado => {
        const cargoMatch = dado.cargo.toLowerCase().includes(cargoFiltro);
        const setorMatch = dado.setor.toLowerCase().includes(setorFiltro);
        return cargoMatch && setorMatch;
    });

    if (filtrados.length > 0) {
        const salarios = filtrados.map(dado => dado.salario);
        const media = salarios.reduce((acc, val) => acc + val, 0) / salarios.length;
        const max = Math.max(...salarios);
        const min = Math.min(...salarios);

        mediaSalarialEl.textContent = `Média Salarial: R$ ${media.toFixed(2)}`;
        salarioMaximoEl.textContent = `Salário Máximo: R$ ${max.toFixed(2)}`;
        salarioMinimoEl.textContent = `Salário Mínimo: R$ ${min.toFixed(2)}`;
        // Adicionando a funcionalidade restante para calcular estatísticas e exibir resultados completos
        const calcularEstatisticasBtn = document.getElementById('calcular-estatisticas');
        const mediaSalarialEl = document.getElementById('media-salarial');
        const salarioMaximoEl = document.getElementById('salario-maximo');
        const salarioMinimoEl = document.getElementById('salario-minimo');

        // Função para calcular estatísticas com os dados filtrados
        calcularEstatisticasBtn.addEventListener('click', () => {
            const cargoFiltro = document.getElementById('cargo').value.toLowerCase();
            const setorFiltro = document.getElementById('setor').value.toLowerCase();

            // Filtrar os dados baseados nos campos de Cargo e Setor
            const filtrados = dados.filter(dado => {
                const cargoMatch = cargoFiltro ? dado.cargo.toLowerCase().includes(cargoFiltro) : true;
                const setorMatch = setorFiltro ? dado.setor.toLowerCase().includes(setorFiltro) : true;
                return cargoMatch && setorMatch;
            });

            if (filtrados.length > 0) {
                // Cálculo de estatísticas
                const salarios = filtrados.map(dado => dado.salario);
                const media = salarios.reduce((acc, val) => acc + val, 0) / salarios.length;
                const max = Math.max(...salarios);
                const min = Math.min(...salarios);

                // Atualizar as informações na interface
                mediaSalarialEl.textContent = `Média Salarial: R$ ${media.toFixed(2)}`;
                salarioMaximoEl.textContent = `Salário Máximo: R$ ${max.toFixed(2)}`;
                salarioMinimoEl.textContent = `Salário Mínimo: R$ ${min.toFixed(2)}`;
            } else {
                // Caso não haja dados correspondentes aos filtros
                mediaSalarialEl.textContent = 'Média Salarial: Nenhum dado encontrado';
                salarioMaximoEl.textContent = 'Salário Máximo: Nenhum dado encontrado';
                salarioMinimoEl.textContent = 'Salário Mínimo: Nenhum dado encontrado';
            }
        })
    }
})