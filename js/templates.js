(function(){
  window.postTemplate = Handlebars.compile(document.getElementById("post-template").innerHTML);
  window.commentTemplate = Handlebars.compile(document.getElementById("comment-template").innerHTML);
})()
