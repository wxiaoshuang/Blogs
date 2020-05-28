# 字符串

### 字符串匹配算法

##### 暴力匹配算法

##### Rabin-karp


![](https://user-gold-cdn.xitu.io/2020/3/10/170c2bde37faf450?w=770&h=288&f=png&s=181432)

```typescript
class KMP {
     static indexPositions(str: string, pattern: string): number[] {
        let j = 0;
        let next: number[] = KMP.getNext(pattern)
        let positions: number[] = []
        for(let i = 0; i < str.length; i++) {
            if(j > 0 && pattern[j] !== str[i]) {
                j = next[j-1]
            }
            if(pattern[j] === pattern[i]) {
                j++
            }
            if(j === pattern.length) {
                positions.push(i - j + 1)
                j = 0
            }
        }
        return positions
    }
     static index(str: string, pattern: string): number {
            let j = 0;
            let next: number[] = KMP.getNext(pattern)
            for(let i = 0; i < str.length; i++) {
                if(j > 0 && pattern[j] !== str[i]) {
                    j = next[j-1]
                }
                if(pattern[j] === pattern[i]) {
                    j++
                }
                if(j === pattern.length) {
                   return i - j + 1
                }
            }
        }
    private static getNext(pattern: string): number[] {
        let n: number = pattern.length
        let count: number = 0
        let next:number[] = Array.from({length:pattern.length}).fill(0)
        for(let i = 1; i < n;i++) {
            while(count > 0 && pattern[i] !== pattern[count]) {
                count = next[count-1]
            }
            if(pattern[i] === pattern[count]) {
                count++
            }
            next[i] = count
        }
        return next
    }
}

```

```javascript
function KMP(str, pattern) {
    function _getNext(pattern) {
         let n= pattern.length
         let count = 0
         let next= Array.from({length:pattern.length}).fill(0)
         for(let i = 1; i < n;i++) {
             while(count > 0 && pattern[i] !== pattern[count]) {
                 count = next[count-1]
             }
             if(pattern[i] === pattern[count]) {
                 count++
             }
             next[i] = count
         }
         return next
    }
    function index(str, pattern) {
        let next = _getNext(pattern)
        let j = 0
        for(let i = 0; i < str.length; i++) {
            while(j > 0 && pattern[j] !== str[i]) {
                j = next[j-1]
            }
        }
        if(pattern[j] === str[i]) {
            j++
        }
        if(j === pattern.length) {
            return i - j + 1
        }
    }
    function indexPositions(str,pattern) {
            let j = 0
            let next = KMP.getNext(pattern)
            let positions= []
            for(let i = 0; i < str.length; i++) {
                if(j > 0 && pattern[j] !== str[i]) {
                    j = next[j-1]
                }
                if(pattern[j] === pattern[i]) {
                    j++
                }
                if(j === pattern.length) {
                    positions.push(i - j + 1)
                    j = 0
                }
            }
            return positions
        }
    return {
        index,
    }
    
}

```

```



## 需要强化

DFS, BFS, DP


```

引用：

+ https://www.cnblogs.com/yoke/p/6697013.html
