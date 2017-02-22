### Project Overview

You will optimize a provided website with a number of optimization- and performance-related issues so that it achieves a target PageSpeed score and runs at 60 frames per second.

### Getting started

#### View online

View [http://liminjun.github.io/Udacity_Front_End_Developer/p6-website-optimization/](http://liminjun.github.io/Udacity_Front_End_Developer/p6-website-optimization/) in your browser.

#### Run it locally
1. **Pre-requisite** : 
Install [node.js](https://nodejs.org/), and [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

2. Clone this repo. Open your terminal and run `https://github.com/liminjun/Udacity_Front_End_Developer.git`

3. cd to "p6-website-optimization" using `cd p6-website-optimization`

4. Install [browser-sync](https://browsersync.io/)  using `npm` by `npm install -g browser-sync`

5. Then run `browser-sync start --server` in terminal inside current folder.

6. View the URL `http://localhost:3000/` in browser.


### Optimization
#### Part 1: Optimize PageSpeed Insights score for index.html

**HTML**

Compressed the html using tools.

**CSS**

1. Inlined all of css files into the head of document. Compressed the css file.
2. Remove the Google Fonts.

**JavaScript**

1. Loaded the js files of Google Analytics async.
2. Compressed the js file. using `perfmatters.min.js` on the page.

**Images**

Using CDN　for all images.


#### Part 2: Optimize Frames per Second in pizza.html

**Fixed the error typing.**
Update the `noisy` to `noise`
`
var adjectives = ["dark", "color", "whimsical", "shiny", "noisy", "apocalyptic", "insulting", "praise", "scientific"];
`

**Reduced Pizza Elements**
Reduced the number of sliding pizza elements when DOM content loaded.
`for (var i = 0; i < 30; i++) {`

```javascript
document.addEventListener('DOMContentLoaded', function () {
  var cols = 8;
  var s = 256;
  //change 200 to 30.
  for (var i = 0; i < 30; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "images/pizza.png";
    
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    document.querySelector("#movingPizzas1").appendChild(elem);
  }
  updatePositions();
});
```

**Don't resize the image in browser**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  var cols = 8;
  var s = 256;
  for (var  i = 0; i < 30; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "images/pizza.png";
    // elem.style.height = "100px";
    // elem.style.width = "73.333px";
    //using image's default width and height. Don't resize the image in browser.
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    document.querySelector("#movingPizzas1").appendChild(elem);
  }
  updatePositions();
});
```

**Optimized Animations**
Using window.requestAnimationFrame method in the scroll event listener 

```javascript
window.addEventListener('scroll', function() {
    window.requestAnimationFrame(updatePositions);
});
```

**Using the first pizza's size**
```javascript
function changePizzaSizes(size) {
    //using first element size
    var dx = determineDx(document.querySelector(".randomPizzaContainer"), size);
    var newwidth = (document.querySelector(".randomPizzaContainer").offsetWidth + dx) + 'px';
    
    var elements = document.querySelectorAll(".randomPizzaContainer");
    for (var i = 0; i < elements.length; i++) {

      elements[i].style.width = newwidth;
    }
  }
```