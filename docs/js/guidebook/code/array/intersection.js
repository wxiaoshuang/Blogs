function intersection(arr1, arr2) {
    if(!arr1.length) {
        return arr2
    }
    if(!arr2.length) {
        return arr1
    }
    arr1.sort((a, b) => a - b)
    arr2.sort((a, b) => a - b)
    let i = 0
    let j = 0
    let res = []
    while(i < arr1.length && j < arr2.length) {
        if(arr1[i] < arr2[j]) {
            i++
        } else if(arr1[i] > arr2[j]) {
            j++
        } else {
            res.push(arr1[i])
            i++
            j++
        }
    }
    return res
}
let arr1 = [10, 30, 40, 10, 50, 30, 49, 30]
let arr2 = [10, 30, 10, 50, 49]
// Hash
function intersection2(arr1, arr2) {
    let map = new Map()
    let res = []
    for (let i = 0; i < arr1.length; i++) {
        if(!map.has(arr1[i])) {
            map.set(arr1[i], 1)
        } else {
            map.set(arr1[i],  map.get((arr1[i]) + 1))
        }
    }
    for (let i = 0; i < arr2.length; i++) {
        let val = map.get((arr2[i]))
        if(val && val > 0) {
            res.push(arr2[i])
            map.set(arr2[i], val - 1)
        }
    }
}

console.log(intersection(arr1, arr2));
