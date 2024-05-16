# 1. Iniciando o container do Postgres

```sh
docker-compose up -d
```

# 2. Instalar dependências
Rodar o comando abaixo na linha de comando:
```sh
yarn
```
ou 
```sh
npm i
```

# 3. migration para criar banco de dados:
Rodar o comando abaixo na linha de comando:
```sh
npx prisma migrate dev
```

# 4. Seed (Dados mockados) para o banco de dados:
Rodar o comando abaixo na linha de comando:
```sh
npx prisma db seed
```

# 5. Iniciar a aplicação backend:

```sh
yarn run start:dev
```

ou

```sh
npm run start:dev
```


## Endpoints

### GET [http://localhost:3000/farmner](http:localhost:3000/farmer) - Ver lista de produtores rurais cadastrados

### POST [http://localhost:3000/farmer](http:localhost:3000/farmer) - Criar produtor rural
## Payload:
```json
{
    "data": {
        "name": "Nome do Produtor",
        "docNumber": "030.300.250-63", //CNPJ ou CPF
        "farmName": "Fazenda Barbosa",
        "city": "Feira de Santana",
        "state": "Bahia",
        "totalArea": 5000,
        "arableArea": 4000,
        "vegetationArea": 1000
    }
}
```

### POST [http://localhost:3000/farmer/:farmerId/planted-crops](http:localhost:3000/farmer/:farmerId/planted-crops) - Criar plantação
## Payload:
```json
{
    "data": {
        "name": "Nome da Plantação",
        "type": "SOYA", //SOYA, CORN, COTTON, COFFEE ou SUGAR_CANE
        "farmerId": 2, //id do produtor já cadastrado
    }
}
```

### GET [http://localhost:3000/farmer/:farmerId](http:localhost:3000/farmer/:farmerId) - Retornar Produtor Rural

### PATCH [http://localhost:3000/farmer/:farmerId](http:localhost:3000/farmer/:farmerId) - Editar Produtor Rural
## Payload:
```json
{
    "data": {
        "name": "Nome do Produtor",
        "docNumber": "030.300.250-63", //CNPJ ou CPF
        "farmName": "Fazenda Barbosa",
        "city": "Feira de Santana",
        "state": "Bahia",
        "totalArea": 5000,
        "arableArea": 4000,
        "vegetationArea": 1000
    }
}
```

### DELETE [http://localhost:3000/farmer/:farmerId](http:localhost:3000/farmer/:farmerId) - Deletar Produtor Rural