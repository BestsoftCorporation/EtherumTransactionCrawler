const Web3 = require('web3');
var os = require('os'),
    cpuCount = os.cpus().length;


class TransactionCrawler {
    web3;
    account;

    constructor(projectId, account) {
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/11259adf64d84c9e8c3512d279566120'));
        this.account = account.toLowerCase();
       
    }

    async checkBlock(from, to) {

        for (var i = from; i < to; ++i) {
            let block = await this.web3.eth.getBlock(i);
            if (block != null && block.transactions != null) {
                for (let txHash of block.transactions) {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    console.log(txHash)
                    if (tx.to != null && this.account == tx.to.toLowerCase()) {
                        console.log('Transaction found on block: ' + i);
                        console.log({ address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() });
                    }
                }
            }
            console.log('Searching block ' + i);
        }
    }
}

async function startCrawl(process_count) { 

    console.log(cpuCount)
    let txChecker = new TransactionCrawler(process.env.INFURA_ID, '0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f');
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/11259adf64d84c9e8c3512d279566120'));
    let start = 9000000;
    let latestBlock = await this.web3.eth.getBlock('latest');
    let number = latestBlock.number;
    let toCrawl = number - start
    let diff = (Math.round(toCrawl / process_count))
    console.log(toCrawl)
    for (let i = 0; i < process_count; i++) {
        txChecker.checkBlock(start + (i * diff), start + ((i + 1) * diff));
        console.log(start + (i * diff))
        console.log(start + ((i + 1) * diff))
    }
};



startCrawl(100)