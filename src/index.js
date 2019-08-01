
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

const def = function () {
  const args = _.toArray(arguments);
  let last = _.last(args);
  const options = (_.isObject(last) && !_.isFunction(last))? args.pop(): {};

  last = _.last(args);
  const func = (_.isFunction(last)) ? args.pop(): null;

  const kwargs = parseArgs(args, k => [k, undefined]);
  const keys = Object.keys(kwargs);
  assert(typeof func === 'function', 'Invalid function supplied');

  return function () {
    let opts = _.assign(kwargs, 
                        parseArgs(arguments, (v, i) => [keys[i], v]));
    
    if (opts) {
      if (options.compact) {
        opts = _.omitBy(opts, v => !v);
      }
      if (options.strict) {
        opts = _.pick(opts, keys);
      }
    }
    return func.call(this, opts);
  };
};

export default def;
