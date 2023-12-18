//REF:https://codepen.io/jonGomez/pen/YGOdPE
let currentUnit = "pixels";

$(function () {
  $(".movable").draggable({
    drag: function (event, ui) {
      //updateText();
    },
  });

  $(".movable").resizable({
    resize: function (event, ui) {
      //updateText();
    },
  });

  // Init the text.
  //updateText();
});

// Rest of your code remains the same...

// Update the dimensions for all elements with class "movable"
function updateText() {
  $(".movable").each(function () {
    let dim;
    let suffix;
    if (currentUnit == "pixels") {
      dim = getPixelDimensions($(this));
      suffix = "px";
    } else {
      dim = getPercentageDimensions($(this));
      suffix = "%";
    }

    // $(this)
    //   .find(".d")
    //   .remove();
    // for (prop in dim) {
    //   $(this)
    //     .append("<div class='d'>" + prop + ": " + dim[prop] + suffix + "</div>");
    // }

    // $(this).append("<div class='d'>rotate: " + $("#slider").slider("value") + "deg</div>");
  });
}

// Function to get pixel dimensions for a given element
function getPixelDimensions(element) {
  let precision = 100;
  let originalTransform = element.css('transform');
  element.css('transform', 'rotate(0deg)');
  let position = element.position();
  element.css('transform', originalTransform);

  let dim = {
    top: Math.round(position.top * precision) / precision,
    left: Math.round(position.left * precision) / precision,
    width: Math.round(element[0].clientWidth * precision) / precision,
    height: Math.round(element[0].clientHeight * precision) / precision,
  };

  return dim;
}

// Function to get percentage dimensions for a given element
function getPercentageDimensions(element) {
  let precision = 1000;
  let parentWidth = element.parent().width();
  let parentHeight = element.parent().height();

  let dim = getPixelDimensions(element);
  dim.top = Math.round(dim.top / parentHeight * precision) / precision;
  dim.left = Math.round(dim.left / parentWidth * precision) / precision;
  dim.width = Math.round(dim.width / parentWidth * precision) / precision;
  dim.height = Math.round(dim.height / parentHeight * precision) / precision;

  return dim;
}
