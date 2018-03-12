(function(Element, commentTemplate){
  // Class CommentThread
  // creates a comment thread that nests children
  function CommentThread(children, parent){
    Element.apply(this);

    this.$elem = this.loop(children, parent);
  }

  CommentThread.prototype = Object.create(Element.prototype)

  CommentThread.prototype.loop = function(children, parent){
    children.forEach(function(child){
      if(child.kind == "more") return;
      
      var comment = this.create('div', {
        className: "comment",
        innerHTML: commentTemplate(child.data)
      });

      parent.appendChild(comment)

      if(child.data.replies){
        this.loop(child.data.replies.data.children, comment);
      }
    }.bind(this));
  }

  window.CommentThread = CommentThread;
})(window.Element, window.commentTemplate)
