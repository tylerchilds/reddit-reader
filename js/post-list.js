(function(InfiniteList, Post, CommentThread){
  function PostList(options){
    InfiniteList.call(this);

    this.count = options.count;
    this.subreddits = options.subreddits || 'news';
    this.sort = options.sort;

    this.$elem = options.elem;
    this.$elem.innerHTML = '';
    this.fetchPosts();

    this.$elem.addEventListener('click', function(e) {
      if(e.target && e.target.classList.contains('load-comments')) {
        this.fetchComments(e.target)
      }
    }.bind(this));

    this.$elem.addEventListener('click', function(e) {
      if(e.target && e.target.classList.contains('toggle')) {
        e.target.parentNode.classList.toggle('collapsed');
        this.handleVisibility();
      }
    }.bind(this));
  }

  PostList.prototype = Object.create(InfiniteList.prototype)

  PostList.prototype.fetchPosts = function(){
    var thisList = this;
    thisList.fetchable = false;

    var req = new XMLHttpRequest();

    req.open('GET', 'https://www.reddit.com/r/'+ this.subreddits + '/'+ this.sort +'/.json?count='+ this.count +'&after='+ this.after);

    req.onload = function() {
      if (req.status === 200) {
        thisList.fetchable = true;

        var res = JSON.parse(req.responseText);
        thisList.after = res.data.after;

        res.data.children.forEach(function(item){
          var post = new Post(item);
          thisList.$elem.appendChild(post.$elem);
        })

        thisList.handleVisibility();
      } else {
       alert("Can't load posts")
      }
    };
    req.send();
  }

  PostList.prototype.fetchComments = function(target){
    var req = new XMLHttpRequest();

    req.open('GET', 'https://www.reddit.com/r/'+ target.dataset.subreddit +'/comments/'+ target.dataset.id +'/.json');

    req.onload = function() {
      if (req.status === 200) {
        var res = JSON.parse(req.responseText);
        var comments = new CommentThread(res[1].data.children, document.getElementById(target.dataset.id));
        target.remove();
      } else {
       alert("Can't load posts")
      }
    }
    req.send();
  }

  window.PostList = PostList;
})(window.InfiniteList, window.Post, window.CommentThread)
