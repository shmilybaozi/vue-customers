<template>
  <div class="customers container">
    <CustomersAlert v-if="alert" :message="alert"/>
    <h1 class="page-header">用户管理系统</h1>
    <input type="text" class="form-control" placeholder="搜索" v-model="filterInput">
    <br>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>姓名</th>
          <th>电话</th>
          <th>邮箱</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(customer, index) in filterBy(customers,filterInput)" :key="index">
          <td>{{customer.name}}</td>
          <td>{{customer.phone}}</td>
          <td>{{customer.email}}</td>
          <td><router-link :to="'/customer/' + customer.id" class="btn btn-default">详情</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import CustomersAlert from './CustomersAlert'

  export default {
    name: 'CustomersList',
    components: {
      CustomersAlert
    },
    data () {
      return {
        customers: [],
        alert: '',
        filterInput: ''
      }
    },
    created () {
      if (this.$route.query.alert) {
        this.alert = this.$route.query.alert;
      }
      this.fetchCustomers();
    },
    updated () {
      this.fetchCustomers();
    },
    methods: {
      fetchCustomers () {
        this.axios.get('http://localhost:3000/users')
          .then((response) => {
            // console.log(response);
            this.customers = response.data;
          })
      },
      filterBy (customers,value) {
        return customers.filter(function (customer) {
          return customer.name.match(value);
        })
      },
    },
  }
</script>

<style scoped>

</style>