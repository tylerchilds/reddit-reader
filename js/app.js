(function(Element, PostList, Store){

  function App(){
    Element.apply(this)

    this.store = new Store('subreddit-list');
    this.store.subscribe(this.render.bind(this));

    this.$posts = document.getElementById('posts');
    this.$form = document.getElementById('add-form');
    this.$subreddits =  document.getElementById('subreddits');
    
    this.$form.addEventListener('submit', this.addSubreddit.bind(this));
    this.$subreddits.addEventListener('click', this.removeSubreddit.bind(this));
  }

  App.prototype = Object.create(Element.prototype)

  App.prototype.start = function(){
    this.render();
  }

  App.prototype.render = function(){
    new PostList({
      elem: this.$posts,
      count: 25,
      subreddits: this.store.list.join('+'),
      sort: ''
    });

    this.$subreddits.innerHTML = '';
    this.renderSubreddits.apply(this);
  }

  App.prototype.renderSubreddits = function(){
    this.store.list.forEach(function(item){
      if(item){
        this.$subreddits.appendChild(this.create('div', {
          className: 'remove-subreddit',
          textContent: item
        }));
      }
    }.bind(this))
  }

  App.prototype.addSubreddit = function(e){
    e.preventDefault();

    var input = document.getElementById('subreddit-field');
    this.store.add(input.value);
    input.value = '';
  }

  App.prototype.removeSubreddit = function(e){
    e.preventDefault();

    if(e.target && e.target.classList.contains('remove-subreddit')) {
      this.store.remove(e.target.textContent);
    }
  }
  
  new App().start();
  
})(window.Element, window.PostList, window.Store)
