var xdata = { a: 1 }
var vm1 = new Vue({
  el: '#example',
  data: xdata
})
vm1.$data === xdata
vm1.$el === document.getElementById('example')
vm1.a === xdata.a

var vm2 = new Vue({
  data: {
    a: 1
  },
  created: function(){
    console.log('a is :' + this.a)
  }
})
