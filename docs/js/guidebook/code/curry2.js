function sub_curry(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat([].slice.call(arguments)));
    };
}

function curry(fn, length) {
    length = length || fn.length;
    var slice = Array.prototype.slice;
    return function() {
        // 如果函数参数没有传递完，那么继续curry
        if (arguments.length < length) {
            var combined = [fn].concat(slice.call(arguments));
            return curry(sub_curry.apply(this, combined), length - arguments.length);
            // 参数传递完了，自己返回函数的执行结果了
        } else {
            return fn.apply(this, arguments);
        }
    };
}
function add(x, y, z) {
    return x + y + z
}
console.log(curry(add)(1, 2, 3));
console.log(curry(add)(1,2)(3));
console.log(curry(add)(1)(2)(3));
console.log(curry(add)(1)(2,3));
