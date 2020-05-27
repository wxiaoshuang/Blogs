# 递归 回溯
八皇后，数独

### 递归

递归是一种非常高效、简洁的编码技巧，一种应用非常广泛的算法，比如DFS深度优先搜索、前中后序二叉树遍历等都是使用递归

递归需要满足三个条件

1. 一个问题的解可以分解为多个子问题的解，何为子问题？子问题就是数据规模更小的问题
2. 这个问题与分解之后的子问题，除了数据规模不同，求解思路完全一样
3. 存在递归终止条件

题目(TODO : 最后两个)

+ [pow(x, n)](https://leetcode-cn.com/problems/powx-n/)
+ [组合总和](https://leetcode-cn.com/problems/combination-sum/)
+ [组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)
+ [全排列](https://leetcode-cn.com/problems/permutations/)
+ [全排列 II](https://leetcode-cn.com/problems/permutations-ii/)
+ [子集](https://leetcode-cn.com/problems/subsets/)
+ [子集 II](https://leetcode-cn.com/problems/subsets-ii/)
+ [字母大小写全排列](https://leetcode-cn.com/problems/letter-case-permutation/)
+ [括号生成](https://leetcode-cn.com/problems/generate-parentheses/)
+ [众数](https://leetcode-cn.com/problems/majority-element-ii/)
+ [电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

#### [组合总和](https://leetcode-cn.com/problems/combination-sum/)
```
    给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
    
    candidates 中的数字可以无限制重复被选取。
    
    说明：
    
    所有数字（包括 target）都是正整数。
    解集不能包含重复的组合。 
    示例 1:
    
    输入: candidates = [2,3,6,7], target = 7,
    所求解集为:
    [
    [7],
    [2,2,3]
    ]
    示例 2:
    
    输入: candidates = [2,3,5], target = 8,
    所求解集为:
    [
    [2,2,2,2],
    [2,3,3],
    [3,5]
    ]

```
第一种方法，做减法

<!-- tabs:start -->

### **java**
```java
class Solution {
     public List<List<Integer>> combinationSum(int[] candidates, int target) {
        Arrays.sort(candidates);
		List<List<Integer>> res = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        dfs(0, target, path, res, candidates);
        return res;
    }
    public void dfs(int i, int target, List<Integer> path, List<List<Integer>> res, int[] candidates) {
        if(target == 0) {
            res.add(new ArrayList<>(path));
            return;
        }
        for(int k = i; k < candidates.length; k++) {
            if(candidates[k] > target) {
                break;
            }
            path.add(candidates[k]);
            dfs(k, target - candidates[k], path, res, candidates);
            path.remove(path.size() -1);
        }
    }
}
```
### **javascript**
```javascript
var combinationSum = function(candidates, target) {
   candidates.sort((a, b) => a - b);
   let res = [];
   dfs(0, target, res, [], candidates)
   function dfs(i, target, res, path, candidates) {
       if(target === 0) {
           res.push([...path]) // 注意这里要拷贝一份path
           return
       }
       for(let k = i; k< candidates.length; k++) {
           if(candidates[k] > target) {
               break;
           }
           path.push(candidates[k])
           dfs(k, target - candidates[k], res, path, candidates)
           path.pop()
       }
   }
   return res
}
```
### **python**
```python
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        if len(candidates) == 0:
            return []
        candidates.sort()
        res=[]
        self.dfs(0, target, res, [], candidates)
        return res
    def dfs(self, i, target, res, path, candidates):
        if(target == 0) :
           res.append(path[:]) # 注意这里要拷贝一份path
           return
        for k in range(i, len(candidates)):
           if(candidates[k] > target):
                break
           path.append(candidates[k])
           self.dfs(k, target - candidates[k], res, path, candidates)
           path.pop()
```


<!-- tabs:end -->

第二种方法，做加法

```java
class Solution {
     public List<List<Integer>> combinationSum(int[] candidates, int target) {
        Arrays.sort(candidates);
		List<List<Integer>> res = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        dfs(0, 0, target, path, res, candidates);
        return res;
    }
    public void dfs(int i,int current, int target, List<Integer> path, List<List<Integer>> res, int[] candidates) {
        if(target == current) {
            res.add(new ArrayList<>(path));
            return;
        }
        for(int k = i; k < candidates.length; k++) {
            if(candidates[k] > target - current) {
                break;
            }
            path.add(candidates[k]);
            dfs(k, current + candidates[k], target, path, res, candidates);
            path.remove(path.size() -1);
        }
    }
}

```

#### [组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)

```
给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

说明：

所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。 
示例 1:

输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
示例 2:

输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]
```

```java
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer> res = new ArrayList<>();
        dfs(0,candidates,target, res, new ArrayList<Integer>());
        return res;
    }
    private void dfs(int i,int[] candidates, int target,List<List<Integer>> res, List<Integer> path ) {
        if(target == 0) {
            res.add(new ArrayList<>(path));
            return;
        }
  		if(i == candidates.length) {
            return;
        }
        for(int k = i; k < candidates.length; k++) {
            // 跳过同层的重复元素
            if(k > i && candidates[k] == candidates[k-1]) continue;
            if(candidates[k] > target) break;
            path.add(candidates[k]);
            // 因为元素不可以重复使用，这里递归传递下去的是 k + 1 而不是 k
            dfs(k+1,candidates, target - candidates[k], res,path);
            path.remove(path.size() -1);
        }
    }
}
```



全排列

```java
class Solution {
    public List<List<Integer>> permute(int[] nums) {
		List<List<Integer>> res = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        Deque<Integer> path = new ArrayDeque<>();
        dfs(0, nums, res, new ArrayList<Integer>(), used);
        return res;
    }
    private void dfs(int depth, int[] nums,List<List<Integer>> res, Deque<Integer> path,  boolean[] used) {
        if(depth == nums.length) {
            res.add(new ArrayList<>(path));
            return;
        }
        for(int k = 0; k < nums.length; k++) {
            if(used[k]) continue;
            path.addLast(nums[k]);
            used[k] = true;
            dfs(depth + 1,nums, res,path);
            path.removeLast();
            used[k] = false;
        }
    }
}
```

#### [全排列II](https://leetcode-cn.com/problems/permutations-ii/)

```
给定一个可包含重复数字的序列，返回所有不重复的全排列。
示例:
输入: [1,1,2]
输出:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
```

```java
class Solution {
     public List<List<Integer>> permuteUnique(int[] nums) {
		List<List<Integer>> res = new ArrayList<>();
        if(nums.length == 0) return res;
        Arrays.sort(nums);
        boolean[] used = new boolean[nums.length];
        Deque<Integer> path = new ArrayDeque<>();
        dfs(0, nums, res, path, used);
        return res;
    }
    private void dfs(int depth, int[] nums,List<List<Integer>> res, Deque<Integer> path,  boolean[] used) {
        if(depth == nums.length) {
            res.add(new ArrayList<>(path));
            return;
        }
        for(int k = 0; k < nums.length; k++) {
            if(used[k]) continue;
            if(k > 0 && nums[k] == nums[k-1] && !used[k-1]) continue;
            path.addLast(nums[k]);
            used[k] = true;
            dfs(depth + 1,nums, res,path, used);
            path.removeLast();
            used[k] = false;
        }
    }
}
```



#### [子集](https://leetcode-cn.com/problems/subsets/)

```
难度  中等

给定一组**不含重复元素**的整数数组 *nums*，返回该数组所有可能的子集（幂集）。

**说明：**解集不能包含重复的子集。

**示例:**
输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```

**题解**

1. 集合的每个元素，都有可以选或不选，用二进制和位运算，可以很好的表示。

<!-- tabs:start -->

### **java**

```java
// 1 << nums.length也就是2^(nums.length),因为n个元素，共有2^n个子集，
// (i>>j)) & 1 ==1,以0~(2^n)-1，2^n个n位二进制数，对应于所有子集，从后往前第 j 个二进制位为 0 表示不放入第 j 个元素,同理1表示放入。
// ((i >> j) & 1) == 1 表示对于二进制数i，从低位到高位逐个取其二进制位，并判断是否为1，若为1则放入对于nums中的元素。
// 如nums={1,2,3},i=6,三位二进制为110，则对应子集 {2,3}
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
       List<List<Integer>> res = new ArrayList<>();
       for(int i = 0; i < (1 << nums.length);i++) {
            List<Integer> path = new ArrayList<>();
            for(int j = 0; j < nums.length; j++) {
                if(((i >>j)) & 1 ==1) {
                    path.add(nums[j]);
                }
            }
            res.add(new ArrayList<>(path));
       }
       return res;
    }
}
```

### **javascript**

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let res = [];
    for(let i = 0; i < (1 << nums.length);i++) {
       let path = [];
       for(let j = 0; j < nums.length; j++) {
            if(((i >>j)) & 1 === 1) {
                path.push(nums[j]);
            }
       }
       res.push(path);
   }
   return res;
};
```

### **python**

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = []
        for i in range(1<<len(nums)):
            path = []
            for j in range(len(nums)):
                if ((i >>j)) & 1 == 1:
                    path.append(nums[j])
                
            res.append(path)
        return res
```

<!-- tabs:end -->

2. 迭代


<!-- tabs:start -->

### **java**

```java
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
    }
}
```

### **javascript**

```javascript
var subsets = function(nums) {
    
}
```

### **python**

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
```

<!-- tabs:end -->

### 回溯
