const funcionarios = [
  {
    "Nome do funcionário": "ABINOER GOMES DA SILVA",
    Competência: "AGOSTO/2023",
    Folha: "FOLHA NORMAL",
    Vínculo: "02 - ESTATUTARIO",
    Cargo: "Professor",
    Setor: "Educação",
    Departamento: "Ensino Fundamental",
    Matrícula: "562.793,00",
    Proventos: 4393.25,
    Descontos: 863.58,
    Líquido: 3529.67,
  },
  {
    "Nome do funcionário": "ADAILTON BURITI LIMA",
    Competência: "AGOSTO/2023",
    Folha: "FOLHA NORMAL",
    Vínculo: "02 - ESTATUTARIO",
    Cargo: "Auxiliar de Serviços Gerais",
    Setor: "Educação",
    Departamento: "Infraestrutura Escolar",
    Matrícula: "550.809,00",
    Proventos: 1518.0,
    Descontos: 238.92,
    Líquido: 1279.08,
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
  }
];

const tabelaHeader = document.getElementById("tabela-header");
const tabelaDados = document.getElementById("tabela-dados");
const checkboxes = document.querySelectorAll(".filter");
const departamentoSelect = document.getElementById("departamento-select");
const totalDepartamento = document.getElementById("total-departamento");
const numFuncionarios = document.getElementById("num-funcionarios");
const mediaSalarial = document.getElementById("media-salarial");

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

function preencherDepartamentos() {
    const departamentos = new Set();
    funcionarios.forEach((func) => departamentos.add(func.Departamento));

    departamentos.forEach((departamento) => {
        const option = document.createElement("option");
        option.value = departamento;
        option.textContent = departamento;
        departamentoSelect.appendChild(option);
    });
}

function exibirFuncionarios() {
    tabelaDados.innerHTML = "";
    const departamentoFiltro = departamentoSelect.value;

    const filtrados = funcionarios.filter((func) => {
        return !departamentoFiltro || func.Departamento === departamentoFiltro;
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

    totalDepartamento.textContent = `R$ ${total.toFixed(2)}`;
    numFuncionarios.textContent = quantidade;
    mediaSalarial.textContent = `R$ ${media.toFixed(2)}`;
}

    departamentoSelect.addEventListener("change", exibirFuncionarios);
    checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", () => {
        atualizarCabecalho();
        exibirFuncionarios();
    })
);

preencherDepartamentos();
atualizarCabecalho();
exibirFuncionarios();
