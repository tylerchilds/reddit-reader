(function(Post){

  var visisbleRegion = 2 * window.innerHeight;
  var bounds = {
    top: -1 * visisbleRegion,
    bottom: visisbleRegion,
  }

  // ES6: class MessagesList{}
  function InfiniteList(options){
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  InfiniteList.prototype.almostBottom = function(){
    var scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    return scrollOffset > document.body.offsetHeight - (window.innerHeight * 2);
  }

  InfiniteList.prototype.onScroll = function(e) {
    var list = this;

    if(list.fetchable && this.almostBottom()){
      list.fetchPosts();
    }

    if(! this.throttled){
      list.handleVisibility()
      list.throttled = true;
      setTimeout(function(){ list.throttled = false}, 200)
    }
  }

  InfiniteList.prototype.handleVisibility = function(){
    var children = Array.prototype.slice.call(this.$elem.children);

    children.forEach(function(el){
      var elemTop = el.getBoundingClientRect().top;
      var elemBottom = el.getBoundingClientRect().bottom;

      var withinBounds = (elemTop >= bounds.top) && (elemBottom <= bounds.bottom);
      var largerThanViewport = el.offsetHeight > window.innerHeight

      var isVisible = withinBounds || largerThanViewport;

      if(isVisible){
        el.style.visibility = "visible";
      } else {
        el.style.visibility = "hidden";
      }
    });
  }

  window.InfiniteList = InfiniteList;
})(window.Post)
