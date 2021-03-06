/**
 * rsvp is a collection promise-enabled control flow functions
 */
;(function (root, factory) {

  if (root.Ember) {
    var RSVP = root.Ember.RSVP;

    if (typeof exports === 'object') {
      module.exports = factory(require('ramda-extended'), RSVP)
    } else if (typeof define === 'function' && define.amd) {
      define('get-rsvp', function () {return RSVP})
      define(['ramda-extended', 'get-rsvp'], factory);

    } else {
      root.R = factory(root.R, RSVP)
    }

  } else {
    if (typeof exports === 'object') {
      console.log('requiring')
      module.exports = factory(require('ramda-extended'), require('rsvp'));
    } else if (typeof define === 'function' && define.amd) {
      define(['ramda-extended', 'rsvp'], factory)
    } else {
      root.R = factory(root.R, root.RSVP)
    }
  }


}(this, function ramdaExtendedRSVP (R, RSVP) {
  var rsvp = {
    RSVP: RSVP
  };
  R.rsvp = rsvp;

  rsvp.compose = R.composeP;
  rsvp.pipe = R.pipeP;

  // @sig [(a -> b)] -> a -> [b]
  rsvp.parallel = R.curryN(2, function parallel (fns, x) {
    return rsvp.all(R.juxt(fns))(x)
  });

  /**
   * Identical to rsvp.parallel, except that instead of a list,
   * you pass an object with the functions as the keys
   *
   * @func
   * @sig {k: (a -> b)} -> a -> Promise({k: b})
   * @param {Object} transformations The object specifying transformation functions to invoke in parallel
   * @param {Object} object The object to be transformed
   * @returns {hash} The results of invoking the transformations with the object
   *
   */
  rsvp.parallelHash = R.curryN(2, function parallelHash (transformations, object) {
    return R.compose(
        RSVP.hash,
        R.mapObj(function (fn) {return fn(object)})
    )(transformations)
  });

  rsvp.promise = function rsvpPromise (fn) {
    return function () {
      var args = arguments;
      return new rsvp.RSVP.Promise(function (resolve, reject) {
        try {
          var result = R.apply(fn, args)
        } catch (err) {
          console.log('Rejecting:', args)
          reject(err)
        }
        resolve(result)
      })
    }
  }
  // Wraps the result of calling fn in RSVP.all
  rsvp.all = R.curryN(1, function rsvpAll (fn) {
    return R.compose(
        RSVP.all,
        fn
    )
  });

  // Wraps the result of calling fn in hash
  rsvp.hash = R.curryN(1, function rsvpHash (fn) {
    return R.compose(
        RSVP.hash,
        fn
    )
  });

  // @sig (a -> b) -> [a] -> Promise([b])
  rsvp.map = R.curryN(2, function rsvpMap (fn, list) {
    return rsvp.all(R.map(fn))(list)
  });

  /**
   * A version of fo;ter that works with composeP
   * @sig (* -> *) -> * -> RSVP.all([*])
   * @function
   * @param {Function} fn a function to apply to all items in list
   * @param {Array} list an array or items to apply the function to
   */
  rsvp.filter = R.curryN(2, function rsvpFilter (fn, list) {
    return rsvp.all(R.filter(fn))(list)
  });

  /**
   * Applies fn to x, then returns x.
   * Because the results of fn are not returned, only the side effects of fn are relevant.
   * @sig (a -> b) -> a -> b
   * @param {Function} fn
   * @param {*} x
   * @returns {RSVP.Promise} Resolves to x
   */
  rsvp.effect = R.curryN(2, function rsvpEffect (fn, x) {
    return fn(x).then(R.always(x))
  });

  rsvp.log = rsvp.promise(R.log)
  rsvp.trace = function (message) {
    return rsvp.promise(R.trace(message))
  }

  return R

}));
