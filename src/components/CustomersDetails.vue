<template>
  <div class="details container">
    <router-link to="/" class="btn btn-default">返回</router-link>
    <h1 class="page-header">
      {{customer.name}}

      <span class="pull-right">
        <router-link :to="'/edit/' + customer.id" class="btn btn-primary">编辑</router-link>
        <button class="btn btn-danger" @click="deleteCustomer(customer.id)">删除</button>
      </span>
      </h1>
    <ul class="list-group">
      <li class="list-group-item"><span class="glyphicon glyphicon-phone"> {{customer.phone}}</span></li>
      <li class="list-group-item"><span class="glyphicon glyphicon-envelope"> {{customer.email}}</span></li>
    </ul>
    <ul class="list-group">
      <li class="list-group-item"><span class="glyphicon glyphicon-education"> {{customer.education}}</span></li>
      <li class="list-group-item"><span class="glyphicon glyphicon-list-alt"> {{customer.graduationschool}}</span></li>
    </ul>
    <ul class="list-group">
      <li class="list-group-item"><span class="glyphicon glyphicon-leaf"> {{customer.profession}}</span></li>
      <li class="list-group-item"><span class="glyphicon glyphicon-eye-open"> {{customer.profile}}</span></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'CustomersDetails',
    data () {
      return {
        customer: '',
      }
    },
    created () {
      this.fetchCustomers(this.$route.params.id);
    },
    methods: {
      fetchCustomers (id) {
        this.axios.get('http://localhost:3000/users/'+id)
          .then((response) => {
            // console.log(response);
            this.customer = response.data;
          })  
      },
      deleteCustomer (id) {
        // console.log(id);
        this.axios.delete('http://localhost:3000/users/'+id)
          .then((response) => {
            this.$router.push({path: "/",query:{alert:"用户删除成功!"}});
          })  
      },
    }
  }
</script>

<style scoped>

</style>