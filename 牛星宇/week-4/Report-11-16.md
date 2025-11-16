# C++图论核心算法学习笔记周报

**报告周期**：2025年11月10日 - 2025年11月16日

**学习主题**：图论基础之最小生成树（MST）与最短路径算法

**学习目标**：掌握两种核心最小生成树算法（Prim、Kruskal）及两种经典最短路径算法（Dijkstra、Floyd）的原理、C++实现及适用场景，能够根据问题特征选择合适算法解决实际问题。

## 一、本周知识梳理

本周聚焦图论中两类高频算法，核心围绕“无向图的最小连通代价”（最小生成树）与“有向/无向图的节点间最优路径”（最短路径）展开，现将关键知识点整理如下：

### 1. 图的基础表示（C++实现）

算法实现的前提是图的有效存储，本周重点掌握两种主流表示方式：

- **邻接矩阵**：用二维数组`graph[n][n]`表示，其中`graph[i][j]`代表节点i到j的边权（无边时设为无穷大，自身设为0）。优点是访问边权速度快（O(1)），缺点是空间复杂度O(n²)，适用于稠密图。

- **邻接表**：用vector嵌套结构体实现，如`vector<pair<int, int>> adj[n]`，其中adj[i]存储节点i的所有邻接节点（first为邻接节点编号，second为边权）。优点是空间复杂度O(n+e)（e为边数），适用于稀疏图，是算法实现的常用方式。

### 2. 最小生成树（MST）

核心定义：对于含n个节点的连通无向图，选择n-1条边构成连通子图，且边权之和最小，该子图即为最小生成树（无环、连通、边权和最小）。

#### 2.1 Prim算法（普里姆算法）

- **核心思想**：“贪心+加点”——从任意起点出发，每次选择“已选节点集合”与“未选节点集合”之间权值最小的边，将对应未选节点加入已选集合，直至所有节点都被加入。

- **关键数组**：
        `lowcost[]`：记录未选节点到已选集合的最小边权（初始为起点到各节点的边权，起点lowcost设为0）；

- `visited[]`：标记节点是否已加入生成树。

**时间复杂度**：邻接矩阵实现O(n²)（适合稠密图），邻接表+优先队列优化O(e log n)（适合稀疏图）。

#### 2.2 Kruskal算法（克鲁斯卡尔算法）

- **核心思想**：“贪心+加边”——将所有边按权值从小到大排序，依次选边，若该边连接的两个节点不在同一连通分量中，则加入生成树，直至选够n-1条边。

- **关键技术**：并查集（Disjoint Set Union, DSU）——用于快速判断节点是否连通及合并连通分量，避免生成环。

- **并查集操作**：
        `find(x)`：查找x的根节点（路径压缩优化）；

- `union(x,y)`：将x和y所在集合合并（按秩/大小优化）。

**时间复杂度**：O(e log e)（主要耗时在边排序，适合稀疏图）。

#### 2.3 两种算法对比

|对比维度|Prim算法|Kruskal算法|
|---|---|---|
|核心策略|加点法，聚焦节点|加边法，聚焦边|
|适合图类型|稠密图（边多节点少）|稀疏图（边少节点多）|
|依赖数据结构|邻接矩阵/邻接表+优先队列|边集合+并查集|
### 3. 最短路径算法

核心定义：在带权图中，找到从起点（单源）或任意两点（多源）之间边权之和最小的路径（路径可含多个节点，边权可正不可负，Dijkstra不支持负权边）。

#### 3.1 Dijkstra算法（单源最短路径）

- **核心思想**：“贪心+加点”——从起点出发，每次选择“已确定最短路径的节点集合”到“未确定节点”中权值最小的边对应的节点，更新该节点的最短路径，直至所有节点都被处理。

- **关键数组**：
        `dist[]`：记录起点到各节点的最短路径长度（初始为起点到各节点的边权，起点dist设为0，其他为无穷大）；

- `visited[]`：标记节点是否已确定最短路径。

**优化方式**：邻接表+优先队列（小根堆），将时间复杂度从O(n²)降至O(e log n)，避免每次遍历寻找最小dist节点。

**注意事项**：不支持含负权边的图，因为负权边可能导致已确定的最短路径被后续更短路径覆盖。

#### 3.2 Floyd算法（多源最短路径）

- **核心思想**：“动态规划+插点”——通过中间节点优化任意两点间的最短路径，即对于节点i和j，若存在中间节点k使得i→k→j的路径比i→j更短，则更新i到j的最短路径。

- **关键矩阵**：用二维数组`dist[n][n]`表示，其中dist[i][j]为节点i到j的最短路径长度（初始为邻接矩阵，自身为0，无边为无穷大）。

- **核心递推式**：`dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`（k从1到n遍历所有中间节点）。

- **时间复杂度**：O(n³)，空间复杂度O(n²)，逻辑简单但效率较低，适用于节点数较少（n≤100）的场景。

- **优势**：可处理含负权边的图（但不能有负权环），且能一次性求出所有节点对的最短路径。

#### 3.3 两种算法对比

|对比维度|Dijkstra算法|Floyd算法|
|---|---|---|
|适用场景|单源最短路径（一个起点）|多源最短路径（所有节点对）|
|时间复杂度|优化后O(e log n)|O(n³)|
|负权边支持|不支持|支持（无负权环）|
|实现复杂度|中等（需掌握优先队列优化）|简单（三重循环即可）|
## 二、核心代码实现（C++）

### 1. 并查集（Kruskal依赖）

```cpp

#include <vector>
using namespace std;

class DSU {
private:
    vector<int> parent;  // 父节点
    vector<int> rank;     // 秩（用于优化合并）
public:
    // 初始化
    DSU(int n) {
        parent.resize(n);
        rank.resize(n, 1);
        for (int i = 0; i < n; ++i) {
            parent[i] = i;  // 每个节点初始父节点是自身
        }
    }
    
    // 查找根节点（路径压缩）
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // 递归压缩路径
        }
        return parent[x];
    }
    
    // 合并两个集合（按秩合并）
    bool unite(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if (rootX == rootY) return false;  // 已在同一集合
        // 秩小的树合并到秩大的树
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else {
            parent[rootY] = rootX;
            if (rank[rootX] == rank[rootY]) {
                rank[rootX]++;
            }
        }
        return true;
    }
};
```

### 2. Kruskal算法（最小生成树）

```cpp

#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

struct Edge {
    int u, v, w;  // 边的两个端点和权值
    // 排序规则：按权值从小到大
    bool operator<(const Edge& other) const {
        return w < other.w;
    }
};

// n：节点数，edges：所有边的集合
int kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());  // 边按权值排序
    DSU dsu(n);
    int mstSum = 0;  // 最小生成树的边权和
    int edgeCount = 0;  // 已选边数
    
    for (auto& e : edges) {
        if (dsu.unite(e.u, e.v)) {  // 不在同一集合，加入生成树
            mstSum += e.w;
            edgeCount++;
            if (edgeCount == n - 1) break;  // 选够n-1条边，退出
        }
    }
    // 若边数不足n-1，说明图不连通
    return edgeCount == n - 1 ? mstSum : -1;
}
```

### 3. 优化版Dijkstra（邻接表+优先队列）

```cpp

#include <vector>
#include <queue>
#include <climits>
#include <iostream>
using namespace std;

const int INF = INT_MAX;

// n：节点数，start：起点，adj：邻接表
vector<int> dijkstra(int n, int start, vector<vector<pair<int, int>>>& adj) {
    vector<int> dist(n, INF);  // 起点到各节点的最短距离
    dist[start] = 0;
    // 优先队列：小根堆，存储（当前距离，节点编号）
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [curDist, u] = pq.top();
        pq.pop();
        
        // 若当前距离大于已记录的最短距离，跳过（冗余节点）
        if (curDist > dist[u]) continue;
        
        // 遍历u的所有邻接节点
        for (auto& [v, w] : adj[u]) {
            if (dist[v] > dist[u] + w) {  // 发现更短路径
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```

### 4. Floyd算法（多源最短路径）

```cpp

#include <vector>
#include <climits>
using namespace std;

const int INF = INT_MAX;

// n：节点数，dist：初始邻接矩阵，返回更新后的最短路径矩阵
vector<vector<int>> floyd(int n, vector<vector<int>> dist) {
    // 插点k：遍历所有中间节点
    for (int k = 0; k < n; ++k) {
        // 起点i
        for (int i = 0; i < n; ++i) {
            // 终点j
            for (int j = 0; j < n; ++j) {
                // 若i到k或k到j不可达，跳过
                if (dist[i][k] == INF || dist[k][j] == INF) continue;
                // 更新i到j的最短路径
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return dist;
}
```

## 三、典型例题与解题思路

### 1. 最小生成树例题：畅通工程

**题目描述**：某省调查乡村交通状况，得到现有道路的统计数据，要求修通道路使全省任意两个村庄都可以连通（可以间接连通），求最少需要投入的资金（道路修建费用即边权）。

**解题思路**：此题为最小生成树模板题，乡村为节点，道路为边，费用为边权，核心是求连通图的最小生成树边权和。

**算法选择**：若道路数量少（稀疏图），选Kruskal算法；若村庄数量少（稠密图），选Prim算法。此处用Kruskal更高效，步骤如下：

1. 读取村庄数n和道路数e，存储所有道路的起点、终点和费用；

2. 调用Kruskal算法，计算最小生成树的费用和；

3. 若返回-1，说明图不连通（需额外处理），否则输出费用和。

### 2. 最短路径例题：最短路问题

**题目描述**：给定有向图，求从起点A到终点B的最短路径长度，若不可达输出-1。

**解题思路**：单源最短路径问题，若边权均为正，用Dijkstra算法；若含负权边，用Bellman-Ford或SPFA算法。此处假设边权为正。

**算法选择**：邻接表+优先队列优化的Dijkstra算法，步骤如下：

1. 用邻接表存储有向图；

2. 调用Dijkstra算法，得到起点到所有节点的最短距离；

3. 若终点距离为INF，输出-1，否则输出距离。

