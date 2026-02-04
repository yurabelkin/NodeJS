#!/usr/bin/env node

const fs = require('fs')
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });
const argv = yargs(hideBin(process.argv))
    .option('f', {
        alias: 'file',
        describe: 'имя файла лога',
        type: 'string'
    })
    .parse();


console.log('Игра "Орел или решка"');
let log = false;
if (typeof (argv.file) != 'undefined') {
    console.log('Логируем в файл: ' + argv.file);
    log = true;
}
else console.log('Игра без записи в файл');

console.log('Укажите Ваш выбор: 1 - орел, 2 - решка');

function writeToLog(file, num, won) {
    let d = new Date();
    const logobj = {
        date: d.toString(),
        num: num,
        won: won
    };

    let logstr = JSON.stringify(logobj) + '\n';
    const writerSrt = fs.createWriteStream(file, { flags: 'a' });
    writerSrt.write(logstr, 'UTF8');
    writerSrt.end();
}

var num = Math.floor(Math.random() * 2 + 1);
const results = ['орел', 'решка'];
rl.on('line', (ans) => {
    if (parseInt(ans) == 1 || parseInt(ans) == 2) {
        console.log('В итоге выпало: ' + results[num - 1] + ' (' + num.toString() + ')');
        if (num == parseInt(ans)) {
            console.log('Выиграл игрок!');
            won = 'u';
        }
        else {
            console.log('Выиграл компьютер!');
            won = 'c';
        }
        writeToLog(argv.file, num, won);
    }
    else { console.log('Ошибка: Недопустимый ввод'); }

    rl.close()
}); 
