// create a new Component and naming with -
Vue.component('task-list',{
  // 再用母子component時, temlate一定要包裝一層標準tag例如div
  template: '<div><ul><task v-for="task in tasks">{{task.description}}</task></ul><div>',
  data() {
    return {  // 是retrun {}
      tasks: [
        { description: 'Go to the store', complete: true},
        { description: 'Go to the mall', complete: false},
        { description: 'Go to the shop', complete: true},
        { description: 'Go to the farm', complete: false}
      ]
    };
  }
})

Vue.component('task', {
  template: '<li><slot></slot></li>', // <slot></slot>是顯示傳入的資料
  data() {
    return { // 是retrun {}
      message: 'task data 123' // return an Object in component
    };
  }
})

var component1 = new Vue({
  el: '#component-1',
  data: {
    message: 'welcome to Vue component'
  },
});

// component sample: message
Vue.component('message', {
  // 接受的參數寫在props
  props: [
    'title',
    'body'
  ],
  // 當設定data時, 這是一個方法, 要寫成 data()
  // data MUST be a function in component
  data() {
    return {
      isVisiable: true
    };
  },
  // 顯示的模板寫在template
  // 從別的網頁copy過來的元素當成component的template
  // 多行的template要用 `` 包起來
  template: `
    <article class="message" v-show="isVisiable">
      <div class="message-header">
        {{ title }}
          <span class="icon is-small"><i class="fa fa-window-close-o button-icon" aria-hidden="true" @click="hideMessage"></i></span>
      </div>
      <div class="message-body">
        {{ body }}
      </div>
    </article>
  `,
  // 物件內客製化的方法, 使用data-centric way來控制顯示
  methods: {
    hideMessage(){
      this.isVisiable = false
    }
  }
});
var component2 = new Vue({  //永遠需要將DOM mount上Vue物件, 才能讓DOM與Vue做雙向binding
  el: '#component-message'
});

// component sample: modal
Vue.component('modal', {

});
var component3 = new Vue({  //永遠需要將DOM mount上Vue物件, 才能讓DOM與Vue做雙向binding
  el: '#component-modal'
});
// component sample: tabs


// component sample: custom events


// component sample: event dispatcher
