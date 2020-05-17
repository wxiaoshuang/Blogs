function KMP(str, pattern) {
    function _getNext(pattern) {
        let n = pattern.length
        let count = 0
        let next = Array.from({length: pattern.length}).fill(0)
        for (let i = 1; i < n; i++) {
            while (count > 0 && pattern[i] !== pattern[count]) {
                count = next[count - 1]
            }
            if (pattern[i] === pattern[count]) {
                count++
            }
            next[i] = count
        }
        return next
    }

    function index(str, pattern) {
        let next = _getNext(pattern)
        let j = 0
        for (let i = 0; i < str.length; i++) {
            while (j > 0 && pattern[j] !== str[i]) {
                j = next[j - 1]
            }
            if (pattern[j] === str[i]) {
                j++
            }
            if (j === pattern.length) {
                return i - j + 1
            }
        }
        return -1
    }

    function indexPositions(str, pattern) {
        let j = 0
        let next = _getNext(pattern)
        let positions = []
        for (let i = 0; i < str.length; i++) {
            while (j > 0 && pattern[j] !== str[i]) {
                j = next[j - 1]
            }
            if (pattern[j] === str[i]) {
                j++
            }
            if (j === pattern.length) {
                positions.push(i - j + 1)
                j = 0
            }
        }
        return positions
    }

    return {
        index: index(str, pattern),
        indexPositions: indexPositions(str, pattern)
    }
}

let kmp = KMP('ABCDEDGABCDEFG', 'ED')
console.log(kmp)

function bruteForce(str, pattern) {
    let n = str.length
    let m = pattern.length
    if (m > n) {
        return -1
    }
    for(let i = 0; i < n -m; i++) {
        let j = 0
        while(j < m && pattern[j] === str[i+j]) {
            j++
        }
        if(j === m) {
            return i
        }
    }
    return -1
}

console.log(bruteForce('ABCDEDGABCDEFG', 'ED'));
