// component1.shared.user.name 與 componentㄉ.shared.user.name 與 store.user.name 修改時會一起改變, 都bind再一起
var store = {
  user: {
    name: 'John Doe'
  }
};
var component1 = new Vue({
  el: '#shared-state-1',
  data: {
    shared: store,
    foo1: 'bar1'
  }
});
var component2 = new Vue({
  el: '#shared-state-2',
  data: {
    shared: store,
    foo2: 'bar2'
  }
});
