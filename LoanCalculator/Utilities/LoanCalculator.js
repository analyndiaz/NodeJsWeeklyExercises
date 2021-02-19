const Bpi = require('../Models/Bpi');
const Bdo = require('../Models/Bdo');
const Metrobank = require('../Models/Metrobank');

class LoanCalculator{
    constructor(bankName, loanAmount, loanTerm){
        this.bankName = bankName;
        this.loanAmount = loanAmount;
        this.loanTerm = loanTerm;
    }

    getMonthlyInstallment(){
        let bank;
        switch (this.bankName.toUpperCase()) {
            case 'BPI':
                bank = new Bpi(this.loanAmount);
                return bank.getMonthlyInstallment(this.loanTerm);
            case 'BDO':
                bank = new Bdo(this.loanAmount);
                return bank.getMonthlyInstallment(this.loanTerm);
            case 'METROBANK':
                bank = new Metrobank(this.loanAmount);
                return bank.getMonthlyInstallment(this.loanTerm);
            default:
                return 0;
        }
    }
}

module.exports = LoanCalculator;