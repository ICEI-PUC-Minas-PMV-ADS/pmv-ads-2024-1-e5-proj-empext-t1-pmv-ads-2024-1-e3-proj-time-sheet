# Especificações do Projeto

Este documento de Especificação do Projeto visa fornecer uma visão abrangente e detalhada das metas, requisitos e funcionalidades que orientarão o desenvolvimento deste projeto. Este documento serve como o alicerce conceitual do projeto, proporcionando uma visão abrangente e estruturada de todas as características planejadas para o software.

## Arquitetura e Tecnologias


A arquitetura de um sistema PWA (Progressive Web App) é concebida para proporcionar uma experiência de usuário aprimorada, combinando a flexibilidade da web com a funcionalidade de aplicativos nativos. Esses aplicativos são construídos com base em uma arquitetura centrada na experiência do usuário, utilizando tecnologias web modernas e padrões progressivos. A estrutura de um PWA inclui um conjunto de tecnologias, como Service Workers, que permitem o funcionamento offline e melhoram o desempenho, e o manifest JSON, que possibilita a instalação do aplicativo no dispositivo do usuário.
Abaixo está a arquitetura para o sistema proposto:

![diagrama-arquitetura-time-sheet](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/7b7d0e37-2f17-44a4-a388-59eedeedc5ea)

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


![Project Model Canvas](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/blob/main/documentos/img/Canvas.JPG)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para priorizar os requisitos, foi utilizado a técnica de Escala de três Níveis, para essa técnica foi definido dois aspectos principais: importância e urgência. Assim, forma-se um quadrante, que é usado para obter o nível de prioridade do requisito, como mostrado na figura a seguir:

![diagrama-de-priorização](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/1974c125-4e4d-4053-97de-cc43e4acbeac)

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O admin deve conseguir cadastrar e excluir novos funcionários | ALTA | 
|RF-002| O admin deve conseguir informar o tempo de almoço do funcionário | MÉDIA |
|RF-003| O admin deve conseguir informar o tempo de jornada do trabalho do funcionário  | BAIXA |
|RF-004| O admin deve conseguir gerar um relatório de horas que o funcionário fez  | MÉDIA |
|RF-005| O funcionário deve conseguir logar na plataforma  | ALTA |
|RF-006| O funcionário deve conseguir registrar o inicio da jornada de trabalho   | ALTA |
|RF-007| O funcionário deve conseguir registrar o finalizar da jornada de trabalho   | ALTA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA |
|RNF-003| O Sistema deve estar disponível durante o horário comercial |  ALTA | 
|RNF-004| O Sistema deve garantir que registros não sejam perdidos se o servidor desligar |  ALTA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| O projeto precisa ser desenvolvida por integrantes do grupo apenas |

## Diagrama de Casos de Uso

![Diagrama-Caso-de-Uso](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/100081087/4dee1c2d-150f-485b-bbf0-f7edeaaae4a5)



## Modelo ER (Projeto Conceitual)

![ModeloER](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/103972585/75936fe5-e5b8-4ef6-b7bb-1ab7957fa869)



## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.

O script de criação do banco foi gerador usando Esquema Relacional a partir da ferramenta [Lucidchart](https://www.lucidchart.com/pages/landing?utm_source=google&utm_medium=cpc&utm_campaign=_chart_en_tier3_mixed_search_brand_exact_&km_CPC_CampaignId=1484560207&km_CPC_AdGroupID=60168114191&km_CPC_Keyword=lucidchart&km_CPC_MatchType=e&km_CPC_ExtensionID=&km_CPC_Network=g&km_CPC_AdPosition=&km_CPC_Creative=354596054350&km_CPC_TargetID=kwd-33511936169&km_CPC_Country=1001571&km_CPC_Device=c&km_CPC_placement=&km_CPC_target=&gad_source=1&gclid=CjwKCAiA3JCvBhA8EiwA4kujZg8ql8O1ScU864fGcDUwnRCIuzQ3bFoTnHskVFn56BoEgcsFqenSqBoC-cwQAvD_BwE). Ele se destina ao banco de dados relacional `Postgres` e é gerado com a seguinte estrutura:


``` sql
CREATE TABLE admin (
  id SERIAL PRIMARY KEY,
  nome VARCHAR,
  email VARCHAR,
  senha VARCHAR
);

CREATE TABLE funcionarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR,
  cargo VARCHAR,
  email VARCHAR,
  senha VARCHAR,
  tempo_almoco TIMESTAMP,
  tempo_jornada TIMESTAMP
);

CREATE TABLE jornada_de_trabalho (
  id SERIAL PRIMARY KEY,
  id_funcionario INTEGER,
  hora_de_inicio TIMESTAMP,
  hora_de_termino TIMESTAMP,
  FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id)
);
```

O modelo completo pode ser encontrado em:
- `pmv-ads-2024-1-e5-proj-time-sheet/time-sheat.sql/`

Ou acessando o Link: [time-sheet.sql](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/tree/main/time-sheat.sql)
