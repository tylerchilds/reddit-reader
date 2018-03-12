(function(Element, postTemplate){
  // Class Post
  // creates a post element that has meta data and content
  function Post(item){
    Element.apply(this)

    item.data.isImage = item.data.post_hint == "image"

    var post = this.create('div', {
      className: "post",
      innerHTML: postTemplate(item.data),
      id: item.data.id
    });

    this.$elem = post;
  }

  Post.prototype = Object.create(Element.prototype)

  window.Post = Post;
})(window.Element, window.postTemplate)
