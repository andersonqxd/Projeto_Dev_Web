const funcionarios = [
  {
    "Nome do funcionário": "ABINOER GOMES DA SILVA",
    Competência: "AGOSTO/2023",
    Folha: "FOLHA NORMAL",
    Vínculo: "02 - ESTATUTARIO",
    Cargo: "840 - PROFESSOR(A) EDUCACAO BASICA",
    Setor: "REG EDUCAC CENTRO - FUND. 70%",
    Matricula: "562.793,00",
    Proventos: 4393.25,
    Descontos: 863.58,
    Líquido: 3529.67,
  },
  {
    "Nome do funcionário": "ADAILTON BURITI LIMA",
    Competência: "AGOSTO/2023",
    Folha: "FOLHA NORMAL",
    Vínculo: "02 - ESTATUTARIO",
    Cargo: "9 - AUX. DE SERVICOS",
    Setor: "REG EDUCAC CIPO DOS ANJOS - FUND. 70%",
    Matricula: "550.809,00",
    Proventos: 1518.0,
    Descontos: 238.92,
    Líquido: 1279.08,
  },
  {
    "Nome do funcionário": "ADAILTON LIMA DE ALMEIDA",
    Competência: "AGOSTO/2023",
    Folha: "FOLHA NORMAL",
    Vínculo: "02 - ESTATUTARIO",
    Cargo: "271 - GUARDA PATRIMONIAL MUNICIPAL",
    Setor: "CRAS- RECURSOS FEDERAIS",
    Matricula: "918.628,00",
    Proventos: 2105.82,
    Descontos: 240.24,
    Líquido: 1865.58,
  },
  {
    "Nome do funcionário": "ADEANDRO DA ROCHA LIMA",
    Competência: "AGOSTO/2023",
    Folha: "FOLHA NORMAL",
    Vínculo: "02 - ESTATUTARIO",
    Cargo: "55 - MOTORISTA CATEGORIA D",
    Setor: "HOSPITAL MATERNIDADE DR.EUDASI",
    Matricula: "916.057,00",
    Proventos: 2290.62,
    Descontos: 248.16,
    Líquido: 2042.46,
  },
  {
    "Nome do funcionário": "ADELAIDE BATISTA ARAUJO",
    Competência: "AGOSTO/2023",
    Folha: "FOLHA NORMAL",
    Vínculo: "02 - ESTATUTARIO",
    Cargo: "840 - PROFESSOR(A) EDUCACAO BASICA",
    Setor: "REG EDUCAC CENTRO - FUND. 70%",
    Matricula: "899.884,00",
    Proventos: 4061.77,
    Descontos: 633.64,
    Líquido: 3428.13,
  },
];



const tabelaHeader = document.getElementById("tabela-header");
const tabelaDados = document.getElementById("tabela-dados");
const checkboxes = document.querySelectorAll(".filter");
const cargoSelect = document.getElementById("cargo-select");
const setorSelect = document.getElementById("setor-select");
const totalSetor = document.getElementById("total-setor");
const numFuncionarios = document.getElementById("num-funcionarios");
const mediaSalarial = document.getElementById("media-salarial");

// criação dos filtros para a estatitisticas
// neles selecionamos o setor e o cargo para fazer a filtragem dos dados
// e mostrar nas estatisticas

function preencherFiltros() { 
  const cargos = new Set(); //
  const setores = new Set();

  funcionarios.forEach((func) => {
    cargos.add(func.Cargo);
    setores.add(func.Setor);
  });

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



// 

function exibirFuncionarios() {
  tabelaDados.innerHTML = "";
  const cargoFiltro = cargoSelect.value;
  const setorFiltro = setorSelect.value;

  const filtrados = funcionarios.filter((func) => {
    return (
      (!cargoFiltro || func.Cargo === cargoFiltro) &&
      (!setorFiltro || func.Setor === setorFiltro)
    );
  });

  filtrados.forEach((func) => {
    const tr = document.createElement("tr");
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const td = document.createElement("td");
        td.textContent = func[checkbox.value] || "-";
        tr.appendChild(td);
      }
    });
    tabelaDados.appendChild(tr);
  });

  calcularEstatisticas(filtrados);
}



function calcularEstatisticas(filtrados) {
  const total = filtrados.reduce((acc, func) => acc + func.Líquido, 0);
  const quantidade = filtrados.length;
  const media = quantidade > 0 ? total / quantidade : 0;

  totalSetor.textContent = `R$ ${total.toFixed(2)}`;
  numFuncionarios.textContent = quantidade;
  mediaSalarial.textContent = `R$ ${media.toFixed(2)}`;
}

cargoSelect.addEventListener("change", exibirFuncionarios);
setorSelect.addEventListener("change", exibirFuncionarios);
preencherFiltros();
exibirFuncionarios();