const notifier = require('node-notifier');

const MESSAGE = `Your name was mentioned on file:`;

class Notifiier {
    openToastNotification = ({filename}) => {
        notifier.notify({
            title: 'File Watcher',
            message: `${MESSAGE} ${filename}`
          });
    };
    
    printToConsole = ({filename}) => {
        console.log(`${MESSAGE} ${filename}`);
    };
}

module.exports = Notifiier;