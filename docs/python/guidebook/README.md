# 环境安装
[python官网](https://www.python.org/)下载, 根据自己的操作系统选择对应的安装包，选3的版本,安装的时候需要勾选添加环境变量

**快速目录指南**
* [`数据类型`](/python/数据类型.md)
* [`函数`](/python/函数.md)

## 数据类型
`int`, `float`, `str`, `bool`, `list`, `tuple`,`set`, `dict`
### 数值
数值分整形(`int`),浮点型(`float`)，表示方式有四种，二进制，八进制，十进制，十六进制
```python
bi = 0b12 # 二进制
oc = 0o77 # 8进制
he = 0xa78 # 16进制
shi= 100
f = 1230.3434
```
判断数据类型 `type`和`isinstance`

```python
print(type(120))
print(type(123.09))
print(isinstance(123, int))
print(isinstance(123.09, float))
# 打印结果
# <class 'int'>
# <class 'float'>
# True
# True
```

进制之间的相互转换，python内置了进制的转换函数

`hex`转换为16进制  
`oct`转换为8进制  
`bin`转二进制  
`int`转换为十进制整数  


?> _复数：_  除了int和float类型，python还可以表示复数，用j或者J后缀表示虚数部分，如`5+6j`
### 字符串
字符串可以用单引号，双引号，三引号来表示
单引号和双引号的作用一样，但是如果单引号里面要包裹单引号，里面的单引号需要用反斜线转义`\'`，双引号同理
```python
a1 = 'let\'s go'
a1 = "let's go"
b1 = "be \"important\""
b2 = 'be "important"'

```
三引号可以表示多行
```
>>> """hello wolrd
... hello world
... hello world"""
'hello wolrd\nhello world\nhello world'
```
**当一个字符串前面加入一个r,代表是一个原始字符串，里面的\n \t等转义字符都会原样输出**

```python
>>> print('hello\nhelo\n') 
hello 
helo

>>> print(r'hello\nhelo\n') 
hello\nhelo\n
```
字符串的运算

拼接(+)和重复(*int)
```python
'a'+'b'   # 'ab'
'a'*3  # 'aaa'
```

截取

`someStr[begin:end:step]`从begin开始，到end结束，不包括end, 步长默认是1，
begin和end可以是负数，-1表示字符串最后一个字符，-2表示字符串倒数第二个字符，以此类推
begin为空表示从字符串开始截取，end为空表示一直截取到字符串末尾，
```python
str1 = 'hello world'
str[1] # 'e'
str1[1:2] # 'e'
str1[1:] # 'ello world'
str1[1:-5] # 'ello '
str1[-5:] # 'world'
str1[::2] # 'hlowrd'
```
### 布尔
布尔类型只有两个值`True`和`False`,`bool`可以将其他类型转换为布尔值

bool转换规则请牢记：对于其他类型，只有非空就是真，空就是假
```python
bool(0) # False
bool(10) # True
bool('')  # False
bool(' ') # True
bool([]) # False
bool([10]) # True
bool({}) # False
bool({1}) # True

```
### 列表
列表可以包含不同的元素类型，但是通常元素是相同类型的

```python
l1 = [12,34]
l2 = [12,'a', True]
# 嵌套列表
l3 = [[1,2],['a','b'],[True,12]
```
> 和字符串相同 (和其他内置的[序列](https://docs.python.org/3/glossary.html#term-sequence)类型相同), 列表可以索引和截取

列表重复(*int)，相加(l1 + l2)，追加(append), 删除(del)
```python
l = [10]
# 列表相乘
l*3 # [10,10,10]
# 列表相加
l + [40,50]  # l = [10,10,10,40,50]
l.append(20) # l= [10,10,10,40,50, 20]
# 删除元素
del l[0] # l = [10,10,40,50, 20]
# 删除list
del l
```
列表遍历`for in`

```python
l = [10,30,40]
for v in l:
    print(v)
```
列表长度`len(l)`
### 元祖
Python的元组与列表类似，不同之处在于元组的元素不能修改。

元组使用小括号，列表使用方括号。
```python
tup1 = ('physics', 'chemistry', 1997, 2000)
tup2 = (1, 2, 3, 4, 5 )
tup3 = ("a", "b", "c", "d")
# 创建空元组
tup = ()
```
!> **Important** 元组中只包含一个元素时，需要在元素后面添加逗号`tup1 = (50,)`

```python
tup1 = (12, 34.56)
tup2 = ('abc', 'xyz')
 
# 以下修改元组元素操作是非法的。
# tup1[0] = 100
 
# 创建一个新的元组
tup3 = tup1 + tup2
print tup3
```
元祖运算

| **Python 表达式**        | **结果**    |  **描述**  |
| :--------   | :-----   | :---- |
| len((1, 2, 3))               | 3                 |   计算元素个数    |
| (1, 2, 3) + (4, 5, 6)        | (1, 2, 3, 4, 5, 6)|   连接           |
| 3 in (1, 2, 3)               | True              |   元素是否存在    |
| for x in (1, 2, 3):  print x | 1 2 3             |   迭代           |
| min(1, 2, 3)                 | 1                 |   最小值          |
| max(1, 2, 3)                 | 3                 |   最大值         |
### 集合
```python
set1 = {1}
```
U+2753

!> 空集合的表示 `set({})`

集合运算

| **Python 表达式**        | **结果**    |  **描述**  |
| :--------   | :-----   | :---- |
| len({1, 2, 3})               | 3                 |   计算元素个数    |
| {1, 2, 3, 4} & {3, 4, 5, 6}   | { 3, 4}|   交集           |
| {1, 2, 3, 4} - {4, 5, 6}      | {1,2,3}            |   差集    |
| {1, 2, 3，4} \| {4, 5, 6}      | {1,2,3, 4, 5, 6}  |   并集    |
### 字典
> 字典是另一种可变容器模型，且可存储任意类型对象。

字典的每个键值 key=>value 对用冒号 : 分割，每个键值对之间用逗号 , 分割，整个字典包括在花括号 {} 中 ,格式如下所示
```
d = {key1 : value1, key2 : value2 }

```

**`字典操作`**

```python
d = {'name': 'hello', 'age': 20}
# key是否存在字典中
d.has_key('name') # true
#访问key
d['name']
d.get('name')
# 更新
d['age'] = 8
# 添加
d['School'] = "RUNOOB" 
# 删除
del d['name']  # 删除键是'name'的条目
d.clear()      # 清空字典所有条目
del dict       # 删除字典

```

python内置的字典方法

|**函数**        | **描述**    |
| :--------    | :-----  |
| dict.items() |    以列表返回可遍历的(键, 值) 元组数组          |
| dict.keys() |    以列表返回字典中的所有键        |
| dict.values() |    以列表返回字典中的所有值          |
| dict.pop(key[,default]) |    删除字典给定键 key 所对应的值，返回值为被删除的值。key值必须给出。 否则，返回default值。          |
| dict.popitem() |   返回并删除字典中的最后一对键和值。         |
| dict.has_key(key)|   如果键在字典dict里返回true，否则返回false          |
| 	dict.get(key, default=None)|   返回指定键的值，如果值不在字典中返回default值 |          |
| 	dict.copy()|  返回一个字典的浅复制 |

**`字典键的特性`**

字典值可以没有限制地取任何python对象，既可以是标准的对象，也可以是用户定义的，但键不行。

两个重要的点需要记住：

1）不允许同一个键出现两次。创建时如果同一个键被赋值两次，后一个值会被记住，如下实例：

实例
```python
dict = {'Name': 'Zara', 'Age': 7, 'Name': 'Manni'} 
 
print "dict['Name']: ", dict['Name']
以上实例输出结果：

dict['Name']:  Manni

```
2）键必须不可变，所以可以用数字，字符串或元组充当，所以用列表就不行，如下实例：
实例
```python
dict = {['Name']: 'Zara', 'Age': 7} 
 
print "dict['Name']: ", dict['Name']
以上实例输出结果：

Traceback (most recent call last):
  File "test.py", line 3, in <module>
    dict = {['Name']: 'Zara', 'Age': 7} 
TypeError: list objects are unhashable
```

!> _思考题：_ 'a' + 1`?   `True + 1`?    `True + 'a'`?

## 运算符

**算术运算符**

`+` `-` `*` `**` `\` `\\` `%`
```python
a= 1+4
b = 1-5
multiply = 2*4 #8
# 幂乘 **
m = 2**3 // 8
# 整除 向下取整
c = 5//2 # 2
c2 = -5 // 2 # -3
d = 5/2 # 2.5
# 取余 %
e = 5%2 # 1
```

**关系运算符**

`>`, `<` ,`>=` ,`<=` ,`==`, `!=`
关系运算符除了比较数值，还可以比较str，list, tuple, set和dict
```python
 1 > 0 # true
 (10,) > (1, 2, 4) # true
 
```
**位运算符**

变量 a 为 60，b 为 13，二进制格式如下：
```
a = 0011 1100

b = 0000 1101


a&b = 0000 1100

a|b = 0011 1101

a^b = 0011 0001

~a  = 1100 0011
```

| 运算符 | 描述 | 实例|
|:---------|:------|:-------|
| &	  |按位与运算符：参与运算的两个值,如果两个相应位都为1,则该位的结果为1,否则为0	| (a & b) 输出结果 12 ，二进制解释： 0000 1100 |
| \|	  |按位或运算符：只要对应的二个二进位有一个为1时，结果位就为1。	| (a \| b) 输出结果 61 ，二进制解释： 0011 1101 |
| ^	  |按位异或运算符：当两对应的二进位相异时，结果为1	| (a ^ b) 输出结果 49 ，二进制解释： 0011 0001|
| ~	  |按位取反运算符：对数据的每个二进制位取反,即把1变为0,把0变为1 。| \~x 类似于 -x-1	(~a ) 输出结果 -61 ，二进制解释： 1100 0011，在一个有符号二进制数的补码形式。|
| <<	  |左移动运算符：运算数的各二进位全部左移若干位，由 << 右边的数字指定了移动的位数，高位丢弃，低位补0。|a << 2 输出结果 240 ，二进制解释： 1111 0000|
|>>	  |右移动运算符：把">>"左边的运算数的各二进位全部右移若干位，>> 右边的数字指定了移动的位数 |	a >> 2 输出结果 15 ，二进制解释： 0000 1111  |

**逻辑运算符**

`and`, `or`, `not`， `and`和`or`具有短路特性

```python
 not 0 // True
 not 1 // False
 1 or 0  # 1
 0 or 1 # 0
 [1] or []  # [1]
 [] or {} # {}
 [] or {1} # {1}
 [] and {} # []
 [1] and [2] # [2]
 [1] and [] # []
```

**成员运算符**

`in`如果在指定的序列中找到值返回 True，否则返回 False。
`not in`如果在指定的序列中没有找到值返回 True，否则返回 False。

**身份运算符**

`is`是判断两个标识符是不是引用自一个对象
`is not` 是判断两个标识符是不是引用自不同对象
```python
# list, tuple, set, dict
t1 = (1, 2,3)
t2 = t1
t3 = t1[:]
t1 is t2 # True
t1 == t2 # True
t1 == t3 # True
t1 is t3 # False

# int float str
n1 = 10
n2 = 10
n3 = 20 
n1 is n2 # True
n1 is n3 # False
n1 == n2 # True
s1 = 'hello'
s2 = 'hello'
s1 == s2  # True
s1 is s2 # True
```
?> _Tips_: id() 函数用于获取对象内存地址

!> is 与 == 区别：
 is 用于判断两个变量引用对象是否为同一个(同一块内存空间)， == 用于判断引用变量的值是否相等。

### 运算符优先级

|运算符 |	描述|
| :--------    | :-----  |
|**	|指数 (最高优先级)|
|~ + -	 | 按位翻转, 一元加号和减号 (最后两个的方法名为 +@ 和 -@)|
|* / % // |	乘，除，取模和取整除
|+ -	      |加法减法|
|>> <<	   |右移，左移运算符|
|&	         |位 'AND'|
|^ \|        |	位运算符|
|<= < > >=   |	比较运算符|
|<> == !=    |	等于运算符|
|= %= /= //= -= += *= **= |	赋值运算符|
|`is` `is not`	 | 身份运算符|
|`in` `not in`	 | 成员运算符|
|`not` `and` `or`	 | 逻辑运算符|
## 语句
### 条件语句
`if-else`
```python
if 3 > 2:
   print(3)
else:
   print(2)
```
`if-elif-else`
```python
x = 10
if x < 0:
   print('x < 0')
elif x < 10:
   print("x < 10")
else:
   print("x >=10")
```

?> _Tips_ python没有`switch-case`语句

### 循环语句
```python
i = 1
while i < 10:   
    i += 1
    if i%2 > 0:     # 非双数时跳过输出
        continue
    print(i)         # 输出双数2、4、6、8、10
 
i = 1
while 1:             # 循环条件为1必定成立
    print(i)         # 输出1~10
    i += 1
    if i > 10:     # 当i大于10时跳出循环
        break
```
## 包 模块
> Python 模块(Module)，是一个Python文件，以 .py 结尾，包含了 Python 对象定义和Python语句

**`import 语句`**

模块定义好后，我们可以使用 import 语句来引入模块，语法如下：

```python
import module1[, module2[,... moduleN]]
```

比如要引用模块 math，就可以在文件最开始的地方用 import math 来引入。在调用 math 模块中的函数时，必须这样引用：

```模块名.函数名```

?> _Tips_ 一个模块只会被导入一次，不管你执行了多少次import。这样可以防止导入模块被一遍又一遍地执行。

**`from ...import 语句`**

Python 的 from 语句让你从模块中导入一个指定的部分到当前命名空间中。语法如下：

```python
from modname import name1[, name2[, ... nameN]]
```

例如，要导入模块 fib 的 fibonacci 函数，使用如下语句：

```python
from fib import fibonacci
```

这个声明不会把整个 fib 模块导入到当前的命名空间中，它只会将 fib 里的 fibonacci 单个引入到执行这个声明的模块的全局符号表

**`from…import* 语句`**

把一个模块的所有内容全都导入到当前的命名空间也是可行的，只需使用如下声明：

```python
from modname import *
```

这提供了一个简单的方法来导入一个模块中的所有项目。然而这种声明不该被过多地使用。

例如我们想一次性引入 math 模块中所有的东西，语句如下：

```python
from math import *
```
**`搜索路径`**

当你导入一个模块，Python 解析器对模块位置的搜索顺序是：

1. 当前目录
2. 如果不在当前目录，Python 则搜索在 shell 变量 PYTHONPATH 下的每个目录。
3. 如果都找不到，Python会察看默认路径。UNIX下，默认路径一般为/usr/local/lib/python/。
模块搜索路径存储在 system 模块的 sys.path 变量中。变量里包含当前目录，PYTHONPATH和由安装过程决定的默认目录
### 包

> 包是一个分层次的文件目录结构，它定义了一个由模块及子包，和子包下的子包等组成的 Python 的应用环境。

简单来说，包就是文件夹，但该文件夹下必须存在 `__init__.py` 文件, 该文件的内容可以为空。`__init__.py`用于标识当前文件夹是一个包。

考虑一个在 package_runoob 目录下的 runoob1.py、runoob2.py、`__init__.py` 文件，test.py 为测试调用包的代码，目录结构如下：

```
test.py
package_runoob
|-- __init__.py
|-- runoob1.py
|-- runoob2.py
```

`runoob1.py`

```python
def fn1:
    print('runoob1.py')

```
`runoob2.py`

```python
def fn1:
    print('runoob2.py')

```
test.py 来调用 package_runoob 包
```python
# 导入 Phone 包
from package_runoob.runoob1 import fn1
from package_runoob.runoob2 import fn2
 
fn1()
fn2()
```
?> **思考** `__init__.py`文件作用?

## 函数
### 定义函数
> 定义一个函数要使用def语句，依次写出函数名、括号、括号中的参数和冒号:，然后，在缩进块中编写函数体，函数的返回值用return语句返回
```python
def my_abs(x):
    if x >= 0:
        return x
    else:
        return -x
```
定义函数的时候，我们把参数的名字和位置确定下来，函数的接口定义就完成了。对于函数的调用者来说，只需要知道如何传递正确的参数，以及函数将返回什么样的值就够了，函数内部的复杂逻辑被封装起来，调用者无需了解。

Python的函数定义非常简单，但灵活度却非常大。除了正常定义的必选参数外，还可以使用默认参数、可变参数和关键字参数，使得函数定义出来的接口，不但能处理复杂的参数，还可以简化调用者的代码
```python
def power(x, n):
    s = 1
    while n > 0:
        n = n - 1
        s = s * x
    return s
```
### 默认参数
对于power函数，不传入第二个参数默认是2
```python
def power(x, n = 2):
    s = 1
    while n > 0:
        n = n - 1
        s = s * x
    return s
```
#### 多个默认参数

```python
def enroll(name, gender, age=6, city='Beijing'):
    print('name:', name)
    print('gender:', gender)
    print('age:', age)
    print('city:', city)
```
调用方法
1. 严格按照参数的定义顺序调用
```python
enroll('Alice', 'female', 10, 'Shanghai')
```
2. 默认参数可以不按照定义顺序，但是调用的时候需要提供参数名
```python
enroll('Bob', 'male', city="Wuhan", age=20)
```

默认参数很有用，但使用不当，也会掉坑里。默认参数有个最大的坑，演示如下：

先定义一个函数，传入一个list，添加一个END再返回：
```python
def add_end(L=[]):
    L.append('END')
    return L
```

当你正常调用时，结果似乎不错：
```python
>>> add_end([1, 2, 3])
[1, 2, 3, 'END']
>>> add_end(['x', 'y', 'z'])
['x', 'y', 'z', 'END']
```
当你使用默认参数调用时，一开始结果也是对的：
```python
>>> add_end()
['END']
```

但是，再次调用add_end()时，结果就不对了：
```python
>>> add_end()
['END', 'END']
>>> add_end()
['END', 'END', 'END']
```

很多初学者很疑惑，默认参数是[]，但是函数似乎每次都“记住了”上次添加了'END'后的list。

原因解释如下：

Python函数在定义的时候，默认参数L的值就被计算出来了，即[]，因为默认参数L也是一个变量，它指向对象[]，每次调用该函数，如果改变了L的内容，则下次调用时，默认参数的内容就变了，不再是函数定义时的[]了。

!>  定义默认参数要牢记一点：默认参数必须指向不变对象！

### 可变参数

可变参数就是传入的参数个数是可变的

以数学题为例子,定义一个求和函数sum

```python
def sum(*nums):
	res = 0
    for v in nums:
        res += v
    return res
```

调用方法

```python
nums = [10,230,30]
# 第一种调用方式
sum(nums[0], nums[1], nums[2])
# 第二种调用方式
sum(*nums) # *nums表示把nums这个list的所有元素作为可变参数传进去
```



### 关键字参数

> 可变参数允许你传入0个或任意个参数，这些可变参数在函数调用时自动组装为一个tuple。而关键字参数允许你传入0个或任意个含参数名的参数，这些关键字参数在函数内部自动组装为一个dict

```python
def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)
```

```python
>>> person('Alice', 20)
 name: Alice age: 20 other: {}
>>>person('Alice', 20, city="Beiging")
 name: Alice age: 20 other: {'city':'Beiging'}
>>>person('Alice', 20, city="Beiging", gender="female")
 name: Alice age: 20 other: {'city':'Beiging','gender':"female"}
```
关键字参数有什么用？它可以扩展函数的功能。比如，在person函数里，我们保证能接收到name和age这两个参数，但是，如果调用者愿意提供更多的参数，我们也能收到

上面复杂的调用可以用简化的写法：
```python
>>>extra={'city':'Beiging', 'gender':'female'}
>>>person('Alice', 20, **extra)
 name: Alice age: 20 other: {'city':'Beiging', 'gender':'female'}
```
\*\*extra表示把extra这个dict的所有key-value用关键字参数传入到函数的**kw参数，kw将获得一个dict，注意kw获得的dict是extra的一份拷贝，对kw的改动不会影响到函数外的extra



### 命名关键字参数

如果要限制关键字参数的名字，就可以用命名关键字参数，例如，只接收`city`和`gender`作为关键字参数。这种方式定义的函数如下：

```python
def person(name, age, *, city, gender)
    print(name, age, city, gender)
```

和关键字参数`**kw`不同，命名关键字参数需要一个特殊分隔符`*`，`*`后面的参数被视为命名关键字参数

调用方式如下：

```python
>>> person('Alice', 20, city='Beijing', gender='female')
Jack 20 Beijing Engineer
```

如果函数定义中已经有了一个可变参数，后面跟着的命名关键字参数就不再需要一个特殊分隔符`*`了：

```python
def person(name, age, *args, city, job):
    print(name, age, args, city, job)
```

**`命名关键字参数必须传入参数名`**

使用命名关键字参数时，要特别注意，如果没有可变参数，就必须加一个`*`作为特殊分隔符

### 参数组合

在Python中定义函数，可以用必选参数、默认参数、可变参数、关键字参数和命名关键字参数，这5种参数都可以组合使用。但是请注意，参数定义的顺序必须是：**必选参数、默认参数、可变参数、命名关键字参数和关键字参数**
