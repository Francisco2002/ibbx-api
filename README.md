# Desafio IBBX - API

Nesse desafio, implementei um sistema de coletas de sensores cadastrados em ativos.

## Tecnologias usadas
* serverless framework
* banco de dados local SQLite

**A aplicação espera que o banco de dados seja salvo no arquivo db/ibbx-challenge.sqlite (deixei um criado nesta aplicação)**
**Caso queira mudar o caminho, altere o valor da constante *dbPath* em src/functions/db/index.js**
***OBS:* Certifique-se de que a estrutura de pastas exista. O comando se responsabilizará de criar o arquivo .sqlite para você**

Como rodar a aplicação:

1. Instalar as dependencias do projeto:
    npm install

2. Executar o comando, para rodar o servidor:
    npm run start