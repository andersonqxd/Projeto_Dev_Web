const urlJson = "detalhamentopessoal.json"; // URL do arquivo JSON
const tabelaHeader = document.getElementById("tabela-header");
const tabelaDados = document.getElementById("tabela-dados");
const checkboxes = document.querySelectorAll(".filter");
const cargoSelect = document.getElementById("cargo-select");
const setorSelect = document.getElementById("setor-select");

// Atualiza o cabeçalho da tabela com base nos checkboxes selecionados
function atualizarCabecalho() {
  tabelaHeader.innerHTML = "";
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const th = document.createElement("th");
      th.textContent = checkbox.value;
      tabelaHeader.appendChild(th);
    }
  });
}

// Exibe os dados do funcionário filtrados por cargo e setor
function exibirFuncionarios(funcionarios) {
  tabelaDados.innerHTML = ""; // Limpa dados anteriores

  const cargoFiltro = cargoSelect.value;
  const setorFiltro = setorSelect.value;

  const filtrados = funcionarios.filter((funcionario) => {
    const cargoMatch = !cargoFiltro || funcionario.Cargo === cargoFiltro;
    const setorMatch = !setorFiltro || funcionario.Setor === setorFiltro;
    return cargoMatch && setorMatch;
  });

  filtrados.forEach((funcionario) => {
    const tr = document.createElement("tr");
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const td = document.createElement("td");
        td.textContent = funcionario[checkbox.value] || "-";
        tr.appendChild(td);
      }
    });
    tabelaDados.appendChild(tr);
  });
}

// Preenche as opções dos filtros de cargo e setor
function preencherFiltros(funcionarios) {
  const cargos = new Set(funcionarios.map((func) => func.Cargo));
  const setores = new Set(funcionarios.map((func) => func.Setor));

  cargos.forEach((cargo) => {
    const option = document.createElement("option");
    option.value = cargo;
    option.textContent = cargo;
    cargoSelect.appendChild(option);
  });

  setores.forEach((setor) => {
    const option = document.createElement("option");
    option.value = setor;
    option.textContent = setor;
    setorSelect.appendChild(option);
  });
}

// Carrega os dados do arquivo JSON
function carregarDados() {
  fetch(urlJson)
    .then((response) => response.json())
    .then((funcionarios) => {
      preencherFiltros(funcionarios);
      exibirFuncionarios(funcionarios);

      // Atualiza a tabela ao selecionar filtros
      cargoSelect.addEventListener("change", () =>
        exibirFuncionarios(funcionarios)
      );
      setorSelect.addEventListener("change", () =>
        exibirFuncionarios(funcionarios)
      );
      checkboxes.forEach((checkbox) =>
        checkbox.addEventListener("change", () => {
          atualizarCabecalho();
          exibirFuncionarios(funcionarios);
        })
      );
    })
    .catch((error) => console.error("Erro ao carregar os dados:", error));
}

// Inicializa a aplicação
carregarDados();
atualizarCabecalho();
