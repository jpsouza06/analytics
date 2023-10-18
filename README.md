# Como rodar a API em homologação

## Requisitos mínimos:
- Node 18.18.0;
- Docker desktop(caso for rodar o banco em homologação);

## Como executar a aplicação:
- Clone a aplicação
  ```
  git clone https://github.com/jpsouza06/analytics.git
  ```

- Instale as dependências
  ```
  npm install
  ```

- Crie o banco no docker usando o docker-compose
  ```
  docker-compose up -d
  ```

- Crie um arquivo `.env` na raiz do projeto, o conteudo desse arquivo deve 
seguir como exemplo o arquivo '.env.example'. Informe o caminho do banco de 
dados na 'DATABASE_URL(Obs.: Caso tenha usado o docker-compose para subir o banco
e não tenha alterado nada no arquivo, o caminho do banco vai ser o mesmo que esta no `.env.example`)'

- Rode as migrations do prisma
  ```
  npx prisma migrate dev
  ```

- Inicie a aplicação:
  ```
  npm run start:dev
  ```

- Use a aplicação:
  ```
  http://localhost:3333
  ```

# Como rodar a API em produção:

## Requisitos mínimos:
- Node 18.18.0;

## Como executar a aplicação:
- Instale as dependências
  ```
  npm ci
  ```

- Crie o build da aplicação
  ```
  npm run build
  ```

- Rode as migrations do prisma
  ```
  npx prisma migrate deploy
  ```

- Inicie a aplicação
  ```
  npm run start
  ```
