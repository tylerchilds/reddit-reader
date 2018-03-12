## Reddit Reader

A simple way to view reddit. Built using my CSS framework, [Cutestrap](http://www.cutestrap.com).

### Setup

Load up the index.html file and you're good to go.

[View Demo](http://www.tylerchilds.com/reddit-reader/)

### Development Process

When deciding what tools or frameworks to use to build this, I thought about what would showcase my abilities the best. It would have been easier to build this using React and Redux, jQuery, underscore or even an infinite scrolling library. I landed on vanilla es5 to showcase that I'm not reliant on any individual tool.

You'll notice some inspiration from Redux with my use of the Store class. I used classList liberally, so this won't work in older versions of IE or edge. The tradeoff of was having easier to read code but losing browser compatibility. I would not make this sacrifice on an actual project.

### Future Feature Ideas

* Autocomplete for subreddits
* Sort mode
* Themes (Night mode)
* Sticky Sidebar
* Markdown support
* Create links in comments
* 18+ Filter
* Better Inline Content