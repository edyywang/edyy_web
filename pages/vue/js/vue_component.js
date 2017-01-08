// Component Template Example:
// [for customized DOM]
// Vue.component('tabs', {
//   // like setter
//   props: [],
//   // like getter
//   data() { return{}; },
//   // like processed getter
//   computed: {},
//   watch: {},
//   template: `
//   `,
//   methods: {},
//   // insatnce lifecycle action
//   beforeCreate() {
//     //alert('beforeCreate');
//   },
//   created() {
//     //alert('created');
//   },
//   beforeMount() {
//     //alert('beforeMount');
//   },
//   mounted() {
//     //alert('mounted');
//   },
//   beforeUpdate() {
//     //alert('beforeUpdate');
//   },
//   updated() {
//     //alert('updated');
//   },
//   beforeDestroy() {
//     //alert('beforeDestroy');
//   },
//   destroyed() {
//     //alert('destroyed');
//   }
// });
// [for mounting DOM]
// var componentExample = new Vue({
//   el: '#component-example-to-some-div-tag',
//   components: {
//     // register child component
//   },
//   data: {
//   },
//   watch: {
//
//   },
//   methods: {
//   }
// });
////////////////////////////////////////////////
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
});
Vue.component('task', {
  template: '<li><slot></slot></li>', // <slot></slot>是顯示傳入的資料
  data() {
    return { // 是retrun {}
      message: 'task data 123' // return an Object in component
    };
  }
});
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
  props: [],
  data() { return{}; },
  template: `
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <slot></slot>
      </div>
    </div>
    <button class="modal-close" @click="$emit('close')"></button>
  </div>
  `,
  // 在template中的modal template, 會在按鈕下去時發射emit出一個Customer的close event到上一層
  methods: {}
});
var component3_1 = new Vue({  //永遠需要將DOM mount上Vue物件, 才能讓DOM與Vue做雙向binding
  el: '#component-modal',
  data: {
    isModalVisible: false
  },
  methods: {
    showModal() {
      // 記得要加入 this.xxx = yyy
      this.isModalVisible = true
    },
    hideModal() {
      this.isModalVisible = false
    }
  }
});
// component sample: modal card & Name Slot
Vue.component('modal-card', {
  props: [],
  data() { return{}; },
  template: `
  <div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title"><slot name="modal-title">default title is here</slot></p>
      <button class="delete" @click="$emit('close')"></button>
    </header>
    <section class="modal-card-body">
      <slot name="modal-content">defatul content is here</slot>
    </section>
    <footer class="modal-card-foot">
      <a class="button is-primary">Save changes</a>
      <a class="button" @click="$emit('close')">Cancel</a>
    </footer>
  </div>
</div>

  `,
  // 在template中的modal template, 會在按鈕下去時發射emit出一個Customer的close event到上一層
  methods: {}
});
var component3_2 = new Vue({  //永遠需要將DOM mount上Vue物件, 才能讓DOM與Vue做雙向binding
  el: '#component-modal-card',
  data: {
    isModalVisible: false
  },
  methods: {
    showModal() {
      // 記得要加入 this.xxx = yyy
      this.isModalVisible = true
    },
    hideModal() {
      this.isModalVisible = false
    }
  }
});

// component sample: tabs
Vue.component('tabs', {
  props: [],
  data() {
    return { childTabs: [] };
  },
  // template 一定有一個root element
  // 自己的tabs陣列內, 讀出每個tab元素
  template: `
    <div>
      <div class="tabs">
        <ul>
          <li v-for="childTab in childTabs" :class="{ 'is-active': childTab.isActive }">
            <a :href="childTab.href" @click="selectTab(childTab)">{{ childTab.name }}</a>
          </li>
        </ul>
      </div>
      <div class="tabs-details">
        <slot></slot>
      </div>
    </div>
  `,
  methods: {
    selectTab(selectedTab){
      this.childTabs.forEach(tab => {
        tab.isActive = (tab.name == selectedTab.name) //透過tab物件的data方法去呼叫, 類似getter
      });
    }
  },
  created() {
    // 將 tabs 內包的 tab 元素傳給自己的tabs陣列
    this.childTabs = this.$children;
  }
});
// 在console中測試 $vm0.$children.forEach(tab => console.log(tab.name))
Vue.component('tab', {
  // 類似setter
  // 參考props validation 也能傳送物件
  // https://vuejs.org/v2/guide/components.html#Prop-Validation
  props: {
    name: { required: true }, //這個元素中會有一個name的屬性, 而且是必要的
    selected: { default: false } //預設值為false, 作為顯示資料的判斷值
  },
  // 類似getter
  // 因為呼叫另外一個物件資料有immutable (資料不可從外部變化, 要透過功能呼叫資料)
  data() {
    return { isActive: false }; //資料預設值, 但會在mounted後被改變
  },
  computed: {
    href() {
      // 將name替換成一個連結, 替換掉空格
      // 將About Us換成about-us
      return '#' + this.name.toLowerCase().replace(/ /g, '-');
    }
  },
  // template 一定有一個root element
  template: `
    <div v-show="isActive"><slot></slot></div>
  `,
  mounted() {
    this.isActive = this.selected;
  }
});
var component4 = new Vue({
  el: '#component-tabs',
  data: {
  },
  methods: {
  }
});
// component sample: custom events and emit
// 參考子物件emit資料到父instance的方法
// https://laracasts.com/discuss/channels/vue/how-to-catch-a-childs-emit-in-the-parent-with-vue?page=1
Vue.component('coupon', {
  data(){
    return { couponCodeData: '' } //物件自己bind自己的資料, 用data為setter, 不需要設定props
  },
  template: `
    <input type="text" placeholder="Enter your coupon code" @blur="onCouponAppliedHere" v-model="couponCodeData">
  `,
  methods: {
    onCouponAppliedHere(){
      //發射event上一層去時就要使用$emit 並且可以傳送一個物件
      //發射一個custom event叫做 coupon-was-applied到DOM去 (標準的event有像是click或是keyup)
      //在$emit客製化event時, 也能傳送一組arrry的資料, 會bind到父instance的方法去
      this.$emit('coupon-was-applied', [this.couponCodeData, 'xyz']);
    }
  }
});
var component5 = new Vue({
  el: '#component-custom-event-emit',
  data: {
    couponResult: '',
    showCouponDetail: false
  },
  methods: {
    onCouponApplied(data){ // couponCodeData 是從子物件emit傳出來的資料
      this.couponResult = data[0] + ' was applied! ' + data[1]
      this.showCouponDetail = true
    }
  }
});

// Component - Customer Event and Emit (child to parent, 但應該要用v-on:custom-event:"someMethod"的方式)
// !!! 這一個範例不適當 !!!! 無法使用只能當錯誤範例解說!!!!!
// 適合兩個物件之間溝通的
// shared Event instance between Components
// 文件有寫 https://vuejs.org/v2/guide/components.html
// You cannot use $on to listen to events emitted by children.
// You must use v-on directly in the template, as in the example below.
// 只能在template中用v:on 方式去接
window.Event = new Vue();
// there will be two components sending data to each others
Vue.component('ball', {
  data(){
    return { inputData: '' } //物件自己bind自己的資料, 用data為setter, 不需要設定props
  },
  template: `
    <input type="text" placeholder="Enter your ball data" @blur="onBallApplied" v-model="inputData">
  `,
  methods: {
    onBallApplied(){
      // 物件發射到另一個物件用emit
      // this.$emit('data-was-input', function(){});
      // 物件監聽到另一個物件送過來的用on
      // this.$on('data-was-input', function(){});

      // 會用一個公用的Event來傳送與監聽
      Event.$emit('data-was-input', [this.inputData, 'xyz']);
    }
  }
});
var component6 = new Vue({
  el: '#component-event-dispatcher',
  data: {
    ballData: 'original text',
    testProp: {}
  },
  methods: {
  },
  created(){
    // 因為這是母子component, 必須要在template中用 v-on:data-was-input="xxxMethod的方式"
    // 而無法用event方式將子資料送到母
    Event.$on('data-was-input', function(data){
      // alert('first data is ' + data[0] + ' and second data is ' + data[1])
      data = 'first data is ' + data[0] + ' and second data is ' + data[1]
      console.log(data);
    });
  }
});
// Component - Two Components Event Dispatcher through Parent (parent-child communication)
// 要使用 v-on:custom-event:"someMethod"
// 兩個一樣的component資料互相傳遞, 例如兩個棒球員在場上不同位置, 互相傳球 (但透過母子傳遞)
Vue.component('player-pitcher', {
  props: { position: { required: true } }, //資料初始化setter, 只能透過methods去修改, 透過data return去取用
  data() {
    return {
      throwMessageText: ''
    }
  },
  template: `
    <div style="margin: 10px; padding: 10px; border: 1px; border-style: dotted; border-color: #ff0000;">
      <p>Player Position: {{ position }}</p>
      <input type="text" placeholder="input your message!!" @blur="throwMessage" v-model="throwMessageText">
      <p>Throw Message: {{ throwMessageText }}</p>
      <p>Catched Message: <slot></slot></p>
    </div>
  `,
  methods: {
    throwMessage(){
      this.$emit('pitcher-throw-message', [this.position, this.throwMessageText]);
    }
  },
  created() {
  }
});
Vue.component('player-catcher', {
  props: { position: { required: true } }, //資料初始化setter, 只能透過methods去修改, 透過data return去取用
  data() {
    return {
      throwMessageText: ''
    }
  },
  template: `
    <div style="margin: 10px; padding: 10px; border: 1px; border-style: dotted; border-color: #ff0000;">
      <p>Player Position: {{ position }}</p>
      <input type="text" placeholder="input your message!!" @blur="throwMessage" v-model="throwMessageText">
      <p>Throw Message: {{ throwMessageText }}</p>
      <p>Catched Message: <slot></slot></p>
    </div>
  `,
  methods: {
    throwMessage(){
      this.$emit('catcher-throw-message', [this.position, this.throwMessageText]);
    }
  },
  created() {
  }
});
var component7 = new Vue({
  el: '#component-event-dispatch-two-components-through-parent', //忘了加 # 的話就找不到component 因為是透過id去找的 要加入 #
  data: {
    catchMessageTextFromCatcher: '',
    catchMessageTextFromPicther: ''
  },
  methods: {
    receivePitcherMessage(msg){
      this.catchMessageTextFromPicther = 'receved message: ' + msg[1] + ' from ' + msg[0]
    },
    receiveCatcherMessage(msg){
      this.catchMessageTextFromCatcher = 'receved message: ' + msg[1] + ' from ' + msg[0]
    }
  },
  created(){
    // eventBus.$on('pitcher-throw-message', function(data){
    //   this.catchMessageText = 'catch message from pitcher: ' + data[1] + ' from player: ' + data[0]
    //   console.log('catched')
    // });
    // eventBus.$on('catcher-throw-message', function(data){
    //   this.catchMessageText = 'catch message from catcher: ' + data[1] + ' from player: ' + data[0]
    // });
  }
});
// Component - Two Sibling Component Event Dispatcher through Event Bus (sibling communication)
// 有兩種方式 by Listener or by parent instance data
// 參考 https://forum-archive.vuejs.org/topic/130/watch-prop-changes-from-inside-a-component/5
// 另一種方式參考 store vs. shared state 但這個寫得不太一樣 但沒有試驗過 https://vuejs.org/v2/guide/state-management.html
Vue.component('brother', {
  props: { name: { required: true } }, //資料初始化setter, 只能透過methods去修改, 透過data return去取用
  data() {
    return {
      throwMessageText: ''
    }
  },
  template: `
    <div style="margin: 10px; padding: 10px; border: 1px; border-style: dotted; border-color: #ff0000;">
      <p>Brother Name: {{ name }}</p>
      <input type="text" placeholder="input your message!!" @blur="throwMessage" v-model="throwMessageText">
      <p>Throw Message: {{ throwMessageText }}</p>
    </div>
  `,
  methods: {
    throwMessage(){
      data = this.name + ' says ' + this.throwMessageText
      Event.$emit('brother-throw-message', data);
    }
  }
});
Vue.component('sister', {
  props: {
    name: { required: true }
  }, //資料初始化setter, 只能透過methods去修改, 透過data return去取用
  data() {
    return {
      receivedMessage: '' //方法一的物件資料準備直接被更新
    }
  },
  template: `
    <div style="margin: 10px; padding: 10px; border: 1px; border-style: dotted; border-color: #ff0000;">
      <p>Sister Name: {{ name }}</p>
      <p>方法一 Catched Message through Component Listener: {{receivedMessage}}</p>
      <p>方法二 Catched Message through Parent: <slot></slot></p>
    </div>
  `,
  methods: {
  },
  created() {
    // 用一個this去接自己
    // 或會找到 this.someFunction.bind(this) { this.xxx } 的方式將this綁定在一起
    // 參考 https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind
    // 或用這個方式 bind(this) http://stackoverflow.com/questions/38064054/vue-js-global-event-bus
    var _this = this;
    Event.$on('brother-throw-message', function(data){
      //都是用listener的方式, 有兩種方式
      _this.receivedMessage = data;  //方法一: 用直接更新Component資料的方式, 比較乾淨
      component8.text = data //方法二: 用parent instance data 的轉傳方式
    });
  }
});
var component8 = new Vue({
  el: '#component-event-dispatch-sibiling-components',
  data: {
    text: 'original' //為了給方法二做中轉用的資料
  }
});

// 同型Component之間的傳送 Same Type Sibling Component Event Exchange by Listener
Vue.component('poker-player', {
  props: {
    name: { required: true },
    number: { required: true }
  },
  data(){
    return {
      exchangedCard: '',
      receivedCard: '',
      status: ''
    }
  },
  template: `
    <div style="margin: 10px; padding: 10px; border: 1px; border-style: dotted; border-color: #ff0000;">
      <p>Poker Player Name: {{ name }}</p>
      <p>Poker Player Number: {{ number }}</p>
      <input type="text" placeholder="exchange a card" @blur="exchangeCard" v-model="exchangedCard">
      <p>Exchanged Card: {{ exchangedCard }}<span></p>
      <p>Catched Message through Component Listener: {{receivedCard}}</p>
    </div>
  `,
  methods: {
    exchangeCard(){
      Event.$emit('exchange-card', [this.number, this.exchangedCard]);
    }
  },
  computed: {
    shouldReceiveFrom() {
      if (this.number === "1") {
        return "4";
      } else if (this.number === "2") {
        return "1";
      } else if (this.number === "3") {
        return "2";
      } else {  // this.number === "4"
        return "3";
      }
    }
  },
  created() {
    var _this = this;
    Event.$on('exchange-card', function(data){
      if (data[0] === _this.shouldReceiveFrom) {
        _this.receivedCard = data[1];
      }
    });
  }
});
var component9 = new Vue({
  el: '#same-type-sibling-component-event-exchange-by-listener',
});
