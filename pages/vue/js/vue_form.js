// Form and FormError Object 可重複利用
// https://laracasts.com/series/learn-vue-2-step-by-step/episodes/19
// FormErrors物件就能被重複使用了, 能搭配Form的欄位做處理
// (refactor) 將FormErrors搬去 js/core/form_errors.js

// 負責所有Form內的動作與資料處理, 包含錯誤
// Form物件就能被重複使用了, 只需要建立時設定欄位名稱就能有統一的動作
// (refactor) 將Form搬去 js/core/form.js

// 讓Vue instance使需要建立對應的Form物件, 初始化Form物件的欄位, 接著在onSubmit時打出對應的API端點即可
// 一個user story有資料與動作, 資料對應Form物件欄位, 動作對應API端點

// 也能做npm install vue 與 npm install axios 與 npm install lodash
// 也能透過 import Vue from 'vue'; import axios from 'axios'; import lodash form 'lodash'; 的方式來引用就不需要CDN

// global import: 搭配 windows.axios = axios; 與 window.Form = Form 就能做到一次性import 不需要每次每個物件都import

import Form from './core/form.js';
import FormErrors from './core/form_errors.js';

var form = new Vue({
  el: '#form',
  components: {
    // register child component
  },
  data: {
    // 可以不斷的使用Form物件
    form: new Form({
      name: '',
      description: ''
    })
  },
  methods: {
    onSubmit(){
      //透過submit.prevent讓form打去後台REST api, 做處理導向
      alert('submitting...');
      // 統一將Form觸發的動作, 移動到Form物件, 只傳入要打的API端點, 呼叫哪個動作與端點
        // axios.post('/some_api', this.$data) //透過submit.prevent 讓form打去後台REST api, 做處理導向
        //   .then(function(response) {  // 或用 .then(this.someSuccessMethod) 呼叫另外一個客製化的method
        //     alert('api reseponse success');
        //     form.reset(); // submit成功後清除欄位資料
        //   })
        //   .catch(function(error) {
        //     alert('api response exception');
        //     this.form.errors.record(error.response.data); // 只是範例, 因為目前沒有api會打回來error.response.data可以參照
        //   });
      // 統一將Form觸發的動作, 移動到Form物件, 只傳入要打的API端點, 呼叫哪個動作與端點
      this.form.submit('post', '/some_api')
        .then(data => console.log(data))   //接受Promise resolve
        .catch(errors => console.log(errors));  //接受Promise reject
      // 能在成功時判斷要做什麼動作, 像是redirect頁面
    }
  }
});
