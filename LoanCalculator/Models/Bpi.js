const Bank = require('./Bank');

class Bpi extends Bank{
    constructor(loanAmount){
        super(loanAmount, 1.2);
    }
}

module.exports = Bpi;