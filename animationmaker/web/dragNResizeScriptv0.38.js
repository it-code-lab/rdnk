//REF:: https://codepen.io/QDeltaE/pen/VWEyLj

//SM-DND - Do not delete-Have HTML element like below to use the functionality
//<div class="smresizable resizable draggable">DRAG &amp;&amp; RESIZE</div> 
//console.log("Starting to load Draggable-Resizable script");

// $(function () {
//   $(".movable").draggable();

//   $(".movable").resizable();

// });


let dragging = false,
    currentDragged;

let resizeHandles = 
    `
<div class="resize nw" id="nw" draggable="false" contenteditable="false"></div>
<div class="resize n" id="n" draggable="false" contenteditable="false"></div>
<div class="resize ne" id="ne" draggable="false" contenteditable="false"></div>
<div class="resize w" id="w" draggable="false" contenteditable="false"></div>
<div class="resize e" id="e" draggable="false" contenteditable="false"></div>
<div class="resize sw" id="sw" draggable="false" contenteditable="false"></div>
<div class="resize s" id="s" draggable="false" contenteditable="false"></div>
<div class="resize se" id="se" draggable="false" contenteditable="false"></div>`;

let newWidth = 0;
let newHeight = 0;
let newLeft = 0;
let newTop = 0;

let resizing = false,
    currentResizeHandle,
    sX,
    sY;

let mousedownEventType = ((document.ontouchstart!==null)?'mousedown':'touchstart'),
    mousemoveEventType = ((document.ontouchmove!==null)?'mousemove':'touchmove'),
    mouseupEventType = ((document.ontouchmove!==null)?'mouseup':'touchend');

$('.smresizable')
.on(mousedownEventType, function(e){
 // Check if the element has the "disableResize" class
 if ($(this).hasClass('disableResize')) {
  return; // Skip function execution
}
  if (!e.target.classList.contains("resize") && !resizing) {
    currentDragged = $(this);
    dragging = true;
    sX = e.pageX;
    sY = e.pageY;
  }
});

// $(".resizable")
// .focus(function(e){
//   $(this).html($(this).html() + resizeHandles);
//   $(".resize").on(mousedownEventType, function(e){
//     currentResizeHandle = $(this);
//     resizing = true;
//     sX = e.pageX;
//     sY = e.pageY;
//   });
// })
// .blur(function(e){
//   $(this).children(".resize").remove();
// });

// Attach the .resize event handler outside of the dblclick handler
$(document).on(mousedownEventType, '.resize', function (e) {
  currentResizeHandle = $(this);
  resizing = true;
  sX = e.pageX;
  sY = e.pageY;
});

// Attach the dblclick event handler
$(".smresizable").on("dblclick", function (e) {
 // Check if the element has the "disableResize" class
 if ($(this).hasClass('disableResize')) {
  return; // Skip function execution
}
  if ($(this).find('.resize').length > 0) {
    $(this).children(".resize").remove();
  } else {
    $(this).html($(this).html() + resizeHandles);
  }
});
  // .on("mouseleave", function (e) {
  //   $(this).children(".resize").remove();
  // });

// let resizeTimeout;

// $(".smresizable")
//   .on("mouseenter", function (e) {
//     clearTimeout(resizeTimeout);
//     $(this).html($(this).html() + resizeHandles);
//     $(".resize").on(mousedownEventType, function (e) {
//       currentResizeHandle = $(this);
//       resizing = true;
//       sX = e.pageX;
//       sY = e.pageY;
//     });
//   })
//   .on("mouseleave", function (e) {
//     // Set a short delay before actually removing resize handles
//     resizeTimeout = setTimeout(() => {
//       $(this).children(".resize").remove();
//     }, 500); // Adjust the delay time as needed
//   })
//   .on("mouseenter", function (e) {
//     // If re-entering before the timeout, clear the timeout
//     clearTimeout(resizeTimeout);
//   });

$("body").on(mousemoveEventType, function(e) {
  let xChange = e.pageX - sX,
      yChange = e.pageY - sY;
  if (resizing) {
    e.preventDefault();
    
    let parent  = currentResizeHandle.parent();
    
    switch (currentResizeHandle.attr('id')) {
      case "nw":
        newWidth = parseFloat(parent.css('width')) - xChange,
            newHeight = parseFloat(parent.css('height')) - yChange,
            newLeft = parseFloat(parent.css('margin-left')) + xChange,
            newTop = parseFloat(parent.css('margin-top')) + yChange;
        break;
      case "n":
        newWidth = parseFloat(parent.css('width')),
            newHeight = parseFloat(parent.css('height')) - yChange,
            newLeft = parseFloat(parent.css('margin-left')),
            newTop = parseFloat(parent.css('margin-top')) + yChange;
        break;
      case "ne":
         newWidth = parseFloat(parent.css('width')) + xChange,
            newHeight = parseFloat(parent.css('height')) - yChange,
            newLeft = parseFloat(parent.css('margin-left')),
            newTop = parseFloat(parent.css('margin-top')) + yChange;
        break;
      case "e":
         newWidth = parseFloat(parent.css('width')) + xChange,
            newHeight = parseFloat(parent.css('height')),
            newLeft = parseFloat(parent.css('margin-left')),
            newTop = parseFloat(parent.css('margin-top'));
        break;
      case "w":
         newWidth = parseFloat(parent.css('width')) - xChange,
            newHeight = parseFloat(parent.css('height')),
            newLeft = parseFloat(parent.css('margin-left')) + xChange,
            newTop = parseFloat(parent.css('margin-top'));
        break;
      case "sw":
         newWidth = parseFloat(parent.css('width')) - xChange,
            newHeight = parseFloat(parent.css('height')) + yChange,
            newLeft = parseFloat(parent.css('margin-left')) + xChange,
            newTop = parseFloat(parent.css('margin-top'));
        break;
      case "s":
         newWidth = parseFloat(parent.css('width')),
            newHeight = parseFloat(parent.css('height')) + yChange,
            newLeft = parseFloat(parent.css('margin-left')),
            newTop = parseFloat(parent.css('margin-top'));
        break;
      case "se":
         newWidth = parseFloat(parent.css('width')) + xChange,
            newHeight = parseFloat(parent.css('height')) + yChange,
            newLeft = parseFloat(parent.css('margin-left')),
            newTop = parseFloat(parent.css('margin-top'));
        break;
    }
    //Width
    let slideParentDiv = parent.closest(".revealDummy");
    let containerWidth = parseFloat(slideParentDiv.css("width"));
    
    if (newLeft < 0) {
      newWidth += newLeft;
      newLeft = 0;
    }
    if (newWidth < 0) {
      newWidth = 0;
      newLeft = parent.css("margin-left");
    }
    if (newLeft + newWidth > containerWidth) {
      newWidth = containerWidth-newLeft;
    }
    
    parent
      .css('margin-left', newLeft + "px")
      .css('width', newWidth + "px");
    sX = e.pageX;

    //Height
    let containerHeight = parseFloat(slideParentDiv.css("height"));
    
    if (newTop < 0) {
      newHeight += newTop;
      newTop = 0;
    }
    if (newHeight < 0) {
      newHeight = 0;
      newTop = parent.css("margin-top");
    }
    if (newTop + newHeight > containerHeight) {
      newHeight = containerHeight-newTop;
    }
    
    parent
      .css('margin-top', newTop + "px")
      .css('height', newHeight + "px");
    sY = e.pageY;
    
  } else if (dragging) {
    e.preventDefault();
    
    let slideParentDiv = currentDragged.closest(".revealDummy");
    let containerWidth = parseFloat(slideParentDiv.css("width"));
    let containerHeight = parseFloat(slideParentDiv.css("height"));

    let draggedWidth = parseFloat(currentDragged.css("width")),
        draggedHeight = parseFloat(currentDragged.css("height"));
        //containerWidth = parseFloat(currentDragged.parent().css("width")),
        //containerHeight = parseFloat(currentDragged.parent().css("height"));
    
    let newLeft = (parseFloat(currentDragged.css("margin-left")) + xChange),
        newTop = (parseFloat(currentDragged.css("margin-top")) + yChange);
    
    if (newLeft < 0) {
      newLeft = 0;
    }
    if (newTop < 0) {
      newTop = 0;
    }
    if (newLeft + draggedWidth > containerWidth) {
      newLeft = containerWidth - draggedWidth;
    }
    if (newTop + draggedHeight > containerHeight) {
      newTop = containerHeight - draggedHeight;
    }
    
    currentDragged
      .css("margin-left", newLeft + "px")
      .css("margin-top", newTop + "px");
    sX = e.pageX;
    sY = e.pageY;
    
  }
})
.on(mouseupEventType, function(e){
  dragging = false;
  resizing = false;
});

//console.log("Draggable-Resizable script loaded");