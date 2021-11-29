const Web3 = require('web3');
const mongoose = require('mongoose');
const Transaction = require('../models/transaction');

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
                for (let txHash of block.transactions) {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    console.log(txHash)
                    if (tx.to != null && (this.account == tx.to.toLowerCase() || this.account == tx.from.toLowerCase())) {
                        //client.lPush('key', tx);
                        const newTransaction = new Transaction({
                            to: tx.to,from: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()
                        });
                        newTransaction.save();
                        console.log('Transaction found on block: ' + i);
                        console.log({ address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() });
                    }
                }
            }
            console.log('Searching block ' + i);
        }
    }
}

async function startCrawl(start, address) {

    console.log("Number of process:" + process.env.PROCESS_COUNT);
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/'+ process.env.PROJECT_ID));
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
