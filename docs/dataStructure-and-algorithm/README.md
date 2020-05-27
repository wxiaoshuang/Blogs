https://www.bilibili.com/video/av54029771

一共195集，目标45天，目前进度33

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

## 数组 链表 跳表

线性结构：数据元素之间存在一对一的线性关系，

有两种不同的存储方法：顺序存储结构和链式存储结构表，常见的数组，队列，栈，链表

非线性结构：多维数组，树，图	

### 数组

#### 稀疏数组

数组是一种线性表的数据结构，用**连续的内存空间**，来存储一组具有**相同类型**的数据, 正是因为这个两个限制，数组才有了杀手锏的特性： 数组支持随机访问，通过下标随机访问的时间复杂度是O(1)，但是插入，删除比较低效，平均时间复杂度O(n)

leetcode解析

- **`三数之和`**

```markdown
给定一个包含 n 个整数的数组nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。
给定数组 nums = [-1, 0, 1, 2, -1, -4]，满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

<!-- tabs:start -->

### **java**

```java
  class Solution {
      public List<List<Integer>> threeSum(int[] nums) {
           List<List<Integer>> res = new ArrayList<>();
          if(nums == null || nums.length  < 3) {
              return res;
          }
          Arrays.sort(nums);
          int i = 0;
          while(i < nums.length) {
              if(nums[i] > 0) break;
              if(i > 0 && nums[i] == nums[i-1]) continue;
              int l = i+1;
              int r = nums.length - 1;
              while(l < r) {
                 int sum = nums[i] + nums[l] + nums[r];
                 if(sum == 0) {
                   res.add(Arrays.asList(nums[i], nums[l], nums[l]));
                   while( l < r && nums[l] == nums[l+1]) l++;
                   while( l < r && nums[r] == nums[r-1]) r--;
                   l++;
                   r--;
                 } else if(sum < 0) {
                     l++;
                 } else {
                     r--;
                 }
              }
              i++;
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
var threeSum = function(nums) {
    if(!nums || nums.length  < 3) {
        return []
    }
    nums.sort((a, b) => a - b)
    let res = []
    let i = 0
    while(i < nums.length) {
        if(nums[i] > 0) break
        if(i > 0 && nums[i] === nums[i-1]) continue
        let l = i+1;
        let r = nums.length - 1
        while(l < r) {
           let sum = nums[i] + nums[l] + nums[r]
           if(sum === 0) {
             res.push([nums[i], nums[l], nums[l]])
             while(l < r && nums[l] === nums[l+1]) l++
             while(l < r && nums[r] === nums[r-1]) r--
             l++
             r--
           } else if(sum < 0) {
               l++
           } else {
               r--
           }
        }
        i++
    }
    return res
};

```


### **python**

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
       res=[]
       if not nums or len(nums) < 3:
           return res
       i, n = 0, len(nums)
       nums.sort()
       for i in range(n):
           if nums[i] > 0:
               break
           if i > 0 and nums[i] == nums[i-1]:
               continue
           l = i+1
           r = n - 1
           while l < r:
               sum = nums[i] + nums[l] + nums[r]
               if sum == 0:
                   res.append([nums[i], nums[l], nums[r]])
                   while l < r and nums[l] == nums[l+1]:
                       l+=1
                   while l < r and nums[r] == nums[r-1]:
                       r-=1
                   l+=1
                   r-=1
               elif sum < 0:
                   l+=1
               else:
                   r-=1
       return res   
```

<!-- tabs:end -->

-**`合并两个有序数组`**

```
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
说明:
初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。 
示例:
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3
输出: [1,2,2,3,5,6]
```
题解：
先排序，然后运用双指针
![](./images/array.gif)

<!-- tabs:start -->

### **java**
```java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
		int p1 = m - 1;
        int p2 = n - 1;
        int p = m + n -1;
        while(p1 >=0 && p2>=0) {
             nums1[p--] = nums1[p1] > nums2[p2] ? nums1[p1--]: nums2[p2--];
        }
        // 表示将nums2数组从下标0位置开始，拷贝到nums1数组中，从下标0位置开始，长度为p2+1
        System.arraycopy(nums2, 0, nums1, 0, p2 + 1);
    }
}
```
### **javascript**
```javascript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    var p1 = m-1;
    var p2 = n - 1;
    var p = m + n -1;
    while(p1 >=0 && p2 >=0) {
        nums1[p--] = nums1[p1]>nums2[p2] ? nums1[p1--]:nums2[p2--];
    }
    var arrayCopy = function(source, sourceIndex, target, targetIndex,length) {
        target.splice(targetIndex,length, ...source.slice(sourceIndex,sourceIndex + length))
    }
    arrayCopy(nums2,0, nums1,0, p2+1)
};
```
<!-- tabs:end -->

移动零
```
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:

输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
说明:

必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。

```
<!-- tabs:start -->
### **java**
```java
// version1
class Solution {
    public void moveZeroes(int[] nums) {
       int j = 0;
       for(int i = 0; i < nums.length;i++) {
          if(nums[i] != 0) {
            nums[j++] = nums[i];
          }  
       }
       while(j < nums.length) {
            nums[j++] = 0;
       }
    }
}
// version2
class Solution {
    public void moveZeroes(int[] nums) {
       int j = 0;
       for(int i = 0; i < nums.length;i++) {
          if(nums[i] != 0) {
            if(i > j) {
                nums[j] = nums[i];
                nums[i] = 0;  
            }
            j++;
          }  
       }
    }
}
```
### **javascript**
```javascript

```
<!-- tabs:end -->
### 链表

链表是以节点的方式来存储

每个节点包含data域和next域，next指向下一个节点

节点在内存中不一定是连续存储的

#### 设计链表

1 单链表

```java
class Node {
    public int val;
    public ListNode next;
    Public ListNode(v) {
        val = v;
    }
}
public class LinkedList{
    int size;
    Node head;
    public LinkedList() {
        size = 0;
        head = new Node(0); // 头结点
    }
    // 查询val在链表中的索引
    public int getIndex(int val) {
        if(val < 0 && val >= size) {
            return -1;
        }
        ListNode curr = head.next;
        int index = 0;
        while(curr != null) {
            curr = curr.next;
            index++;
            if(index == val) {
                return index
            }
        }
        return -1
    }
    // 向链表头部添加节点
    public void addAtHead(int val) {
        Node node = new Node(val);
        node.next = head.next;
        head.next = node;
    }
    // 向链表尾部添加节点
    public void addAtTail(int val) {
        Node node = new Node(val);
        // 找到最后一个节点，最后一个节点的next=null
        Node curr = head;
        while(true) {
            if(curr.next == null) {
                break;
            }
            curr = curr.next;
        }
        curr.next = node;
    }
    public void addAtIndex(int val) {
        
    }
    public void deleteAtIndex(int val) {
        
    }
   
    public void add(int val) {
       Node node = new Node(val);
               // 找到最后一个节点，最后一个节点的next=null
       Node curr = head;
       while(true) {
           if(curr.next == null) {
               break;
           }
           curr = curr.next;
       }
       curr.next = node;
    }
    public void remvoe(int val) {
        
    }
    public void show() {
        if(head.next == null) {
            System.out.println("链表为空");
        }
        Node curr = head.next;
        while(curr!= null) {
            System.out.print(Node.val+"->");
            curr = curr.next;
        }
    }
}
```



#### 合并两个有序链表

1 递归法

两个链表头部较小的一个与剩下元素的 merge 操作结果合并

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if(l1 == null) {
            return l2;
        } else if(l2 == null) {
            return l1;
        } else if(l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoLista(l2.next, l1);
            return l2;
        }
    }
}
```



2 迭代法

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if(l1 == null) {
            return l2;
        } 
        if(l2 == null) {
            return l1;
        }
        ListNode prevHead = new ListNode(0);
        ListNode prev = prevHead;
        while(l1 != null && l2 != null) {
            if(l1.val <l2.val) {
                prev.next = l1;
                l1 = l1.next;
            }else {
                prev.next = l2;
                l2 = l2.next;
            }
            prev = prev.next;
        }
        prev.next = l1 == null ? l2: l1;
        return prevHead.next;
    }
}
```



#### 单链表反转

1 递归

```java
public static  ListNode reverseList(ListNode head) {
       //递归终止条件是当前为空，或者下一个节点为空
		if(head==null || head.next==null) {
			return head;
		}
		//这里的cur就是最后一个节点
		ListNode cur = reverseList(head.next);
		//如果链表是 1->2->3->4->5，那么此时的cur就是5
		//而head是4，head的下一个是5，下下一个是空
		//所以head.next.next 就是5->4
		head.next.next = head;
		//防止链表循环，需要将head.next设置为空
		head.next = null;
		//每层递归函数都返回cur，也就是最后一个节点
		return cur;
}
```

2 迭代

```java
public static ListNode reverseList(ListNode head) {
    if(head == null || head.next == null) return head;
    ListNode prev = null;
    ListNode curr = head;
    while(curr != null) {
        ListNode nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp; 
    }
}
```

3 头插法

```java
// 头插法
// 10->20->40->30
//       curr next
//        |   |
// dummy  10->20->40->30
//           curr
//            |
// dummy->10  20->40->30
// dummy->20->10  40->30
// dummy->20->10->40  30
// dummy->20->10->40  30
// dummy->20->10->40->30
public static ListNode reverse(ListNode head) {
		if(head == null || head.next == null) {
            return head;
        }
        ListNode dummy = new Node(-1);
        ListNode curr = head;
        while(curr != null) {
            Node next = curr.next;
            curr.next = dummy.next;
            dummy.next = curr;
            curr = next;
        }
        return dummy.next;
	}

```



####  链表中环的检测

```java
public boolean isHasCircle(ListNode head) {
    ListNode dummy = new ListNode(0);
    if(head == null) {
        return false;
    }
    ListNode fast = head;
    ListNode slow = head;
    while(fast.next != null) {
        fast = fast.next.next;
        slow = slow.next;
        if(fast == slow) {
            return true;
        }
    }
    return false;
}
```



####  删除倒数第N个节点

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        ListNode fast = dummy.next;
        ListNode slow = dummy.next; // 倒数n-1个节点
        for(int i = 0; i < n + 1; i++) {
            fast = fast.next;
        }
        while(fast!= null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}
```

####  查找中间节点

#### k个一组反转链表

1. 尾插法
   举例说明， k = 3

```markdown
pre    start
end
dummy->  1  ->  2  ->  3  ->  4

// end移到要翻转的部分最后一个元素
pre    
       start          end
dummy->  1  ->  2  ->  3  ->  4

// 尾插法的意思就是,依次把curr(prev.next)移到end后面
pre             end   start   
dummy->  2  ->   3  ->  1  ->  4


pre     end          start               
dummy->  3  ->  2  ->  1  ->  4
// 将pre, end移动到start的位置，开始下一轮翻转
.....
```

代码：

```javascript
function listNode(val) {
    this.val = val
    this.next = null
function reverseKGroup(head, k) {
    let dummy = new ListNode(-1)
    dummy.next = head
    let pre = dummy;
    let end = dummy
    while(true) {
        let count = 0;
        while(end != null && count < k) {
            end = end.next
            count++
        }
        if(end == null) break
        let start = pre.next
        while(pre.next != end) {
            let curr = pre.next // 本次要插入到end节点后面的节点
            pre.next = curr.next // pre连接到curr.next, curr游离出来
            curr.next = end.next // curr插入到end的后面
            end.next = curr // end连接到curr
        }
        // 移动到待翻转链表的前一个节点
        pre = start
        end = start
    }
    return dummy.next
}
```

2. 递归

   我无法理解

#### 约瑟夫问题

```
约瑟夫问题是个有名的问题：N个人围成一圈，从第一个开始报数，
第M个将被杀掉，最后剩下一个，其余人都将被杀掉。例如N=6，M=5，被杀掉的顺序是：5，4，6，2，3，1。
```

构建环形链表

```java
// 创建一个环形单向链表
class CircleSingleLinkedList {
    private Node first = null; // 第一个节点
    public void addNode(int nums) {
        if(nums < 1) {
            return;
        }
        // 辅助指针，帮助构建环形链表
        Node curr = null;
        for (int i = 1; i <= nums; i++) {
            Node node = new Node(i);
            if(i == 1) {
                first = node;
                first.setNext(first); // 构成环,自己指向自己
                curr = first;
            } else {
                curr.setNext(node);
                node.setNext(first); // 指向第一个节点
                curr = node; // 移动curr
            }
        }
    }
    // 遍历环形链表
    public void show() {
        // 判断非空
        if(first == null) {
            return;
        }
        Node curr = first;
        while(true) {
           System.out.println(curr.getNo());
           curr = curr.getNext();
           if(curr == first) {
               break;
           }
        }
    }
}
// 节点
class Node {
    private int no;
    private Node next;
    public Node(int no) {
        this.no = no;
    }
    public int getNo() {
        return no;
    }
    public void setNext(Node node) {
        next = node;
    }
    public Node getNext() {
        return next;
    }
}
```

根据输入，输出死人编号顺序

![image-20200317143651246](./images/image-20200317143651246.png)

![image-20200317144441923](./images/image-20200317144441923.png)

```java
 public void countKills(int startNo, int countNum, int nums) {
        if(first == null || startNo < 1 || startNo > nums) {
            return;
        }
        // 构造一个辅助节点，始终指向firs后面的节点
        Node helper = first;
        while(true) {
            if(helper.getNext() == first) {
                break;
            }
            helper = helper.getNext();
        }
        // 首先找到计数起点
        for (int i = 0; i < startNo - 1; i++) {
            first = first.getNext();
            helper = helper.getNext();
        }
        while(true) {
            // 说明圈中只有一个人
            if(helper == first) {
                System.out.println(first.getNo());
                break;
            }
            // first和helper移动 countNum- 1 次
            for (int i = 0; i < countNum - 1; i++) {
                first = first.getNext();
                helper = helper.getNext();
            }
            // 此时first指向要出圈的节点
            System.out.println(first.getNo());
            // first出圈
            first = first.getNext();
            helper.setNext(first);
        }
    }
```



### leetCode

- [x] [两个有序链表合并](https://leetcode-cn.com/problems/merge-two-sorted-lists/)
- [ ] [删除链表的倒数第N个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)
- [ ] [设计链表](https://leetcode-cn.com/problems/design-linked-list/)
- [ ] https://leetcode-cn.com/problems/container-with-most-water/
- [x] https://leetcode-cn.com/problems/climbing-stairs/
- [x] [https://leetcode-cn.com/problems/3sum/ ](https://leetcode-cn.com/problems/3sum/)(高频老题）
- [x] https://leetcode-cn.com/problems/reverse-linked-list/
- [ ] https://leetcode-cn.com/problems/swap-nodes-in-pairs
- [x] https://leetcode-cn.com/problems/linked-list-cycle
- [x] https://leetcode-cn.com/problems/linked-list-cycle-ii
- [ ] [k个一组反转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)
- [ ] https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
- [ ] https://leetcode-cn.com/problems/rotate-array/
- [ ] https://leetcode-cn.com/problems/merge-two-sorted-lists/
- [ ] https://leetcode-cn.com/problems/merge-sorted-array/
- [x] https://leetcode-cn.com/problems/two-sum/
- [x] https://leetcode-cn.com/problems/move-zeroes/
- [ ] https://leetcode-cn.com/problems/plus-one/

### leetCode题解

#### 707

1. 单链表

```java

```



1. 双链表

## 栈 队列 

### 栈

栈是一个先入后出的有序列表，允许插入和删除的一端成为栈顶，另一端成为栈底

![image-20200317151119857](./images/image-20200317151119857.png)

#### 用数组模拟栈

```java
public class ArrayStack {
    private int maxSize;
    private int[] data;
    private int top;
    public ArrayStack(int maxSize) {
        this.maxSize = maxSize;
        data = new int[maxSize];
        top = -1;
    }
    public boolean isEmpty() {
        return top == -1;
    }
    public boolean isFull() {
        return top == maxSize - 1;
    }
    // 入栈
    public void push(int val) {
        if(isFull()) {
            return;
        }
        top++;
        data[top] = val;
    }
    // 出栈
    public int pop() {
        if(isEmpty()) {
            throw new RuntimeException("栈为空");
        }
        int temp = data[top];
        top--;
        return temp;
    }
    public void show() {
        if(isEmpty()) {
           return;
        }
        // 从栈顶开始遍历
        for (int i = top; i >= 0; i--) {
            System.out.println(data[i]);
        }
    }
}
```

#### 用栈实现综合计算器

使用栈，计算一个表达式的值`3 + 4 * 8 - 2`

### 队列

队列： 队列是一个有序列表，可以用数组或者链表来实现，遵循先入先出的原则

栈，队列，双端队列

优先队列：插入o(1), 取o(logn)底层实现，可以是heap，bst, treap

#### 用数组模拟队列

![image-20200316143240005](./images/image-20200316143240005.png)

```java
public class ArrayQueue {
    private int front; // 指向队列的第一个元素的前一个位置
    private int rear; // 队列的最后一个元素的位置
    private int maxSize;
    private int[] arr;
    public ArrayQueue(int maxSize) {
        this.maxSize = maxSize;
        arr = new int[maxSize];
        front = -1;
        rear = -1;
    }
    public boolean isFull() {
        return rear == maxSize - 1;
    }
    public boolean isEmpty() {
        return front == rear;
    }
    // 入队
    public void enQueue(int val) {
        if(isFull()) {
            return;
        }
        rear++;
        arr[rear] = val;
    }
    // 出队
    public int deQueue() {
        if(isEmpty()) {
            throw new RuntimeException("队列为空");
        }
        front++;
        return arr[front];
    }
    // 查看队列的头部
    public int peek() {
        if(isEmpty()) {
            throw new RuntimeException("队列为空");
        }
        return arr[front+1];
    }
    public void showQueue() {
        if(isEmpty()) {
            System.out.println("the queue is empty");
        }
        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]+"\t");
        }
        System.out.println();
    }
}

```

但是这种实现方式有一个很大的问题，front前面的空间几十已经空出来，却无法再使用了，我们需要用数组来实现环形队列

1. front表示第一个元素的索引，rear表示最后一个元素的下一个索引
2. 对列为空的条件` front == rear`,  队列满的条件，`(rear + 1) % maxSize == front`
3. 队列的大小`(rear +maxSize - front) % maxSize`

```java
public class ArrayQueue2 {
    private int front; // 指向队列的第一个元素的个位置
    private int rear; // 队列的最后一个元素的后一个位置
    private int maxSize;
    private int[] arr;
    public ArrayQueue2(int maxSize) {
        this.maxSize = maxSize;
        arr = new int[maxSize];
        front = 0;
        rear = 0;
    }
    public boolean isFull() {
        return (rear + 1) % maxSize == front;
    }
    public boolean isEmpty() {
        return rear == front;
    }
    // 入队
    public void enQueue(int val) {
        if (isFull()) {
            return;
        }
        arr[rear] = val;
        // 更新rear
        rear = (rear + 1) % maxSize;
    }
    // 出队
    public int deQueue() {
        if (isEmpty()) {
            throw new RuntimeException("队列为空");
        }
        int temp = arr[front];
        // 更新front
        front = (front + 1) % maxSize;
        return temp;
    }
    // 查看队列的头部
    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("队列为空");
        }
        return arr[front];
    }
    public void showQueue() {
        if (isEmpty()) {
            System.out.println("the queue is empty");
        }
        for (int i = front; i < front + size(); i++) {
            System.out.printf("arr[%d]=%d\n", i % maxSize, arr[i % maxSize]);
        }
        System.out.println();
    }
    public int size() {
        return (rear + maxSize - front) % maxSize;
    }
}
```

### leetCode

- https://leetcode-cn.com/problems/valid-parentheses/
- https://leetcode-cn.com/problems/min-stack/
- https://leetcode-cn.com/problems/largest-rectangle-in-histogram
- https://leetcode-cn.com/problems/sliding-window-maximum
- https://leetcode.com/problems/design-circular-deque
- https://leetcode.com/problems/trapping-rain-water/

### leetCode题目解析

[239 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)

>给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。返回滑动窗口中的最大值。

```markdown
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
解释: 

  滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```


## 哈希表 映射 集合

哈希表: 查询，添加，删除 o(1)

### leetCode题目

- https://leetcode-cn.com/problems/valid-anagram/description/
- https://leetcode-cn.com/problems/group-anagrams/
- https://leetcode-cn.com/problems/two-sum/description/

## 树 二叉树 二叉搜索树

### 二叉搜索树

>二叉查找树（Binary Search Tree），（又：二叉搜索树，二叉排序树）它或者是一棵空树，或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树。

查询,插入，删除:o(logn)，极端情况下退化为链表，复杂度变成o(n)

用代码实现BST的构造，插入，删除，查询，前，中，后遍历

## 分治 递归 回溯

八皇后，数独

### 递归

递归是一种非常高效、简洁的编码技巧，一种应用非常广泛的算法，比如DFS深度优先搜索、前中后序二叉树遍历等都是使用递归

递归需要满足三个条件

1. 一个问题的解可以分解为多个子问题的解，何为子问题？子问题就是数据规模更小的问题
2. 这个问题与分解之后的子问题，除了数据规模不同，求解思路完全一样
3. 存在递归终止条件

题目(TODO : 最后两个)

+ [pow(x, n)](https://leetcode-cn.com/problems/powx-n/)
+ [子集](https://leetcode-cn.com/problems/subsets/)
+  [组合总和](https://leetcode-cn.com/problems/combination-sum/)
+  [组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)
+ [全排列](https://leetcode-cn.com/problems/permutations/)
+  [全排列 II](https://leetcode-cn.com/problems/permutations-ii/)
+ [子集](https://leetcode-cn.com/problems/subsets/)
+ [子集 II](https://leetcode-cn.com/problems/subsets-ii/)
+ [众数](https://leetcode-cn.com/problems/majority-element-ii/)
+ [电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

#### 组合总和

>给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
>
>candidates 中的数字可以无限制重复被选取。
>
>说明：
>
>所有数字（包括 target）都是正整数。
>解集不能包含重复的组合。 
>示例 1:
>
>输入: candidates = [2,3,6,7], target = 7,
>所求解集为:
>[
>[7],
>[2,2,3]
>]
>示例 2:
>
>输入: candidates = [2,3,5], target = 8,
>所求解集为:
>[
>[2,2,2,2],
>[2,3,3],
>[3,5]
>]

第一种方法，做减法

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

#### [78. 子集](https://leetcode-cn.com/problems/subsets/)

难度  中等

给定一组**不含重复元素**的整数数组 *nums*，返回该数组所有可能的子集（幂集）。

**说明：**解集不能包含重复的子集。

**示例:**

```
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

```java
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        
    }
    public void dfs(int k, List path, List<List<Integer>> res, int[] nums) {
        if(k == nums.length) {
            res.add(new ArrayList<path>);
            return;
        }
        for(int i = k ; i <nums.length; i++) {
            dfs(i+1, path, res, nums);
            path.add(nums[i]);
            dfs(i+1, path, res,nums);
            path.remove(path.size()-1);
        }
    }
}
```



### 回溯





## 广度优先搜索 深度优先搜索

dfs:

+ 递归写法
  ![](https://user-gold-cdn.xitu.io/2020/2/14/1704415166d9fc76?w=728&h=359&f=png&s=147015)
+ 非递归写法

![](https://user-gold-cdn.xitu.io/2020/2/14/17044177d59093da?w=677&h=377&f=png&s=123630)

bfs:用队列来实现

![](https://user-gold-cdn.xitu.io/2020/2/14/170441b58db31797?w=631&h=339&f=png&s=119327)

题目：

## 图论



## 贪心算法

>贪心算法（又称贪婪算法）是指，在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，他所做出的是在某种意义上的局部最优解。
>贪心算法不是对所有问题都能得到整体最优解，关键是贪心策略的选择，选择的贪心策略必须具备无后效性，即某个状态以前的过程不会影响以后的状态，只与当前状态有关。 -百度百科

应用： 最小生成树，霍夫曼编码
硬币问题： 必须是倍数关系

### leetCode

- https://leetcode-cn.com/problems/lemonade-change/description/
- https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/description/
- https://leetcode-cn.com/problems/assign-cookies/description/
- https://leetcode-cn.com/problems/walking-robot-simulation/description/
- [https://leetcode-cn.com/problems/jump-game/ ](https://leetcode-cn.com/problems/jump-game/)、[ https://leetcode-cn.com/problems/jump-game-ii/](

## 最小生成树

学习最小生成树算法之前我们先来了解下 下面这些概念：

**树**（Tree）：如果一个无向连通图中不存在回路，则这种图称为树。

**生成树** （Spanning Tree）：无向连通图G的一个子图如果是一颗包含G的所有顶点的树，则该子图称为G的生成树。

生成树是连通图的极小连通子图。这里所谓极小是指：若在树中任意增加一条边，则将出现一条回路；若去掉一条边，将会使之变成非连通图。

**最小生成树**（Minimum Spanning Tree，MST）：或者称为最小代价树Minimum-cost Spanning Tree, 对无向连通图的生成树，各边的权值总和称为生成树的权，权最小的生成树称为最小生成树。

构成生成树的准则有三条：

<1> 必须只使用该网络中的边来构造最小生成树。

<2> 必须使用且仅使用n-1条边来连接网络中的n个顶点

<3> 不能使用产生回路的边。 

构造最小生成树的算法主要有：克鲁斯卡尔（Kruskal）算法和普利姆（Prim）算法, 他们都遵循以上准则。

### Kruskal算法
算法描述：

1. 新建图G，G中拥有原图中相同的节点，但没有边；
2. 将原图中所有的边按权值从小到大排序；
3. 从权值最小的边开始，如果这条边连接的两个节点于图G中不在同一个连通分量中，则添加这条边到图G中；
4. 重复3，直至图G中所有的节点都在同一个连通分量中。

关于第3条：如何判断两个顶点是否在图G中处于一个联通分量？

在构建最小生成树的时候，需要一个数组存储每个顶点的终点，然后判断两个顶点的终点是否相同，如果不同，说明就不在同一个联通分量中

算法代码：

```java
import java.util.*;

public class Kruskal {
    class Edge {
        int start;
        int end;
        int weight;

        public Edge(int start, int end, int weight) {
            this.start = start;
            this.end = end;
            this.weight = weight;
        }

        @Override
        public String toString() {
            return "<" + start + "," + end + ">=" + weight;
        }
    }

    private static final int INF = Integer.MAX_VALUE;
    int[] data; // 顶点
    int[][] matrix; // 邻接矩阵

    //    List<Edge> edges; // 边
    public static void main(String[] args) {
        int[] data = new int[]{0, 1, 2, 3, 4, 5, 6};// 7个顶点
        // 二维数组表示邻接矩阵，用来描述顶点相连的边的权重
        int[][] matrix = new int[][]{
                {INF, 5, 7, INF, INF, INF, 2},
                {5, INF, INF, 9, INF, INF, 3},
                {7, INF, INF, INF, 8, INF, INF},
                {INF, 9, INF, INF, INF, 4, INF},
                {INF, INF, 8, INF, INF, 5, 4},
                {INF, INF, INF, 4, 5, INF, 6},
                {2, 3, INF, INF, 4, 6, INF}
        };
        Kruskal k = new Kruskal(data, matrix);
        k.kruskal();
    }

    public Kruskal(int[] data, int[][] matrix) {
        this.data = data;
        this.matrix = matrix;
    }

    public void kruskal() {
        List<Edge> edges = this.getEdges(matrix);
        int edgeNum = edges.size();
        sortEdges(edges);
        int[] ends = new int[edgeNum];
        // 创建结果数组，保存最后的最小生成树
        Edge[] res = new Edge[edgeNum];
        int count = 0;
        System.out.println(edges);
        // 遍历edges，判断边是否构成了回路，如果没有，就加入，否在就寻找下一个边
        for (int i = 0; i < edgeNum; i++) {
            Edge edge = edges.get(i);
            // 获取一条边的两个顶点的索引p1,p2
            int p1 = getIndex(edge.start);
            int p2 = getIndex(edge.end);
            // p1和p2的终点
            int end1 = getEnd(p1, ends);
            int end2 = getEnd(p2, ends);
            // 边的两个顶点的终点不同，加入不会构成回路，那么就可以加进去最小生成树
            if (end1 != end2) {
                ends[end1] = end2;
                res[count++] = edge;
            }
            // 已经加了顶点-1条边，那么就可以终止循环了
            if (count >= data.length - 1) break;
        }
        for (int i = 0; i < count; i++) {
            System.out.println(res[i]);
        }
    }

    // 获取顶点的索引
    private int getIndex(int v) {
        for (int i = 0; i < this.data.length; i++) {
            if (this.data[i] == v) {
                return i;
            }
        }
        return -1;
    }

    /**
     * 获取下标为i的顶点的终点
     *
     * @param i    下标为i的顶点
     * @param ends 记录了各个顶点的终点是哪个顶点（索引）
     * @return 下标为i的顶点的终点索引
     */
    private int getEnd(int i, int[] ends) {
        // 表示终点不是自身，因为初始化的时候ends[i]均为0
        // while循环是要一直找下去，直到找到终点
        while (ends[i] != 0) {
            i = ends[i];
        }
        return i;
    }

    // 将矩阵处理成边
    private List<Edge> getEdges(int[][] matrix) {
        List<Edge> res = new ArrayList<>();
        for (int i = 0; i < data.length; i++) {
            // 自己不连接自己 j=i+1
            for (int j = i + 1; j < data.length; j++) {
                // 不连通的顶点不生成边
                if (matrix[i][j] != INF) {
                    res.add(new Edge(data[i], data[j], matrix[i][j]));
                }
            }
        }
        return res;
    }

    // 对边排序,按照权重升序
    private void sortEdges(List<Edge> edges) {
        Collections.sort(edges, new Comparator<Edge>() {
            @Override
            public int compare(Edge a, Edge b) {
                return a.weight - b.weight;
            }
        });
    }
}
```

### Prim算法

算法描述

1).输入：一个加权连通图，其中顶点集合为V，边集合为E；

2).初始化：Vnew = {x}，其中x为集合V中的任一节点（起始点），Enew = {},为空；

3).重复下列操作，直到Vnew = V：

a.在集合E中选取权值最小的边<u, v>，其中u为集合Vnew中的元素，而v不在Vnew[集合](https://baike.baidu.com/item/集合/2908132)当中，并且v∈V（如果存在有多条满足前述条件即具有相同权值的边，则可任意选取其中之一）；

b.将v加入集合Vnew中，将<u, v>边加入集合Enew中；

4).输出：使用集合Vnew和Enew来描述所得到的[最小生成树](https://baike.baidu.com/item/最小生成树)

算法步骤

***Algorithm\***
**1)** 创建一个集合*mstSet* 用来跟踪MST中的所有顶点
**2)** 图的每个顶点的距离初始成正无穷. 第一个顶点距离初始为0以便第一个选中， dist={0,INF,INF,INF.....}
**3)** 当*mstSet*不包含图中所有的顶点时，重复下面的步骤
….**a)** 在不在*mstSet*集合的顶点中，选中一个顶点距离最小的顶点u
….**b)** 将u加入到 mstSet.
….**c)** 更新u相邻顶点的距离. 对于每一个相邻的顶点 *v*,如果 *u-v* 边的权重小于dist[v], dist[v]更新成weight(u, v)

算法图解

用下面的例子来说明算法步骤:
[![Fig-1](https://www.geeksforgeeks.org/wp-content/uploads/Fig-11.jpg)](https://www.geeksforgeeks.org/wp-content/uploads/Fig-11.jpg)

*mstSet* 集合初始化为空，距离dist初始化为 {0, INF, INF, INF, INF, INF, INF, INF} . INF 表示无穷. 现在我们选出距离最小的顶点, 顶点0 被选中，将顶点0加入到*mstSet*.所以*mstSet*变成 {0}. 当0加入到*mstSet*之后，更新它相邻节点的距离. 相邻节点是1和7,1 和7的距离被更新为4和8. 下面的子图显示了顶点和他们的距离值, 仅仅显示有限距离的顶点， 在MST中的顶点用绿色标记

[![Fig-2](https://www.geeksforgeeks.org/wp-content/uploads/MST1.jpg)](https://www.geeksforgeeks.org/wp-content/uploads/MST1.jpg)



选出不在MST中距离最小的顶点 ，顶点1被选中并且加入到*mstSet*. 所以*mstSet*现在变成了 {0, 1}. 更新顶点1的相邻顶点的距离. 顶点2的距离变成了8.

[![Fig-3](https://www.geeksforgeeks.org/wp-content/uploads/MST2.jpg)](https://www.geeksforgeeks.org/wp-content/uploads/MST2.jpg)



选出不在MST中距离最小的顶点 ，顶点7被选中并且加入到*mstSet*. 所以 *mstSet*现在变成了{0, 1, 7}. 更新顶点7的相邻顶点距离. 顶点6和顶点 8 的距离分别变成了1和7.
[![Fig-4](https://www.geeksforgeeks.org/wp-content/uploads/MST3.jpg)](https://www.geeksforgeeks.org/wp-content/uploads/MST3.jpg)

选出不在MST中距离最小的顶点 ，顶点6被选中. 所以  *mstSet*现在变成了{0, 1, 7 ,6}. 更新顶点6的相邻顶点的距离. 顶点5和顶点8放入距离被更新了



[![Fig-4](https://www.geeksforgeeks.org/wp-content/uploads/MST4.jpg)](https://www.geeksforgeeks.org/wp-content/uploads/MST4.jpg)

重复上面的步骤直到 *mstSet* 包含图中所有的顶点. 最终，我们得到了下面的生成树



[![Fig-1](https://www.geeksforgeeks.org/wp-content/uploads/MST5.jpg)](https://www.geeksforgeeks.org/wp-content/uploads/MST5.jpg)



算法代码

<!-- tabs:start -->

### ****java****

```java
import java.util.Arrays;

// prim算法
public class Prim {
    private static final int INF = Integer.MAX_VALUE;
    private int V;
    private int[][] graph;
    public static void main(String[] args) {
        // 二维数组表示邻接矩阵，用来描述顶点相连的边的权重
        int[][] edges = new int[][]{
                {INF, 5, 7, INF, INF, INF, 2},
                {5, INF, INF, 9, INF, INF, 3},
                {7, INF, INF, INF, 8, INF, INF},
                {INF, 9, INF, INF, INF, 4, INF},
                {INF, INF, 8, INF, INF, 5, 4},
                {INF, INF, INF, 4, 5, INF, 6},
                {2, 3, INF, INF, 4, 6, INF}
        };
        Prim p = new Prim(edges);
        p.prim();
    }
    public Prim(int[][] graph) {
        V = graph.length;
        this.graph = graph;
    }
    public void prim() {
        int[] dist = new int[V];
        int parent[] = new int[V];
        Arrays.fill(parent, -1);
        boolean[] mstSet = new boolean[V];
        for (int i = 0; i < V; i++) {
            dist[i] = INF;
            mstSet[i] = false;
        }
        dist[0] = 0;//将第一个顶点距离初始化为0，所以会被第一个选中到MST中
        parent[0] = -1; // 第一个顶点是MST的根节点
        // MST有 V个顶点
        for (int i = 0; i < V - 1; i++) {
            // 从非MST的顶点中挑选出距离最小的点
            int u = minDistance(dist,mstSet);
            // 将顶点u加入MST
            mstSet[u] = true;
            // 更新u相邻顶点的dist
            for (int v = 0; v < V; v++) {
                // 更新dist[v]的三个必须条件:
                // v不在 MST中
                // v和u相邻
                // graph[u][v] < dist[v]
                if(!mstSet[v] && graph[u][v] > 0 && graph[u][v] < dist[v]) {
                    dist[v] = graph[u][v];
                    parent[v] = u;
                }
            }
        }
        printMST(parent);

    }
    private int minDistance(int[] dist, boolean[] mstSet) {
        int minDis = INF, minIndex = -1;
        for (int i = 0; i < V; i++) {
            if(!mstSet[i] && dist[i] < minDis) {
                minDis = dist[i];
                minIndex = i;
            }
        }
        return minIndex;
    }
    private void printMST(int[] parent)
    {
        System.out.println("Edge \tWeight");
        for (int i = 1; i < V; i++)
            System.out.println(parent[i] + " - " + i + "\t" + graph[i][parent[i]]);
    }


}

```

### **javascript**

```javascript
function Prim() {
    this.prim = function() {
        
    }
}
```

<!-- tabs:end -->

## 单源最短路径

>给定一个带权有向图G=（V,E），其中每条边的权是一个实数。另外，还给定V中的一个顶点，称为源。要计算从源到其他所有各顶点的最短路径长度。这里的长度就是指路上各边权之和。这个问题通常称为单源最短路径问题。

### Dijkstra算法

算法过程

> 给一个图和一个起始顶点（源点），找到这个顶点到图中所有顶点的最短路径
>
> Dijkstra算法和求最小生成树的Prim算法非常相似，类比Prim的MST,我们创建一个SPT(shorted path tree), 将给定的起点作为根节点，维护两个集合，一个集合(T)包括最短路径树的顶点，另外一个集合(U)不包括最短路径树的顶点，在算法的每一步，我们在U中找到一个距离源点路径最短的顶点
>
> 下面是Dijkstra算法用来求单源最短路径的详细步骤
>
> 1）创建一个*sptSet* 集合，用来追踪在最短路径树中的顶点，集合初始化为空
>
> 2）将所有顶点到源点的距离初始化为正无穷，源点的距离初始化为0，用dist数组来存储这些距离
>
> 03）只要*sptSet*不包含所有的顶点，就循环下面的步骤
>
> a) 从不在*sptSet*集合中的顶点中选出距离最小的顶点u
>
> b) 将u添加进去*sptSet*
>
> c) 更新u所有相邻顶点的距离，也就是迭代u的所有的相邻零点，对于每个迭代的顶点v来说，如果v不在*sptSet*集合中并且dist(u) +weight(u,v) < dist(v),  那就更新dist[v]为dist(u) +weight(u,v) 

算法图解

用下面的例子来说明:
[![Fig-1](https://www.geeksforgeeks.org/wp-content/uploads/Fig-11.jpg)](https://www.geeksforgeeks.org/wp-content/uploads/Fig-11.jpg)

*sptSet* 初始化为空 ，dist初始化为 {0, INF, INF, INF, INF, INF, INF, INF}  INF 表示无穷. 现在我们选出距离最小的顶点, 顶点0 被选中，并加入到 *sptSet*.所以*sptSet* 变成 {0}. 当0加入到*sptSet*之后，更新它相邻节点的距离，相邻节点是1和7，,1 和7的距离被更新为4和8. 下面的子图显示了顶点和他们的距离值, 仅仅显示有限距离的顶点， 在SPT中的顶点用绿色标记

[![Fig-2](https://www.geeksforgeeks.org/wp-content/uploads/MST1.jpg)](https://www.geeksforgeeks.org/wp-content/uploads/MST1.jpg)

选出不在SPT中距离最小的顶点 ，顶点1被选中并且加入到sptSet. 所以 sptSet现在变成了 {0, 1}. 更新顶点1的相邻顶点距离. 顶点2的距离变成了12.

[![Fig-3](https://www.geeksforgeeks.org/wp-content/uploads/DIJ2.jpg)](https://www.geeksforgeeks.org/wp-content/uploads/DIJ2.jpg)

选出不在SPT中距离最小的顶点 ，顶点7被选中并且加入到sptSet. 所以 sptSet现在变成了{0, 1, 7}. 更新顶点7的相邻顶点距离. 顶点6和顶点 8 的距离分别变成了9和15.
[![Fig-4](https://www.geeksforgeeks.org/wp-content/uploads/DIJ3.jpg)](https://www.geeksforgeeks.org/wp-content/uploads/DIJ3.jpg)

选出不在SPT中距离最小的顶点 ，顶点7被选中. 所以 sptSet现在变成了{0, 1, 7 ，6}. 更新顶点7的相邻顶点的距离. 顶点5和顶点8放入距离被更新了

[![Fig-4](https://www.geeksforgeeks.org/wp-content/uploads/DIJ4.jpg)](https://www.geeksforgeeks.org/wp-content/uploads/DIJ4.jpg)

重复上面的步骤直到l *sptSet* 包含图中所有的顶点. 最终，我们得到了下面的最短路径树(SPT).

[![Fig-1](https://www.geeksforgeeks.org/wp-content/uploads/DIJ5.jpg)](https://www.geeksforgeeks.org/wp-content/uploads/DIJ5.jpg)

```java
//version1

import java.util.List;
import java.util.Arrays;

// Dijkstra算法
public class Dijkstra {
    private int[][] graph;
    private int src;
    private int V;
    private static final int INF = Integer.MAX_VALUE;
    public static void main(String[] args) {
        int[][] edges = new int[][]{
                {INF, 5, 7, INF, INF, INF, 2},
                {5, INF, INF, 9, INF, INF, 3},
                {7, INF, INF, INF, 8, INF, INF},
                {INF, 9, INF, INF, INF, 4, INF},
                {INF, INF, 8, INF, INF, 5, 4},
                {INF, INF, INF, 4, 5, INF, 6},
                {2, 3, INF, INF, 4, 6, INF}
        };
        Dijkstra d = new Dijkstra(edges,0);
        int[] dist = d.dijkstra();
    }
    public Dijkstra(int[][] graph, int src) {
        this.graph = graph;
        this.V = graph.length;
        this.src = src;
    }
    public int[] dijkstra() {
        int[] path = new int[V];
        int[] dist = new int[V];
        boolean[] sptSet = new boolean[V];
        // 距离初始化为正无穷，sptSet全部初始化为false,表示最小生成树种还未添加人任何顶点
        for (int i = 0; i < V; i++) {
            dist[i] = INF;
            sptSet[i] = false;
        }
        // 源点距离自身的距离总是为0
        dist[src] = 0;
        // 这里只循环V-1次即可，因为最后一个顶点是不会走里面的for(int v; v<V；v++)的
        for(int i = 0; i < V - 1;i++) {
            // 从未处理的顶点集合种选出距离最小的边
            // 在首轮循环种，u总是等于源点src
            int u = minDistance(dist,sptSet);
            if (u == -1) break;
            // 标记选中顶点为已经处理过了
            sptSet[u] = true;
            // 更新选中顶点相邻顶点的dist
            for(int v = 0; v < V; v++) {
                // 更新dist[v] ，仅当下面三个条件同时满足
                //  v不在 sptSet种,
                //  u , v之间存在边,
                //  从源点到u再到v之间的距离小于从源点到v的距离
                if(!sptSet[v] && graph[u][v] != INF && dist[u] + graph[u][v]< dist[v]) {
                    dist[v] = dist[u] + graph[u][v];
                }
            }

        }
        printSolution(dist);
        return dist;
    }
    private int minDistance(int[] dist, boolean[] sptSet) {
        int minDis = Integer.MAX_VALUE, minIndex = -1;
        for (int v = 0; v < V; v++)
            if (!sptSet[v] && dist[v] <= minDis) {
                minDis = dist[v];
                minIndex = v;
            }

        return minIndex;
    }
    private void printSolution(int dist[])
    {
        System.out.println("Vertex \t\t Distance from Source");
        for (int i = 0; i < dist.length; i++)
            System.out.println(i + " \t\t " + dist[i]);
    }
}

```

打印即如果

```
Vertex 		 Distance from Source
0 		 0
1 		 5
2 		 7
3 		 12
4 		 6
5 		 8
6 		 2
```



Noted:

1. 上面代码计算出了从源点到各个顶点的最短距离，但是没有计算出从源点到某个顶点的路径

2. 代码考虑的是无向图，也适用于有向图
3. 代码计算出了源点到各个顶点的最短距离,如果我们只关心源点到一个顶点的最短距离，我们可以在选出的最小距离顶点等于目标顶点的时候终止循环
4. 算法时间复杂度是O(V^2), 如果输入的图示用邻接表表示的话，那么在二叉堆的帮助下，时间复杂度可以降低到 O(E log V)，有兴趣的童鞋移步https://www.geeksforgeeks.org/dijkstras-algorithm-for-adjacency-list-representation-greedy-algo-8/
5. Dijkstra算法不适用于负权边

我们把代码改造一下, 支持求出路径,其实非常简单，我们用一个数组parent来记录，每次更新dist的时候记录当前节点的父节点即可

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Arrays;

// Dijkstra算法
public class Dijkstra {
    private int[][] graph;
    private int src;
    private int V;
    private int[] parent;
    private static final int INF = Integer.MAX_VALUE;
    public static void main(String[] args) {
        int[][] edges = new int[][]{
                {INF, 5, 7, INF, INF, INF, 2},
                {5, INF, INF, 9, INF, INF, 3},
                {7, INF, INF, INF, 8, INF, INF},
                {INF, 9, INF, INF, INF, 4, INF},
                {INF, INF, 8, INF, INF, 5, 4},
                {INF, INF, INF, 4, 5, INF, 6},
                {2, 3, INF, INF, 4, 6, INF}
        };
        Dijkstra d = new Dijkstra(edges,0);
        int[] dist = d.dijkstra();
        d.printPath();
    }
    public Dijkstra(int[][] graph, int src) {
        this.graph = graph;
        this.V = graph.length;
        this.src = src;
    }
    public int[] dijkstra() {
        int[] path = new int[V];
        int[] dist = new int[V];
        parent = new int[V];
        Arrays.fill(parent, -1);
        boolean[] sptSet = new boolean[V];
        // 距离初始化为正无穷，sptSet全部初始化为false,表示最小生成树种还未添加人任何顶点
        for (int i = 0; i < V; i++) {
            dist[i] = INF;
            sptSet[i] = false;
        }
        // 源点距离自身的距离总是为0
        dist[src] = 0;
        parent[src] = src;
        for(int i = 0; i < V;i++) {
            // 从未处理的顶点集合种选出距离最小的边
            // 在首轮循环种，u总是等于源点src
            int u = minDistance(dist,sptSet);
            // 标记选中顶点为已经处理过了
            sptSet[u] = true;
            // 更新选中顶点相邻顶点的dist
            for(int v = 0; v < V; v++) {
                // 更新dist[v] ，仅当下面三个条件同时满足
                //  v不在 sptSet种,
                //  u , v之间存在边,
                //  从源点到u再到v之间的距离小于从源点到v的距离
                if(!sptSet[v] && graph[u][v] != INF && dist[u] + graph[u][v]< dist[v]) {
                    dist[v] = dist[u] + graph[u][v];
                    parent[v] = u;
                }
            }

        }
        printSolution(dist);
        return dist;
    }
    private int minDistance(int[] dist, boolean[] sptSet) {
        int minDis = Integer.MAX_VALUE, minIndex = -1;
        for (int v = 0; v < V; v++)
            if (!sptSet[v] && dist[v] <= minDis) {
                minDis = dist[v];
                minIndex = v;
            }

        return minIndex;
    }
    public void printPath(){
        System.out.println("Vertex \t\t Path from Source");
        for(int i = 0; i < V; i++) {
            System.out.println(i+"\t\t"+singlePath(i));
        }
    }
    public List<Integer> singlePath(int target) {
        List<Integer> path = new ArrayList<>();
        int curr = target;
        while(curr!= src) {
            path.add(curr);
            curr = parent[curr];
        }
        path.add(src);
        Collections.reverse(path);
        return path;
    }
    private void printSolution(int dist[])
    {
        System.out.println("Vertex \t\t Distance from Source");
        for (int i = 0; i < dist.length; i++)
            System.out.println(i + " \t\t " + dist[i]);
    }
}

```

优化，用优先队列来找每轮未访问顶点的dist最小的顶点

```java
// version2
import java.util.List;
import java.util.Arrays;
import java.util.PriorityQueue;

// Dijkstra算法
public class Dijkstra2 {
    private int[] data;
    private int[][] matrix;
    private int s;
    private int[] dist;
    private class Node implements Comparable<Node> {
        public int w, dist;
        public Node(int w, int dist) {
            this.w = w;
            this.dist = dist;
        }
        @Override
        public int compareTo(Node another) {
            return dist - another.dist;
        }
    }
    private boolean[] visited;
    private static final int INF = Integer.MAX_VALUE;
    public static void main(String[] args) {
        int[] data = new int[]{0,1,2,3,4,5,6};// 7个顶点
        int[][] matrix = new int[][]{
                {INF, 5, 7, INF, INF, INF, 2},
                {5, INF, INF, 9, INF, INF, 3},
                {7, INF, INF, INF, 8, INF, INF},
                {INF, 9, INF, INF, INF, 4, INF},
                {INF, INF, 8, INF, INF, 5, 4},
                {INF, INF, INF, 4, 5, INF, 6},
                {2, 3, INF, INF, 4, 6, INF}
        };
        Dijkstra2 d = new Dijkstra2(data, matrix, 0);
        System.out.println(d.dictTo(1));
        System.out.println(d.dictTo(2));
        System.out.println(d.dictTo(3));
        System.out.println(d.dictTo(4));
        System.out.println(d.dictTo(5));
    }
    public int dictTo(int w) {
        if(w >=0 && w < data.length) {
            return dist[w];
        }
        throw new IllegalArgumentException("illegal index");
    }
    public Dijkstra2(int[] data, int[][] matrix, int s) {
        this.data = data;
        this.matrix = matrix;
        this.s = s;
        int v = data.length;
        visited = new boolean[v];
        // 构造一个最小堆
        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.add(new Node(s, 0));
        dist = new int[v];
        Arrays.fill(dist, INF);
        dist[s] = 0;// 源点距离初始化为0
        while(!pq.isEmpty()) {
            int curr = pq.remove().w;
            if(visited[curr]) {
                continue;
            }
            visited[curr] = true;
            for (int i = 0; i < v; i++) {
                if(!visited[i]) {
                    // 必须先判断是不是正无穷再做加法，否则会出现溢出
                    if(matrix[curr][i] != INF && dist[curr] + matrix[curr][i] < dist[i]) {
                        dist[i] = dist[curr] + matrix[curr][i];
                        pq.add(new Node(i, dist[i]));
                    }
                }
            }
        }
    }
}

```

两种的时间复杂度分别是O(V*V)和O(ElogV))

### Bellman-Ford算法

我们上面已经讨论了Dijkstra算法求单源最短路径，但是Dijkstra不能求有负权边的图的单源最短路径， Bellman-Ford算法可以，Bellman-Ford算法也比Dijkstra算法简单，但是时间复杂度是O(VE), 高于Dijkstra(时间复杂度是O(V^2,如果采用优先队列，复杂度是O((ElogV))

算法描述

输入：图和源点
输出：从源点到其他顶点的最短路径，如图中存在负权环，最短路径无法计算

**1)** 创建一个大小为V(V是图的顶点数量）的dist数组，初始化源点到其他顶点的距离为正无穷，源点自身距离为0.

**2)** 这一步计算最短路径. 下面的步骤重复V-1次
…..**a)** 对每一条边 u-v，u是起点，v是终点，如果dist[v] > dist[u] + weight(u,v), 更新dist[v]= dist[u] + weight (u,v)，这个过程叫作松弛

**3)** 检测图中是否存在负权环.  对每一条边 u-v
……如果dist[v] > dist[u] + weight(u,v),说明图中存在负权环
这一步的原理是第二步已经保证了不包含负权环的情况下，源点到其他顶点的最短路径， 如果我们再把所有的边松弛一次, 对任一顶点还存在更短的距离，说明存在负权环

![image-20200521125727572](./images/bellman-ford.jpg)

```java
class Graph {
    class Edge {
        int src, dest, weight;
        Edge()
        {
            src = dest = weight = 0;
        }
    }

    int V, E;
    Edge[] edge;

    // Creates a graph with V vertices and E edges
    Graph(int v, int e)
    {
        V = v;
        E = e;
        edge = new Edge[e];
        for (int i = 0; i < e; ++i)
            edge[i] = new Edge();
    }
}
public class BellmanFord {

    public BellmanFord(Graph graph, int src) {
        int V = graph.V, E = graph.E;
        int[] dist = new int[V];

        // Step 1: 初始化源点到其他顶点的距离为正无穷
        for (int i = 0; i < V; ++i)
            dist[i] = Integer.MAX_VALUE;
        dist[src] = 0;

        // Step 2: 所有边松弛 V - 1 次. 
        // 源点到其他顶点的某个顶点的路径最多包含V - 1条边
        for (int i = 1; i < V; ++i) {
            for (int j = 0; j < E; ++j) {
                int u = graph.edge[j].src;
                int v = graph.edge[j].dest;
                int weight = graph.edge[j].weight;
                if (dist[u] != Integer.MAX_VALUE && dist[u] + weight < dist[v])
                    dist[v] = dist[u] + weight;
            }
        }

        // Step 3: 检测所有的负权环. 
        // 上面的步骤已经求出了不包含负权环的情况下，源点到其他顶点的最短路径. 
        // 如果我们得到了更短路径，说明有负权环
        for (int j = 0; j < E; ++j) {
            int u = graph.edge[j].src;
            int v = graph.edge[j].dest;
            int weight = graph.edge[j].weight;
            if (dist[u] != Integer.MAX_VALUE && dist[u] + weight < dist[v]) {
                System.out.println("Graph contains negative weight cycle");
                return;
            }
        }
        printArr(dist, V);
    }
    void printArr(int dist[], int V)
    {
        System.out.println("Vertex Distance from Source");
        for (int i = 0; i < V; ++i)
            System.out.println(i + "\t\t" + dist[i]);
    }
    // 测试
    public static void main(String[] args)
    {
        int V = 5; // 图的顶点数量
        int E = 8; // 图的边的数量

        Graph graph = new Graph(V, E);

        // 添加边0-1 (or A-B)
        graph.edge[0].src = 0;
        graph.edge[0].dest = 1;
        graph.edge[0].weight = -1;

        // 添加边0-2 (or A-C)
        graph.edge[1].src = 0;
        graph.edge[1].dest = 2;
        graph.edge[1].weight = 4;

        // 添加边1-2 (or B-C)
        graph.edge[2].src = 1;
        graph.edge[2].dest = 2;
        graph.edge[2].weight = 3;

        // 添加边1-3 (or B-D)
        graph.edge[3].src = 1;
        graph.edge[3].dest = 3;
        graph.edge[3].weight = 2;

        // 添加边1-4 (or A-E)
        graph.edge[4].src = 1;
        graph.edge[4].dest = 4;
        graph.edge[4].weight = 2;

        // 添加边3-2 (or D-C )
        graph.edge[5].src = 3;
        graph.edge[5].dest = 2;
        graph.edge[5].weight = 5;

        // 添加边3-1 (or D-B)
        graph.edge[6].src = 3;
        graph.edge[6].dest = 1;
        graph.edge[6].weight = 1;

        // 添加边4-3 (or E-D)
        graph.edge[7].src = 4;
        graph.edge[7].dest = 3;
        graph.edge[7].weight = -3;
        BellmanFord bf = new BellmanFord(graph, 0);
    }
```

## 所有点对最短路径

### Floyd算法

Floyd算法用来解决图中所有点对的最短距离

时间复杂度O(V^3)

```java
public class Floyed {
    static final int INF = Integer.MAX_VALUE;
    int V;
    public static void main(String[] args) {
        int[][] graph = {
                {0, 5, INF, 10},
                {INF, 0, 3, INF},
                {INF, INF, 0, 1},
                {INF, INF, INF, 0}};
        /*
              10
       (0)------->(3)
        |         /|\
      5 |          |
        |          | 1
       \|/         |
       (1)------->(2)
            3
         */
        Floyed F = new Floyed(graph);
    }

    public Floyed(int[][] graph) {
        V = graph.length;
        int[][] dist = new int[V][V];
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                dist[i][j] = graph[i][j];
            }
        }
        // 外层循环是每个点
        for (int k = 0; k < V; k++) {
            // 内层两轮循环是点对（i，j)
            for (int i = 0; i < V; i++) {
                for (int j = 0; j < V; j++) {
                    // 注意溢出
                    if (dist[i][k] != INF && dist[k][j] !=INF && dist[i][k] + dist[k][j] < dist[i][j])
                        dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
        // 检测负权环
        for (int i = 0; i < V; i++) {
            if(dist[i][i] < 0) {
                System.out.println("negative cycle");
            }
        }
        printSolution(dist);
    }
    void printSolution(int dist[][])
    {
        System.out.println("The following matrix shows the shortest "+
                "distances between every pair of vertices");
        for (int i=0; i<V; ++i)
        {
            for (int j=0; j<V; ++j)
            {
                if (dist[i][j]==INF)
                    System.out.print("INF ");
                else
                    System.out.print(dist[i][j]+"   ");
            }
            System.out.println();
        }
    }
}
```





## 二分查找

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

## 动态规划(DP)

斐波那契数列

1. 递归法（自顶向下） 时间复杂度 o(2^n)
2. 备忘录 o(n)，空间复杂度O(n)
3. 动态规划（自底向上递推）

### leetCode

+ [爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)
+ [不同路径](https://leetcode-cn.com/problems/unique-paths/)
+ [打家劫舍](https://leetcode-cn.com/problems/house-robber/)
+ [最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/)
+ [股票买卖](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

+ [使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)
+ [编辑距离](https://leetcode-cn.com/problems/edit-distance/)
+ https://leetcode-cn.com/problems/longest-increasing-subsequence/
+ https://leetcode-cn.com/problems/decode-ways/
+ https://leetcode-cn.com/problems/longest-valid-parentheses/
+ https://leetcode-cn.com/problems/maximal-rectangle/
+ https://leetcode-cn.com/problems/distinct-subsequences/
+ https://leetcode-cn.com/problems/race-car/

## 字典树（Trie) 并查集

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

## AVL树和红黑树

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
## 位运算

位运算的运用

![](https://user-gold-cdn.xitu.io/2020/2/17/17053ae90aa0eb91?w=689&h=274&f=png&s=37483)

![](https://user-gold-cdn.xitu.io/2020/2/17/17053af578402b01?w=697&h=348&f=png&s=63491)

![](https://user-gold-cdn.xitu.io/2020/2/17/17053b0f8aef1af5?w=602&h=399&f=png&s=89029)

![](https://user-gold-cdn.xitu.io/2020/2/17/17053b46caa5e125?w=597&h=377&f=png&s=142199)

![](https://user-gold-cdn.xitu.io/2020/2/17/17053b4ee61a7766?w=597&h=381&f=png&s=109650)

题目：

+ [191 位1的个数](https://leetcode-cn.com/problems/number-of-1-bits/)

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



##  排序算法

#### 参考链接

- [十大经典排序算法](https://www.cnblogs.com/onepixel/p/7674659.html)
- [快速排序代码示例](https://shimo.im/docs/98KjvGwwGpTpYGKy/)
- [归并排序代码示例](https://shimo.im/docs/YqgG6vtdKwkXJkWx/)
- [堆排序代码示例](https://shimo.im/docs/6kRVHRphpgjHgCtx/)

- [十大经典排序算法](https://www.cnblogs.com/onepixel/p/7674659.html)
- [9 种经典排序算法可视化动画](https://www.bilibili.com/video/av25136272)
- [6 分钟看完 15 种排序算法动画展示](https://www.bilibili.com/video/av63851336)



![](https://user-gold-cdn.xitu.io/2020/2/18/17057ea82cfe85c2?w=569&h=425&f=png&s=166614)
![](https://user-gold-cdn.xitu.io/2020/2/18/17057f02adb61465?w=1882&h=1272&f=png&s=195260)

### 1. 冒泡排序

#### 1.1 动画演示

![](https://user-gold-cdn.xitu.io/2020/2/18/17057f31097a1b0a?w=826&h=257&f=gif&s=466890)

#### 1.2 代码实现

javascript

```javascript
function bubbleSort(arr) {
      for(let i = 0; i < arr.length -1; i++) { // 外循环表示趟数 arr.length - 1次
            for(let j = 0; j < arr.length - i - 1; j++) { //内循环为每趟比较的次数，第i趟比较len-i次 
                if(arr[j] > arr[j+1]) {
                    let temp = arr[j+1];
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
}
```

java

```java
class BubbleSort {
    public static void bubbleSort(int[] arr) {
        for(int i = 0; i < arr.length -1; i++) {
            for(int j = 0; j < arr.length - i - 1; j++) {
                if(arr[j] > arr[j+1]) {
                    int temp = arr[j+1];
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    }
}
```

python

```python
def bubbleSort(arr):
    n = len(arr)
    for i in range(n-1):
        for j in range(n-i-1):
            if arr[j] > arr [j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
        
```

问题：数据的顺序排好之后，冒泡算法仍然会继续进行下一轮的比较，直到arr.length-1次，后面的比较没有意义的。

改进：设置标志位flag，如果发生了交换flag设置为true；如果没有交换就设置为false。　这样当一轮比较结束后如果flag仍为false，即：这一轮没有发生交换，说明数据的顺序已经排好，没有必要继续进行下去。

以Java为例

```java
public static void bubbleSort(int[] arr) {
    for(int i = 0; i < arr.length -1; i++) {
        boolean flag = false;
        for(int j = arr.length - 1; j > i; j--) {
            if(arr[j] > arr[j-1]) {
                flag = true;
                int temp = arr[j];
                arr[j] = arr[j-1];
                arr[j-1] = temp;
            }
        }
        if(!flag) {
            break;
        }
    }
}

```

### 2. 选择排序

>选择排序是一种简单直观的排序算法。它的工作原理是：第一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，然后再从剩余的未排序元素中寻找到最小（大）元素，然后放到已排序的序列的末尾。以此类推，直到全部待排序的数据元素的个数为零。选择排序是不稳定的排序方法。

```java
class SelectionSort{
    public static void selectionSort(int[] arr) {
        int minIndex = 0;
        for(int i = 0; i < arr.length - 1; i++) {
            minIndex = i;
            for(int j = i + 1; j < arr.length; j++) {
                if(arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex != i) {
               int tmp = arr[minIndex];
               arr[minIndex] = arr[i];
               arr[i] = tmp;
            }             
        }
    }
}
```

```javascript
function selectionSort(arr) {
    for(let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for(let j = i+1;j < arr.length; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if(i !== minIndex) {
            arr[i] = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = tmp;
            
        }
    }
}
```

### 3. 插入排序

```java
class InsertSort{
    public static void insertSort(int[] arr) {
        for(int i = 1; i < arr.length; i++) {
            for(int j = i; j>0 && arr[j] > arr[j-1];j--) {
                int temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
}
```

```javascript
function insertSort(arr) {
    // arr[0, i-1]有序，arr[i， n-1]无序
    for(let i = 1; i < arr.length; i++) {
        // 寻找arr[i]合适的插入位置，最多考察到j=1，也就是j=0
        for(let j = i; j > 0; j--) {
            if(arr[j] < arr[j-1]) {
                let temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
            } else {
                break;
            }
        }
    }
}
```

问题： 减少交换次数，只需要找到位置即可，不需要每次都交换
改进

```javascript
function insertSort2(arr) {
    // arr[0, i-1]有序，arr[i， n-1]无序
    for(let i = 1; i < arr.length; i++) {
        let e = arr[i];
        let j; //j 保存元素e应该插入的位置
        for(j = i; j > 0 && arr[j-1] > e; j--) {
            arr[j] = arr[j-1];
        }
        arr[j] = e;
    }
}
```

### 4. 归并排序

```java
public class MergeSort{
    public static void mergeSort(int[] arr, int l , int r) {
        if(l <= r) {
            int mid = (l + r) >> 1;
            mergeSor(arr, l, mid);
            mergeSor(arr, mid+1, r);
            merge(arr, l, mid, r);
    }
    private static void merge(arr, l, mid, r) {
        int[] temp = new int[r - l + 1];
        int k = 0;
        int i = l;
        int j = mid + 1;
        while(i <= mid && j <= r) {
          temp[k++] = arr[i] < arr[j] ? arr[i++]: arr[j++];  
        }
        while(i <= mid) {
            temp[k++] = arr[i++];
        }
        while(j <= r) {
            temp[k++] = arr[j++];
        }
        for(int p = 0; p < temp.length; p++) {
            arr[l+p] = temp[p];
        }
    }
}
```

### 5. 快速排序

```java
public class QuickSort {
    public static void quickSort(int[] arr) {
        
    }
    private int partition(int[] arr, int l, in r) {
        
    }
}
```

### 6. 堆排序

首先需要构造一个堆

### 7. 计数排序

>计数排序是一个非基于比较的[排序算法](https://baike.baidu.com/item/排序算法/5399605)，该算法于1954年由 Harold H. Seward 提出。它的优势在于在对一定范围内的整数排序时，它的复杂度为Ο(n+k)（其中k是整数的范围），快于任何比较排序算法。 [1] 当然这是一种牺牲空间换取时间的做法，而且当O(k)>O(n*log(n))的时候其效率反而不如基于比较的排序（基于比较的排序的时间复杂度在理论上的下限是O(n*log(n)), 如归并排序，堆排序）

## 字符串

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
