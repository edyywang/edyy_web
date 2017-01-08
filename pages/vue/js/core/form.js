import FormErrors from './form_errors.js';

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

export default Form;
