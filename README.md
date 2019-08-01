# node-def

**Keyword functions in node** ✨

Simple wrapper to allow functions to accept mixes of `positonal` and `keyword` argments.


# Features

* **Keywoard Arguments** 
* **Argument Defaults**
* **Positonal Arguments**


## Installation

```shell
npm install node-def
```

## Usage

```javascript

const def = require('node-def');

const foo = def('a1', 'a2', {o:false, server:null, timeout: 1000}, function(args){
    console.log(args)
})

foo({a1: 'yeah', server:'github'})

>> {  
   a1:'yeah',
   a2:undefined,
   o:false,
   server:'github',
   timeout:1000
}

const db = def('conns', {limit:1,rate:10,offset:0,page:0}, console.log)

db(10, 3)
>> { conns: 10, limit: 3, rate: 10, offset: 0, page: 0 }

db.compact(10, 3)
>> { conns: 10, limit: 3, rate: 10 }

db(10, 3, {page:1})
>>{ conns: 10, limit: 3, rate: 10, offset: 0, page: 1 }


```

## Usage
| Argument | Details |
| ------ | ---------- |
| Postional Arguments | Positonal arguments can be passeed before your keyword definition.  |
| Keyword Definitions  | The keyword argument object definnes the keywords and also set a defualt value for any unset arguments.|
| Function  | You function to be called with the `args` object |
| Options  | Customize the `def` behavior and output |


### Options
**compact:** `Boolean`  **Default:**  `false`

**Usage:** removes empty and negative values from the arguments objects.

**strict:** `Boolean`  **Default:**  `false`

**Usage:** only return keys that were defined in the `def` creation.

### Methods

**compact:** `func.compact(a,b,c)`

**Usage:** removes empty and negative values from the arguments objects.

**strict:** `func.strict({unknown:true})`

**Usage:** only return keys that were defined in the `def` creation.

**modifier:** `func.modifier(strict|compact|func)`

**Usage:** modifiers can be passes along with the function arguments.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)