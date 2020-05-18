function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1)
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    }
}
function add(x, y , z) {
    return x + y + z
}
let curriedAdd1  = curry(add)
console.log(curriedAdd1(1, 2, 3));
let curriedAdd2  = curry(add, 1, 2)
console.log(curriedAdd2(3));
let curriedAdd3  = curry(add, 1, 2, 3)
console.log(curriedAdd3());
