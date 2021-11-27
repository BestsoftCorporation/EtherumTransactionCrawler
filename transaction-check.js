const Web3 = require('web3');


class TransactionChecker {


    constructor(projectId, account) {
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/11259adf64d84c9e8c3512d279566120'));
        this.account = account.toLowerCase();
    }

    async checkBlock() {
        var currentBlock = 9000000;
        let n = await this.web3.eth.getBlock('latest').number;
        console.log(n)
        for (var i = currentBlock; i <  await this.web3.eth.getBlock('latest'); ++i) {
            try {
                var block = this.web3.eth.getBlock(i, true);
                if (block && block.transactions) {
                    block.transactions.forEach(function (e) {
                        if (this.account == e.from) {
                            if (e.from != e.to)
                                bal = bal.plus(e.value);
                            console.log(i, e.from, e.to, e.value.toString(10));
                            --n;
                        }
                        if (this.account == e.to) {
                            if (e.from != e.to)
                                bal = bal.minus(e.value);
                            console.log(i, e.from, e.to, e.value.toString(10));
                        }
                    });
                }
                console.log(i)
            } catch (e) { console.error("Error in block " + i, e); }
        }
    }
}


let txChecker = new TransactionChecker(process.env.INFURA_ID, '0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f');
txChecker.checkBlock();
