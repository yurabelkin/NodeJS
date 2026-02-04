#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

yargs(hideBin(process.argv))
    .command('current', 'текущая дата', (yargs) => {
        return yargs.option('year', { alias: 'y', type: 'boolean' })
            .option('month', { alias: 'm', type: 'boolean' })
            .option('date', { alias: 'd', type: 'boolean' })
    }, (argv) => {
        console.log(argv)
        date = new Date()
    })
    .command('add', 'добавить время', (yargs) => {
        return yargs.option('year', { alias: 'y', type: 'number' })
            .option('month', { alias: 'm', type: 'number' })
            .option('date', { alias: 'd', type: 'number' })
    }, (argv) => {
        date = new Date()
        date.setFullYear(date.getFullYear() + argv.year, date.getMonth() + argv.month, date.getDate() + argv.date)
    })
    .command('sub', 'отнять время', (yargs) => {
        return yargs.option('year', { alias: 'y', type: 'number' })
            .option('month', { alias: 'm', type: 'number' })
            .option('date', { alias: 'd', type: 'number' })
    }, (argv) => {
        date.setFullYear(date.getFullYear() - argv.year, date.getMonth() - argv.month, date.getDate() - argv.date)
    })


if (typeof date !== "undefined") console.log(date.toISOString())
else console.log("Не введена корректная команда")