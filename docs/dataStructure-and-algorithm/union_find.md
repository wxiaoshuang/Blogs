# 并查集


查找  
    查找元素所在的集合，即根节点。
    
合并  
    将两个元素所在的集合合并为一个集合。
通常来说，合并之前，应先判断两个元素是否属于同一集合，这可用上面的“查找”操作实现。

```java
public class UF {
    // 第i个元素指向的节点
    private int[] parent;
    private int[] rank;

    public UF(int size) {
        parent = new int[size];
        rank = new int[size];
        for (int i = 0; i < size; i++) {
            parent[i] = i; // 初始化每一个节点是一个集合
            rank[i] = 1; // 每个集合的层次是1
        }
    }
    //  O(logh)
    public boolean isConnected(int p, int q) {
        validIndex(p);
        validIndex(q);
        return find(p) == find(q);

    }
    // O(logh)
    public void union(int p, int q) {
        int pRoot = find(p);
        int qRoot = find(q);
        if (pRoot == qRoot) {
            return;
        }
        // 合并的时候判断集合大小，树的高度小的合并到树的高度大的，避免树的层次过深
        if(rank[pRoot] < rank[qRoot]) {
            parent[pRoot] = qRoot;
        }
        else if(rank[pRoot] > rank[qRoot]) {
            parent[qRoot] = pRoot;
        } else {
            parent[qRoot] = pRoot;
            rank[pRoot]++;
        }
 
    }
    // 往上查找根节点的时候压缩路径
    private int find(int p) {
        validIndex(p);
        while(p != parent[p]) {
            parent[p] = parent[parent[p]]; // 路径压缩
            p = parent[p];
        }
        return p;
    }

    private void validIndex(int i) {
        if (i < 0 || i >= parent.length) {
            throw new IllegalArgumentException("out of bound");
        }
    }
}

```
