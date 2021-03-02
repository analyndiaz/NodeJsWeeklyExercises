const FileWatcher = require('./Utilities/FileWatcher');
const Notifier = require('./Utilities/Notifier');
const { argv } = require('yargs');

const fileWatcher = new FileWatcher();
const {openToastNotification, printToConsole} = new Notifier();

fileWatcher.on('nameFoundOnFile', openToastNotification);
fileWatcher.on('nameFoundOnFile', printToConsole);

const {name, path} = argv;

fileWatcher.watchDir(name, path);