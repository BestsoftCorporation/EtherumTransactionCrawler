const Web3 = require('web3');
const  createClient = require('redis');
const client = createClient.createClient({
    host: 'redis',
    port: 6379,
});
require('dotenv').config({ path: '../.env' })

class TransactionCrawler {
    web3;
    account;

    constructor(web3, account) {
        this.web3 = web3;
        this.account = account.toLowerCase();
        
    }

    async checkBlock(from, to) {

        for (var i = from; i < to; ++i) {
            let block = await this.web3.eth.getBlock(i);
            if (block != null && block.transactions != null) {
                console.log("test");
                for (let txHash of block.transactions) {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    console.log(txHash)
                    if (tx.to != null && this.account == tx.to.toLowerCase()) {
                        client.lPush('key', tx);
                        console.log('Transaction found on block: ' + i);
                        console.log({ address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() });
                    }
                }
            }
            console.log('Searching block ' + i);
        }
    }
}

async function startCrawl(start,address) { 

    console.log("Number of process:"+process.env.PROCESS_COUNT);
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/11259adf64d84c9e8c3512d279566120'));
    let txChecker = new TransactionCrawler(this.web3, address);
    let latestBlock = await this.web3.eth.getBlock('latest');
    let number = latestBlock.number;
    let toCrawl = number - start
    let diff = (Math.round(toCrawl / process.env.PROCESS_COUNT))
    console.log(toCrawl)
    for (let i = 0; i < process.env.PROCESS_COUNT; i++) {
        txChecker.checkBlock(start + (i * diff), start + ((i + 1) * diff));
        console.log(start + (i * diff))
        console.log(start + ((i + 1) * diff))
    }
};

module.exports.startCrawl = startCrawl;
