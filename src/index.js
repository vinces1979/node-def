
const assert = require('assert');
const _ = require('lodash');

const parseKwargs = args => _(args).chain()
                              .remove(arg => _.isObject(arg) && !_.isArray(arg))
                              .map(_.toPairs)
                              .flatten()
                              .value();

const parseArgs = (args, mapFunc) => {
  const kwargs = parseKwargs(args);  
  return _(args).chain()
        .flatten()
        .map(mapFunc)
        .concat(kwargs)
        .fromPairs()
        .value();
};

const modifiers = {
  compact: (opts)=>{
    return _.omitBy(opts, v => !v);
  },
  strict: (opts, keys)=>{
    return _.pick(opts, keys);
  },
  
}

class Modifier{
  constructor(t, keys){
    this.type = t;
    this.keys = keys;
    this.mod = (_.isFunction(t)) ? t :  modifiers[t];
  }
  run(opts){
    if (!this.mod) return opts;
    return this.mod(opts, this.keys);
  }
}

const def = function () {
  const args = _.toArray(arguments);

  let last = _.last(args);
  var options = (_.isObject(last) && !_.isFunction(last)) ? args.pop(): {};

  last = _.last(args);
  const func = (_.isFunction(last)) ? args.pop(): null;

  assert(typeof func === 'function', 'Invalid function supplied');

  const kwargs = parseArgs(args, k => [k, undefined] );
  const keys = Object.keys(kwargs);

  const Mod = function(t){
    return new Modifier(t, keys);
  }

  options = _(options)
                .chain()
                .map( (v,k)=> (v) ? Mod(k): false )
                .compact()
                .value();

  var wrapper = function(){

      var args = _.toArray(arguments);
      var mods = _(args)
                      .chain()
                      .remove(a=>a instanceof Modifier)
                      .concat(options)
                      .value();

      let extraArgs = [];
      let opts = _.assign( {}, kwargs, 
                          parseArgs(args, (v, i) => {
                            if (keys[i]) return [keys[i], v];
                            extraArgs.push(v);
                            return ['ARGS', extraArgs];
                            }));      
      
      for (var mod of mods){
        opts = mod.run(opts);
      }
      
      return func.call(this, opts);
  }

  const factory = {
    get: function(target, prop, receiver) {
      if (prop === 'modifier'){
        return Mod;
      }
      if (modifiers[prop]){
        return _.partial(target, Mod(prop))
      }
      return target;
    }
  };
  return new Proxy(wrapper, factory);
  
  
};


export default def;
