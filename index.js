

let funcionarios = []; 
// A função abaixo carrega os dados do json
async function carregarDados() {
    try {
        const resposta = await fetch("detalhamentopessoal.json");
        const dados = await resposta.json();

        funcionarios = dados.data; // Agora acessamos corretamente a lista de funcionários
        popularFiltros(); 
        atualizarTabela(funcionarios); // Dados na tabela de inicio
    } catch (erro) {
        console.error("Erro ao carregar os dados:", erro);
    }
}

// Aqui a função para preencher os selects de filtro
function popularFiltros() {
    const cargoSelect = document.getElementById("cargo-select");
    const setorSelect = document.getElementById("setor-select");


    const cargos = new Set();
    const setores = new Set();

    funcionarios.forEach(func => {
        cargos.add(func["Cargo"]);
        setores.add(func["Setor"]);
    });

    cargos.forEach(cargo => {
        const option = document.createElement("option");
        option.value = cargo;
        option.textContent = cargo;
        cargoSelect.appendChild(option);
    });

    setores.forEach(setor => {
        const option = document.createElement("option");
        option.value = setor;
        option.textContent = setor;
        setorSelect.appendChild(option);
    });
}

// Essa função é para filtrar os funcionários conforme a escolha do usuário
function filtrarDados() {
    const cargoSelecionado = document.getElementById("cargo-select").value;
    const setorSelecionado = document.getElementById("setor-select").value;

    let dadosFiltrados = funcionarios.filter(func => {
        return (cargoSelecionado === "" || func["Cargo"] === cargoSelecionado) &&
               (setorSelecionado === "" || func["Setor"] === setorSelecionado);
    });

    atualizarTabela(dadosFiltrados);
    calcularEstatisticas(dadosFiltrados);
}

// Aqui atualiza a tabela com os dados filtrados
function atualizarTabela(dados) {
    const tabelaHeader = document.getElementById("tabela-header");
    const tabelaBody = document.getElementById("tabela-dados");
    
    tabelaHeader.innerHTML = "";
    tabelaBody.innerHTML = "";

    // Obter colunas selecionadas pelos checkboxes
    const colunasSelecionadas = Array.from(document.querySelectorAll(".filter:checked"))
                                     .map(input => input.value);

    // Criar cabeçalho da tabela
    const headerRow = document.createElement("tr");
    colunasSelecionadas.forEach(coluna => {
        const th = document.createElement("th");
        th.textContent = coluna;
        headerRow.appendChild(th);
    });
    tabelaHeader.appendChild(headerRow);

    // Preenche a tabela com os dados filtrados
    dados.forEach(func => {
      console.log(func)
        const row = document.createElement("tr");

        colunasSelecionadas.forEach(coluna => {
            const td = document.createElement("td");
            td.textContent = func.hasOwnProperty(coluna) ? func[coluna] : "-";
            row.appendChild(td);
        });

        tabelaBody.appendChild(row);
        
    });
}

// Calculo das estatísticas
function calcularEstatisticas(dados) {
  const totalSetor = dados.length;
  const totalSalariosLiquidos = dados.reduce((acc, func) => acc + (func["Líquido"] || 0), 0);
  const mediaSalarial = totalSetor > 0 ? totalSalariosLiquidos / totalSetor : 0;

// Novo: Total de proventos e descontos
  const totalProventos = dados.reduce((acc, func) => acc + (func["Proventos"] || 0), 0);
  const totalDescontos = dados.reduce((acc, func) => acc + (func["Descontos"] || 0), 0);

// Novo: Média de proventos e descontos
const mediaProventos = totalSetor > 0 ? totalProventos / totalSetor : 0;
const mediaDescontos = totalSetor > 0 ? totalDescontos / totalSetor : 0;

// Novo: Maior e menor salário líquido
const maiorSalario = Math.max(...dados.map(func => func["Líquido"] || 0));
const menorSalario = Math.min(...dados.map(func => func["Líquido"] || 0));

// Novo: Funcionário com maior desconto
const funcionarioMaiorDesconto = dados.reduce((maior, func) => (func["Descontos"] > (maior?.["Descontos"] || 0) ? func : maior), null);

// Novo: Média percentual de descontos sobre proventos
const percentualDescontoMedio = totalProventos > 0 ? (totalDescontos / totalProventos) * 100 : 0;


// Atualizando o HTML
document.getElementById("total-setor").textContent = totalSetor;
document.getElementById("num-funcionarios").textContent = totalSetor;
document.getElementById("media-salarial").textContent = mediaSalarial.toLocaleString("pt-BR", {
    style: "currency", currency: "BRL"
});

// Adicionando novas estatísticas ao HTML
    document.getElementById("total-proventos").textContent = totalProventos.toLocaleString("pt-BR", {
        style: "currency", currency: "BRL"
    });
    document.getElementById("total-descontos").textContent = totalDescontos.toLocaleString("pt-BR", {
        style: "currency", currency: "BRL"
    });
    document.getElementById("media-proventos").textContent = mediaProventos.toLocaleString("pt-BR", {
        style: "currency", currency: "BRL"
    });
    document.getElementById("media-descontos").textContent = mediaDescontos.toLocaleString("pt-BR", {
        style: "currency", currency: "BRL"
    });
    document.getElementById("maior-salario").textContent = maiorSalario.toLocaleString("pt-BR", {
        style: "currency", currency: "BRL"
    });
    document.getElementById("menor-salario").textContent = menorSalario.toLocaleString("pt-BR", {
        style: "currency", currency: "BRL"
    });
    document.getElementById("percentual-desconto").textContent = percentualDescontoMedio.toFixed(2) + "%";

    if (funcionarioMaiorDesconto) {
        document.getElementById("funcionario-maior-desconto").textContent = `${funcionarioMaiorDesconto["Nome do funcionário"]} - ${funcionarioMaiorDesconto["Descontos"].toLocaleString("pt-BR", {
            style: "currency", currency: "BRL"
        })}`;
}
}

// Adicionar os eventos no HTML
document.getElementById("aplicar-filtros").addEventListener("click", filtrarDados);
document.querySelectorAll(".filter").forEach(checkbox => {
    checkbox.addEventListener("change", () => filtrarDados());
});



// Chamada inicial para carregar os dados ao abrir a página
carregarDados();
