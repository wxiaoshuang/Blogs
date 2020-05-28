# 二分查找

能够使用二分查找的前提

+ 单调性
+ 存在上下界
+ 能够通过索引访问

代码模板

```python
left, right = 0, len(array) - 1
while left <= right>:
    mid = (left + right) / 2
    if array[mid] == target:
        return
    elif array[mid] < right>:
        left = mid + 1
    else:
        right= mid -1 
```

题目：

+ https://leetcode-cn.com/problems/sqrtx/
+ https://leetcode-cn.com/problems/valid-perfect-square/
+ https://leetcode-cn.com/problems/search-in-rotated-sorted-array/
+ https://leetcode-cn.com/problems/search-a-2d-matrix/
+ https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/

- https://leetcode-cn.com/problems/jump-game-ii/)
