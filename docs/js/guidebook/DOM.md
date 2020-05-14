
# 什么是DOM
> DOM 是一项 W3C (World Wide Web Consortium) 标准。
  DOM 定义了访问文档的标准

DOM可以将任何HTML或XML文档描绘成一个由多层节点构成
的结构
## 节点Node
JavaScript中的所有节点类型都继承自Node
类型，因此所有节点类型都共享着相同的基本属性和方法。
每个节点都有一个nodeType属性，用于表明节点的类型
有12种节点类型，但不是所有的浏览器都支持

元素节点，也叫标签节点         nodeType = 1

文本几点                                    nodeType = 3

注释节点                                    nodeType = 8

### NodeList   v.s. HTMLCollection 

1. 包含节点的类型不同(重要)

> (1) NodeList
> 一个节点的集合，既可以包含元素和其他非元素节点(注释节点、文本节点等)。
> (2) HTMLCollection
> 元素集合, 只有元素Element

2. 使用方法

相同点：

1） 都是类数组，都有length属性

2） 都有元素的getter，叫做item，可以传入索引值取得元素。

不同点：

HTMLCollection还有一个nameItem()方法，可以返回集合中name属性和id属性值的元素

**常用的就是元素和文本节点**

以下面的代码来看看节点常用的属性和方法

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="box">hello<!--注释节点--></div>
<div></div>
<script>
    let elementNode = document.getElementById('box')
    let children = box.children // 伪数组
    let childNodes = box.childNodes // 伪数组
    let textNode = childNodes[0]
    let commentNode = childNodes.item(1)
</script>
</body>
</html>

```

|                | 元素节点   elementNode                            | 文本节点textNode     | 注释节点commentNode  |
| -------------- | ------------------------------------------------- | -------------------- | -------------------- |
| nodeType       | 1                                                 | 3                    | 8                    |
| nodeName       | 'DIV'                                             | '#text'              | '#comment'           |
| nodeValue      | null                                              | 'hello'              | '这是注释‘           |
| textContent    | 'hello'                                           | 'hello'              | '这是注释‘           |
| tagName        | 'div'                                             | N/A                  | N/A                  |
| localName      | 'div'                                             | N/A                  | N/A                  |
| parentNode     | body                                              | elementNode          | elementNode          |
| parentElement  | body                                              | elementNode          | elementNode          |
| children       | HTMLCollection {length: 0}                        | N/A                  | N/A                  |
| childNodes     | NodeList {0: textNode, 1 : commentNode,length: 2} | NodeList {length: 0} | NodeList {length: 0} |
| fistChild      | textNode                                          | null                 | null                 |
| lastChild      | commentNode                                       | null                 | null                 |
| previousSibing | null                                              | null                 | textNode             |
| nextSibing     | null                                              | commentNode          | null                 |





### 节点属性

```javascript
// 获取节点属性getAttribute
imgNode.getAttribute('src')
// 设置节点属性setAttribute
imgNode.setAttribute('src', 'ulr...')
```



### 节点关系

树形结构

![image-20200327112758510](G:\relearn front-end\js\images\node.png)

# 节点操作API


## 查找节点
document.getElementById ：根据ID查找元素，大小写敏感，如果有多个结果，只返回第一个元素；

document.getElementsByClassName ：根据类名查找元素，多个类名（’parent child')用空格分隔，返回一个 HTMLCollection 

document.getElementsByTagName ：根据标签查找元素， * 表示查询所有标签，返回一个 HTMLCollection 。

document.querySelector ：返回单个Node，如果匹配到多个结果，只返回第一个。

document.querySelectorAll ：返回一个NodeList。

document.forms ：获取当前页面所有form，返回一个 HTMLCollection 


## 节点属性
```javascript
let img = document.querySelector('img')
img.setAttribute('src', 'xxxx')
img.style.width = '100px'
let p = document.querySelector('p')
p.innerHTML = '<span>嵌套一个span</span>'
```
### classList属性

```html
<div class="class1 class2"></div>
<script >
let dom = document.querySelector('.class1.class2')
dom.classList.contains('class1')
dom.classList.remove('class1')
dom.classList.add('class3')
dom.classList.toggle('class3')
</script>
```



### data属性

## 创建和删除

```javascript
let div = document.createElement("div");// 创建元素节点
let textNode = document.createTextNode("创建一个文本节点");// 创建文本节点
let comment = document.createComment('创建评论节点') // 创建注释节点
document.body.appendChild(div)
```

## 元素遍历

children:  获取所有的子元素集合 ，childNodes的元素版

childElementCount：返回子元素（不包括文本节点和注释）的个数。

firstElementChild：指向第一个子元素；firstChild的元素版。

lastElementChild：指向最后一个子元素；lastChild的元素版。

previousElementSibling：指向前一个同辈元素；previousSibling的元素版。

nextElementSibling：指向后一个同辈元素；nextSibling的元素版。
