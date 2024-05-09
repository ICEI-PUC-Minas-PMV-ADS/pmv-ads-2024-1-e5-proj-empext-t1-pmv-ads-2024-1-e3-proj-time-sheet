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
      - <strong>Senha:</strong> "Admin@123"<br>
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
      - <strong>Senha:</strong> "Admin@123"<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve mostrar apenas os funcionários desabilitados.</td>
  </tr>
</table>

<br>

<table>
  <tr>
    <th colspan="2" width="1000">CT-008<br> Registrar Início e Fim de Jornada</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o usuário consegue registrar corretamente a marcação do horário de início e fim da sua jornada de trabalho</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-009: O funcionário deve conseguir registrar o início e o final da sua jornada de trabalho</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Fazer login com um usuário já cadastrado<br>
      3. Iniciar a jornada clicando no botão "Iniciar Jornada de Trabalho".<br>
      5. Marcar o horário de almoço clicando em "Iniciar horário de almoço" e após "Finalizar horário de almoço". <br>
      4. Finalizar a jornada clicando em "Finalizar Jornada de Trabalho".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>CPF:</strong> "059.333.006-40"<br>
      - <strong>Senha:</strong> "Teste123"<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve registrar o inicio e fim da jornada de trabalho</td>
  </tr>
</table>


<br>


<table>
  <tr>
    <th colspan="2" width="1000">CT-009<br>Registrar Marcação de ponto "Horario de Almoço" (entrada e saída)</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o usuário consegue registrar corretamente a marcação de entrada e saída do seu horario de almoço</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-010: O funcionário deve conseguir registrar a saída e o retorno do horário de almoço	</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Fazer login com um usuário já cadastrado<br>
      3. Após ter clicado em "Iniciar Jornada de Trabalho, clicar em "Iniciar horário de almoço".<br>
      4. Para finalizar, clicar em "Finalizar hórario de almoço".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>CPF:</strong> "566.765.836-40"<br>
      - <strong>Senha:</strong> "909090Lo"<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve registrar o inicio e fim do horário de almoço</td>
  </tr>
</table>

<br>

<table>
  <tr>
    <th colspan="2" width="1000">CT-010<br>Cadastrar novo funcionário</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o administrador consegue cadastrar um novo funcionário passando dados válidos.</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-003: O admin deve conseguir cadastrar novos funcionários</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Fazer login com um usuário administrador.<br>
      3. Clicar em "funcionários" na barra de navegação.<br>
      3. Clicar no botão "+".<br>
      4. Inserir o nome válido. <br>
      5. Inserir o CPF válido.<br>
      6. Inserir a senha válida. <br>
      7. Inserir a jornada de trabalho válida. <br>
      8. Inserir o tempo de almoço válido. <br>
      9. Clicar em cadastrar funcionário. <br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Nome:</strong> "Bruce Wayne"<br>
      - <strong>CPF:</strong> "435.566.600-08"<br>
      - <strong>Senha:</strong> "Batman123"<br>
      - <strong>Jornada de trabalho:</strong> "8:00"<br>
      - <strong>Tempo de almoço:</strong> "1:30"<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve cadastrar o funcionário e mostrar uma mensagem de sucesso ao usuário.</td>
  </tr>
</table>

 <table>
  <tr>
    <th colspan="2" width="1000">CT-011<br>Administrador conseguir listar pontos dos funcionários</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o administrador consegue listar os pontos dos funcionários.</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-005 O admin deve conseguir listar todos os pontos dos funcionários</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Fazer login com um usuário administrador.<br>
      3. Clicar em "Folha de Ponto" na barra de navegação.<br>
      3. Marcar o mês desejado.<br>
      4. Selecionar o Funcionário. <br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>CPF:</strong> "00000000000"<br>
      - <strong>Senha:</strong> "Admin@123"<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve listar os pontos do funcionário no mês.</td>
  </tr>
</table>


 <table>
  <tr>
    <th colspan="2" width="1000">CT-012<br>Administrador não terá informações dos meses sem marcações</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se os meses sem marcações não geram relatórios.</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-005 O admin deve receber informação que não é registro de ponto naquele determinado mês</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Fazer login com um usuário administrador.<br>
      3. Clicar em "Folha de Ponto" na barra de navegação.<br>
      3. Marcar o mês desejado.<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>CPF:</strong> "00000000000"<br>
      - <strong>Senha:</strong> "Admin@123"<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema informar "nenhum registro encontrado para a data selecionada".</td>
  </tr>
</table>


 <table>
  <tr>
    <th colspan="2" width="1000">CT-013<br>O funcionário conseguir listar todos os seus pontos </th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o funcionario consegue listar todos os seus registros de pontos</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-010 O funcionário deve conseguir listar todos seus registros de pontos</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Inserir o CPF válido.<br>
      3. Inserir a senha válida.<br>
      4. Clicar no botão "Entrar".<br>
      5. Ir em Folha de Ponto.<br>
      6. Selecionar o mês correto.<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>CPF:</strong> "566.765.836-40"<br>
      - <strong>Senha:</strong> "909090Lo"<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O funcionario deve conseguir listar todos os seus registros de pontos.</td>
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

<br>

<table>
  <tr>
    <th colspan="6" width="1000">CT-008<br>Registrar Início e Fim da Jornada</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve informar ao usuário que o horário de início e fim da jornada foram registrados com sucesso.</td>
  </tr>
    <tr>
    <td><strong>Responsável</strong></td>
    <td width="430">Rayane Santos</td>
    <td width="100"><strong>Status</strong></td>
    <td width="50" align="center">✅</td>
    <td width="100"><strong>Data</strong></td>
    <td width="150">09/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está registrando o horário de início e fim de jornada corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/100081087/b0298811-cc05-4861-b2d7-2cbcb305532e"/></td>
  </tr>
</table>

<br>




<table>
  <tr>
    <th colspan="6" width="1000">CT-011<br>Administrador conseguir listar pontos dos funcionários</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve listar os pontos do funcionário no mês.</td>
  </tr>
    <tr>
    <td><strong>Responsável</strong></td>
    <td width="430">Juliana Madureira</td>
    <td width="100"><strong>Status</strong></td>
    <td width="50" align="center">✅</td>
    <td width="100"><strong>Data</strong></td>
    <td width="150">09/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema lista os pontos do funcionário no mês corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td width="170">Adcionar evidencia</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-012<br>Administrador não terá informações dos meses sem marcações</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema informar "nenhum registro encontrado para a data selecionada".</td>
  </tr>
    <tr>
    <td><strong>Responsável</strong></td>
    <td width="430">Juliana Madureira</td>
    <td width="100"><strong>Status</strong></td>
    <td width="50" align="center">✅</td>
    <td width="100"><strong>Data</strong></td>
    <td width="150">09/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema emite a mensagem de ausencia de marcações corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td width="170">Adcionar evidencia</td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-013<br>O funcionário conseguir listar todos os seus pontos</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O funcionario deve conseguir listar todos os seus registros de pontos.</td>
  </tr>
    <tr>
    <td><strong>Responsável</strong></td>
    <td width="430">Juliana Madureira</td>
    <td width="100"><strong>Status</strong></td>
    <td width="50" align="center">✅</td>
    <td width="100"><strong>Data</strong></td>
    <td width="150">09/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O funcionário consegue emitir corretamente seus registro de ponto.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td width="170">Adcionar evidencia</td>
  </tr>
</table>
