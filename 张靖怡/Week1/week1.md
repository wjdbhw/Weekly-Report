### 学习周报：Vue 基础（week1）

| 项目 | 内容 |
|---|---|
| 本周 | 搭建开发环境、掌握 Vue 实例核心选项与常用指令，完成第一个交互组件 |
| 主要完成内容 | 1. 使用 Vite 初始化项目<br>2. 掌握 MVVM 思想与响应式原理<br>3. 熟悉模板语法（插值、指令 v-bind / v-if / v-for / v-on）<br>4. 编写 TodoItem 组件，实现新增、删除、状态切换功能 |
| 语法 | 1. 挂载点：`el: '#app'` 指定 Vue 实例挂载的 DOM 元素<br>2. 响应式数据：`data() { return { msg: 'Hello VUE' } }`，任何修改自动同步到视图<br>3. 文本插值：`{{ }}`，如 `<span>{{ msg }}</span>`<br>4. 双向绑定：`v-model`，如 `<input v-model="msg">` 实时同步输入与数据<br>5. 事件绑定：`@click="handler"` 语法糖，等价于 `v-on:click` |
| 常用指令 | - 条件渲染：`v-if`（销毁/重建）、`v-show`（切换 display）<br>- 列表渲染：`v-for="(item, index) in list" :key="index"`<br>- 属性绑定：`v-bind:href="url"` 或简写 `:href="url"`<br>- 事件绑定：`v-on:click="do"` 或简写 `@click="do"` |
| 出错 | 1. 对“响应式丢失”理解不深，直接给数组索引赋值未更新视图 → 通过 `Vue.set` / `splice` 解决<br>2. 样式作用域污染 → 使用 `<style scoped>` 限定 |
| 总结 | Vue 用途：声明式渲染极大降低了 DOM 操作成本；组件化思维让代码更易复用；官方文档示例清晰，可以边读边用。 |
