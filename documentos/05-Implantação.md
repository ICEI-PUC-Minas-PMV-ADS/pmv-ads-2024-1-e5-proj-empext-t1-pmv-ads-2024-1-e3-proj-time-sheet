# Implantação do Software

A implantação do aplicativo consiste em uma série de etapas planejadas para garantir que o sistema seja integrado com sucesso à infraestrutura da organização.
Este processo inclui a preparação do ambiente de TI, que envolve a configuração do sistema de acordo com as especificações da empresa, então será necessário o acompanhamento de uma pessoa com experiência em PaaS para implantar os serviços e configurar, para assegurar que todas as funcionalidades estejam operando corretamente. 

Para permitir a disponibilidade dos serviços, foi utilizado a plataforma [**Render**](https://render.com/), um PaaS que permite
manter banco de dados, api e sites disponíveis na internet.

Serão utilizados 3 Serviços:

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/e51a0270-c06f-4779-a8ee-338878da0d4f)

- **time-sheet-pwa**:  
um serviço para site de código estático, usado para manter o pwa da aplicação disponível para os
usuários. e é atualizado  apartir da branch **main** do repositório na pasta ``codigo-fonte/build/time-sheet-pwa``.

- **time-sheet-api**:  
Um serviço para api que permite o acesso aos pontos de entradas da aplicação e comunicação com o banco de dados, e é atualizado
apartir da branch **main** do repositório na pasta ``codigo-fonte/time-sheet-api``.

- **time-sheet-database**:  
Um serviço de banco de dados usando Postgresql, atualizado usando migrations que são executadas durante a execução da api.

## Componentes do Sistema

### 1 - Aplicativo mobile
Desenvolvido para usuários do Android, serve como interface entre o usuário e as funcionalidades do sistema. O app foi desenvolvido
em React Native, e deve passar por um processo de compilação para ser distribuído para os usuários:

#### Compilando e Gerando o APK
Para que o aplicativo será instalado no dispositivo do usuário, é necessário gerar um build da aplicação, o que resulta em um arquivo .apk que é usado
para a instalação.

1.1 - Baixe o projeto do GitHub [aqui](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/archive/refs/heads/main.zip)  
  ou clone ele executando o seguinte comando no terminal: 
```
git clone https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet.git
```
1.2 - Navegue até a pasta do app mobile:
```
codigo-fonte\time-sheet-mobile
```
1.3 - Execute o npm install para baixar todas as dependências do projeto:
```
npm install
```
1.4 - Execute o comando de build para gerar o apk usando a plataforma do **Expo**:
```
npm run build-android
```

### 2 - Aplicativo PWA
Desenvolvido para usuários do IOS, serve como interface entre o usuário e as funcionalidades do sistema por meio de uma versão web pwa. O app é gerado apartir do código
em React Native, e deve passar por um processo de compilação para ser implantado para os usuários:

#### Compilando e Gerando o PWA

2.1 - Siga os passos de download e atualização do projeto da etapa anterior.

2.2 - Execute o comando de build para gerar o pwa:
```
npm run build-web
```
2.3 - Suba o código gerado para o github usando os comandos de versionamento:
```
git add ..\build\time-sheet-pwa
git commit "Atualizando pwa"
git push origin main
```
2.4 - Atualize o serviço do pwa na plataforma do Render.

![Captura de tela 2024-06-23 113406](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/3d89a340-0db6-471b-bdc7-3fea369c4f0b)

### 3 - Api do sistema
É responsável pela persistência de dados, execução das funcionalidades e regras de negócio. O serviço é gerado apartir da solução
do .NET, e é implantando usando Docker:

3.1 - Garanta que o arquivo Dockerfile está configurado como deve.

3.2 - Atualize o serviço da api na plataforma do Render:

![Captura de tela 2024-06-23 114224](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/acfdc475-29e1-4ff9-bc18-fa0ea3d1b84e)






