// Example 1
var watchExampleVM1 = new Vue({
  el: '#watcher-example-1',
  data: {
    show_question: false,
    question: '',
    answer: 'I cannot give you an answer until you ask a question!',
    image_src: ''
  },
  watch: {
    // whenever question changes, this function will run
    question: function (newQuestion) {
      this.show_question = false
      this.answer = 'Waiting for you to stop typing...now your question is' + newQuestion
      this.getAnswer(newQuestion)
    }
  },
  methods: {
    // _.debounce is a function provided by lodash to limit how
    // often a particularly expensive operation can be run.
    // In this case, we want to limit how often we access
    // yesno.wtf/api, waiting until the user has completely
    // finished typing before making the ajax request. To learn
    // more about the _.debounce function (and its cousin
    // _.throttle), visit: https://lodash.com/docs#debounce
    getAnswer: _.debounce(function (newQuestion) {
        var vm = this
        if (this.question.indexOf('?') === -1) {
          vm.answer = 'Questions usually contain a question mark. ;-) Now you only type this: ' + newQuestion
          return
        }
        vm.answer = 'Thinking...'
        vm.image_src = ''
        // Ajax to get API response
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.show_question = true
            vm.answer = _.capitalize(response.data.answer)
            vm.image_src = response.data.image
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
            vm.image_src = '#'
          })
      }, 300)
  }
})
// Example 2
var watchExampleVM2 = new Vue({
  el: '#watcher-example-2',
  data: {
    joke: '',
  },
  watch: {
    // whenever question changes, this function will run
    question: function () {
      this.joke = ''
      this.getJoke()
    }
  },
  methods: {
    newFunction() {
      // do something
    },
    oldFunction: function() {
      // do something
    },
    getJoke: _.debounce(function () {
          var vm = this
          vm.joke = 'waiting for Chuck Norris...'
          // Ajax to get API response
          axios.get('https://api.chucknorris.io/jokes/random')
            .then(function (response) {
              vm.joke = response.data.value
            })
            .catch(function (error) {
              vm.joke = 'Error! Could not reach the API. ' + error
            })
    }, 100)
  }
})
