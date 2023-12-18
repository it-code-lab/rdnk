/*jshint node:false, jquery:true, strict:false */
$(function() {

    //dragElement( document.getElementById("separator"), "H" );

    read_settings_from_cookie();

    $.getJSON("./package.json", function(data) {
        $('#version-number').text('(v' + data.version + ')');
    });

    var default_text =
        "//Either paste the code here or select code file using 'Open File' button and click on Scan button.";
    var textArea = $('#source')[0];
    $('#source').val(default_text);

    //console.log("Inside onload.js function");
    if (the.use_codemirror && typeof CodeMirror !== 'undefined') {

        the.editor = CodeMirror.fromTextArea(textArea, {
            lineNumbers: true
        });
        set_editor_mode();
        the.editor.focus();

        $('.CodeMirror').click(function() {
            //console.log("Area clicked 1");
            if (the.editor.getValue() === default_text) {
                the.editor.setValue('');
            }
        });
    } else {
        $('#source').bind('click focus', function() {
            if ($(this).val() === default_text) {
                $(this).val('');
            }
        }).bind('blur', function() {
            if (!$(this).val()) {
                console.log("bind blur 1");
                $(this).val(default_text);
            }
        });
    }


    $(window).bind('keydown', function(e) {
        if (e.ctrlKey && e.keyCode === 13) {

            beautify();
        }
    });

    $('.submit').click(beautify);
    $('select').change(beautify);
    $(':checkbox').change(beautify);
    $('#additional-options').change(beautify);




});
// setTimeout(function() {
//     let deck1 = new Reveal( document.querySelector( '.deck1' ), {
//         embedded: true,
//         progress: false,
//         keyboardCondition: 'focused',
//         plugins: [RevealHighlight ]
//     } );

//     deck1.on( 'fragmentshown', event => {
//         var elem = event.fragment;
//         if (elem.classList.contains("countDown5")){
//             countDown5(elem);
//         };
//         if (elem.classList.contains("showRightAns")){
//             showRightAns(elem);
//         };        
//     } );

//     deck1.initialize({
//         disableLayout: true, 
//         autoPlayMedia: false,         // autoSlide: 5000, // loop: true,
//         slideNumber: true,
//     });         //Disable default layout, media autoplay
//     deck1.addEventListener( 'fragmentshown', playCurrentFragment );
//     deck1.addEventListener( 'fragmenthidden', playCurrentFragment );
// }, 2000);

// setTimeout(function() {
//     var elems = document.getElementsByClassName("soundPreviewByTitle");
//     for (i = 0; i < elems.length; i++) {
//         var elm = elems[i];
//         var audio = document.getElementById('audioPreview');
//         elm.addEventListener("mouseover", function() {
            

          
//             var source1 = document.getElementById('audioSourceIdMP3');
//             source1.src = "/animationmaker/sounds/" + elm.title + ".mp3" ;

//             var source2 = document.getElementById('audioSourceIdWAV');
//             source2.src = "/animationmaker/sounds/" + elm.title + ".wav" ;

//             audio.load(); //call this to just preload the audio without playing
//             audio.play(); //call this to play the song right away
//         })

//         elm.addEventListener("mouseleave", function() {
//             audio.pause();
//         })
//     }
// }, 200);


//plugins: [ RevealZoom, RevealNotes, RevealSearch, RevealMarkdown, RevealHighlight ]
/*
var coll = document.getElementsByClassName("collapsibleX");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
*/

