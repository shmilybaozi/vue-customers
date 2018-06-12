<template>
  <div class="add container">
    <h1 class="page-header">添加用户</h1>
    <form @submit.prevent="addCustomers">
      <div class="well">
        <h4>用户信息</h4>
        <div class="form-group">
          <label>姓名</label>
          <input type="text" class="form-control" placeholder="name" v-model="customer.name" required="required">
        </div>
        
        <div class="form-group">
          <label>电话</label>
          <input type="text" class="form-control" placeholder="phone" v-model="customer.phone" required="required"> 
        </div>

        <div class="form-group">
          <label>邮箱</label>
          <input type="text" class="form-control" placeholder="email" v-model="customer.email" required="required">
        </div>

        <div class="form-group">
          <label>学历</label>
          <input type="text" class="form-control" placeholder="education" v-model="customer.education">
        </div>

        <div class="form-group">
          <label>毕业学校</label>
          <input type="text" class="form-control" placeholder="graduationschool" v-model="customer.graduationschool">
        </div>

        <div class="form-group">
          <label>职业</label>
          <input type="text" class="form-control" placeholder="profession" v-model="customer.profession">
        </div>

        <div class="form-group">
          <label>个人简介</label>
          <textarea rows="10" class="form-control" v-model="customer.profile"></textarea>
        </div>

        <button type="submit" class="btn btn-primary">添加</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'CustomersAdd',
    data () {
      return {
        customer: {},
      }
    },
    methods: {
      addCustomers () {
        let newCustomers = {
          name: this.customer.name,
          phone: this.customer.phone,
          email: this.customer.email,
          education: this.customer.education,
          graduationschool: this.customer.graduationschool,
          profession: this.customer.profession,
          profile: this.customer.profile,
        };
        this.axios.post('http://localhost:3000/users',newCustomers)
          .then((response) => {
            // console.log(response);
            this.$router.push({path: "/",query:{alert:"添加用户成功!"}});
          })
      },
    }
  }
</script>

<style scoped>
textarea {
  resize: none;
}
</style>