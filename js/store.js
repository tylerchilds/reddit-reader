(function(){
  function Store(namespace) {
    this.callbacks = [];
    this.list = (localStorage.getItem(namespace) || '').split(',');
    this.namespace = namespace;
  }

  Store.prototype = {
    add: function(subreddit){
      if(this.list.indexOf(subreddit) >= 0) return;

      this.list.push(subreddit);
      this.change();
    },

    remove: function(subreddit){
      var index = this.list.indexOf(subreddit);

      this.list.splice(index, 1);
      this.change();
    },

    subscribe: function(f){
      this.callbacks.push(f);
    },

    change: function(){
      localStorage.setItem(this.namespace, this.list)

      this.callbacks.forEach(function(f){
        f();
      });
    }
  }

  window.Store = Store;
})()
