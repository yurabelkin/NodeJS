#!/usr/bin/env node

const fs = require('fs')
const readline = require('readline');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv))
    .option('f', {
        alias: 'file',
        describe: 'имя файла лога',
        type: 'string',
        demandOption: true
    })
    .parse();

console.log('Анализатор логов игры');
const lineReader = readline.createInterface({ input: fs.createReadStream(argv.file) });
var stat = {
    'games': 0,
    'won': 0,
}
lineReader.on('line', (line) => {
    let obj = JSON.parse(line);
    stat.games++;
    if (obj.won == 'u') stat.won++;
});
lineReader.on('close', () => {
    console.log('Всего игр: ' + stat.games.toString());
    console.log('Выигранных игр: ' + stat.won.toString());
    console.log('Проигранных игр: ' + (stat.games-stat.won).toString());
     console.log('Процент выгранных игр: ' + ( stat.won / stat.games * 100).toString());   
});

