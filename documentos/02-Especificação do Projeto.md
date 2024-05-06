# Especificações do Projeto

Este documento de Especificação do Projeto visa fornecer uma visão abrangente e detalhada das metas, requisitos e funcionalidades que orientarão o desenvolvimento deste projeto. Este documento serve como o alicerce conceitual do projeto, proporcionando uma visão abrangente e estruturada de todas as características planejadas para o software.

## Arquitetura e Tecnologias

O desenvolvimento de software moderno depende de uma variedade de tecnologias para criar produtos eficientes e inovadores. Nesta seção, destacamos algumas das principais tecnologias utilizadas no processo de desenvolvimento do sistema proposto.

A imagem abaixo representa a comunicação entre algumas das tecnologias utilizadas no desenvolvimento do sistema:

![arquitetura-time-sheet](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e3-proj-mov-t1-shape-up/assets/82043220/10b141ab-c810-434d-aada-0a5b63666602)

Todas as tecnologias utilizadas estão listadas abaixo, separadas por tópicos e contém um breve resumo dos motivos de sua escolha.

### Linguagens

As linguagens de programação são a base do desenvolvimento de software. Dependendo dos requisitos e objetivos do projeto, diferentes linguagens podem ser utilizadas.

<table>
 <tr>
   <td colspan='2' align='center'><strong>Linguagens</strong></td>
 </tr>
 <tr>
   <td width='200' align='center'><strong>Linguagem</strong></td>
   <td width='800'><strong>Motivo da escolha</strong></td>
 </tr>
  <tr>
    <td align='center'><a href='https://262.ecma-international.org/13.0/'>JavaScript</a></td>
   <td> O JavaScript (JS) é uma linguagem de fácil uso e contém diversas bibliotecas que facilitam o desenvolvimento, sendo a linguagem escolhida para o desenvolvimento Front-End Web em conjunto do framework ReactJs.</td>
 </tr>
  <tr>
   <td align='center'><a href='https://learn.microsoft.com/pt-br/dotnet/csharp/tour-of-csharp/'>C#</a></td>
   <td>O C# em conjunto do framework ASP.NET6.0 MVC foram escolhidos para o desenvolvimento do Back-End, sendo o C# uma linguagem orientada à objetos e fortemente tipada, ela disponibiliza recursos que facilitam a criação de Back-Ends.</td>
 </tr>
</table>

### Bibliotecas

As bibliotecas são conjuntos de código predefinido e reutilizável que fornecem funcionalidades específicas para facilitar o desenvolvimento de software. Elas são criadas para resolver problemas comuns e oferecer uma abordagem mais eficiente e rápida para a construção de aplicativos

<table>
 <tr>
   <td colspan='2' align='center'><strong>Bibliotecas</strong></td>
 </tr>
 <tr>
   <td width='200' align='center'><strong>Biblioteca</strong></td>
   <td width='800'><strong>Motivo da escolha</strong></td>
 </tr>
  <tr>
   <td align='center'><a href='https://learn.microsoft.com/pt-br/ef/core/'>Entity Framework</a></td>
   <td>O Entity framework é um mapeador relacional de objeto (ORM) que permite o acesso a dados como objetos, é muito usado por apis desenvolvidas com .NET e fácil de ser utilizada.</td>
</table>

### Ambiente de desenvolvimento

Um ambiente de desenvolvimento padronizado e bem definido, permite que todos os desenvolvedores trabalhem em conjunto, evitando problemas de incompatibilidade entre ambientes de desenvolvimento.

<table>
 <tr>
   <td colspan='2' align='center'><strong>Ambiente de desenvolvimento</strong></td>
 </tr>
 <tr>
   <td width='200' align='center'><strong>Tecnologia</strong></td>
   <td width='800'><strong>Motivo da escolha</strong></td>
 </tr>
  <tr>
   <td align='center'><a href='https://code.visualstudio.com/'>Visual Studio Code</a></td>
   <td>O VS code é um editor de código aberto leve e com uma vasta variedade de recursos, que possibilita o desenvolvimento com react-js em qualquer sistema operacional.</td>
 </tr>
  <tr>
   <td align='center'><a href='https://visualstudio.microsoft.com/pt-br/'>Visual Studio 2024</a></td>
   <td>O IDE mais abrangente para desenvolvedores .NET no Windows. Totalmente empacotado com uma bela matriz de ferramentas e recursos para elevar e aprimorar cada estágio de desenvolvimento de software.</td>
 </tr>
</table>

### Comunicação

Uma comunicação rápida e eficaz desempenha um papel vital nos processos de desenvolvimento de uma aplicação, então é importante que os meios de comunicação sejam efetivos e acessíveis a todos.

<table>
 <tr>
   <td colspan='2' align='center'><strong>Comunicação</strong></td>
 </tr>
 <tr>
   <td width='200' align='center'><strong>Tecnologia</strong></td>
   <td width='800'><strong>Motivo da escolha</strong></td>
 </tr>
  <tr>
   <td align='center'><a href='https://www.microsoft.com/pt-br/microsoft-teams/group-chat-software'>Microsoft Teams</a></td>
   <td>O Microsoft Teams facilita a comunicação durante todo o ciclo do projeto, contendo recursos de compartilhamento de tela que são essenciais para uma reunião mais assertiva.</td>
 </tr>
  <tr>
   <td align='center'><a href='https://www.whatsapp.com/'>Whatsapp</a></td>
   <td>O Whatsapp possibilita uma comunicação mais rápida entre os stakeholders, tornando a comunicação no projeto mais fluida e direta.</td>
 </tr>
</table>

### UI Design

Uma boa ferramenta de design de interface do usuário (UI) pode desempenhar um papel crucial no desenvolvimento de uma experiência de usuário eficaz e atraente.

<table>
 <tr>
   <td colspan='2' align='center'><strong>UI Design</strong></td>
 </tr>
 <tr>
   <td width='200' align='center'><strong>Tecnologia</strong></td>
   <td width='800'><strong>Motivo da escolha</strong></td>
 </tr>
  <tr>
   <td align='center'><a href='https://www.figma.com/'>Figma</href></td>
   <td>O Figma é um serviço web que permite a criação de design da aplicação de maneira simples e gratuita.</td>
 </tr>
</table>

## Project Model Canvas


![Project Model Canvas](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/blob/main/documentos/img/CanvasV1.JPG)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para priorizar os requisitos, foi utilizado a técnica de Escala de três Níveis, para essa técnica foi definido dois aspectos principais: importância e urgência. Assim, forma-se um quadrante, que é usado para obter o nível de prioridade do requisito, como mostrado na figura a seguir:

![Matriz de priorização](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/aa0a593a-f18b-4cd1-b2d7-ea4f9faaa4bd)


### Requisitos Funcionais

<table>
 <tr>
  <td width="100" align="center"><strong>ID</strong></td>
  <td width="800" align="center"><strong>Descrição do Requisito</strong></td>
  <td width="100" align="center"><strong>Prioridade</strong></td>
 </tr>
 <tr>
  <td align="center">RF-001</td>
  <td align="left">O funcionário deve conseguir logar no aplicativo</td>
  <td align="center">ALTA</td>
 </tr>
  <tr>
  <td align="center">RF-002</td>
  <td align="left">O funcionário deve conseguir alterar sua senha de acesso</td>
  <td align="center">ALTA</td>
 </tr>
 <tr>
  <td align="center">RF-003</td>
  <td align="left">O admin deve conseguir cadastrar novos funcionários</td>
  <td align="center">ALTA</td>
 </tr>
 <tr>
  <td align="center">RF-004</td>
  <td align="left">O admin deve conseguir listas todos os funcionários</td>
  <td align="center">ALTA</td>
 </tr>
 <tr>
  <td align="center">RF-005</td>
  <td align="left">O admin deve conseguir editar os dados de um funcionário</td>
  <td align="center">MÉDIA</td>
 </tr>
 <tr>
  <td align="center">RF-006</td>
  <td align="left">O admin deve conseguir habilitar e desabilitar um funcionário</td>
  <td align="center">MÉDIA</td>
 </tr>
 <tr>
  <td align="center">RF-007</td>
  <td align="left">O admin deve conseguir alterar a senha de um funcionário</td>
  <td align="center">BAIXA</td>
 </tr>
 <tr>
  <td align="center">RF-008</td>
  <td align="left">O admin deve conseguir excluir um funcionário</td>
  <td align="center">BAIXA</td>
 </tr>
 <tr>
  <td align="center">RF-009</td>
  <td align="left">O funcionário deve conseguir registrar o início e o final da sua jornada de trabalho</td>
  <td align="center">ALTA</td>
 </tr>
 <tr>
  <td align="center">RF-010</td>
  <td align="left">O funcionário deve conseguir registrar a saída e o retorno do horário de almoço</td>
  <td align="center">ALTA</td>
 </tr>
 <tr>
  <td align="center">RF-011</td>
  <td align="left">O funcionário deve conseguir listar todos os seus registros de pontos feitos na aplicação</td>
  <td align="center">ALTA</td>
 </tr>
 <tr>
 <td align="center">RF-012</td>
  <td align="left">O admin deve conseguir listas todos os registros de pontos dos funcionários</td>
  <td align="center">ALTA</td>
 </tr>
 <tr>
 <td align="center">RF-013</td>
  <td align="left">O admin deve coseguir gerar relatórios dos registros de pontos</td>
  <td align="center">ALTA</td>
 </tr>
 <tr>
 <td align="center">RF-014</td>
  <td align="left">O admin deve conseguir acrescentar um registro de ponto ao funcionário</td>
  <td align="center">MÉDIA</td>
 </tr>
</table>

### Requisitos não Funcionais

<table>
 <tr>
  <td width="100" align="center"><strong>ID</strong></td>
  <td width="800" align="center"><strong>Descrição do Requisito</strong></td>
  <td width="100" align="center"><strong>Prioridade</strong></td>
 </tr>
  <tr>
 <td align="center">RNF-001</td>
  <td align="left">O sistema deve rodar em dispositivos móveis</td>
  <td align="center">ALTA</td>
 </tr>
  <tr>
  <td align="center">RNF-002</td>
  <td align="left">O sistema deve autenticar os usuários via token</td>
  <td align="center">ALTA</td>
 </tr>
 <tr>
  <td align="center">RNF-003</td>
  <td align="left">O token de autenticação do usuário deve expirar em 12 horas</td>
  <td align="center">ALTA</td>
 </tr>
 <tr>
  <td align="center">RNF-004</td>
  <td align="left">O sistema deve processar requisições do usuário em no máximo 3s</td>
  <td align="center">MÉDIA</td>
 </tr>
 <tr>
  <td align="center">RNF-005</td>
  <td align="left">O sistema deve estar disponível durante o período de 18 horas no mínimo</td>
  <td align="center">ALTA</td>
 </tr>
 <tr>
  <td align="center">RNF-006</td>
  <td align="left">O sistema deve garantir a persistência dos dados durante um eventual desligamento dos servidores</td>
  <td align="center">ALTA</td>
 </tr>
 <tr>
  <td align="center">RNF-007</td>
  <td align="left">O sistema deve utilizar geolocalização para verificar se o usuário está no local</td>
  <td align="center">ALTA</td>
 </tr>
</table>

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

<table>
 <tr>
  <td width="100" align="center"><strong>ID</strong></td>
  <td width="900" align="center"><strong>Restrição</strong></td>
 </tr>
 <tr>
  <td align="center">01</td>
  <td align="left">O projeto deverá ser entregue até o final do semestre</td>
 </tr>
 <tr>
  <td align="center">02</td>
  <td align="left">O projeto precisa ser desenvolvida por integrantes do grupo apenas</td>
 </tr>
</table>

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos.

![Diagrama de caso de uso](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/100081087/0e3cbb3e-1a8f-48e9-bbee-1e363c46a771)

## Modelo ER (Projeto Conceitual)

O modelo Entidade-Relacionamento (MER) é uma representação visual dos dados e relacionamentos das entidades do sistema. No MER, as entidades são representadas por retângulos, cada um com seu nome correspondente,
e os relacionamentos são representados com losangos, com sua respectiva interação entre as entidades.

A figura abaixo ilustra o modelo de Entidade-Relacionamento para o sistema proposto.

![TimeSheet - Modelo ER](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/f00f79fb-dd07-4aad-b1de-8bff57436b3d)


## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.

O script de criação do banco foi gerador usando o modelo ER a partir da ferramenta [Lucidchart](https://www.lucidchart.com/pages/pt). Ele se destina ao banco de dados relacional `Postgres` e é gerado com a seguinte estrutura:


``` sql
...
CREATE TABLE "User" (
  "Id" uuid,
  "Name" text,
  "CPF" text,
  "Password" text,
  "Role" integer,
  "Status" integer,
  "TotalTime" double precision,
  "LunchTime" double precision,
  PRIMARY KEY ("Id")
);
...
```

O modelo completo pode ser encontrado em:
- `pmv-ads-2024-1-e5-proj-time-sheet/codigo-fonte/time-sheet-db/time-sheet-database.sql`

Ou acessando o Link: [time-sheet-database.sql](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/blob/main/codigo-fonte/time-sheet-db/time-sheet-database.ql)
