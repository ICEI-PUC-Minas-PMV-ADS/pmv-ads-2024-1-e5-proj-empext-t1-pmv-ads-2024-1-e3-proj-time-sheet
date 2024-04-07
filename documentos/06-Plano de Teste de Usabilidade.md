# Plano de Testes de Usabilidade



| **Caso de Teste** 	| **O sistema deve ter uma versão web** 	|
|:---:	|:---:	|
| **Objetivo do Teste** 	| Fazer com que funcione em uma versão web	|
| **Ações necessárias** 	| Acessar versão web|
|Critério de Êxito | Conseguir acessar pela web|


| **Caso de Teste** 	| **O sistema deve ter uma versão mobile** 	|
|:---:	|:---:	|
| **Objetivo do Teste** 	| Fazer com que funcione em uma versão mobile	|
| **Ações necessárias** 	|  Acessar versão mobile|
|Critério de Êxito | Conseguir acessr pelo app|


| **Caso de Teste** 	| **O sistema deve autenticar os usuários via token** 	|
|:---:	|:---:	|
| **Objetivo do Teste** 	| Validar o acesso do usuário	|
| **Ações necessárias** 	|  Logar no aplicativo e verificar a autenticação|
|Critério de Êxito | Conseguir autenciar através do token|


| **Caso de Teste** 	| **O token de autenticação do usuário deve expirar em 12 horas** 	|
|:---:	|:---:	|
| **Objetivo do Teste** 	| 	Verificar validade do token de autencicaçõa|
| **Ações necessárias** 	|  Aguardar 12 hrs e verificar se o token expirou  |
|Critério de Êxito | token invalido após 12hrs|

| **Caso de Teste** 	| **O sistema deve processar requisições do usuário em no máximo 3s** 	|
|:---:	|:---:	|
| **Objetivo do Teste** 	| O tempo de resposta ser no maximo 3s	|
| **Ações necessárias** 	|  Testar prazo de requisições |
|Critério de Êxito | Processo de requisições <3s |

| **Caso de Teste** 	| **O sistema deve estar disponível durante o período de 18 horas no mínimo** 	|
|:---:	|:---:	|
| **Objetivo do Teste** 	| Certificar do tempo de disponibilidade do sistema	|
| **Ações necessárias** 	| Testar o tempo de disponbilidade do sistema  |
|Critério de Êxito | sistema disponivel por no minimmo 18 hrs|


| **Caso de Teste** 	| **O sistema deve garantir a persistência dos dados durante um eventual desligamento dos servidores** 	|
|:---:	|:---:	|
| **Objetivo do Teste** 	| 	Testar persistencia dos dados sem servidores|
| **Ações necessárias** 	|  Desligar o servidor, verificar persistencia dos dados|
|Critério de Êxito | dados se mantiver persistentes após o desligamento do servidor|


T
