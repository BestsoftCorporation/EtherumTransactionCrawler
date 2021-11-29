## Ethereum transactions crawler

## HOW TO RUN?

## Run with docker (recommended):
```
docker compose up
```

Run manually:

1. Insatll mongodb 
2. Start mongo
2. Install nodejs
3. Run in project root:

```
npm start
```


#API EXAMPLE:
Get tranasctions by providing address and start block
```
http://localhost:4001/transactionss?address=0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f&start=13704743
```

