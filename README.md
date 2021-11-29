## Ethereum transactions crawler

## HOW TO RUN?

## Run with docker (recommended):

### Change/Set docker-compose.yml envaroment variables:

1. PROJECT_ID (register an account on infura.io)
2. PROCESS_COUNT (optional, for number of crawler proceses , default is 1) 
Number of blocks that are need to be crawl are going to be separeted for search in proceses , if set to 1 , just one process will search blocks for address transactions.


### RUN
```
docker compose up
```

### RUN FRONTEND

```
cd front
npm install
npm start
```


## Run manually:

### Change/Set .env envaroment variables:

1. PROJECT_ID (register an account on infura.io)
2. PROCESS_COUNT (optional, for number of crawler proceses , default is 1) 


### Install:
 
1. Insatll mongodb 
2. Start mongo
2. Install nodejs
3. Run in project root:


```
npm install
npm start
```

### RUN FRONTEND

```
cd front
npm install
npm start
```


## API EXAMPLE:
Get tranasctions by providing address and start block
```
http://localhost:4001/transactionss?address=0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f&start=13704743
```

