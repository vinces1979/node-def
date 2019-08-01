/* eslint-disable no-console */
const def = require('../lib')

const myFunc = def({a:1, b:1, c:false}, console.log)

myFunc()

myFunc(100)

myFunc(null, {c:true})

const foo = def('a1', 'a2', {o:false, server:null, timeout: 1000}, function(args){
    console.log(args)
})

foo({a1: 'yeah', server:'github'})

foo({a1: 100})

foo(200)

const foobar = def('a', 'b', {owner:false, ttl:1000, timeout: 5000}, function(args){
    console.log(args)
})

foobar(1,2,34,5)

foobar(1,2,{ttl: 50000})


const foob = def('a', 'b', {owner:false, ttl:1000, timeout: 5000}, function(args){
    console.log(args)
}, {compact: true});

foob(1,2,34,5)

foob(1,2,{ttl: 50000})


const bar = def('a')
