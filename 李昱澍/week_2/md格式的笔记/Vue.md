 观看1-70节。  （后续 ：根据⾃⼰进度再巩固巩固  ）尚硅⾕Vue3⼊⻔到实战，最新版vue3+TypeScript前端开发教程_哔哩哔哩_bilibili 

（我只学过vue2和⼀点点vue3），所以不知道这个直接学vue3的课程难度⼤不⼤，如果觉得不好入手可以先补⼀下vue2的基础。（滑跪）

前端知识点⽐较繁杂，更需要⼤家灵活学习

vue其他资料： 

掘⾦地址：https://juejin.cn/post/6955129410705948702

Vue.js官⽹：https://v3.cn.vuejs.org/

bilibili地址：https://www.bilibili.com/video/BV1Zy4y1K7SH

MDN地址：https://developer.mozilla.org/zh-CN/

ES6地址：https://es6.ruanyifeng.com/

⼩兔鲜  
  
⿊⻢程序员前端Vue3⼩兔鲜电商项⽬-vue3全家桶从⼊⻔到实战电商项⽬  
这两周做这个项⽬（可换）。可以⾃⼰选项⽬做，选项⽬主要关注⼏个⽅⾯：技术栈（vue3为主）、资料是否完善、评价、两周能否做完

[https://pan.baidu.com/s/1XkRekjE0vEAJm6UZMgnWNA&pwd=1234](https://pan.baidu.com/s/1XkRekjE0vEAJm6UZMgnWNA&pwd=1234)

<font style="color:rgb(51, 51, 51);">在template里面写html，methods的生命周期里写常用的函数，style里写css，外部的import导入就行</font>

## （一）Vue2基础核心
### 一、基础概念
1. **Vue定义**：用于构建用户界面的渐进式框架，核心是“数据驱动视图”——基于数据动态渲染页面，无需手动操作DOM。
2. **两种使用方式**
    - 核心包开发：引入Vue核心包，适合局部模块改造（如单个组件优化）。
    - 工程化开发：结合Vue插件（Vue Router、Vuex），适合整站开发（如电商网站、管理系统）。
3. **创建Vue实例（初始化渲染）**核心4步

```html
<!-- 1. 准备容器（挂载点） -->
<div id="app">{{ msg }}</div>
<!-- 2. 引入Vue核心包（开发版，含调试信息） -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.10/dist/vue.js"></script>
<script>
  // 3. 创建Vue实例 + 4. 配置核心选项
  const app = new Vue({
    el: "#app", // 绑定挂载点（选择器，控制指定DOM）
    data: {
      msg: "Hello Vue" // 提供渲染数据（响应式）
    }
  })
</script>

```

### 二、模板语法与核心特性
1. **插值表达式 **`{{ }}`
2. 作用：通过表达式渲染数据，支持简单计算、三元判断、属性访问等（如`{{ age >= 18 ? '成年' : '未成年' }}`、`{{ obj.name }}`）。
3. 注意事项：
    - 数据必须在`data`中定义，否则报错；
    - 支持“表达式”（可求值的代码），不支持“语句”（如if、for循环）；
    - 不能用于标签属性（如`<p title="{{ username }}">`错误，需用`v-bind`）。
4. **响应式特性**
5. 定义：数据变化时，视图自动更新，开发只需专注于修改数据，无需操作DOM。
6. 数据操作：
    - 访问：`实例.属性名`（如`app.msg`）；
    - 修改：`实例.属性名 = 新值`（如`app.msg = "新内容"`，修改后视图自动更新）。
7. **Vue开发者工具**：
8. 安装：通过谷歌扩展商店或“极简插件”下载，开启“允许访问文件网址”权限。
9. 用途：实时查看Vue实例的`data`、`methods`等，可直接修改数据调试视图。

### 三、核心指令
1. **指令**：带有`v-`前缀的特殊标签属性，用于实现DOM操作、数据绑定、条件渲染等功能。
2. **常用指令**

| 指令 | 作用 | 关键示例与说明 |
| --- | --- | --- |
| `v-html` | 设置元素innerHTML（解析HTML标签） | `<div v-html="str"></div>`，`str: '<strong>加粗文本</strong>'`（避免渲染不可信内容） |
| `v-show` | 控制元素显示隐藏（切换`display`） | `<div v-show="isShow"></div>`，`isShow: true`显示，`false`隐藏（适合频繁切换） |
| `v-if`/`v-else` | 条件渲染（创建/移除DOM元素） | `<div v-if="score >= 60">及格</div><div v-else>不及格</div>`（适合不频繁切换） |
| `v-on` | 绑定事件（简写`@`） | `<button @click="fn">点击</button>`，支持传参（`@click="fn(10)"`），`this`指向Vue实例 |
| `v-bind` | 动态设置标签属性（简写`:`） | `<img :src="imgUrl" :class="{ active: isActive }"` |
| `v-for` | 循环渲染元素 | `<li v-for="(item, index) in list" :key="item.id">{{ item.name }}</li>`，`key`需唯一 |
| `v-model` | 表单双向绑定（数据↔视图同步） | `<input v-model="username">`，支持input、textarea、select等表单元素 |


### 四、指令补充
1. **指令修饰符**：通过“.”添加后缀，简化常见操作：
2. 按键修饰符：`@keyup.enter`（按下回车键触发）、`@keyup.esc`（按下ESC键触发）；
3. `v-model`修饰符：`v-model.trim`（去除输入首尾空格）、`v-model.number`（将输入转为数字）；
4. 事件修饰符：`@click.stop`（阻止事件冒泡）、`@submit.prevent`（阻止表单默认提交）、`@click.once`（事件只触发一次）。
2. `v-bind`**操作样式**：
+ 操作class：
    - 对象语法：`<div :class="{ active: isActive, pink: isPink }"></div>`（类名是否添加由布尔值决定）；
    - 数组语法：`<div :class="[ 'big', { active: isActive } ]"></div>`（批量添加类名）；
+ 操作style：`<div :style="{ width: '200px', height: '100px', backgroundColor: 'pink' }"></div>`（CSS属性用小驼峰）。
3. `v-model`**适配多表单元素**：
+ 复选框：
    - 单个（单选）：`v-model`绑定布尔值（`checked: false`）；
    - 多个（多选）：`v-model`绑定数组（`hobbies: []`），`value`为数组元素；
+ 单选框：`v-model`绑定相同变量（`gender: 'male'`），`value`指定选项值；
+ 下拉框：`v-model`绑定选中项的`value`（`city: 'beijing'`）。

### 五、计算属性与侦听器
1. **计算属性（computed）**：
2. 作用：基于现有数据计算新属性，依赖数据变化时自动重新计算，缓存结果（性能优于`methods`）。
3. 语法：

```javascript
computed: {
  // 基础写法（只读）
  totalPrice() {
    return this.goodsList.reduce((sum, item) => sum + item.price * item.count, 0);
  },
  // 完整写法（可读写）
  fullName: {
    get() { return this.firstName + ' ' + this.lastName; },
    set(newVal) { [this.firstName, this.lastName] = newVal.split(' '); }
  }
}
```

+ 使用：直接作为属性使用（`{{ totalPrice }}`），无需加括号。
2. **侦听器（watch）**：
+ 作用：监视数据变化，执行异步操作或复杂业务逻辑（如数据变化后发请求）。
+ 语法：

```javascript
watch: {
  // 基础写法（简单类型）
  username(newVal, oldVal) {
    console.log('用户名变化：', newVal, oldVal);
  },
  // 完整写法（复杂类型/深度监视/立即执行）
  'user.info.age': {
    deep: true, // 深度监视对象内部属性
    immediate: true, // 初始化时立即执行一次
    handler(newVal) {
      console.log('年龄变化：', newVal);
    }
  }
}
```

### 六、生命周期
1. **定义**：Vue实例从“创建”到“销毁”的全过程，每个阶段会自动执行对应的“钩子函数”，用于在特定时机执行代码。
2. **核心生命周期阶段与钩子**：

| 阶段 | 钩子函数 | 作用 |
| --- | --- | --- |
| 创建阶段 | `created` | 实例创建完成，`data`和`methods`已就绪，可发送初始化请求（如获取列表数据） |
| 挂载阶段 | `mounted` | 模板渲染完成，DOM已生成，可操作DOM（如初始化ECharts图表） |
| 更新阶段 | `updated` | 数据变化导致DOM更新后执行（如更新后调整滚动位置） |
| 销毁阶段 | `destroyed` | 实例销毁前执行，用于释放资源（如清除定时器、解绑事件） |


3. **常见使用场景**：
4. 初始化请求：在`created`中调用接口，获取数据后渲染视图；
5. DOM操作：在`mounted`中获取DOM元素（如`this.$refs.box`）；
6. 清理资源：在`destroyed`中清除`setInterval`定时器。

### 七、工程化开发与组件化
1. **Vue CLI（脚手架）**：
2. 作用：快速生成标准化Vue项目结构，集成Webpack配置（无需手动配置）。
3. 使用步骤：

step1 全局安装：`npm i @vue/cli -g`（仅需安装一次）；

step2 创建项目：`vue create 项目名`，选择“手动配置”（勾选Babel、Router、Vuex等）；

step3 启动项目：`cd 项目名` → `npm run serve`；

+ 核心目录：
    - `src/views`：页面级组件（配合路由，如`Home.vue`、`Login.vue`）；
    - `src/components`：复用性组件（如`Button.vue`、`Card.vue`）；
    - `src/App.vue`：根组件，包含`template`（结构）、`script`（逻辑）、`style`（样式）；
    - `src/main.js`：入口文件，创建Vue实例并注入路由、Vuex等。
2. **组件注册**：
+ 局部注册：仅在当前组件内使用，需“导入→注册→使用”：

```javascript
// 1. 导入组件
import HmHeader from './components/HmHeader.vue';
export default {
  // 2. 注册组件
  components: { HmHeader },
  // 3. 在template中使用
  template: `<hm-header></hm-header>`
}
```

+ 全局注册：所有组件可使用，在`main.js`中注册：

```javascript
import Vue from 'vue';
import HmButton from './components/HmButton.vue';
// 注册全局组件（组件名，组件对象）
Vue.component('HmButton', HmButton);
```

### 五、组件通信
1. **父子通信**：
2. 父传子（`props`）：
    1. 父组件：通过标签属性传值（`<Son :title="msg" :age="18"></Son>`）；
    2. 子组件：用`props`接收，支持类型校验：

```javascript
props: {
  title: {
    type: String, // 类型
    required: true, // 是否必传
    default: '默认标题' // 默认值（非必传时生效）
  },
  age: Number // 简化写法（仅指定类型）
}
```

+ 子传父（`$emit`）：
    1. 子组件：通过`this.$emit('事件名', 参数)`触发事件（`this.$emit('changeTitle', '新标题')`）；
    2. 父组件：监听事件并处理（`<Son @changeTitle="handleChange"></Son>`）：

```javascript
methods: {
  handleChange(newTitle) {
    this.msg = newTitle; // 接收子组件传值并修改父组件数据
  }
}
```

4. **非父子通信**：
5. Event Bus（事件总线）：创建空Vue实例作为“通信桥梁”：
    1. 创建总线：`src/utils/EventBus.js` → `import Vue from 'vue'; export default new Vue();`；
    2. A组件（接收方）：`Bus.$on('sendMsg', (msg) => { this.msg = msg; })`；
    3. B组件（发送方）：`Bus.$emit('sendMsg', 'Hello')`；
+ provide/inject（跨层级通信）：
    1. 顶层组件：`provide('key', 数据)`提供数据（如`provide('userInfo', this.userInfo)`）；
    2. 子/孙组件：`inject('key')`接收数据（如`const userInfo = inject('userInfo')`）。

## （二）自定义指令与插槽
### 一、自定义指令
1. **定义**：封装DOM操作，扩展Vue的内置指令（如实现“自动聚焦”“加载中蒙层”等自定义功能）。
2. **注册与使用**：
3. 全局注册（`main.js`，所有组件可用）：

```javascript
// 指令名：focus，钩子函数：inserted（元素插入DOM时执行）
Vue.directive('focus', {
  inserted(el) {
    el.focus(); // DOM操作：让元素获取焦点
  }
});
// 使用：<input v-focus>
```

+ 局部注册（组件内，仅当前组件可用）：

```javascript
directives: {
  // 指令名：color，支持指令值（binding.value）
  color: {
    inserted(el, binding) {
      el.style.color = binding.value; // 初始化时设置颜色
    },
    update(el, binding) {
      el.style.color = binding.value; // 指令值更新时重新设置
    }
  }
}
// 使用：<div v-color="textColor">文本</div>，textColor为data中的变量
```

### 二、插槽（Slot）
1. **作用**：让组件内部“不确定的结构”支持自定义（如弹窗的标题、内容区域）。
2. **分类与使用**：
3. 默认插槽（单个自定义结构）：
    1. 组件内：用`<slot></slot>`占位，可设置后备内容（默认显示）；

```vue
<!-- Dialog.vue -->
<template>
  <div class="dialog">
    <slot>默认内容（未传内容时显示）</slot>
  </div>
</template>

```

    2. 使用时：在组件标签内传入自定义内容；

```vue
<Dialog>
  <div>自定义弹窗内容</div>
</Dialog>

```

+ 具名插槽（多个自定义结构）：
    1. 组件内：用`name`属性区分插槽；

```vue
<!-- Dialog.vue -->
<template>
  <div class="dialog">
    <slot name="header"></slot> <!-- 头部插槽 -->
    <slot name="content"></slot> <!-- 内容插槽 -->
  </div>
</template>

```

    2. 使用时：用`template`配合`v-slot:插槽名`（简写`#插槽名`）传入内容；

```vue
<Dialog>
  <template #header><h3>弹窗标题</h3></template>
  <template #content><p>弹窗内容</p></template>
</Dialog>

```

+ 作用域插槽（插槽传值）：
    1. 组件内：给`slot`绑定属性（传值）；

```vue
<!-- Table.vue -->
<template>
  <table>
    <tr v-for="item in list" :key="item.id">
      <slot :row="item"></slot> <!-- 绑定当前行数据 -->
    </tr>
  </table>
</template>

```

    2. 使用时：接收插槽传递的值并使用；

```vue
<Table :list="goodsList">
  <template #default="obj">
    <!-- obj包含slot绑定的所有属性，如obj.row.id -->
    <td>{{ obj.row.name }}</td>
    <td>{{ obj.row.price }}</td>
  </template>
</Table>

```

## （三）Vue Router（路由）
### 一、基础认知
1. **SPA（单页应用）**：
2. 定义：所有功能在一个HTML页面实现，通过路由实现“路径切换→组件更新”，无需刷新页面。
    - 优缺点：
        * 优点：用户体验好（无页面跳转闪烁）、性能高（按需加载组件）；
        * 缺点：首屏加载慢（需加载核心资源）、SEO差（内容动态渲染）。
3. **Vue Router**：Vue官方路由插件，实现“路径与组件的映射”，支持嵌套路由、路由传参、导航守卫等。

### 二、基本使用（5+2步骤）
1. **5个基础步骤（初始化）**：
    1. **下包**：`npm i vue-router@3`（Vue2对应3.x版本，Vue3对应4.x版本）；
    2. **引入**：在`src/router/index.js`中引入Vue和Vue Router；

```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';
```

    3. **安装**：`Vue.use(VueRouter)`（注册路由插件）；
    4. **创建路由实例**：配置路由规则（路径→组件）；

```javascript
// 导入页面组件
import Find from '@/views/Find.vue';
import My from '@/views/My.vue';

const router = new VueRouter({
  routes: [
    { path: '/find', component: Find }, // 路径/find对应Find组件
    { path: '/my', component: My }     // 路径/my对应My组件
  ]
});
```

    5. **注入Vue实例**：在`main.js`中注入路由实例；

```javascript
import router from './router';
new Vue({ el: '#app', router, render: h => h(App) });
```

2. **2个核心步骤（使用）**：
    1. **配置导航**：用`<router-link to="路径">`替代`<a>`标签（自动高亮当前路由）；

```vue
<router-link to="/find">发现音乐</router-link>
<router-link to="/my">我的音乐</router-link>

```

    2. **配置路由出口**：用`<router-view></router-view>`指定组件渲染位置；

```vue
<template>
  <div>
    <router-link to="/find">发现音乐</router-link>
    <router-view></router-view> <!-- 组件在这里渲染 -->
  </div>
</template>

```

### 三、路由进阶
1. **路由模块封装**：将路由配置抽离到`src/router/index.js`，便于维护（避免代码堆在`main.js`）。
2. **导航高亮**：
3. 默认类名：
    - `router-link-active`：模糊匹配（如`/my`匹配`/my`、`/my/setting`）；
    - `router-link-exact-active`：精确匹配（仅`/my`匹配`/my`）；
+ 自定义类名：在路由实例中配置，适应项目样式命名规范；

```javascript
const router = new VueRouter({
  routes: [...],
  linkActiveClass: 'active', // 自定义模糊匹配类名
  linkExactActiveClass: 'exact-active' // 自定义精确匹配类名
});
```

3. **路由传参**：
+ 查询参数（适合多参数）：
    1. 跳转：`to="/search?words=黑马&type=1"` 或 对象写法（`to="{ path: '/search', query: { words: '黑马', type: 1 } }"`）；
    2. 接收：`this.$route.query.words`、`this.$route.query.type`；
+ 动态路由（适合单参数，路径更简洁）：
    1. 配置路由规则：`{ path: '/search/:words', component: Search }`（参数加`?`表示可选：`/search/:words?`）；
    2. 跳转：`to="/search/黑马"` 或 对象写法（`to="{ path: '/search/黑马' }"`）；
    3. 接收：`this.$route.params.words`；
4. **路由重定向与404**：
+ 重定向：`{ path: '/', redirect: '/home' }`（访问`/`时自动跳转到`/home`）；
+ 404：`{ path: '*', component: NotFind }`（路径未匹配时显示404组件，需放路由规则最后）；
5. **路由模式**：
+ hash模式（默认）：路径带`#`（如`http://localhost:8080/#/home`），兼容性好；
+ history模式：路径无`#`（如`http://localhost:8080/home`），需服务器配置支持（避免刷新404）；

```javascript
const router = new VueRouter({
  mode: 'history', // 开启history模式
  routes: [...]
});
```

6. **编程式导航**：用JS代码控制路由跳转（如按钮点击后跳转）：

```javascript
// 1. 路径跳转（简单场景）
this.$router.push('/search/黑马');
// 2. 对象跳转（支持传参）
this.$router.push({
  path: '/search',
  query: { words: '黑马' } // 查询参数
});
this.$router.push({
  name: 'Search', // 命名路由（需给路由规则配置name）
  params: { words: '黑马' } // 动态路由参数
});
// 3. 后退/前进
this.$router.go(-1); // 后退1步
this.$router.back(); // 后退（等价于go(-1)）
this.$router.forward(); // 前进1步
```

## （四）Vuex（状态管理）
### 一、基础认知
1. **定义**：Vue的状态管理工具，用于管理多组件共享数据（如购物车商品、用户信息、全局主题），避免组件通信层级复杂。
2. **核心优势**：
3. 数据集中管理，便于维护；
4. 数据响应式，修改后视图自动更新；
5. 提供统一的操作规范（如通过`mutations`修改数据）。

### 二、核心概念与使用
1. **核心概念**：

| 概念 | 作用 | 语法示例 |
| --- | --- | --- |
| `state` | 存储共享数据（类似组件的`data`） | `state: { count: 100, userInfo: {} }` |
| `mutations` | 修改`state`（同步操作，必须通过它修改） | `mutations: { addCount(state, n) { state.count += n; } }` |
| `actions` | 处理异步操作（如发请求），提交`mutations` | `actions: { getAsyncCount(context, n) { setTimeout(() => { context.commit('addCount', n); }, 1000); } }` |
| `getters` | 派生状态（类似组件的`computed`） | `getters: { doubleCount(state) { return state.count * 2; } }` |
| `modules` | 拆分模块（解决`state`臃肿） | `modules: { user: userModule, cart: cartModule }` |


2. **基本使用步骤**：
    1. **下包**：`npm i vuex@3`（Vue2对应3.x版本）；
    2. **创建Store实例**（`src/store/index.js`）：

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 100
  },
  mutations: {
    addCount(state, n) {
      state.count += n;
    }
  },
  actions: {
    getAsyncCount(context, n) {
      // 模拟异步请求
      setTimeout(() => {
        context.commit('addCount', n); // 提交mutation修改state
      }, 1000);
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
  }
});
```

    3. **注入Vue实例**（`main.js`）：

```javascript
import store from './store';
new Vue({ el: '#app', store, render: h => h(App) });
```

    4. **组件中使用**：

```javascript
// 1. 获取state（直接获取）
this.$store.state.count;
// 2. 获取getters
this.$store.getters.doubleCount;
// 3. 提交mutation（修改state）
this.$store.commit('addCount', 10);
// 4. 触发action（异步操作）
this.$store.dispatch('getAsyncCount', 20);

// 辅助函数（简化写法，需导入）
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
computed: {
  ...mapState(['count']), // 映射state
  ...mapGetters(['doubleCount']) // 映射getters
},
methods: {
  ...mapMutations(['addCount']), // 映射mutations（调用：this.addCount(10)）
  ...mapActions(['getAsyncCount']) // 映射actions（调用：this.getAsyncCount(20)）
}
```

## （五）Vue3核心特性
### 一、Vue3优势与项目创建
1. **核心优势**：
+ 组合式API：代码更集中（按功能组织，而非按`data`/`methods`拆分），便于维护；
+ 更好的TS支持：类型推断更精准，开发体验更优；
+ 性能优化：重写diff算法、模板编译优化、更高效的组件初始化；
+ 体积更小：支持TreeShaking（按需导入，减小打包体积）；
+ 更优的响应式：用`Proxy`替代`Object.defineProperty`，支持数组索引修改、对象新增属性。
2. **项目创建（基于Vite）**：
    1. 命令：`npm init vue@latest`；
    2. 配置选择：输入项目名 → 选择TypeScript（可选）→ 勾选Router、Pinia（状态管理）→ 完成；
    3. 启动项目：`cd 项目名` → `npm install` → `npm run dev`；
3. **核心目录变化**：
+ `main.js`：用`createApp`创建实例，语法更简洁；

```javascript
import { createApp } from 'vue';
import App from './App.vue';
createApp(App).mount('#app');
```

+ 组件：`template`支持多根元素（无需外层包裹`div`）；`script setup`语法糖（简化组合式API）。

### 二、组合式API（核心）
1. `script setup`**语法糖**：
+ 作用：简化组合式API写法，无需`export default`，变量/函数直接暴露给模板；
+ 示例：

```vue
<script setup>
// 变量直接定义，模板可直接使用
const msg = "Hello Vue3";
// 函数直接定义
const handleClick = () => {
  alert(msg);
};
</script>
<template>
  <div>{{ msg }}</div>
  <button @click="handleClick">点击</button>
</template>

```

2. **响应式API**：
+ `ref`：处理简单类型（Number、String、Boolean），也支持复杂类型；

```javascript
import { ref } from 'vue';
const count = ref(0); // 初始值0，响应式
const add = () => {
  count.value++; // 修改需加.value（模板中无需加）
};
```

+ `reactive`：处理复杂类型（Object、Array），返回响应式对象；

```javascript
import { reactive } from 'vue';
const user = reactive({ name: 'pink', age: 18 }); // 响应式对象
const updateUser = () => {
  user.age++; // 直接修改属性，无需.value
};
```

3. **生命周期钩子**：
+ 前缀加`on`，需导入使用；

```javascript
import { onMounted, onUpdated } from 'vue';
onMounted(() => {
  console.log('组件挂载完成');
});
onUpdated(() => {
  console.log('组件更新完成');
});
```

4. **父子通信**：
+ 父传子：`defineProps`接收父组件传值；

```javascript
// 子组件
const props = defineProps({
  title: String,
  age: { type: Number, default: 18 }
});
```

+ 子传父：`defineEmits`定义事件，`emit`触发；

```javascript
// 子组件
const emit = defineEmits(['changeTitle']); // 定义事件
const handleChange = () => {
  emit('changeTitle', '新标题'); // 触发事件并传值
};
// 父组件
<Son @changeTitle="handleChange"></Son>

```

## （六）Pinia（Vue3状态管理）
### 一、基础认知
1. **定义**：Vue3官方状态管理工具，替代Vuex，API更简洁（无`mutation`）、支持TS、无`modules`概念（每个Store独立）。
2. **核心优势**：
3. 简化API：无需`mutation`，`action`支持同步/异步；
4. 更好的TS支持：类型推断自动生成，无需手动定义；
5. 轻量：体积小，集成TreeShaking；
6. 灵活：支持组合式API写法。

### 二、基本使用
1. **下包**：`npm i pinia`；
2. **初始化（**`main.js`**）**：

```javascript
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
const app = createApp(App);
app.use(createPinia()); // 注入Pinia
app.mount('#app');
```

3. **定义Store（**`src/stores/counter.js`**）**：

```javascript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// 第一个参数：Store唯一标识；第二个参数：配置函数
export const useCounterStore = defineStore('counter', () => {
  // 1. state：用ref/reactive定义（对应Vuex的state）
  const count = ref(0);
  const user = reactive({ name: 'pink', age: 18 });

  // 2. getter：用computed定义（对应Vuex的getters）
  const doubleCount = computed(() => count.value * 2);

  // 3. action：同步/异步函数（对应Vuex的actions，无mutations）
  const increment = () => {
    count.value++; // 直接修改state
  };
  const getAsyncCount = async () => {
    // 模拟异步请求
    const res = await new Promise(resolve => {
      setTimeout(() => resolve(10), 1000);
    });
    count.value = res;
  };

  // 暴露给组件使用
  return { count, user, doubleCount, increment, getAsyncCount };
});
```

4. **组件中使用**：

```vue
<script setup>
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia'; // 保持响应式解构

// 获取Store实例
const counterStore = useCounterStore();

// 直接使用（无需解构）
const handleAdd = () => {
  counterStore.increment();
};

// 解构（需用storeToRefs，否则响应式丢失）
const { count, doubleCount } = storeToRefs(counterStore);
</script>
<template>
  <div>count: {{ count }}</div>
  <div>doubleCount: {{ doubleCount }}</div>
  <button @click="handleAdd">+1</button>
  <button @click="counterStore.getAsyncCount">异步获取count</button>
</template>

```

### 三、持久化
1. **需求**：Store数据刷新后不丢失（如用户信息、购物车）；
2. **实现（用**`pinia-plugin-persistedstate`**插件）**：

```javascript
import { createPinia } from 'pinia';
import persist from 'pinia-plugin-persistedstate'; // 导入插件
const pinia = createPinia();
pinia.use(persist); // 使用插件
app.use(pinia);
```

```javascript
export const useUserStore = defineStore('user', () => {
  // ...Store逻辑
}, {
  persist: true // 开启持久化，默认存储到localStorage
});
```

    1. 下包：`npm i pinia-plugin-persistedstate`；
    2. 配置（`main.js`）：
    3. 开启持久化（Store中配置）：



