// Form and FormError Object 可重複利用
// https://laracasts.com/series/learn-vue-2-step-by-step/episodes/19
// FormErrors物件就能被重複使用了, 能搭配Form的欄位做處理
class FormErrors {
  constructor() {
    this.errors = {};
  }
  get(field) {
    if (this.errors[field]) {
      return this.errors[field][0];
    }
  }
  has(field) {
    return this.errors.hasOwnProperty(field);
  }
  any(){
    return Object.keys(this.errors).length > 0; // if error length > 0 then got error message
  }
  record(errors) {
    this.errors = errors;
  }
  clear(field){
    if (field) {
      delete this.errors[field];
      return;
    }
    this.errors = {};
  }
}

// 負責所有Form內的動作與資料處理, 包含錯誤
// Form物件就能被重複使用了, 只需要建立時設定欄位名稱就能有統一的動作
class Form {
  constructor(data) {
    this.originalData = data;
    for (let field in data) {
      this[field] = data[field];
    }
    this.errors = new FormErrors(); // 將錯誤訊息也統一放在Form內
  }
  reset() {
    for (let field in this.originalData) {
      this[field] = '';
    }
    this.errors.clear();
  }
  data() {
    // 傳資料欄位給API使用
    let data = {};
    for (let property in this.originalData) {
      data[property] = this[property];
    }
    return data;
  }
  submit (requestType, url) {
    // 回傳一個Promise給 .then 與 .catch 就像axios會傳回Promise所以能用.then與.catch
    return new Promise((resolve, reject) => {
      // 處理axios動作, 但post或get都要小寫
      // this.data() 是呼叫傳送Form的欄位資料
      axios[requestType](url, this.data())
        .then(response => {
          this.onSuccess(response.data);
          resolve(response.data);
        })
        .catch(error => {
          this.onFail(error.response.data);
          reject(error.response.data);
        });
        //也能透過方法內的this綁同一個this 例如 this.onSomeAction.bind(this) 將呼叫的this傳入方法內的this
    });
  }
  onSuccess(data) {
    // 統一的Form成功處理方法
    alert('api reseponse success' + data.message);
    this.reset(); // submit成功後清除欄位資料

  }
  onFail(data) {
    // 統一的Form錯誤處理方法
    alert('api response exception');
    this.form.errors.record(data); // 只是範例, 因為目前沒有api會打回來error.response.data可以參照
  }
}

// 讓Vue instance使需要建立對應的Form物件, 初始化Form物件的欄位, 接著在onSubmit時打出對應的API端點即可
// 一個user story有資料與動作, 資料對應Form物件欄位, 動作對應API端點
var form = new Vue({
  el: '#form',
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
