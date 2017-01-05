// Component Template Example:
// [for customized DOM]
// Vue.component('tabs', {
//   // like setter
//   props: [],
//   // like getter
//   data() { return{}; },
//   // like processed getter
//   computed: {},
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
//   data: {
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
  // 在template中的modal template, 會在按鈕下去時發射emit出一個close event到上一層
  methods: {}
});
var component3 = new Vue({  //永遠需要將DOM mount上Vue物件, 才能讓DOM與Vue做雙向binding
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
// component sample: custom events
// 參考子物件emit資料到父instance的方法
// https://laracasts.com/discuss/channels/vue/how-to-catch-a-childs-emit-in-the-parent-with-vue?page=1
Vue.component('coupon', {
  data(){
    return { couponCodeData: '' } //物件自己bind自己的資料, 用data為setter, 不需要設定props
  },
  template: `
    <input type="text" placeholder="Enter your coupon code" @blur="onCouponApplied" v-model="couponCodeData">
  `,
  methods: {
    onCouponApplied(){
      //發射event上一層去時就要使用$emit 並且可以傳送一個物件
      //發射一個custom event叫做 coupon-was-applied到DOM去 (標準的event有像是click或是keyup)
      //在$emit客製化event時, 也能傳送一組arrry的資料, 會bind到父instance的方法去
      this.$emit('coupon-was-applied', [this.couponCodeData, 'xyz']);
    }
  }
});
var component5 = new Vue({
  el: '#component-custom-event',
  data: {
    couponResult: '',
    showCouponDetail: false
  },
  methods: {
    onCouponApplied(couponCodeData){ // couponCodeData 是從子物件emit傳出來的資料
      this.couponResult = couponCodeData[0] + ' was applied! ' + couponCodeData[1]
      this.showCouponDetail = true
    }
  }
});
// component sample: event dispatcher


var component6 = new Vue({
  el: '#component-event-dispatcher',
  data: {
  },
  methods: {
  }
});
