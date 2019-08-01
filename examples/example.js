/* eslint-disable no-console */
const def = require('../lib')

const myFunc = def({a:1, b:1, c:false}, console.log)

myFunc()

myFunc(100)

myFunc(null, {c:true})

const foo = def('a1', 'a2', {o:false, server:null, timeout: 1000}, function(args){

    console.log(args)


}, {compact:true})

foo()

foo({a1: 100})

foo(200)

const bar = def('a')
