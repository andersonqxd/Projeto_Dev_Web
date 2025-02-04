// Caminho do arquivo JSON
const JSON_URL = "detalhamentopessoal.json"; 

let funcionarios = []; 
// A função abaixo carrega os dados do json
async function carregarDados() {
    try {
        const resposta = await fetch(JSON_URL);
        if (!resposta.ok) {
            throw new Error(`Erro HTTP! Status: ${resposta.status}`);
        }
        const dados = await resposta.json();
        
        if (!dados.data || !Array.isArray(dados.data)) {
            throw new Error("Erro: Estrutura do JSON inesperada!");
        }

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

  document.getElementById("total-setor").textContent = totalSetor;
  document.getElementById("num-funcionarios").textContent = totalSetor;
  document.getElementById("media-salarial").textContent = mediaSalarial.toLocaleString("pt-BR", {
      style: "currency", currency: "BRL"
  });
}

// Adicionar os eventos no HTML
document.getElementById("aplicar-filtros").addEventListener("click", filtrarDados);
document.querySelectorAll(".filter").forEach(checkbox => {
    checkbox.addEventListener("change", () => filtrarDados());
});



// Chamada inicial para carregar os dados ao abrir a página
carregarDados();
