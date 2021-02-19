const Bank = require('./Bank');

class Metrobank extends Bank{
    constructor(loanAmount){
        super(loanAmount, 1.5);
    }
}

module.exports = Metrobank;