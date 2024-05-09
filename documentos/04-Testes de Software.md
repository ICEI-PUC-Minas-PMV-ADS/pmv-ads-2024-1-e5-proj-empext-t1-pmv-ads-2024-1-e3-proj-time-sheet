# Planos de Testes de Software

Este documento tem como objetivo apresentar uma estratégia detalhada para a realização de testes que assegurem não apenas a funcionalidade, mas também a confiabilidade, desempenho e usabilidade do software desenvolvido.

<table>
  <tr>
    <th colspan="2" width="1000">CT-001<br>Login com credenciais válidas</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se um usuário pode fazer login com sucesso utilizando credenciais válidas.</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-001: O funcionário deve conseguir logar no aplicativo</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Inserir o CPF válido.<br>
      3. Inserir a senha válida.<br>
      4. Clicar no botão "Entrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>CPF:</strong> "00000000000"<br>
      - <strong>Senha:</strong> "admin@123"
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve redirecionar o usuário para a página inicial do aplicativo após o login bem-sucedido.</td>
  </tr>
</table>

<br>

<table>
  <tr>
    <th colspan="2" width="1000">CT-002<br>Login com credenciais inválidas</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se um usuário é impedido de fazer login utilizando credenciais inválidas.</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-001: O funcionário deve conseguir logar no aplicativo</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Inserir o CPF válido.<br>
      3. Inserir a senha inválida.<br>
      4. Clicar no botão "Entrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>CPF:</strong> "00000000000"<br>
      - <strong>Senha:</strong> "senha@123"
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve informar ao usuário que os dados de login estão inválidos.</td>
  </tr>
</table>

<br>

<table>
  <tr>
    <th colspan="2" width="1000">CT-003<br>Login com credenciais de um usuário desabilitado</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se um usuário desabilitado é impedido de fazer login.</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-001: O funcionário deve conseguir logar no aplicativo</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Inserir o CPF desabilitado.<br>
      3. Inserir a senha.<br>
      4. Clicar no botão "Entrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>CPF:</strong> "50160209064"<br>
      - <strong>Senha:</strong> "Teste@123"
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve informar ao usuário que ele está impedido de entrar no aplicativo.</td>
  </tr>
</table>

<br>

<table>
  <tr>
    <th colspan="2" width="1000">CT-004<br>Alterar a senha de acesso passando dados válidos</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se um usuário consegue alterar sua senha de acesso.</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: O funcionário deve conseguir alterar sua senha de acesso</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Clicar no link "Esqueceu a senha? Alterar".<br>
      2. Inserir o CPF válido.<br>
      3. Inserir a nova senha.<br>
      4. Inserir a senha novamente.<br>
      4. Clicar no botão "Alterar senha".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>CPF:</strong> "50160209064"<br>
      - <strong>Nova senha:</strong> "Senha@123"<br>
      - <strong>Confirmar senha:</strong> "Senha@123"
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve informar ao usuário que a senha foi alterada com sucesso.</td>
  </tr>
</table>

<br>

<table>
  <tr>
    <th colspan="2" width="1000">CT-005<br>Alterar a senha de acesso passando um CPF não cadastrado</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema informa ao usuário que o CPF não está cadastrado.</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: O funcionário deve conseguir alterar sua senha de acesso</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Clicar no link "Esqueceu a senha? Alterar".<br>
      2. Inserir o CPF não cadastrado.<br>
      3. Inserir a nova senha.<br>
      4. Inserir a senha novamente.<br>
      4. Clicar no botão "Alterar senha".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>CPF:</strong> "47542542010"<br>
      - <strong>Nova senha:</strong> "Senha@123"<br>
      - <strong>Confirmar senha:</strong> "Senha@123"
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve informar ao usuário que o CPF não está cadastrado.</td>
  </tr>
</table>

<br>

<table>
  <tr>
    <th colspan="2" width="1000">CT-006<br>Listar funcionários habilitados</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema lista corretamente apenas os funcionários habilitados na aba de "usuários ativos".</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-004: O admin deve conseguir listas todos os funcionários</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Fazer login com um usuário administrador.<br>
      3. Clicar em "funcionários" na barra de navegação.
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>CPF:</strong> "00000000000"<br>
      - <strong>Nova senha:</strong> "Admin@123"<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve mostrar apemas os funcionários habilitados.</td>
  </tr>
</table>

<br>

<table>
  <tr>
    <th colspan="2" width="1000">CT-007<br>Listar funcionários desabilitados</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema lista corretamente apenas os funcionários desabilitados na aba de "usuários inativos".</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-004: O admin deve conseguir listas todos os funcionários</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Fazer login com um usuário administrador.<br>
      3. Clicar em "funcionários" na barra de navegação.<br>
      4. Clicar em "Usuários inativos".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>CPF:</strong> "00000000000"<br>
      - <strong>Nova senha:</strong> "Admin@123"<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve mostrar apenas os funcionários desabilitados.</td>
  </tr>
</table>
 
# Evidências de Testes de Software

Abaixo estão as evidências dos testes propostos no Plano de Testes, os registros foram retirados da aplicação em funcionamento nos dispositivos dos desenvolvedores do projeto.

### Status
- ✅ O teste foi feito e está passando pelos critérios de êxito.
- ❌ O teste foi feito e não está passando pelos critérios de êxito.
- 🔜 O teste não foi feito ainda.


<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Login com credenciais válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve redirecionar o usuário para a página inicial do aplicativo após o login bem-sucedido.</td>
  </tr>
    <tr>
    <td><strong>Responsável</strong></td>
    <td width="430">Raul Oliveira</td>
    <td width="100"><strong>Status</strong></td>
    <td width="50" align="center">✅</td>
    <td width="100"><strong>Data</strong></td>
    <td width="150">08/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo o login corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/2e3c1722-7adc-4bd4-8b4c-3abe9ddc1b48"/></td>
  </tr>
</table>

<br>

<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Login com credenciais inválidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve informar ao usuário que os dados de login estão inválidos.</td>
  </tr>
    <tr>
    <td><strong>Responsável</strong></td>
    <td width="430">Raul Oliveira</td>
    <td width="100"><strong>Status</strong></td>
    <td width="50" align="center">✅</td>
    <td width="100"><strong>Data</strong></td>
    <td width="150">08/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está impedindo que o usuário entre na aplicação com dados inválidos.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/3c2f5b0b-c54e-4038-beda-143ea4469e06"/></td>
  </tr>
</table>

<br>

<table>
  <tr>
    <th colspan="6" width="1000">CT-003<br>Login com credenciais de um usuário desabilitado</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve informar ao usuário que ele está impedido de entrar no aplicativo.</td>
  </tr>
    <tr>
    <td><strong>Responsável</strong></td>
    <td width="430">Raul Oliveira</td>
    <td width="100"><strong>Status</strong></td>
    <td width="50" align="center">✅</td>
    <td width="100"><strong>Data</strong></td>
    <td width="150">08/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está impedindo que usuários desabilitados entre na aplicação</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/bac93544-7fa5-436a-823f-f6bcb99cf145"/></td>
  </tr>
</table>

<br>

<table>
  <tr>
    <th colspan="6" width="1000">CT-004<br>Alterar a senha de acesso passando dados válidos</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve informar ao usuário que a senha foi alterada com sucesso.</td>
  </tr>
    <tr>
    <td><strong>Responsável</strong></td>
    <td width="430">Raul Oliveira</td>
    <td width="100"><strong>Status</strong></td>
    <td width="50" align="center">✅</td>
    <td width="100"><strong>Data</strong></td>
    <td width="150">08/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está alterando a senha do usuário corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/145afbcb-931d-4693-9e87-f9445efaceff"/></td>
  </tr>
</table>

