# Instruções de utilização

O TimeSheet é uma aplicação feita em **[ASP.NET](https://dotnet.microsoft.com/pt-br/apps/aspnet)** e **[React](https://pt-br.legacy.reactjs.org/)**, para começar a utilizar essa aplicação é necessário fazer algumas configurações iniciais para que o ambiente de desenvolvimento estava apto a rodar a aplicação.

## Ambiente de Desenvolvimento

Essa seção descreve os requisitos e processos para começar a trabalhar nesse projeto.

### Requisitos de desenvolvimento

Para que seja possível compilar e rodar o projeto na máquina local
é necessário a instalação dos seguintes itens na máquina de desenvolvimento:

- **[Node.js](https://nodejs.org/en/download)** (versão 12 ou superior)
- **[NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)** (Node Package Manager)
- **[.NET SDK](https://dotnet.microsoft.com/en-us/download/visual-studio-sdks)**(versão 6 ou superior)

### Baixar o repositório

Para clonar o repositório do projeto acesse o terminal e digite o seguinte comando:
```
git clone https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet
```
ou faça o download do repositório no **[Link](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/archive/refs/heads/main.zip)**.

## Iniciar o desenvolvimento

### Interface da aplicação

Para trabalhar com a interface da aplicação verifique se você já tem o **[Node.js](https://nodejs.org/en)** instalado executando o seguinte comando no terminal:

```
npm -v
```

Caso o comando retorne um erro, veja a seção **[Requisitos de desenvolvimento](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/edit/main/codigo-fonte/README.md#requisitos-de-desenvolvimento)** para instalar no seu computador.

Após fazer o download do repositório, acesse a pasta **[ClientApp](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/edit/main/codigo-fonte/TimeSheet/ClientApp)** do projeto, abra o terminal e execute
os seguinte comandos:

```
npm install
```

### BackEnd

Para trabalhar com o back-end verifique se você já tem o **[.NET SDK](https://dotnet.microsoft.com/en-us/download/visual-studio-sdks)** instalado executando o seguinte comando no terminal:

```
dotnet --list-sdks
```
Caso o comando retorne um erro ou o sdk 6 não seja listado, veja a seção **[Requisitos de desenvolvimento](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/edit/main/codigo-fonte/README.md#requisitos-de-desenvolvimento)** para instalar no seu computador.

### Como executar

Após atualizar as dependências, acesse a pasta **[TimeSheet](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/edit/main/codigo-fonte/TimeSheet)** do projeto, abra o terminal e execute

```
dotnet build
dotnet run
```

#### Dados de acesso

CPF admin: **000.000.000-00**  
Senha admin: **admin@123**

## Releases

### Release 0.1.0 | Lançamento inicial

#### Funcionalidades
- RF-007
- RNF-001
- RNF-002
- RNF-003
- RNF-004
