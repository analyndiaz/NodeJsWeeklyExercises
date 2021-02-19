// NOTE: Monthly installment formula
// run 'npm install' first
// LoanAmount * (1 + (LoanTerm *(InterestRate / 100))) / LoanTerm
// use this command to run -> node main.js --loanTerm=24 --bankName='bpi' --loanAmount=10000


const { argv } = require('yargs');
const LoanCalculator = require('./Utilities/LoanCalculator');

//console.log(argv);
const {bankName, loanTerm, loanAmount} = argv;

const calculator = new LoanCalculator(bankName, loanAmount, loanTerm);

console.log(calculator.getMonthlyInstallment());


