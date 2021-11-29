const createClient = require('redis');
const transactionCrawler = require('../../lib/transactionCrawler')
const Tranaction = require('../../models/transaction');

const client = createClient.createClient({
    host: 'redis',
    port: 6379,
});


exports.list = function (req, res, next) {
    console.log(req.query.address)
    Tranaction.find({ $or: [{ 'to': {$regex: req.query.address, $options: 'i'} }, { 'from':  {$regex: req.query.address, $options: 'i'}}] },
        function (err, docs) {
            if (docs.length < 1){
                transactionCrawler.startCrawl(Number(req.query.start), req.query.address)
                res.json({"message":"searching..."});
            }else{
                if (!err) res.send(docs);
            }
        });

};
