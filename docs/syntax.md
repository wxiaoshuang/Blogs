# Tabs
<!-- tabs:start -->

### **js**

```js
var a = 111
```

### **typescript**

```typescript
let a: number = 111
```

<!-- tabs:end -->
# Vue demo

<div id="main">hello {{ msg }}</div>

<script>
  new Vue({
    el: '#main',
    data: { msg: 'Vue' }
  })
</script>

# Vuep

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">
  <template>
    <div>Hello, {{ name }}!</div>
  </template>

  <script>
    module.exports = {
      data: function () {
        return { name: 'Vue' }
      }
    }
  </script>
</script>

<details>
  <summary>images <small>(memorable)</small></summary>

   <div>hihi</div>
</details>

# Tips

?> _TODO_ unit test

!> **Important** is money, my friend!
