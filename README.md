# customer

> A Vue.js project

## 目录

点击:heartbeat:回到目录

[:apple: 启动项目](#BuildSetup)
[:tangerine: JSON Server搭建本地数据接口](#JSONServer搭建本地数据接口)
[:lemon: 用户管理系统项目小总结](#用户管理系统项目小总结)

- [:cherries: 项目初始化的时候就使用路由](#项目初始化的时候就使用路由)
- [:grapes: 在vue项目中使用bootstrap](#在vue项目中使用bootstrap)
- [:watermelon: 配置vue-axios](#配置vue-axios)
- [:strawberry: 设置模板文件](#设置模板文件)
- [:peach: 实现各个页面之间的跳转](#实现各个页面之间的跳转)

  - [:melon: 导航栏中`主页`，`关于我们`，`添加用户`都用路由实现跳转](#导航栏中`主页`，`关于我们`，`添加用户`都用路由实现跳转)
  - [:banana: 主页组件CustomersList](#主页组件CustomersList)
  - [:pear: 添加用户组件CustomersAdd](#添加用户组件CustomersAdd)
  - [:pineapple: 提示信息组件CustomersAlert](#提示信息组件CustomersAlert)
  - [:sweet_potato: 用户详情组件CustomersDetails](#用户详情组件CustomersDetails)
  - [:eggplant: 用户信息编辑组件CustomersEdit](#用户信息编辑组件CustomersEdit)
  - [:tomato: 实现搜索功能：CustomersList组件](#实现搜索功能：CustomersList组件)

---

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
[:heartbeat:](#目录)

---

## [JSON Server](https://github.com/typicode/json-server) 搭建本地数据接口

- 安装

```bash
# 安装全局json-server
npm install -g json-server

# 进入项目文件夹
# 创建package.json
npm init (-y)

# 安装
npm install json-server --save
```

- 创建自己的json文件 db.json

- 修改package.json文件

```json
...
"scripts": {
    "json:server": "json-server --watch db.json",
    "json:server:remote": "json-server http://jsonplaceholder.typicode.com/db"
  },
...
```

- 启动JSON Server

```bash
# 本地数据
npm run json:server

# jsonplaceholder数据
npm run json:server:remote
```

[:heartbeat:](#目录)

---

## 用户管理系统项目小总结

### 项目初始化的时候就使用路由

- 根据数据`id`跳转页面的路由设置 router ---> index.js

```javascript
export default new Router({
  routes: [
    ...
    { path: '/customer/:id', component: CustomersDetails },
    { path: '/edit/:id', component: CustomersEdit }
  ],
  mode: 'history',
})
```

[:heartbeat:](#目录)

### 在 vue 项目中使用 bootstrap

- 安装jQuery

```bash
npm install jquery@1.11.3 --save-dev
```

- 安装bootstrap

```bash
npm install bootstrap@3.3.7 --save-dev
```

- 配置jQuery

将jQuery以插件打包，需要为 webpack 的 plugins进行插件设置。

在build/webpack.base.conf.js文件中，在整个配置对象的末尾增加plugins配置。

在webpack.base.conf.js中的配置项，可以在 dev 和 build 出来的 pro 版本中都有效。

下面的配置其实就是变量名的真正指向设置，这样，在页面中对jquery的各种名字的调用就会有效，否则bootstrap跑不起来。

```javascript
// 在build/webpack.base.conf.js文件开头
const webpack=require('webpack')

// 在build/webpack.base.conf.js文件末尾
plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  ]
```

- 引入bootstrap

在src/main.js文件的顶部加入如下对 bootstrap 主要文件的引用。

```javascript
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
```

[:heartbeat:](#目录)

### 配置[vue-axios](https://github.com/imcvampire/vue-axios)

- 安装

```bash
npm install --save axios vue-axios
```

- 在main.js中配置 vue-axios

```javascript
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
```

[:heartbeat:](#目录)

### 设置模板文件

- main.js

```javascript
new Vue({
  router,
  template: `html模板(包含router-link 和 router-view)`,
}).$mount("#app")
```

[:heartbeat:](#目录)

### 实现各个页面之间的跳转

#### 导航栏中`主页`，`关于我们`，`添加用户`都用路由实现跳转

- router ---> index.js

    ```javascript
    export default new Router({
    routes: [
      { path: '/', component: CustomersList },
      { path: '/about', component: CustomersAbout },
      { path: '/add', component: CustomersAdd },
      { path: '/customer/:id', component: CustomersDetails },
      { path: '/edit/:id', component: CustomersEdit }
    ],
    mode: 'history',
    })
    ```

  - 将`<router-link to="/">主页</router-link>`等内容和`<router-view></router-view>`写在html模板中[:heartbeat:](#目录)

#### 主页组件CustomersList

- 显示用户信息：
  - 用`get`方式获取数据，并在页面加载完成前获取到

    ```javascript
    created () {
      if (this.$route.query.alert) {
        this.alert = this.$route.query.alert;
      }
      /* 页面加载完成前获取数据 */
      this.fetchCustomers();
    },
    /* 页面更新加载完成前获取数据 */
    updated () {
      this.fetchCustomers();
    },
    methods: {
      /* 用get方式获取数据 */
      fetchCustomers () {
        this.axios.get('http://localhost:3000/users')
          .then((response) => {
            console.log(response);
            this.customers = response.data;
          })
      },
    ```

    [:heartbeat:](#目录)

#### 添加用户组件CustomersAdd

- 每一个`input`标签都用`v-model`双向绑定属性`customer.XXX`
- customer为一个空的对象数据
- 添加数据到db.json中
  - 创建方法addCustomers

  ```html
  <!-- 绑定表单提交事件并阻止默认事件 -->
   <form @submit.prevent="addCustomers">
  ```

  - 创建 newCustomers对象 接收当前 customers 中的数据

  ```javascript
  /* 在methods中*/
  addCustomers () {
    let newCustomers = {
      name: this.customer.name,
      phone: this.customer.phone,
      email: this.customer.email,
      ...
    };
  ```

  - 将 对象newCustomers 通过 `post` 方法 传输到接口中
  - 添加数据，跳转到主页中并弹出提示信息 **`this.$route.push{path: "/",query:{alert:"添加用户成功!"}})`**

  ```javascript
  this.axios.post('http://localhost:3000/users',newCustomers)
    .then((response) => {
      /* console.log(response); */
      /* 添加数据跳转到主页中并弹出提示信息 */
      this.$router.push({path: "/",query:{alert:"添加用户成功!"}});
    })
  ```

  [:heartbeat:](#目录)

#### 提示信息组件CustomersAlert

- 接收CustomersLis组件传过来的`message`并显示弹窗信息

```javascript
props: ["message"],
```

- CustomersList组件中：

  ```javascript
   <CustomersAlert v-if="alert" :message="alert"/>
  ```

  - alert数据：根据添加或者编辑用户之后传递的query.alert获取 **`this.$route.query.alert`**

  ```javascript
  created () {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
    this.fetchCustomers();
  },
  ```

  [:heartbeat:](#目录)

#### 用户详情组件CustomersDetails

- CustomersList组件中：点击按钮转跳到对应`id`的用户详情页面中

  - 拼接地址注意：
    - 必须绑定属性`:to=""`，即`v-bind:to=""`，不绑定成属性就不能`+ customer.id`变量
    - `'/customer/'`部分和路由设置保持一致

    ```html
    <td>
      <router-link :to="'/customer/' + customer.id" class="btn btn-default">详情</router-link>
    </td>
    ```

- CustomersDetails组件中：

  - 获取用户详情：通过`this.$route.params.id`获取点击的用户的`id`

    ```javascript
    created () {
      this.fetchCustomers(this.$route.params.id);
    },
    methods: {
      fetchCustomers (id) {
          this.axios.get('http://localhost:3000/users/'+id)
            .then((response) => {
              this.customer = response.data;
            })  
      },
    }
    ```

  - 编辑按钮：直接转跳到到对应`id`的编辑用户信息页面中，同样注意绑定属性  `:to=""`

    ```html
    <router-link :to="'/edit/' + customer.id" class="btn  btn-primary">编辑</router-link>
    ```

  - 删除按钮：绑定点击事件，传入当前点击用户的`id`，以`delete`方式删除数据并传输弹窗信息

    ```html
    <button class="btn btn-danger" @click="deleteCustomer (customer.id)">删除</button>
    ```

    ```javascript
    /* 删除用户 */
    deleteCustomer (id) {
      this.axios.delete('http://localhost:3000/users/'+id)
        .then((response) => {
          this.$router.push({path: "/",query:{alert:"用户删除成功!"}} );
        })  
    },
    ```

    [:heartbeat:](#目录)

#### 用户信息编辑组件CustomersEdit

- 类似CustomersAdd组件：不过要把对应`id`的用户信息展示出来再修改确认。
  
  - 先获取到相应`id`的信息，展示在页面上，通过`this.$route.params.id`获取点击的用户的`id`

  ```javascript
  created () {
    this.fetchCustomer(this.$route.params.id);
  },
  methods: {
    fetchCustomer (id) {
      this.axios.get('http://localhost:3000/users/' + id)
        .then((response) => {
          this.customer = response.data;
        })
    },
  }
  ```

  - 将修改好的数据以`put`的方式传输到后台，然后转跳的主页并传输弹窗信息

  ```javascript
  updateCustmers () {
    let updateCustomers = {
      name: this.customer.name,
      phone: this.customer.phone,
      email: this.customer.email,
      ...
    };
    this.axios.put('http://localhost:3000/users/' + this.$route.params.id , updateCustomers)
      .then((response) => {
        // console.log(response);
        this.$router.push({path: "/",query:{alert:"修改用户成功!"}});
      })
  },
  ```

  [:heartbeat:](#目录)

#### 实现搜索功能：CustomersList组件

- `input`搜索框双向绑定数据`filterInput`

  ```html
  <input type="text" class="form-control" placeholder="搜索" v-model="filterInput">
  ```

- 改变遍历数组时的对象为当前过滤的方法，传入数组`customers`和绑定的属性`filterInput`

  ```html
  <tr v-for="(customer, index) in filterBy(customers,filterInput)" :key="index">
    <td>...</td>
    <td>...</td>
  </tr>
  ```

- 定义方法，过滤`arr.filter`遍历`customers`数组(名字匹配或者其他方面匹配，这里写了名字匹配)

  ```javascript
  filterBy (customers,value) {
    return customers.filter(function (customer) {
      return customer.name.match(value);
    })
  },
  ```

  [:heartbeat:](#目录)

#### 很多组件中都有 customers 数据(data中有定义)，分清楚是数组还是对象！