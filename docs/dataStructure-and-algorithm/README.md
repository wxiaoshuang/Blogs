
# 数据结构与算法

## 如何攻克算法

目标：这一次，彻底拿下数据结构与算法
精确一个领域：拆分知识点，对某个知识反复刻意练习，学习反馈和总结

+ 刻意练习 五毒神掌，至少五遍
+ 对弱点，缺陷反复练习

leetcode刷题，英文和中文先刷一遍

**第一遍**
+ 5分钟读题审题
+ 思考可能的解法
+ 每种可能的算法都写出来，比较每种解法的时空复杂度，
+ 最终选择最优的方法
+ 如果一个题目已经思考了30分钟还是毫无头绪，直接看解法，不要想一整天想破脑袋，算法是理解和运用的，不是发明创造的
+ 背诵和默好的解法

**第二遍**
  自己在IDE里面写

**第三遍**
  24小时后再去练习

**第4遍**
  一周后再练习

**第5遍**
   一个月后回顾

## 时间复杂度和空间复杂度
- **时间复杂度**
- **空间复杂度**

时间复杂度的全称是**渐进时间复杂度，表示算法的执行时间与数据规模之间的增长关系**。
类比一下，空间复杂度全称就是**渐进空间复杂度**，表示算法的存储空间与数据规模之间的增长关系。
#### 递归：主要分析出递归树

## 自定义tab
<p>
<ul>
<li>java</li>
<li>python</li>
<li>javascript</li>
</ul>  
</p>

## 字典树 并查集

### 字典树

要求 实现一个Trie树

leetCode:

+ [208 实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)
+ [单词搜索](https://leetcode-cn.com/problems/word-search-ii/)

+ [211. 添加与搜索单词 - 数据结构设计](https://leetcode-cn.com/problems/add-and-search-word-data-structure-design/)

### 并查集

并查集是一种数据结构，它的主要用途有以下几点：

+ 检查多个相连且无方向无权值的点是否存在环
+ 检查多个相连且无方向无权值的点中有多少集合
  ![](https://user-gold-cdn.xitu.io/2020/2/16/1704e2459ba008f0?w=432&h=426&f=png&s=114691)
  ![](https://user-gold-cdn.xitu.io/2020/2/16/1704e0b7434430e6?w=756&h=284&f=png&s=140825)

### leetCode

+ [朋友圈问题](https://leetcode-cn.com/problems/friend-circles/solution/peng-you-quan-by-leetcode/)
+ [200岛屿问题]()

##  高级搜索

## AVL树 红黑树

保证二维维度

平衡二叉树

> 它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。平衡二叉树的常用实现方法有红黑树、AVL、替罪羊树、Treap、伸展树等

旋转操作

1. 右右子树 - 左旋 

![](https://user-gold-cdn.xitu.io/2020/3/10/170c2b40bd7c1661?w=1030&h=395&f=png&s=131064)
2. 左左子树 - 右旋
![](https://user-gold-cdn.xitu.io/2020/3/10/170c2b4f44889b99?w=868&h=404&f=png&s=135458)
3. 左右子树 - 左右旋
![](https://user-gold-cdn.xitu.io/2020/3/10/170c2b647b8173d5?w=1016&h=384&f=png&s=166356)
![](https://user-gold-cdn.xitu.io/2020/3/10/170c2b69efc7c869?w=997&h=420&f=png&s=142624)
4. 右左子树 - 右左旋
![](https://user-gold-cdn.xitu.io/2020/3/10/170c2b739822bbbb?w=919&h=448&f=png&s=162169)
![](https://user-gold-cdn.xitu.io/2020/3/10/170c2b8060ccac63?w=888&h=379&f=png&s=126746)

红黑树

![](https://user-gold-cdn.xitu.io/2020/3/10/170c2babf60f77a2?w=764&h=346&f=png&s=224128)



## 布隆过滤器和LRU缓存

实现一个LRU缓存

题目：

+ [146. LRU缓存机制](https://leetcode-cn.com/problems/lru-cache/)

java

```java
import java.util.HashMap;
import java.util.Map;

public class LRU {
    private class Node {
        int key;
        int val;
        Node prev;
        Node next;
        public Node(int key, int val) {
            this.key = key;
            this.val = val;
        }
    }
    private int capacity;
    private Map<Integer, Node> map;
    private Node head;
    private Node tail;
    public LRU(int capacity) {
        this.capacity = capacity;
        map = new HashMap<>();
        head = new Node(-1, -1);
        tail = new Node(-1, -1);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if(!map.containsKey(key)) {
            return -1;
        }
        Node node = map.get(key);
        node.prev.next = node.next;
        node.next.prev = node.prev;
        appendToTail(node);
        return node.val;
    }

    public void put(int key, int value) {
        if(get(key) != -1) {
            map.get(key).val = value;
            return;
        }
        Node node = new Node(key, value);
        appendToTail(node);
        map.put(key, node);
        if(map.size() > capacity) {
            map.remove(head.next.key);
            head.next = head.next.next;
            head.next.prev = head;
        }
    }
    private void appendToTail(Node node) {
        node.next = tail;
        node.prev = tail.prev;
        tail.prev.next = node;
        tail.prev = node;
    }

}
```

