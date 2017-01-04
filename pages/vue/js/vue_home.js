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
