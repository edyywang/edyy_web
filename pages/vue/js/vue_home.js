var app = new Vue({
  el: '#app-1',
  data: {
    message: 'Hello World!'
  }
});
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date()
  }
}); // try console: app2.message = 'hahaha'
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
});
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      {text: '1看電視'},
      {text: '2吃晚餐'},
      {text: '3倒垃圾'},
      {text: '4洗身體'},
      {text: '5睡覺去'},
    ]
  }
});
// try console: app4.todos.push({ text: 'New item' })
// push(), pop() 從後拿, shift() 從前拿, unshift(), splice(0,2)從第1個移除2個, sort() and reverse()
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue JS'
  },
  methods: {
    reverseMessage: function(){
      this.message = this.message.split(' ').reverse().join(' ')
    }
  }
});
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue'
  }
});
// app-7
Vue.component('todo-item', {
  props: ['todoitem'], // v-bind傳入的變數
  template: '<li>{{ todoitem.text }}</li>' // v-bind客製化物件的DOM長相
})
var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [  // v-for取出的每個物件
      {text: '青菜'},
      {text: '牛奶'},
      {text: '麵包'},
      {text: '肉類'}
    ]
  }
});
// app-8
var app8 = new Vue({
  el: '#app-8',
  data: {
    title: 'click me Old',
    newName: '',
    names: ['Alpha', 'Beta', 'Charlie', 'Delta'],
    toggleClass: false,
    tasks: [
      { description: 'task 1 completed', completed: true },
      { description: 'task 2 incompleted', completed: false },
      { description: 'task 1 completed', completed: true },
      { description: 'task 4 incompleted', completed: false },
    ]
  },
  // custom real-time data processing or filter
  computed: {
    reverseName() {
      return this.newName.split(' ').reverse().join(' ');
    },
    incompletedTasks(){
      return this.tasks.filter(task => !task.completed); //ES5以上寫法
      //或傳統寫法
      // this.tasks.filter(function(task) {
      //   return !task.completed
      // })
    }
  },
  // custom omethods, eg. for on click
  methods: {
    addNameOldStyle: function(){ // better compatibility
      if (this.newName === '') return
      this.names.push(this.newName)
      this.newName = ''
      this.toggleClass = !this.toggleClass
    },
    addNameNewStyle() { // ES5 syntax
      if (this.newName === '') return
      this.names.push(this.newName)
      this.newName = ''
      this.toggleClass = !this.toggleClass
    }
  },
  // insatnce lifecycle action
  beforeCreate: function(){
    //alert('beforeCreate');
  },
  created: function(){
    //alert('created');
  },
  beforeMount: function(){
    //alert('beforeMount');
  },
  mounted: function(){
    //alert('mounted');
  },
  beforeUpdate: function(){
    //alert('beforeUpdate');
  },
  updated: function(){
    //alert('updated');
  },
  beforeDestroy: function(){
    //alert('beforeDestroy');
  },
  destroyed: function(){
    //alert('destroyed');
  }
});
