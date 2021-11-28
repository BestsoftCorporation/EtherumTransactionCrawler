const  createClient = require('redis');
const transactionCrawler = require('../../lib/transactionCrawler')
const client = createClient.createClient({
    host: 'redis',
    port: 6379,
});

exports.list = function(req, res, next){
    transactionCrawler.startCrawl(Number(req.query.start),req.query.address)
    res.json({ transactions: 'test'+req.query.start +" "+req.query.address});
};