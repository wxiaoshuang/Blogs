function curry(fn) {
    var length = fn.length;
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);
    return function() {
        var _args = args.slice(0)
        for(var i = 0; i < arguments.length; i++) {
            _args.push(arguments[i]);
        }
        if (_args.length < length) {
            return curry.apply(this, [fn, ..._args]);
        }
        else {
            return fn.apply(this, _args);
        }
    }
}

function add(x, y) {
    return x + y
}
console.log(curry(add)(1, 2));
console.log(curry(add,1)(2));
console.log(curry(add,1, 2)());
console.log(curry(add)(1)(2));
