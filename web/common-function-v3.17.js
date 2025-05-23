/*jshint strict:false, node:false */
/*exported run_tests, read_settings_from_cookie, beautify, submitIssue, copyText, selectAll, clearAll, changeToFileContent*/
/*
https://javascript-minifier.com/ 
*/
var the = {
    use_codemirror: !window.location.href.match(/without-codemirror/),
    beautifier_file: window.location.href.match(/debug/) ? 'beautifier' : './beautifier.min',
    beautifier: null,
    beautify_in_progress: false,
    editor: null, // codemirror editor

    codetext: null, // SM:Added
    commentedCodePosArr: null, // SM:Added
    codeLanguage: null, // SM:Added
    codeLanguageRowId: null, // SM:Added
    languageListPopulated: null, // SM:Added
    selectedCodeId: null, // SM:Added
    languageOverridden: null, //SM:Added
    newProjectContent: [], //SM:Added
    uploadedFiles: null, //SM:Added
    idOfProjectToUpdate: null, //SM:Added
    captcha: null, //SM:Added
    LanguageHelpCodeAndIds_LclJson: null, //SM:Added
    filelvlhelp: null,
    smusr: false,
    hosturl: '/readernook',
    hostnm: 'readernook',
};
let soundApiKey;
let timerInterval;

const API_URL = the.hosturl + '/php/process.php'; // Change to your actual API URL

var last_focused_div_id;
// Record the start time
const startTime = new Date().getTime();

// requirejs.config({
//     //By default load any module IDs from js/lib
//     baseUrl: 'js/lib',
//     paths: {
//         'beautifier': the.beautifier_file
//     }
// });

// requirejs(['beautifier'],
//     function(beautifier) {
//         the.beautifier = beautifier;
//     });

document.addEventListener('keydown', function (event) {
    
    // Check if the Ctrl key (Cmd key on macOS) and the 'C' key are pressed simultaneously.
    if (event.ctrlKey && event.key === 's') {
        const saveButton = document.getElementById("saveChangesBtnId");
        // Check if the button is visible
        if (saveButton) {
            const computedStyle = window.getComputedStyle(saveButton);
            const isButtonVisible = computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
            
            if (isButtonVisible) {
                saveButton.click();
                event.preventDefault();
            } 
        }
    }
    
    if (event.ctrlKey && event.key === 'b') {
        const insertHTMLButton = document.getElementById("insertHTMLbtnId");
        // Check if the button is visible
        if (insertHTMLButton) {
            const computedStyle = window.getComputedStyle(insertHTMLButton);
            const isButtonVisible = computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
            
            if (isButtonVisible) {
                insertHTMLButton.click();
                event.preventDefault();
            } 
        }
    }
    //return false;
});

document.onpaste = function (event) {

    if (localStorage.getItem("userLoggedIn") == "n") {
        return;

    } else if (localStorage.getItem("userLvl") != "9") {
        return;
    }

    let items = (event.clipboardData || event.originalEvent.clipboardData).items;
    //console.log(JSON.stringify(items)); // might give you mime types
    for (let index in items) {
        let item = items[index];
        if (item.kind === 'file') {
            event.preventDefault();
            let blob = item.getAsFile();
            let saveAsName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "-" + (Math.floor(Math.random() * 1000000) + 1) + ".png";
            let maximumSize = 500;

            let inputElements = document.getElementsByClassName('imageszCls');
            if (inputElements.length > 0) {
                maximumSize = inputElements[0].value;
            }

            resizeImage({
                file: blob,
                maxSize: maximumSize
            }).then(function (resizedImage) {

                let formData = new FormData();
                formData.append("file", resizedImage);
                formData.append("saveasname", saveAsName);
                formData.append("dir", "img");

                let xhttp = new XMLHttpRequest();

                xhttp.open("POST", the.hosturl + "/php/upload.php", true);

                // call on request changes state
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {

                        //let response = this.responseText;
                        //console.log(response);

                         let imagename = saveAsName;
                        let randomId = "div-" + Math.floor(Math.random() * 1000000);
                        let Str = "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'image1-desc'> " + "<img class='movieImageCls' alt ='' src= '" + the.hosturl + "/img/" + imagename + "'> " 
                          + "<div class='imageButtonsDiv'>"
                          + "<button title='clear image without deleting from backend' class='deleteDivInnImg' onclick=deleteCurrentComponent(this.parentElement) ></button>" 
                          + "<button title='Remove image and delete from backend' class='deleteDivInnImgBk' onclick=deleteCurrentComponentAndRemoveBK(this.parentElement) ></button>" 
                          + "<button class='copyHtmlButton' style='margin-left: 5px;'>Copy HTML</button>"
                          + "<button class='imagePropButton' style='margin-left: 5px;'>Toggle Properties</button>"
                          + "</div>"
                          + "</div>";


                          insertContentAtCaret(Str);
                    }
                };

                xhttp.send(formData);
            }).catch(function (err) {
                //console.error(err);
            });            
            // let reader = new FileReader();
            // reader.onload = function (event) {
            //     console.log(event.target.result); // data url!
            // }; 
            // reader.readAsDataURL(blob);
        }
    }
};

function any(a, b) {
    return a || b;
}

function setLastFocusedDivId(id) {
    last_focused_div_id = id;
    //console.log(id);
}

//https://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
function insertImageAtCaret(html) {
    if (html == "") {
        html = "<b>Dummy Text</b>";
    }

    let sel, range;

    if (window.getSelection) {
        // Modern browsers (IE9+ and non-IE)
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);

            // Traverse up the DOM tree to find a parent with class "editDescriptionDiv"
            let parentElement = range.commonAncestorContainer;
            let isInsideEditableDiv = false;

            while (parentElement) {
                if (parentElement.nodeType === 1 && parentElement.classList.contains("editDescriptionDiv")) {
                    isInsideEditableDiv = true;
                    break;
                }
                parentElement = parentElement.parentNode;
            }

            if (!isInsideEditableDiv) {
                alert("Please place the cursor inside an editable div with class 'editDescriptionDiv' to insert content.");
                return;
            }

            range.deleteContents();

            const el = document.createElement("div");
            el.innerHTML = html;

            const frag = document.createDocumentFragment();
            let lastNode;
            while (el.firstChild) {
                lastNode = frag.appendChild(el.firstChild);
            }

            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type !== "Control") {
        // IE < 9
        range = document.selection.createRange();
        let parentElement = range.parentElement();
        let isInsideEditableDiv = false;

        // Traverse up the DOM tree to find a parent with class "editDescriptionDiv"
        while (parentElement) {
            if (parentElement.nodeType === 1 && parentElement.classList.contains("editDescriptionDiv")) {
                isInsideEditableDiv = true;
                break;
            }
            parentElement = parentElement.parentNode;
        }

        if (!isInsideEditableDiv) {
            alert("Please place the cursor inside an editable div with class 'editDescriptionDiv' to insert content.");
            return;
        }

        range.pasteHTML(html);
    }
}

function insertClipboardHTMLAtCaret() {

    
    let htmlData = document.getElementById("htmlDataInsert").value;


    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = htmlData ;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}

function set_editor_mode() {
    //logCommon("set_editor_mode called");

    if (the.editor) {
        var language = $('#language').val();
        var mode = 'javascript';
        if (language === 'js') {
            mode = 'javascript';
        } else if (language === 'html') {
            mode = 'htmlmixed';
        } else if (language === 'css') {
            mode = 'css';
        }
        //mode = "COBOL"
        the.editor.setOption("mode", mode);
    }
}

function run_tests() {
    logCommon("run_tests called");

    $.when($.getScript("js/test/sanitytest.js"),
        $.getScript("js/test/generated/beautify-javascript-tests.js"),
        $.getScript("js/test/generated/beautify-css-tests.js"),
        $.getScript("js/test/generated/beautify-html-tests.js"))
        .done(function () {
            var st = new SanityTest();
            run_javascript_tests(st, Urlencoded, the.beautifier.js, the.beautifier.html, the.beautifier.css);
            run_css_tests(st, Urlencoded, the.beautifier.js, the.beautifier.html, the.beautifier.css);
            run_html_tests(st, Urlencoded, the.beautifier.js, the.beautifier.html, the.beautifier.css);
            JavascriptObfuscator.run_tests(st);
            P_A_C_K_E_R.run_tests(st);
            Urlencoded.run_tests(st);
            MyObfuscate.run_tests(st);
            var results = st.results_raw()
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/ /g, '&nbsp;')
                .replace(/\r/g, '·')
                .replace(/\n/g, '<br>');
            $('#testresults').html(results).show();
        });
}

function read_settings_from_cookie() {
    //logCommon("read_settings_from_cookie called");

    $('#tabsize').val(any(Cookies.get('tabsize'), '4'));
    $('#brace-style').val(any(Cookies.get('brace-style'), 'collapse'));
    $('#detect-packers').prop('checked', Cookies.get('detect-packers') !== 'off');
    $('#max-preserve-newlines').val(any(Cookies.get('max-preserve-newlines'), '5'));
    $('#keep-array-indentation').prop('checked', Cookies.get('keep-array-indentation') === 'on');
    $('#break-chained-methods').prop('checked', Cookies.get('break-chained-methods') === 'on');
    $('#indent-scripts').val(any(Cookies.get('indent-scripts'), 'normal'));
    $('#additional-options').val(any(Cookies.get('additional-options'), '{}'));
    $('#space-before-conditional').prop('checked', Cookies.get('space-before-conditional') !== 'off');
    $('#wrap-line-length').val(any(Cookies.get('wrap-line-length'), '0'));
    $('#unescape-strings').prop('checked', Cookies.get('unescape-strings') === 'on');
    $('#jslint-happy').prop('checked', Cookies.get('jslint-happy') === 'on');
    $('#end-with-newline').prop('checked', Cookies.get('end-with-newline') === 'on');
    $('#indent-inner-html').prop('checked', Cookies.get('indent-inner-html') === 'on');
    $('#comma-first').prop('checked', Cookies.get('comma-first') === 'on');
    $('#e4x').prop('checked', Cookies.get('e4x') === 'on');
    $('#language').val(any(Cookies.get('language'), 'js'));
    $('#indent-empty-lines').prop('checked', Cookies.get('indent-empty-lines') === 'on');
}

function store_settings_to_cookie() {

    //logCommon("store_settings_to_cookie called");

    var opts = {
        expires: 360
    };
    Cookies.set('tabsize', $('#tabsize').val(), opts);
    Cookies.set('brace-style', $('#brace-style').val(), opts);
    Cookies.set('detect-packers', $('#detect-packers').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('max-preserve-newlines', $('#max-preserve-newlines').val(), opts);
    Cookies.set('keep-array-indentation', $('#keep-array-indentation').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('break-chained-methods', $('#break-chained-methods').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('space-before-conditional', $('#space-before-conditional').prop('checked') ? 'on' : 'off',
        opts);
    Cookies.set('unescape-strings', $('#unescape-strings').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('jslint-happy', $('#jslint-happy').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('end-with-newline', $('#end-with-newline').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('wrap-line-length', $('#wrap-line-length').val(), opts);
    Cookies.set('indent-scripts', $('#indent-scripts').val(), opts);
    Cookies.set('additional-options', $('#additional-options').val(), opts);
    Cookies.set('indent-inner-html', $('#indent-inner-html').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('comma-first', $('#comma-first').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('e4x', $('#e4x').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('language', $('#language').val(), opts);
    Cookies.set('indent-empty-lines', $('#indent-empty-lines').prop('checked') ? 'on' : 'off', opts);

}

function unpacker_filter(source) {
    logCommon("unpacker_filter called");
    var leading_comments = '',
        comment = '',
        unpacked = '',
        found = false;

    // cuts leading comments
    do {
        found = false;
        if (/^\s*\/\*/.test(source)) {
            found = true;
            comment = source.substr(0, source.indexOf('*/') + 2);
            source = source.substr(comment.length);
            leading_comments += comment;
        } else if (/^\s*\/\//.test(source)) {
            found = true;
            comment = source.match(/^\s*\/\/.*/)[0];
            source = source.substr(comment.length);
            leading_comments += comment;
        }
    } while (found);
    leading_comments += '\n';
    source = source.replace(/^\s+/, '');

    var unpackers = [P_A_C_K_E_R, Urlencoded, JavascriptObfuscator /*, MyObfuscate*/];
    for (var i = 0; i < unpackers.length; i++) {
        if (unpackers[i].detect(source)) {
            unpacked = unpackers[i].unpack(source);
            if (unpacked !== source) {
                source = unpacker_filter(unpacked);
            }
        }
    }

    return leading_comments + source;
}


function beautify() {
    //logCommon("beautify called");

    if (the.beautify_in_progress) {
        return;
    }

    store_settings_to_cookie();

    the.beautify_in_progress = true;

    var source = the.editor ? the.editor.getValue() : $('#source').val(),
        output,
        opts = {};
    the.lastInput = source;

    var additional_options = $('#additional-options').val();

    var language = $('#language').val();
    the.language = $('#language option:selected').text();

    opts.indent_size = $('#tabsize').val();
    opts.indent_char = parseInt(opts.indent_size, 10) === 1 ? '\t' : ' ';
    opts.max_preserve_newlines = $('#max-preserve-newlines').val();
    opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
    opts.keep_array_indentation = $('#keep-array-indentation').prop('checked');
    opts.break_chained_methods = $('#break-chained-methods').prop('checked');
    opts.indent_scripts = $('#indent-scripts').val();
    //opts.brace_style = $('#brace-style').val() + ($('#brace-preserve-inline').prop('checked') ? ",preserve-inline" : "");

    opts.brace_style = "collapse";

    opts.space_before_conditional = $('#space-before-conditional').prop('checked');
    opts.unescape_strings = $('#unescape-strings').prop('checked');
    opts.jslint_happy = $('#jslint-happy').prop('checked');
    opts.end_with_newline = $('#end-with-newline').prop('checked');
    opts.wrap_line_length = $('#wrap-line-length').val();
    opts.indent_inner_html = $('#indent-inner-html').prop('checked');
    opts.comma_first = $('#comma-first').prop('checked');
    opts.e4x = $('#e4x').prop('checked');
    opts.indent_empty_lines = $('#indent-empty-lines').prop('checked');



    $('#additional-options-error').hide();
    $('#open-issue').hide();

    if (additional_options && additional_options !== '{}') {
        try {
            additional_options = JSON.parse(additional_options);
            opts = mergeObjects(opts, additional_options);
        } catch (e) {
            $('#additional-options-error').show();
        }
    }

    var selectedOptions = JSON.stringify(opts, null, 2);
    $('#options-selected').val(selectedOptions);

    if (language === 'html') {
        output = the.beautifier.html(source, opts);
    } else if (language === 'css') {
        output = the.beautifier.css(source, opts);
    } else {
        if ($('#detect-packers').prop('checked')) {
            source = unpacker_filter(source);
        }
        output = the.beautifier.js(source, opts);
    }

    if (the.editor) {
        //logCommon("setting editor value to " + output);

        the.editor.setValue(output);
    } else {
        logCommon("setting source value to " + output);
        $('#source').val(output);
    }

    the.lastOutput = output;
    the.lastOpts = selectedOptions;

    $('#open-issue').show();
    set_editor_mode();

    the.beautify_in_progress = false;
}

function mergeObjects(allOptions, additionalOptions) {
    logCommon("mergeObjects called");
    var finalOpts = {};
    var name;

    for (name in allOptions) {
        finalOpts[name] = allOptions[name];
    }
    for (name in additionalOptions) {
        finalOpts[name] = additionalOptions[name];
    }
    return finalOpts;
}

function submitIssue() {
    var url = 'https://github.com/beautify-web/js-beautify/issues/new?';

    var encoded = encodeURIComponent(getSubmitIssueBody()).replace(/%20/g, "+");
    if (encoded.length > 7168) {
        var confirmText = [
            'The sample text is too long for automatic template creation.',
            '',
            'Click OK to continue and create an issue starting with template defaults.',
            'Click CANCEL to return to the beautifier and try beautifying a shorter sample.'
        ];

        if (!confirm(confirmText.join('\n'))) {
            $('#open-issue').hide();
            return;
        }
        encoded = encodeURIComponent(getSubmitIssueBody(true)).replace(/%20/g, "+");
    }
    url += 'body=' + encoded;

    logCommon(url);
    logCommon(url.length);

    window.open(url, '_blank').focus();
}

function getSubmitIssueBody(trucate) {
    var input = the.lastInput;
    var output = the.lastOutput;

    if (trucate) {
        input = '/* Your input text */';
        output = '/* Output text currently returned by the beautifier */';
    }

    var submit_body = [
        '# Description',
        '<!-- Describe your scenario here -->',
        '',
        '## Input',
        'The code looked like this before beautification:',
        '```',
        input,
        '```',
        '',
        '## Current Output',
        'The  code actually looked like this after beautification:',
        '```',
        output,
        '```',
        '',
        '## Expected Output',
        'The code should have looked like this after beautification:',
        '```',
        '/* Your desired output text */',
        '```',
        '',
        '# Environment',
        '',
        '## Browser User Agent:',
        navigator.userAgent,
        '',
        'Language Selected:',
        the.language,
        '',
        '## Settings',
        '```json',
        the.lastOpts,
        '```',
        ''
    ];
    return submit_body.join('\n');
}

function copyText() {
    if (the.editor) {
        the.editor.execCommand('selectAll');
        var currentText = the.editor.getValue();
        var copyArea = $('<textarea />')
            .text(currentText)
            .attr('readonly', '')
            .css({
                'position': 'absolute',
                'left': '-9999px'
            });

        $('body').append(copyArea);
        copyArea.select();
        document.execCommand('copy');
        copyArea.remove();
    } else {
        $('#source').select();
        document.execCommand('copy');
    }
}

function selectAll() {
    if (the.editor) {
        the.editor.execCommand('selectAll');
    } else {
        $('#source').select();
    }
}

function clearAll() {
    if (the.editor) {
        the.editor.setValue('');
    } else {
        $('#source').val('');
    }
}

function getLanguageForFileExtension(fileExtension) {
    //var newLanguage = "";


    var tf = JSON.parse(sessionStorage.getItem("LanguageForFileExtension"));

    var filteredRows = JSON.parse(tf).filter(function (entry) {
        var evalStr = entry.fileextension;
        return evalStr.toUpperCase() === fileExtension.toUpperCase();
    });


    if (filteredRows.length > 0) {
        the.filelvlhelp = filteredRows[0].filelvlhelp;
        return filteredRows[0].language;
    } else {
        return "";
    }

}

async function changeToFileContent(input) {

    logCommon("changeToFileContent called");
    var file = input.files[0];


    if (file) {
        var fileName = file.name;
        var arr = fileName.split(".");
        var fileExtension = arr[1];
        var newLanguage = getLanguageForFileExtension(fileExtension);

        document.getElementById("displayFileLoaderDivId").style.display = "block";


        var reader = new FileReader();



        reader.onload = function (event) {
            if (the.editor) {
                the.editor.setValue(event.target.result);
                the.codetext = the.editor.getValue();
            } else {
                $('#source').val(event.target.result);
                the.codetext = event.target.result;
            }
            document.getElementById("selectfile").innerHTML = "<i class='fas fa-folder-open' style='font-size:20px;color:purple'></i>&nbsp" + fileName;

            if (newLanguage != "") {
                the.codeLanguage = newLanguage;
                the.languageOverridden = true;


                document.getElementById("language-box").value = newLanguage;

                markHelpCodes();

                languageDeterminedThruExt("Code Language is " + newLanguage + " based on file extension" + ". If it looks incorrect, please override the language.");

                //document.querySelector('#scanEditbtnId').innerText = 'Edit';
                document.querySelector('#scanEditbtnId').innerHTML = '<i class="smalltip fa fa-edit" style="font-size:16px; color:blue"><span>Edit</span></i>';

                var gf = JSON.parse(sessionStorage.getItem("SpecialFiles"));

                var filteredRows = JSON.parse(gf).filter(function (entry) {
                    var evalStr = entry.filename;
                    return evalStr.toUpperCase() === fileName.toUpperCase();
                });


                if (filteredRows.length > 0) {
                    document.getElementById("filelvlhelpdivid").innerHTML = filteredRows[0].description;
                    document.getElementById("filelvlhelpdivid").style.display = "block";
                } else {
                    if (the.filelvlhelp != null) {
                        if (the.filelvlhelp != "") {
                            document.getElementById("filelvlhelpdivid").innerHTML = the.filelvlhelp;
                            document.getElementById("filelvlhelpdivid").style.display = "block";
                        }
                    }
                }



            } else {
                document.getElementById("sourceDiv").style.display = "block";
                document.getElementById("destinationDiv").style.display = "none";
                document.getElementById("source").value = the.codetext;
                //document.querySelector('#scanEditbtnId').innerText = 'Scan';
                document.querySelector('#scanEditbtnId').innerHTML = '<i class="smalltip fa fa-search" style="font-size:16px; color:blue"><span>Scan</span></i>';

                languageNotDeterminedMsg();

            }

        };
        reader.readAsText(file, "UTF-8");

        document.getElementById("displayFileLoaderDivId").style.display = "none";
        //document.querySelector('#scanEditbtnId').innerText = 'Scan';
        document.querySelector('#scanEditbtnId').innerHTML = '<i class="smalltip fa fa-search" style="font-size:16px; color:blue"><span>Scan</span></i>';
    }
}

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = res => {
            resolve(res.target.result);
        };
        reader.onerror = err => reject(err);

        reader.readAsText(file);
    });
}


//SM: Below are the added functions************************

function getCommentsCodesForLanguage(Language) {
    var tf = JSON.parse(sessionStorage.getItem("CodeCommentsConditions"));

    var filteredRows = JSON.parse(tf).filter(function (entry) {
        return entry.code_language === Language;
    });

    //logCommon(filteredRows);
    return filteredRows;

}

function getArrayOfCommentedCodeChars(codetext) {
    //SM:Note: try to call it only once for a CodeText
    //****This function returns the blocks that are comments for all possible language comments*********

    logCommon("Inside getArrayOfCommentedCodeChars");
    if (the.commentedCodePosArr != null) {
        return;
    }

    var tf = JSON.parse(sessionStorage.getItem("CommentsCombination"));
    var rows = JSON.parse(tf);

    var arr = [];

    for (var i = 0; i < rows.length; i++) {
        var r_comment_start = rows[i].comment_start;
        var r_comment_end = rows[i].comment_end;

        arr[i] = [];
        arr[i][0] = r_comment_start;
        arr[i][1] = r_comment_end;
        if (r_comment_end == null) {
            r_comment_end = '\n';
        }
        //console.log(r_comment_end)

        var commentedCodeArr = [];
        var searchStartPos = 0;
        var commentStart = 0;
        var commentEnd = 0;
        var seqNbr = 0;

        do {

            var commentStart = codetext.indexOf(r_comment_start, searchStartPos)
            if (commentStart < 0) {
                break;
            }
            commentedCodeArr[seqNbr] = [];

            commentedCodeArr[seqNbr][0] = commentStart;
            commentEnd = codetext.indexOf(r_comment_end, commentStart + 1);

            commentedCodeArr[seqNbr][1] = commentEnd;
            if (commentEnd < 0) {
                break;
            }

            searchStartPos = commentEnd + 1;
            seqNbr = seqNbr + 1;
        } while (commentStart > -1)

        arr[i][2] = commentedCodeArr;
    }


    the.commentedCodePosArr = arr;
}

function locations(substring, string) {
    var a = [],
        i = -1;
    while ((i = string.indexOf(substring, i + 1)) >= 0) a.push(i);
    return a;
}


function getCodeLanguages(codetext) {

    logCommon("Inside getCodeLanguages");

    var tf = JSON.parse(sessionStorage.getItem("IdentifyCodeLanguage"));
    var rows = JSON.parse(tf);

    getArrayOfCommentedCodeChars(codetext);

    if (rows != null) {
        if (rows != "") {
            //console.log(Object.keys(rows).length);

            loop1: // Loop through list of possible languages

            for (var i = 0; i < rows.length; i++) {

                var r_code_language = rows[i].code_language;

                var commentCodes = getCommentsCodesForLanguage(r_code_language)
                //console.log(commentCodes);

                var r_id_by_file_extension = rows[i].id_by_file_extension;
                var r_id_by_file_name = rows[i].id_by_file_name;
                var x = rows[i].id_by_file_content;
                //console.log("rows[i].id_by_file_content = " + x);

                if (x == null) {
                    continue;
                }

                var r_id_by_file_contents = x.split('^');

                loop2: // For each language there are multiple keywords/code  that can be used to identify the code language. Loop through each keywords/code.
                for (var j = 0; j < r_id_by_file_contents.length; j++) {
                    //console.log("Inside loop2");

                    if (r_id_by_file_contents[j] == "") {
                        continue;
                    }
                    var indices = locations(r_id_by_file_contents[j], codetext)

                    //console.log(indices);

                    if (indices.length == 0) {
                        continue;
                    }

                    loop3: //For each keyword position check if it is part of any comment type for the language
                    for (var m = 0; m < indices.length; m++) {

                        //console.log("Inside loop3");

                        var indiceIsPartOfComment = 0;


                        loop4: // For each keywords/code present in the script/code check if it is part of commented text
                        for (var k = 0; k < commentCodes.length; k++) {

                            //console.log("Inside loop4");

                            for (var l = 0; l < the.commentedCodePosArr.length; l++) {

                                if ((commentCodes[k].comment_start == the.commentedCodePosArr[l][0]) &&
                                    (commentCodes[k].comment_end == the.commentedCodePosArr[l][1])) {
                                    //console.log("match found")					


                                    if (the.commentedCodePosArr[l][2].length < 2) {
                                        continue;
                                    }


                                    for (var n = 0; n < the.commentedCodePosArr[l][2].length; n++) {

                                        if ((indices[m] >= the.commentedCodePosArr[l][2][n][0]) &&
                                            (indices[m] <= the.commentedCodePosArr[l][2][n][1])) {
                                            indiceIsPartOfComment = 1;
                                            //console.log(r_id_by_file_contents[j] + " is part of comment at index " + indices[m])
                                            break;
                                        }
                                    }

                                }


                            }
                        }

                        if (indiceIsPartOfComment == 0) {

                            /* ***TEMPORARY**SM-T002***Refer User Guide********_Reenabled for logged in users
                            */

                            if ((localStorage.getItem("userLoggedIn") == "y") && (localStorage.getItem("userLvl") == "9")) {
                                var msg = "Code Language is " + r_code_language + " based on '" + r_id_by_file_contents[j] + "' present at position " + indices[m] +
                                    ". If scan criteria looks incorrect, make the update and then scan the code again.";
                                the.codeLanguage = r_code_language;
                                the.codeLanguageRowId = rows[i].file_type_id;

                                document.getElementById("languageScanResultDivId").style.display = "block";
                                populateLanguages();

                                document.getElementById("languageDeterminedDivId").style.display = "block";
                                //document.getElementById("languageNotDeterminedDivId").style.display = "none";
                                document.getElementById("msgForLanguageDetermined").style.display = "none";

                                document.getElementById("helpDivMessage").style.display = "block";
                                document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + cleanWord(msg, '');

                                document.getElementById("code_language").value = r_code_language;
                                document.getElementById("id_by_file_content").value = r_id_by_file_contents;
                                document.getElementById("id_by_file_extension").value = rows[i].id_by_file_extension;
                            } else {

                                var msg = "Code Language is " + r_code_language + " based on codes scanned" +
                                    ". If it looks incorrect, please override the language.";
                                //console.log(msg)
                                //document.getElementById("languageDeterminedDivId").style.display = "block";
                                document.getElementById("languageOverride").style.display = "block";
                                document.getElementById("overrideMsg").innerHTML = "";
                                document.getElementById("helpDivMessage").style.display = "block";
                                document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + cleanWord(msg, '');
                                populateLanguages();
                                the.codeLanguage = r_code_language;
                                document.getElementById("languageScanResultDivId").style.display = "none";
                                document.getElementById("helpDetailsDivId").style.display = "none";
                                document.getElementById("sub-tech-div-id").style.display = "none";
                            }




                            break loop1;
                        }


                    }

                }

            }
        }
    }
}

//SM:**********Working***DO NOT DELETE
function scan() {
    logCommon("at scan");

    document.getElementById("filelvlhelpdivid").style.display = "none";
    the.languageOverridden = false;
    the.codeLanguage = null;
    document.getElementById("overrideMsg").innerHTML = "";
    document.getElementById("helpAddUpdateMsg").innerHTML = "";
    document.getElementById("language-box").value = "";
    var codetext;

    try {
        document.getElementById("helpDetailsDivId").style.display = "none";
    } catch (err) { }

    if (document.getElementById("destinationDiv").style.display == "none") {
        the.codetext = the.editor.getValue();
        document.getElementById("source").value = the.codetext;


    } else {
        document.getElementById("source").value = the.codetext;
        document.getElementById("sourceDiv").style.display = "block";



        if (the.use_codemirror && typeof CodeMirror !== 'undefined') {

            set_editor_mode();
            the.editor.focus();
            the.editor.setValue(the.codetext);
        }
        //document.querySelector('#scanEditbtnId').innerText = 'Scan';
        document.querySelector('#scanEditbtnId').innerHTML = '<i class="smalltip fa fa-search" style="font-size:16px; color:blue"><span>Scan</span></i>';
        document.getElementById("destinationDiv").style.display = "none";
        showHelpDivMessage("Enter the code in the text area on the left and click on the scan button.");


        return;
    }
    //var codetext = the.codetext;

    //return;
    //document.querySelector('#scanEditbtnId').innerText = 'Edit';
    document.querySelector('#scanEditbtnId').innerHTML = '<i class="smalltip fa fa-edit" style="font-size:16px; color:blue"><span>Edit</span></i>';
    getCodeLanguages(the.codetext);
    markHelpCodes();
    document.getElementById("helpDivMessage").style.display = "block";

}

function showHelpDivMessage(msg) {
    document.getElementById("helpDivMessage").style.display = "block";
    document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + msg;
    document.getElementById("languageDeterminedDivId").style.display = "none";
    //document.getElementById("languageNotDeterminedDivId").style.display = "none";
    document.getElementById("languageOverride").style.display = "none";
}


function languageDeterminedThruExt(msg) {
    document.getElementById("languageOverride").style.display = "block";
    document.getElementById("helpDivMessage").style.display = "block";
    document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + cleanWord(msg, '');
    document.getElementById("overrideMsg").innerHTML = "";
    populateLanguages();

    document.getElementById("languageScanResultDivId").style.display = "none";
    document.getElementById("helpDetailsDivId").style.display = "none";
    document.getElementById("sub-tech-div-id").style.display = "none";
    //document.querySelector('#scanEditbtnId').innerText = 'Edit';
    document.querySelector('#scanEditbtnId').innerHTML = '<i class="smalltip fa fa-edit" style="font-size:16px; color:blue"><span>Edit</span></i>';
}

function languageNotDeterminedMsg() {
    document.getElementById("language-box").value = "";
    var msg = "Code language could not be determined" +
        ". Please enter the correct language in the box below and click on override button.";
    //console.log(msg)
    //document.getElementById("languageDeterminedDivId").style.display = "block";
    document.getElementById("languageOverride").style.display = "block";
    document.getElementById("overrideMsg").innerHTML = "";
    document.getElementById("helpDivMessage").style.display = "block";
    document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + cleanWord(msg, '');
    populateLanguages();

    document.getElementById("languageScanResultDivId").style.display = "none";
    document.getElementById("helpDetailsDivId").style.display = "none";
    document.getElementById("sub-tech-div-id").style.display = "none";
    //document.querySelector('#scanEditbtnId').innerText = 'Edit';
}

function markHelpCodes(displayLanguageBox = true) {
    //document.querySelector('#scanEditbtnId').innerText = 'Edit';
    document.querySelector('#scanEditbtnId').innerHTML = '<i class="smalltip fa fa-edit" style="font-size:16px; color:blue"><span>Edit</span></i>';
    //console.log("Inside markHelpCodes")
    document.getElementById("sourceDiv").style.display = "none";
    document.getElementById("destinationDiv").style.display = "block";

    //document.getElementById("helpDivMessage").style.display = "none";


    //console.log("Inside markHelpCodes");
    var codetext = the.codetext;

    document.getElementById("languageScanResultActionDivId").style.display = "block";

    if (displayLanguageBox) {
        if (the.codeLanguage == null) {
            //console.log("Unable to determine code language");

            languageNotDeterminedMsg();


        } else {

            if (!the.languageOverridden) {
                document.getElementById("languageDeterminedDivId").style.display = "block";
                //document.getElementById("languageNotDeterminedDivId").style.display = "none";

                document.getElementById('language-box').value = the.codeLanguage;
                document.getElementById("languageOverride").style.display = "block";
                document.getElementById("overrideMsg").innerHTML = "";
                document.getElementById('sub-tech-div-id').style.display = "none";
                populateLanguages();
            }
        }
    }

    codetext = codetext.replaceAll(/\r/g, '·')


    //***Working 
    //var wordsArr = codetext.split(/(\S+\s+)/).filter(function(n) {return n});
    var LHCAI = the.LanguageHelpCodeAndIds_LclJson;
    //console.log(LHCAI);

    var codesWithHelpDetails = JSON.parse(LHCAI).filter(function (entry) {
        return entry.code_language === the.codeLanguage;
    });

    //console.log(codesWithHelpDetails);

    var CCC = JSON.parse(sessionStorage.getItem("CodeCommentsConditions"));

    var commentsConditions = JSON.parse(CCC).filter(function (entry) {
        return entry.code_language === the.codeLanguage;
    });


    var lineArr = codetext.split(/\n/);

    //logCommon("lineArr.length = " + lineArr.length);

    var innerHTML = "";
    var isMultilineComment = false;
    var isSinglelineComment = false;
    var isCommentDetected = false;

    var r_comment_start = '';
    var r_comment_end = '';

    try {
        for (var i = 0; i < lineArr.length; i++) {

            isSinglelineComment = false;


            innerHTML = innerHTML + '<div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="left: -30px;"><div contenteditable="false" class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 21px;">';
            innerHTML = innerHTML + (i + 1);
            innerHTML = innerHTML + '</div></div>';

            innerHTML = innerHTML + '<pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">';

            var wordsArr = lineArr[i].split(/(\S+\s+)/).filter(function (n) {
                return n
            });

            var myword = "";
            var matchFoundForHelpCodeWithSpace = false;

            NextBlockInLineLoop:
            for (var j = 0; j < wordsArr.length; j++) {

                //SM: Check whether the word is a part of comment
                myword = wordsArr[j];

                if (!isCommentDetected) {
                    for (var k = 0; k < commentsConditions.length; k++) {
                        r_comment_start = commentsConditions[k].comment_start;
                        r_comment_end = commentsConditions[k].comment_end;

                        //If word is not already identified as part of comment - Comment is starting
                        if (wordsArr[j].indexOf(r_comment_start) > -1) {
                            innerHTML = innerHTML + '<span class="cm-comment">' + cleanWord(wordsArr[j], '') + "</span>";
                            isCommentDetected = true;
                            //console.log("CommentDetected at line " + i + " and word " + wordsArr[j]);		
                            continue NextBlockInLineLoop;
                        }

                    }
                } else if (isCommentDetected) {
                    //If the word was part of comment and end of comment is detected
                    if (r_comment_end == null) {
                        innerHTML = innerHTML + '<span class="cm-comment">' + cleanWord(wordsArr[j], '') + "</span>";
                        continue NextBlockInLineLoop;

                    } else {
                        if (wordsArr[j].indexOf(r_comment_end) > -1) {
                            innerHTML = innerHTML + '<span class="cm-comment">' + cleanWord(wordsArr[j], '') + "</span>";
                            //console.log("Comment ending at line " + i + " and word " + wordsArr[j]);	
                            isCommentDetected = false;
                            continue NextBlockInLineLoop;
                        } else {
                            innerHTML = innerHTML + '<span class="cm-comment">' + cleanWord(wordsArr[j], '') + "</span>";
                            continue NextBlockInLineLoop;
                        }
                    }
                }

                var helpCodeFound = 0;

                //SM: Continuing if the word is not part of the comment: Check if it is a code with help
                NextHelpCodeLoop:
                for (var l = 0; l < codesWithHelpDetails.length; l++) {
                    //SM:TODO - it could be "For("
                    var hlpCode = codesWithHelpDetails[l].help_code;
                    var hlpCdId = codesWithHelpDetails[l].code_id;

                    var spaceInHelpCode = false;
                    var countOfSpacesInHelpCode = 0;

                    // if help code includes one space
                    if (hlpCode.indexOf(" ") > -1) {
                        spaceInHelpCode = true;
                        var xyg = hlpCode.split(/(\S+\s+)/).filter(function (n) {
                            return n
                        });
                        countOfSpacesInHelpCode = xyg.length - 1
                    }


                    if (!spaceInHelpCode) {
                        if (helpCodeFound != 1) {
                            myword = wordsArr[j];
                        }


                        if (myword.indexOf(hlpCode) > -1) {
                            //console.log("Before update = " + myword);
                            var cdGrp = codesWithHelpDetails[l].help_code_group;
                            if (cdGrp == null) {
                                cdGrp = "";
                            }
                            //console.log(cdGrp);
                            //SM: For operators like ==, !=, even if the code is next to other character add link
                            var preMatch = new RegExp("[a-zA-Z]" + "randomdummycode837128371", 'i');
                            var postMatch = new RegExp("[a-zA-Z]" + "randomdummycode837128371", 'i');
                            try {
                                preMatch = new RegExp("[a-zA-Z]" + hlpCode, 'i');
                            } catch {
                            }
                            try {
                                postMatch = new RegExp(hlpCode + "[a-zA-Z]", 'i');
                            } catch {
                            }

                            if (cdGrp.match(/operator/i)) {

                                if (helpCodeFound != 1) {
                                    myword = cleanWord(myword, hlpCode);
                                }

                                myword = myword.replaceAll(hlpCode, '<a href ="#" class="helpCodeCls" onclick="c_L_C(' + hlpCdId + ');return false;" >' + hlpCode + "</a>");

                                helpCodeFound = 1;

                                continue NextHelpCodeLoop;
                            } else if (myword.match(preMatch)) {
                                //console.log("prematch found for " + hlpCode + " at line " + i);
                                continue
                            } else if (myword.match(postMatch)) {
                                //console.log("postmatch found for " + hlpCode + " at line " + i);
                                continue
                            } else {
                                if (helpCodeFound != 1) {
                                    myword = cleanWord(myword, hlpCode);
                                }
                                myword = myword.replaceAll(hlpCode, '<a href ="#" class="helpCodeCls" onclick="c_L_C(' + hlpCdId + ');return false;">' + hlpCode + "</a>");
                                helpCodeFound = 1;


                                continue NextHelpCodeLoop;
                            }

                        }
                    } else {

                        if (j < wordsArr.length - countOfSpacesInHelpCode) {
                            //When the help code contains space: Join two words		


                            if (helpCodeFound != 1) {
                                //myword = wordsArr[j].trim() + " " + wordsArr[j+1].trim();
                                myword = wordsArr[j].trim();
                                for (var t = 1; t < countOfSpacesInHelpCode + 1; t++) {
                                    myword = myword + " " + wordsArr[j + t].trim();
                                }


                            }

                            //if (twoPairsMatch(myword,hlpCode )){
                            if (myword.indexOf(hlpCode) > -1) {
                                //console.log("Before update = " + myword);
                                var cdGrp = codesWithHelpDetails[l].help_code_group;
                                if (cdGrp == null) {
                                    cdGrp = "";
                                }
                                //console.log(cdGrp);
                                //SM: For operators like ==, !=, even if the code is next to other character add link
                                var preMatch = new RegExp("[a-zA-Z]" + "randomdummycode837128371", 'i');
                                var postMatch = new RegExp("[a-zA-Z]" + "randomdummycode837128371", 'i');
                                try {
                                    preMatch = new RegExp("[a-zA-Z]" + hlpCode, 'i');
                                } catch {
                                }
                                try {
                                    postMatch = new RegExp(hlpCode + "[a-zA-Z]", 'i');
                                } catch {
                                }

                                if (cdGrp.match(/operator/i)) {

                                    if (helpCodeFound != 1) {
                                        myword = cleanWord(myword, hlpCode);
                                    }

                                    myword = myword.replaceAll(hlpCode, '<a href ="#" class="helpCodeCls" onclick="c_L_C(' + hlpCdId + ');return false;" >' + hlpCode + "</a>");

                                    helpCodeFound = 1;
                                    matchFoundForHelpCodeWithSpace = true;
                                    //continue NextHelpCodeLoop;
                                    break NextHelpCodeLoop;

                                } else if (myword.match(preMatch)) {
                                    //console.log("prematch found for " + hlpCode + " at line " + i);
                                    continue
                                } else if (myword.match(postMatch)) {
                                    //console.log("postmatch found for " + hlpCode + " at line " + i);
                                    continue
                                } else {
                                    if (helpCodeFound != 1) {
                                        myword = cleanWord(myword, hlpCode);
                                    }
                                    myword = myword.replaceAll(hlpCode, '<a href ="#" class="helpCodeCls" onclick="c_L_C(' + hlpCdId + ');return false;">' + hlpCode + "</a>");
                                    helpCodeFound = 1;
                                    matchFoundForHelpCodeWithSpace = true;
                                    //continue NextHelpCodeLoop;
                                    break NextHelpCodeLoop;

                                }

                            }


                        }


                    }
                }

                if (helpCodeFound == 1) {
                    innerHTML = innerHTML + '<span class="cm-variable">' + myword + "</span>";
                    if (matchFoundForHelpCodeWithSpace) {
                        //SM: Skip one word because help code used up two words
                        //j = j + 1;
                        j = j + countOfSpacesInHelpCode;
                    }
                    continue NextBlockInLineLoop;
                }
                //console.log("Word '" + wordsArr[j] + "' is not a part of comment and does not have a help code either");

                //Continuing if the word is neither a comment nor has any help code

                myword = cleanWord(wordsArr[j], '');
                //wordsArr[j] = wordsArr[j].replaceAll(" ", "&nbsp;");
                innerHTML = innerHTML + '<span class="cm-variable">' + myword + "</span>";

            }


            innerHTML = innerHTML + '</span></pre></div>';
            //innerHTML = innerHTML  +  "<br>";
            if ((isCommentDetected) && (r_comment_end == null)) {
                isCommentDetected = false;
                //console.log("Comment ending at line " + i + " due to end of line ");
            }
        }
    } catch (err) {
        console.log(err.message);
        //console.log(wordsArr[j]);
        //console.log(hlpCode);
        //console.log(preMatch);
        //console.log(postMatch);

    }

    document.getElementById("target").innerHTML = innerHTML;



}

function twoPairsMatch(pair1, pair2) {
    var fstvals = pair1.split(" ");
    var scndVals = pair2.split(" ");

    if ((fstvals[0].trim() == scndVals[0].trim()) && (fstvals[1].trim() == scndVals[1].trim())) {
        return true;
    } else {
        return false;
    }
}
function overrideLanguage() {
    document.getElementById("filelvlhelpdivid").style.display = "none";
    var newLanguage = document.getElementById("language-box").value
    if (newLanguage == "") {
        document.getElementById("overrideMsg").innerHTML = "Please enter language in the box"
        return;
    }

    if (newLanguage == the.codeLanguage) {
        document.getElementById("overrideMsg").innerHTML = "New language is same as existing"
        return;
    }

    the.codeLanguage = newLanguage;
    the.languageOverridden = true;

    document.getElementById("overrideMsg").innerHTML = "Language overridden"

    markHelpCodes();
}

//SM: codeLinkClicked renamed to c_L_C because the name had help codes (e.g. link, li)
function c_L_C(hlpCdId) {
    //console.log("hlpCdId " + hlpCdId + " clicked");

    if (document.getElementById("helpDisplayDivId").style.width < "30%") {
        document.getElementById("mainContainer").style.width = "70%";
        document.getElementById("helpDisplayDivId").style.width = "30%";
    }

    document.getElementById("helpAddUpdateMsg").innerHTML = "";

    the.selectedCodeId = hlpCdId;


    //Pull the details for the help code
    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "HelpDetails",
            helpId: hlpCdId
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {


            document.getElementById("helpboxDivId").scrollTop = 0;

            populateLanguages();
            document.getElementById("languageScanResultActionDivId").style.display = "none";
            document.getElementById('language-box').value = the.codeLanguage;

            document.getElementById('sub-tech-div-id').style.display = "block";
            document.getElementById('helpDetailsDivId').style.display = "block";
            document.getElementById('languageDeterminedDivId').style.display = "none";

            document.getElementById("helpDivMessage").style.display = "block";
            document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + "Below are the details available for the clicked code. Updates can be submitted using the button below. (Requires Login)";
            document.getElementById("languageOverride").style.display = "block";
            document.getElementById("overrideMsg").innerHTML = "";


            var x = JSON.parse(response);
            var helpDetails = x[0];
            //console.log(helpDetails);

            document.getElementById('language-box').value = helpDetails.code_language;
            populateSubCategory();
            document.getElementById('sub-tech-box').value = helpDetails.code_sub_technology;
            document.getElementById('help_code').value = helpDetails.help_code;

            if (helpDetails.help_details == null) {
                tinymce.get('help_details').setContent("");
            } else {
                tinymce.get('help_details').setContent(helpDetails.help_details);
            }


            if (helpDetails.additional_info == null) {
                tinymce.get('additional_info').setContent("");
            } else {
                tinymce.get('additional_info').setContent(helpDetails.additional_info);
            }

            document.getElementById('help_code_group').value = helpDetails.help_code_group;
            document.getElementById('shared_help_content_key').value = helpDetails.shared_help_content_key;

            if (helpDetails.copyright_check == 1) {
                document.getElementById('copyright_check').checked = true;
            } else {
                document.getElementById('copyright_check').checked = false;
            }
            if (helpDetails.do_not_use_for_scan == 1) {
                document.getElementById('do_not_use_for_scan').checked = true;
            } else {
                document.getElementById('do_not_use_for_scan').checked = false;
            }
            //*****DO NOT DELETE*********
            //refreshCaptchatwo();

            if ((localStorage.getItem("userLoggedIn") == "n") || (localStorage.getItem("userLvl") != "9")) {
                document.getElementById("helpDisplayLoggedInOnly").style.display = "none";
            }


        },
        error: function () {
            //alert("error");
        }
    });

}

function addHelp() {

    if (document.getElementById("helpDisplayDivId").style.width < "30%") {
        document.getElementById("mainContainer").style.width = "70%";
        document.getElementById("helpDisplayDivId").style.width = "30%";
    }

    document.getElementById("filelvlhelpdivid").style.display = "none";

    document.getElementById("helpboxDivId").scrollTop = 0;
    document.getElementById("helpAddUpdateMsg").innerHTML = "";
    document.getElementById('languageOverride').style.display = "block";

    the.selectedCodeId = null;

    document.getElementById("helpDivMessage").style.display = "block";
    document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + "Enter the details below to create help content for a code. (Requires Login)";


    if (onMobileBrowser()) {
        $('html, body').animate({
            scrollTop: $("#helpDisplayDivId").offset().top
        }, 1000);
    }
    populateLanguages();
    document.getElementById("languageScanResultActionDivId").style.display = "none";
    document.getElementById('language-box').value = the.codeLanguage;

    document.getElementById('sub-tech-div-id').style.display = "block";
    document.getElementById('helpDetailsDivId').style.display = "block";
    document.getElementById('languageDeterminedDivId').style.display = "none";


    document.getElementById('sub-tech-box').value = "";
    document.getElementById('help_code').value = "";

    tinymce.get('help_details').setContent("");
    tinymce.get('help_details').undoManager.clear();

    tinymce.get('additional_info').setContent("");
    tinymce.get('additional_info').undoManager.clear();
    document.getElementById('help_code_group').value = "";
    document.getElementById('shared_help_content_key').value = "";
    document.getElementById('copyright_check').checked = false;
    document.getElementById('do_not_use_for_scan').checked = false;

    if ((localStorage.getItem("userLoggedIn") == "n") || (localStorage.getItem("userLvl") != "9")) {
        document.getElementById("helpDisplayLoggedInOnly").style.display = "none";
    }

    //***********DO NOT DELETE**********	
    //refreshCaptchatwo();
    populateSubCategory();

}

function populateLanguages(fieldId = "language-box") {

    //Auto popolate values in Language Field

    if (the.languageListPopulated) {
        //return;
    }

    var LHCAI = the.LanguageHelpCodeAndIds_LclJson;
    //console.log(LHCAI);
    var codesWithHelpDetails = JSON.parse(LHCAI);

    var lookup = {};
    var items = codesWithHelpDetails;
    var languages = [];

    for (var item, i = 0; item = items[i++];) {
        var code_language = item.code_language;

        if (!(code_language in lookup)) {
            lookup[code_language] = 1;
            if (code_language == undefined) {
                continue;
            }
            languages.push(code_language);
        }
    }

    //console.log(languages)
    autocomplete(document.getElementById(fieldId), languages);
    the.languageListPopulated = true;
}

function populateSubCategory() {

    if (document.getElementById('sub-tech-box') == null) {
        return;
    }

    //console.log(document.getElementById('sub-tech-box'));

    var selectedLanguage = document.getElementById('language-box').value


    var LHCAI = the.LanguageHelpCodeAndIds_LclJson;


    var codesWithHelpDetails = JSON.parse(LHCAI).filter(function (entry) {
        return entry.code_language === selectedLanguage;
    });



    //Auto popolate values in Sub Category Field
    var lookup = {};
    var items = codesWithHelpDetails;
    var subCategory = [];

    for (var item, i = 0; item = items[i++];) {
        var sub_cat = item.code_sub_technology;

        if (!(sub_cat in lookup)) {
            lookup[sub_cat] = 1;
            if (sub_cat == undefined) {
                continue;
            }
            subCategory.push(sub_cat);
        }
    }

    autocomplete(document.getElementById("sub-tech-box"), subCategory);


    //Auto popolate values in Help Code Group Field
    lookup = {};
    var helpCodeGroup = [];

    for (var item, i = 0; item = items[i++];) {
        var new_item = item.help_code_group;

        if (!(new_item in lookup)) {
            lookup[new_item] = 1;
            if (new_item == undefined) {
                continue;
            }
            helpCodeGroup.push(new_item);
        }
    }



    autocomplete(document.getElementById("help_code_group"), helpCodeGroup);

    //Auto popolate values in Help Code Group Field
    lookup = {};
    var sharedHelpContent = [];

    for (var item, i = 0; item = items[i++];) {
        var new_item = item.shared_help_content_key;

        if (!(new_item in lookup)) {
            lookup[new_item] = 1;
            if (new_item == undefined) {
                continue;
            }
            sharedHelpContent.push(new_item);
        }
    }


    autocomplete(document.getElementById("shared_help_content_key"), sharedHelpContent);

}

function cleanWord(word, codeToExclude) {

    word = word.replace(codeToExclude, 'SM_SECRET');
    word = word.replaceAll(/&/g, '&amp;');
    word = word.replaceAll(/</g, '&lt;');
    word = word.replaceAll(/>/g, '&gt;');
    word = word.replaceAll(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
    word = word.replace('SM_SECRET', codeToExclude);

    return word;
}




function autocomplete(inp, arr) {

    var currentFocus;
    let timeoutId;

    inp
        .addEventListener(
            "input",
            function (e) {

                clearTimeout(timeoutId);
                let val = this.value;
                let element = this;
                timeoutId = setTimeout(function () {

                //document.getElementById("SVDReviewDiv").style.display = "none";
                var a, b, i;
                var strPos;
                /*close any already open lists of autocompleted values*/
                //closeAllLists();
                if (!val) {
                    closeAllLists();
                    return false;
                }

                var tf = JSON.parse(sessionStorage.getItem("tutorialList"));

                //SM: DO NOT DELETE: options to 3 char
                if (val.length < 2) {
                    closeAllLists();
                    return false;
                }

                var elemnt = element;

                //Start Async
                setTimeout(function () {
                    closeAllLists();
                    currentFocus = -1;
                    /*create a DIV element that will contain the items (values):*/
                    a = document.createElement("DIV");
                    a.setAttribute("id", elemnt.id + "autocomplete-list");
                    a.setAttribute("class", "autocomplete-items");
                    /*append the DIV element as a child of the autocomplete container:*/
                    elemnt.parentNode.appendChild(a);
                    /*for each item in the array...*/
                    for (i = 0; i < arr.length; i++) {
                        /*check if the item starts with the same letters as the text field value:*/
                        if (val != elemnt.value) {
                            closeAllLists();
                            break;
                        }
                        //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        strPos = arr[i].toUpperCase().indexOf(
                            val.toUpperCase());

                        //SM: DO NOT DELETE: options to 50

                        if (a.childElementCount > 50) {
                            break;
                        }

                        if (strPos > -1) {

                            /*create a DIV element for each matching element:*/
                            b = document.createElement("DIV");
                            /*make the matching letters bold:*/

                            b.innerHTML = arr[i].substr(0, strPos);
                            b.innerHTML += "<strong>" +
                                arr[i].substr(strPos, val.length) +
                                "</strong>";
                            b.innerHTML += arr[i].substr(strPos +
                                val.length);

                            /*insert a input field that will hold the current array item's value:*/
                            b.innerHTML += "<input type='hidden' value='" +
                                arr[i] + "'>";
                            /*execute a function when someone clicks on the item value (DIV element):*/
                            b
                                .addEventListener(
                                    "click",
                                    function (e) {
                                        /*insert the value for the autocomplete text field:*/
                                        inp.value = this
                                            .getElementsByTagName("input")[0].value;
                                        /*close the list of autocompleted values,
                                        (or any other open lists of autocompleted values:*/
                                        closeAllLists();
                                        if (inp.id == "tutorial-search-box") {
                                            searchTutorial();
                                        } else {
                                            populateSubCategory();
                                        }

                                    });
                            a.appendChild(b);
                        } else {
                            var searchText = val.toUpperCase()
                            var rows = JSON.parse(tf);
                            rows = rows.filter(function (entry) {
                                return (entry.title.toUpperCase() === arr[i].toUpperCase() && entry.discontinue == "0") && (entry.title.toUpperCase().includes(searchText)
                                    || entry.technology.toUpperCase().includes(searchText)
                                    || entry.shortdescription.toUpperCase().includes(searchText)
                                    || entry.keywords.toUpperCase().includes(searchText));
                            });

                            if (rows.length > 0) {
                                b = document.createElement("DIV");
                                b.innerHTML = arr[i];
                                b.innerHTML += "<input type='hidden' value='" +
                                    arr[i] + "'>";
                                b.addEventListener(
                                    "click",
                                    function (e) {
                                        /*insert the value for the autocomplete text field:*/
                                        inp.value = this.getElementsByTagName("input")[0].value;
                                        /*close the list of autocompleted values,
                                        (or any other open lists of autocompleted values:*/
                                        closeAllLists();
                                        if (inp.id == "tutorial-search-box") {
                                            searchTutorial();
                                        } else {
                                            populateSubCategory();
                                        }

                                    });
                                a.appendChild(b);
                            }

                        }
                    }
                }, 0);
                // End Async
            }, 300);
            });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x)
            x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x)
                    x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x)
            return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length)
            currentFocus = 0;
        if (currentFocus < 0)
            currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");

        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });

    //console.log("Autocomplete End Time = " + new Date());
}


function getConditionsToIdentifyCodeLanguage() {

    var tags = JSON.parse(sessionStorage.getItem("IdentifyCodeLanguage"));
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "IdentifyCodeLanguage"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //alert(response);
            //var tags = JSON.parse(response);
            sessionStorage.setItem("IdentifyCodeLanguage", JSON.stringify(response));
        },
        error: function () {
            //alert("error");
        }
    });
}

function getDistinctCommentsCombination() {
    var tags = JSON.parse(sessionStorage.getItem("CommentsCombination"));
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "CommentsCombination"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //alert(response);
            //var tags = JSON.parse(response);
            sessionStorage.setItem("CommentsCombination", JSON.stringify(response));
        },
        error: function () {
            //alert("error");
        }
    });
}

function getLanguageHelpCodeAndIds() {

    //var tags = the.LanguageHelpCodeAndIds_LclJson;
    var tags = sessionStorage.getItem("LanguageHelpCodeAndIds");

    if (tags != null) {
        if (tags != "") {
            return;
        }
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "LanguageHelpCodeAndIds"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //alert(response);
            //var tags = JSON.parse(response);
            sessionStorage.setItem("LanguageHelpCodeAndIds", JSON.stringify(response));
            //console.log(response);
            the.LanguageHelpCodeAndIds_LclJson = response;
        },
        error: function (xhr, status, error) {
            console.log(error);
            console.log(xhr);
        }
    });
}

function getTutorialList() {

    var tags = sessionStorage.getItem("tutorialList")
    if (tags != null) {
        if ((tags != "") && (tags != "null")) {
            populateTutorialsDropDownDisplay();
            return;
        }
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "tutorials"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //alert(response);
            //var tags = JSON.parse(response);
            //sessionStorage.setItem("LanguageHelpCodeAndIds", JSON.stringify(response));
            //console.log(response);

            //the.LanguageHelpCodeAndIds_LclJson = response;

            sessionStorage.setItem("tutorialList", JSON.stringify(response));
            populateTutorialsDropDownDisplay();
        },
        error: function (xhr, status, error) {
            console.log(error);
            console.log(xhr);
        }
    });
}
function populateTutorialsDropDownDisplay() {
    var tf = JSON.parse(sessionStorage.getItem("tutorialList"));
    var rows = JSON.parse(tf);
    rows = rows.filter(function (entry) {
        return entry.discontinue == "0";
    });
    var innHTML = "";

    for (var i = 0; i < rows.length; i++) {
        if (i == 0) {
            innHTML = innHTML + "<a href= '" + the.hosturl + "/topics/" + rows[i].technology + "'>" + rows[i].technology + "</a>";
        } else if (rows[i].technology != rows[i - 1].technology) {
            innHTML = innHTML + "<a href= '" + the.hosturl + "/topics/" + rows[i].technology + "'>" + rows[i].technology + "</a>";
        }
        // if (i == 0) {
        //     innHTML = innHTML + "<a href='javascript:showTechnology("+ '"' + rows[i].technology + '"' + ")'>"+ rows[i].technology +"</a>";
        // }else if (rows[i].technology != rows[i-1].technology){
        //     innHTML = innHTML + "<a href='javascript:showTechnology("+ '"' + rows[i].technology + '"' + ")'>"+ rows[i].technology +"</a>";
        // }       
    }
    document.getElementById("dropDownTutListId").innerHTML = innHTML;

}
function getHelpDetails(codeId) {



    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "HelpDetails",
            helpId: codeId
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //alert(response);
            //var tags = JSON.parse(response);
            //sessionStorage.setItem("conditionsToIdentifyCodeLanguage", JSON.stringify(response));
        },
        error: function () {
            //alert("error");
        }
    });
}

function addOrUpdateHelpDetails() {
    //console.log("Inside updateHelpDetails");

    var myCodeId = the.selectedCodeId;
    var newCodeLanguage = document.getElementById("language-box").value;

    if (localStorage.getItem("userLoggedIn") == "n") {
        //myUrl = window.location.protocol + "//" + window.location.host +  window.location.pathname + "?target=login";

        document.getElementById("helpAddUpdateMsg").innerHTML = 'Please Login';
        document.getElementById("SubloginDivId").style.display = "block";
        return;
    }

    if (newCodeLanguage == "") {
        document.getElementById("helpAddUpdateMsg").innerHTML = "Please enter language";
        return;
    }
    newCodeLanguage = newCodeLanguage.replaceAll("'", "''");

    var newCodeSubTech = document.getElementById("sub-tech-box").value;
    newCodeSubTech = newCodeSubTech.replaceAll("'", "''");

    var newDoNotUseForScan = 0;
    if (document.getElementById("do_not_use_for_scan").checked) {
        newDoNotUseForScan = 1;
    }
    var newHelpCode = document.getElementById("help_code").value;
    newHelpCode = newHelpCode.trim();



    if (newHelpCode == "") {
        document.getElementById("helpAddUpdateMsg").innerHTML = "Please enter help code";
        return;
    }




    newHelpCode = newHelpCode.replaceAll("'", "''");

    var newHelpCodeGroup = document.getElementById("help_code_group").value;
    //var newHelpDetails = document.getElementById("help_details").value;
    newHelpCodeGroup = newHelpCodeGroup.replaceAll("'", "''");

    var newHelpDetails = tinyMCE.get('help_details').getContent()

    //console.log(newHelpDetails);

    if (newHelpDetails == "") {
        document.getElementById("helpAddUpdateMsg").innerHTML = "Please enter help details";
        return;
    }



    if (document.getElementById('terms_conditions').checked == false) {
        if ((localStorage.getItem("userLoggedIn") == "n") || (localStorage.getItem("userLvl") != "9")) {
            document.getElementById("helpAddUpdateMsg").innerHTML = "Please accept terms and conditions";
            return;
        }
    }


    newHelpDetails = newHelpDetails.replaceAll("'", "''");

    //var newAdditionalInfo  = document.getElementById("additional_info").value;
    var newAdditionalInfo = tinyMCE.get('additional_info').getContent()

    newAdditionalInfo = newAdditionalInfo.replaceAll("'", "''");

    var newSharedHelpContentKey = document.getElementById("shared_help_content_key").value;
    newSharedHelpContentKey = newSharedHelpContentKey.replaceAll("'", "''");

    var newCopyRightCheck = 0;
    if (document.getElementById("copyright_check").checked) {
        newCopyRightCheck = 1;
    }
    var newSearchTags = document.getElementById("help_search_tags").value;
    newSearchTags = newSearchTags.replaceAll("'", "''");

    document.getElementById("helpAddUpdateMsgLoaderDivId").style.display = "block";

    if (myCodeId != null) {
        //console.log("calling update help");


        $.ajax({
            url: the.hosturl + '/php/process.php',
            type: 'POST',
            data: jQuery.param({
                usrfunction: "UpdateHelpDetails",
                codeId: myCodeId,
                codeLanguage: newCodeLanguage,
                codeSubTech: newCodeSubTech,
                doNotUseForScan: newDoNotUseForScan,
                helpCode: newHelpCode,
                helpCodeGroup: newHelpCodeGroup,
                helpDetails: newHelpDetails,
                additionalInfo: newAdditionalInfo,
                sharedHelpContentKey: newSharedHelpContentKey,
                copyRightCheck: newCopyRightCheck,
                searchTags: newSearchTags,

            }),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                document.getElementById("helpAddUpdateMsgLoaderDivId").style.display = "none"
                //console.log("success");
                //console.log(response);
                if (response == "true") {
                    document.getElementById("helpAddUpdateMsg").innerHTML = "Saved successfully";

                } else if (response == "emailed") {
                    document.getElementById("helpAddUpdateMsg").innerHTML = "Thank you for your contribution. The updates have been sent for processing and will be recorded within 24 hours.";

                } else if (localStorage.getItem("userLoggedIn") == "n") {
                    document.getElementById("helpAddUpdateMsg").innerHTML = "Thank you for your contribution. The updates have been sent for processing.";

                }

                else {
                    document.getElementById("helpAddUpdateMsg").innerHTML = "Failed to update. Please contact support desk";
                }

            },
            error: function (xhr, status, error) {
                document.getElementById("helpAddUpdateMsgLoaderDivId").style.display = "none"
                //console.log("error-3232");
                console.log(error);
                console.log(xhr);
            }
        });

    } else {
        //console.log("calling add help");
        /**/
        $.ajax({
            url: the.hosturl + '/php/process.php',
            type: 'POST',
            data: jQuery.param({
                usrfunction: "AddNewHelp",
                codeId: myCodeId,
                codeLanguage: newCodeLanguage,
                codeSubTech: newCodeSubTech,
                doNotUseForScan: newDoNotUseForScan,
                helpCode: newHelpCode,
                helpCodeGroup: newHelpCodeGroup,
                helpDetails: newHelpDetails,
                additionalInfo: newAdditionalInfo,
                sharedHelpContentKey: newSharedHelpContentKey,
                copyRightCheck: newCopyRightCheck,
                searchTags: newSearchTags,

            }),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //console.log("success");
                //console.log(response);
                document.getElementById("helpAddUpdateMsgLoaderDivId").style.display = "none"


                if (response == "true") {
                    document.getElementById("helpAddUpdateMsg").innerHTML = "Record created successfully";

                    //Refresh the help code list

                    $.ajax({
                        url: the.hosturl + '/php/process.php',
                        type: 'POST',
                        data: jQuery.param({
                            usrfunction: "LanguageHelpCodeAndIds"
                        }),
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            //sessionStorage.setItem("LanguageHelpCodeAndIds", JSON.stringify(response));
                            the.LanguageHelpCodeAndIds_LclJson = response;
                            //alert(response);
                            //var tags = JSON.parse(response);

                            var filteredRows = JSON.parse(response).filter(function (entry) {
                                return entry.code_language === newCodeLanguage && entry.help_code === newHelpCode;
                            });
                            //console.log(filteredRows);
                            the.selectedCodeId = filteredRows[0].code_id
                            markHelpCodes(false);
                            document.getElementById("languageScanResultActionDivId").style.display = "none";

                        },
                        error: function () {
                            //alert("error");
                        }
                    });

                    //markHelpCodes();

                } else if (response == "false") {
                    document.getElementById("helpAddUpdateMsg").innerHTML = "Record already exists for the help code";
                } else {
                    document.getElementById("helpAddUpdateMsg").innerHTML = "Failed to process. Please try again later";
                }
            },
            error: function (xhr, status, error) {
                document.getElementById("helpAddUpdateMsgLoaderDivId").style.display = "none"
                //console.log("error");
                console.log(error);
                console.log(xhr);
            }
        });
    }

}

function getEnvironmentSetUpDetails() {

    var tags = JSON.parse(sessionStorage.getItem("EnvironmentSetUpDetails"));
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "EnvironmentSetUpDetails"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //alert(response);
            //var tags = JSON.parse(response);
            sessionStorage.setItem("EnvironmentSetUpDetails", JSON.stringify(response));
        },
        error: function () {
            //alert("error");
        }
    });
}

function getCodeCommentsConditions() {

    var tags = JSON.parse(sessionStorage.getItem("CodeCommentsConditions"));
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "CodeCommentsConditions"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //alert(response);
            //var tags = JSON.parse(response);
            sessionStorage.setItem("CodeCommentsConditions", JSON.stringify(response));
        },
        error: function () {
            //alert("error");
        }
    });
}

function getLaguagesSubCatgHelpCodeGroups() {

    var tags = JSON.parse(sessionStorage.getItem("LaguagesSubCatgHelpCodeGroups"));
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "LaguagesSubCatgHelpCodeGroups"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //alert(response);
            //var tags = JSON.parse(response);
            sessionStorage.setItem("LaguagesSubCatgHelpCodeGroups", JSON.stringify(response));
        },
        error: function () {
            //alert("error");
        }
    });
}

function getHelpCodeGroupDisplayOrder() {

    var tags = JSON.parse(sessionStorage.getItem("HelpCodeGroupDisplayOrder"));
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "HelpCodeGroupDisplayOrder"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //alert(response);
            //var tags = JSON.parse(response);
            sessionStorage.setItem("HelpCodeGroupDisplayOrder", JSON.stringify(response));
        },
        error: function () {
            //alert("error");
        }
    });
}

function getLangForFileExtension() {
    var tags = JSON.parse(sessionStorage.getItem("LanguageForFileExtension"));
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "LanguageForFileExtension"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            sessionStorage.setItem("LanguageForFileExtension", JSON.stringify(response));

        },
        error: function () {
            //alert("error");
        }
    });
}

function getHowToVideos() {

    var tags = JSON.parse(sessionStorage.getItem("HowToVideos"));
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "HowToVideos"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //console.log(response);

            sessionStorage.setItem("HowToVideos", JSON.stringify(response));


        },
        error: function () {
            //alert("error");
        }
    });
}

function getSpecialFiles() {
    var tags = JSON.parse(sessionStorage.getItem("SpecialFiles"));
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "SpecialFiles"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //console.log(response);

            sessionStorage.setItem("SpecialFiles", JSON.stringify(response));


        },
        error: function () {
            //alert("error");
        }
    });
}

function getStoredProjectList() {

    var myCookie = getCookie("cookname");

    if (myCookie == null) {
        localStorage.setItem("userLoggedIn", "n");
        return;
    } else {
        if (myCookie == "") {
            localStorage.setItem("userLoggedIn", "n");
            localStorage.setItem("userLvl", "");
            return;
        } else {
            localStorage.setItem("userLoggedIn", "y");
            if (localStorage.getItem("userLvl") != "9") {
                return;
            }
        }
    }

    var tags = JSON.parse(sessionStorage.getItem("SavedProjectsList"));
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "GetSavedProjects"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            sessionStorage.setItem("SavedProjectsList", JSON.stringify(response));


        },
        error: function () {
            //alert("error");
        }
    });


}



function overrideHelpTopicsLanguage() {
    var newLanguage = document.getElementById("helpTopics-lang-box").value
    if (newLanguage == "") {
        document.getElementById("helpLangoverrideMsg").innerHTML = "Please enter language in the box"
        return;
    }
    newLanguage = newLanguage.trim();
    //the.codeLanguage = newLanguage;

    sessionStorage.setItem("helpTopicsLanguage", newLanguage);


    populateHelpTopics();
}

function populateHelpTopics() {

    //REF: https://codepen.io/AdventureBear/pen/WbOpjW


    showHelpDivMessage("Select language to display the help content list available then click on the help code to view the help details");

    var LHCAI = the.LanguageHelpCodeAndIds_LclJson;

    var codeLanguage = sessionStorage.getItem("helpTopicsLanguage")
    //var codesWithHelpDetails = JSON.parse(LHCAI);
    if (codeLanguage == null) {
        return;
    } else if (document.getElementById("helpTopics-lang-box").value == "") {
        document.getElementById("helpTopics-lang-box").value = codeLanguage;
    }

    var codesWithHelpDetails = JSON.parse(LHCAI).filter(function (entry) {
        var evalStr = entry.code_language;
        if (evalStr == null) {
            return false
        } else {
            return evalStr.toUpperCase() === codeLanguage.toUpperCase();
        }
    });

    codesWithHelpDetails.sort(function (a, b) {

        return (a.help_code_group === null) - (b.help_code_group === null) || +(a.help_code_group > b.help_code_group) || -(a.help_code_group < b.help_code_group);

    });

    var innerHTML = '<div >';

    for (var l = 0; l < codesWithHelpDetails.length; l++) {

        var hlpCode = codesWithHelpDetails[l].help_code;
        var hlpCdId = codesWithHelpDetails[l].code_id;
        var hlpCdGrp = codesWithHelpDetails[l].help_code_group;

        //if ((hlpCdGrp == null) || (hlpCdGrp == "")) {
        if (hlpCdGrp == null) {
            hlpCdGrp = "Others";
        }

        if (hlpCdGrp == "") {
            hlpCdGrp = "Ungrouped";
        }

        if (l > 0) {
            if (codesWithHelpDetails[l].help_code_group != codesWithHelpDetails[l - 1].help_code_group) {
                //First item in the group****Need to close previous li and open li for the new group
                innerHTML = innerHTML + '</ul> </li>';
                innerHTML = innerHTML + '<li class="day">' + '<i style = "color: black; font-style: normal; ">' + hlpCdGrp + '</i>' + ' <ul class="bullet-list-round">';
                innerHTML = innerHTML + '<li>' + '<a href ="#" class="helpCodeCls" onclick="c_L_C(' + hlpCdId + ');return false;" >' + hlpCode + "</a>" + '</li>';
            } else {
                //another item in the previous group
                innerHTML = innerHTML + '<li>' + '<a href ="#" class="helpCodeCls" onclick="c_L_C(' + hlpCdId + ');return false;" >' + hlpCode + "</a>" + '</li>';
            }
        } else if (l == 0) {
            //First item in the list
            innerHTML = innerHTML + '<li class="day">' + '<i style = "color: black">' + hlpCdGrp + '</i>' + ' <ul class="bullet-list-round">' + '<li>' + '<a href ="#" class="helpCodeCls" onclick="c_L_C(' + hlpCdId + ');return false;" >' + hlpCode + "</a>" + '</li>';
        }

        //List is over
        if (l == codesWithHelpDetails.length - 1) {
            innerHTML = innerHTML + '</ul> </li></div>';
        }

    }
    document.getElementById("HelpTopicsList").innerHTML = innerHTML;

    //SM: Added logic for help topics display


    $('li > ul').each(function (i) {
        // Find this list's parent list item.
        var parentLi = $(this).parent('li');

        // Style the list item as folder.
        parentLi.addClass('folder');

        // Temporarily remove the list from the
        // parent list item, wrap the remaining
        // text in an anchor, then reattach it.
        var subUl = $(this).remove();
        parentLi.wrapInner('<a/>').find('a').click(function () {
            // Make the anchor toggle the leaf display.
            subUl.toggle();
        });
        parentLi.append(subUl);
    });

    // Hide all lists except the outermost.
    $('ul ul').hide();
}

function hideDiv(divId) {

    document.getElementById(divId).style.display = "none";
    if (divId == "HelpTopicsDivId") {
        document.getElementById("languageScanResultDivId").style.display = "none";
        document.getElementById("languageOverride").style.display = "none";
        document.getElementById("helpDetailsDivId").style.display = "none";
        document.getElementById("helpDivMessage").style.display = "block";

        document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + "Please click on one of the option from top menu to proceed";
        document.getElementById("helpDisplayDivId").style.width = "100%";
        //document.getElementById("helpDisplayDivId").style.overflow = "hidden";
    }

    else if (divId == "projectscannerDivId") {
        if (document.getElementById("filescannerDivId").style.display == "block") {
            if (!onMobileBrowser()) {
                document.getElementById("filescannerDivId").style.width = "70%";
            }

        } else {
            document.getElementById("languageScanResultDivId").style.display = "none";
            document.getElementById("languageOverride").style.display = "none";
            document.getElementById("helpDetailsDivId").style.display = "none";
            document.getElementById("helpDivMessage").style.display = "block";
            document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + "Please click on one of the option from top menu to proceed";
            document.getElementById("helpDisplayDivId").style.width = "100%";

        }
    }

    else if (divId == "filescannerDivId") {
        if (document.getElementById("projectscannerDivId").style.display == "block") {
            if (!onMobileBrowser()) {
                document.getElementById("projectscannerDivId").style.width = "100%";
            }

        } else {
            document.getElementById("languageScanResultDivId").style.display = "none";
            document.getElementById("languageOverride").style.display = "none";
            document.getElementById("helpDetailsDivId").style.display = "none";
            document.getElementById("helpDivMessage").style.display = "block";
            document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + "Please click on one of the option from top menu to proceed";
            document.getElementById("helpDisplayDivId").style.width = "100%";
            //document.getElementById("helpDisplayDivId").style.overflow = "hidden";
        }
    } else if (divId == "helpDetailsDivId") {
        document.getElementById("helpDivMessage").style.display = "block";
        document.getElementById("languageOverride").style.display = "none";

    }
}

function expandContractFileDiv() {

    if (document.getElementById("projectscannerDivId").style.display == "block") {
        if (!onMobileBrowser()) {

            if (document.getElementById("filescannerDivId").style.width > '70%') {
                document.getElementById("filescannerDivId").style.width = "70%";
                document.getElementById("projectscannerDivId").style.width = "30%";
                document.getElementById("mainContainer").style.width = "70%";
                document.getElementById("helpDisplayDivId").style.width = "30%";
            } else {
                document.getElementById("filescannerDivId").style.width = "90%";
                document.getElementById("projectscannerDivId").style.width = "10%";
                document.getElementById("mainContainer").style.width = "90%";
                document.getElementById("helpDisplayDivId").style.width = "10%";
            }
        }

    } else {

        if (!onMobileBrowser()) {

            if (document.getElementById("mainContainer").style.width > '70%') {
                document.getElementById("mainContainer").style.width = "70%";
                document.getElementById("helpDisplayDivId").style.width = "30%";
            } else {
                document.getElementById("mainContainer").style.width = "90%";
                document.getElementById("helpDisplayDivId").style.width = "10%";
            }
        }
    }

}

function expandContractProjectDiv() {

    if (document.getElementById("filescannerDivId").style.display == "block") {
        if (!onMobileBrowser()) {

            if (document.getElementById("projectscannerDivId").style.width > '50%') {
                document.getElementById("filescannerDivId").style.width = "70%";
                document.getElementById("projectscannerDivId").style.width = "30%";
            } else {
                document.getElementById("filescannerDivId").style.width = "10%";
                document.getElementById("projectscannerDivId").style.width = "90%";
            }
        }
    }
}

function expandContractHelpDiv() {
    //console.log(document.getElementById("mainContainer").style.width);

    if (document.getElementById("projectscannerDivId").style.display == "block") {
        if (!onMobileBrowser()) {

            if (document.getElementById("helpDisplayDivId").style.width > '30%') {
                if (document.getElementById("filescannerDivId").style.display == "block") {
                    document.getElementById("filescannerDivId").style.width = "70%";
                    document.getElementById("projectscannerDivId").style.width = "30%";
                }
                document.getElementById("mainContainer").style.width = "70%";
                document.getElementById("helpDisplayDivId").style.width = "30%";
            } else {
                document.getElementById("mainContainer").style.width = "20%";
                document.getElementById("helpDisplayDivId").style.width = "80%";
                if (document.getElementById("filescannerDivId").style.display == "block") {
                    document.getElementById("filescannerDivId").style.width = "50%";
                    document.getElementById("projectscannerDivId").style.width = "50%";
                }

            }
        }

    } else {

        if (!onMobileBrowser()) {

            if (document.getElementById("helpDisplayDivId").style.width > '30%') {
                document.getElementById("mainContainer").style.width = "70%";
                document.getElementById("helpDisplayDivId").style.width = "30%";
            } else {
                document.getElementById("mainContainer").style.width = "20%";
                document.getElementById("helpDisplayDivId").style.width = "80%";
            }
        }
    }

}

function Show(pageName) {
    //console.log ("Show called for page " + pageName);

    document.getElementById("filelvlhelpdivid").style.display = "none";

    if (onMobileBrowser()) {

        var x = document.getElementById("myTopnav");
        x.className = "topnav";

    } else {

    }

    document.getElementById("helpDisplayDivId").style.display = "block";
    //Update url

    document.getElementById("languageScanResultDivId").style.display = "none";
    document.getElementById("languageOverride").style.display = "none";
    document.getElementById("helpDetailsDivId").style.display = "none";
    document.getElementById("loginDivId").style.display = "none";
    document.getElementById("contactusDivId").style.display = "none";
    document.getElementById("howtoDivId").style.display = "none";
    document.getElementById("homeDivId").style.display = "none";

    document.getElementById("tutorialDivId").style.display = "none";
    document.getElementById("tutorialListDivId").style.display = "none";
    document.getElementById("tutorialEditDivId").style.display = "none";

    myUrl = window.location.protocol + "//" + window.location.host +
        window.location.pathname + "?target=" + pageName;

    //window.open(myUrl + "?target=" + pageName, "_self");


    const nextURL = myUrl;
    const nextTitle = 'Code Helper';
    const nextState = {
        additionalInformation: 'Updated the URL with JS'
    };

    // This will create a new entry in the browser's history, without reloading
    window.history.pushState(nextState, nextTitle, nextURL);


    // x = document.getElementById("filescannerLinkId");
    // x.classList.remove("active");

    // x = document.getElementById("projectscannerLinkId");
    // x.classList.remove("active");

    // x = document.getElementById("HelpTopicsLinkId");
    // x.classList.remove("active");

    x = document.getElementById("loginLinkId");
    x.classList.remove("active");

    x = document.getElementById("logoutLinkId");
    x.classList.remove("active");

    x = document.getElementById("profileLinkId");
    x.classList.remove("active");

    x = document.getElementById("contactusLinkId");
    x.classList.remove("active");

    // x = document.getElementById("howtoLinkId");
    // x.classList.remove("active");

    x = document.getElementById("homeLinkId");
    x.classList.remove("active");

    x = document.getElementById("tutorialLinkId");
    x.classList.remove("active");

    populateLanguages("helpTopics-lang-box");

    x = document.getElementById(pageName + "LinkId");
    x.className += " active";

    //document.getElementById("mainContainer").style.width = "70%";

    if (pageName == "filescanner") {
        document.getElementById("bgSVGId").style.display = "none";

        document.getElementById("btnCloseFileScanner").style.display = "none";
        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none"

        document.getElementById("filescannerDivId").style.display = "block"
        document.getElementById("filescannerDivId").style.width = "100%";




        document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + "Enter the code in the text area on the left or select a file using 'Open File' button. <br> Click on the scan button to view the help codes available."

        /******************SM TODO********************/
        var default_text =
            "//Either paste the code here or select code file using 'Open File' button and click on Scan button.";
        var textArea = $('#source')[0];
        $('#source').val(default_text);

        if (the.use_codemirror && typeof CodeMirror !== 'undefined') {

            if (!the.editor) {
                the.editor = CodeMirror.fromTextArea(textArea, {
                    lineNumbers: true
                });
                set_editor_mode();
                the.editor.focus();
            }
            $('.CodeMirror').click(function () {
                //console.log("Area clicked 1");
                if (the.editor.getValue() === default_text) {
                    the.editor.setValue('');
                }
            });
        } else {
            $('#source').bind('click focus', function () {
                if ($(this).val() === default_text) {
                    $(this).val('');
                }
            }).bind('blur', function () {
                if (!$(this).val()) {
                    //console.log("bind blur 1");
                    $(this).val(default_text);
                }
            });
        }



    } else if (pageName == "projectscanner") {
        document.getElementById("bgSVGId").style.display = "none";
        if ((localStorage.getItem("userLoggedIn") == "y") && (localStorage.getItem("userLvl") == "9")) {
            document.getElementById("addNewProjBtnId").style.display = "block";
        } else {
            document.getElementById("addNewProjBtnId").style.display = "none";
        }

        if (document.getElementById("projectscannerDivId").style.display == "none") {
            document.getElementById("HelpTopicsDivId").style.display = "none";
            document.getElementById("projectscannerDivId").style.display = "block"


            document.getElementById("filescannerDivId").style.display = "none"
            document.getElementById("projectscannerDivId").style.width = "100%";

        }
        populateStoredProjectList();
        showHelpDivMessage("Upload project files and click on the file to scan the code");

    } else if (pageName == "HelpTopics") {
        document.getElementById("bgSVGId").style.display = "none";
        document.getElementById("filescannerDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none"

        document.getElementById("HelpTopicsDivId").style.display = "block";
        document.getElementById("HelpTopicsDivId").style.width = "100%";


        //document.getElementById("helpDivMessage").innerHTML = "Click on the help code to view the help details"
        showHelpDivMessage("Select language to display the help content list available then click on the help code to view the help details");
    } else if (pageName == "tutorial") {
        document.getElementById("filescannerDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none"
        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("helpDisplayDivId").style.display = "none";
        document.getElementById("tutorialDivId").style.display = "none";
        //document.getElementById("tutorialDivId").style.display = "block";
        //document.getElementById("tutorialDivId").style.width = "100%";

        document.getElementById("tutorialListDivId").style.display = "block";
        document.getElementById("tutorialListDivId").style.width = "100%";
        populateTutorialList();
        $(".cardsContainerDivClassPadd").css("height", "200px");

    } else if (pageName == "login") {
        document.getElementById("filescannerDivId").style.display = "none";
        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none";

        document.getElementById("loginDivId").style.display = "block";

        document.getElementById("loginSecDivId").style.display = "block";
        document.getElementById("registerSecDivId").style.display = "none";
        document.getElementById("forgotPasswordSecDivId").style.display = "none";
        document.getElementById("accActivatedDivId").style.display = "none";
        document.getElementById("forgotPWDivId").style.display = "none";

        //document.getElementById("loginDivId").style.width = "70%";


        document.getElementById("loginerrormsg").innerHTML = "";

        //document.getElementById("helpDisplayDivId").style.width = "30%";


        showHelpDivMessage("Login to add or make updates to the help scan codes");
    } else if (pageName == "profile") {
        document.getElementById("bgSVGId").style.display = "none";
        showProfile();


    } else if (pageName == "contactus") {
        document.getElementById("filescannerDivId").style.display = "none";
        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none";
        document.getElementById("contactusDivId").style.display = "block";
        //document.getElementById("contactusDivId").style.width = "70%";


        document.getElementById("contactuserrormsg").innerHTML = "";


        refreshCaptcha();

        //document.getElementById("helpDisplayDivId").style.width = "30%";
        document.getElementById("helpDisplayDivId").style.display = "none";
        //showHelpDivMessage("Contact us if you have any questions, feedback or are interested in purchasing the software. Some features have been disabled on the web version for security reasons. Full feature software can be used for software training/development, creating references, documentation for the software application and adding own customizations. <br><br> If you found the site helpful, you can support our work by buying me a coffee using the coffee button at the top.");

    } else if (pageName == "howto") {
        document.getElementById("bgSVGId").style.display = "none";
        document.getElementById("filescannerDivId").style.display = "none";
        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none";
        document.getElementById("helpDisplayDivId").style.display = "none";
        document.getElementById("contactusDivId").style.display = "none";
        document.getElementById("howtoDivId").style.display = "block";
        document.getElementById("howtoDivId").style.width = "95%";
        //document.getElementById("mainContainer").style.width = "100%";
        listVideos();


    } else if (pageName == "home") {
        document.getElementById("filescannerDivId").style.display = "none";
        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none";
        document.getElementById("helpDisplayDivId").style.display = "none";
        document.getElementById("contactusDivId").style.display = "none";
        document.getElementById("howtoDivId").style.display = "none";
        document.getElementById("homeDivId").style.display = "block";
        document.getElementById("homeDivId").style.width = "100%";
        //document.getElementById("mainContainer").style.width = "100%";
    }

    //Scroll to top
    $('html,body').scrollTop(0);
}

function showCreateAccount() {
    document.getElementById("loginSecDivId").style.display = "none";
    document.getElementById("registerSecDivId").style.display = "block";
}

function showLogin() {
    document.getElementById("loginSecDivId").style.display = "block";
    document.getElementById("registerSecDivId").style.display = "none";
    document.getElementById("forgotPasswordSecDivId").style.display = "none";
    document.getElementById("accActivatedDivId").style.display = "none";
    document.getElementById("forgotPWDivId").style.display = "none";
}

function showForgotPassword() {
    document.getElementById("loginSecDivId").style.display = "none";
    document.getElementById("forgotPasswordSecDivId").style.display = "block";
}


function listVideos() {

    var tf = JSON.parse(sessionStorage.getItem("HowToVideos"));

    if (tf == null) {
        return;
    }
    var rows = JSON.parse(tf);

    if (rows.length < 2) {
        return;
    }
    var innerHTML = '';

    innerHTML = innerHTML + "<div class='videoListContainer'>";

    innerHTML = innerHTML + '<div id="prjSelectionMsg" style=" padding: 5px; text-align: justify; text-justify: inter-word; border: 1px solid #ccc; color: #f1f1f1;background: rgba(9, 84, 132, 1); margin-Bottom: 0px">How to videos</div>';



    for (var i = 0; i < rows.length; i++) {
        var description = rows[i].description;
        var url = rows[i].url;

        innerHTML = innerHTML + "<div class='videoDescription'>" + description + "</div> <div class='videoIframeDiv'><iframe class='videoIframe' src= '" + url + "'> </iframe>"
    }
    innerHTML = innerHTML + "</div>";

    document.getElementById("howtoDivId").innerHTML = innerHTML;

}
function showMobileMenu(pageName) {
}


function checkURL() {
    //console.log("inside checkURL");


    document.getElementById("displayFileLoaderDivId").style.display = "block";
    document.getElementById("tutorialDivId").style.display = "none";
    document.getElementById("tutorialListDivId").style.display = "none";

    var myUrl = window.location.protocol + "//" + window.location.host +
        window.location.pathname;

    var LocationSearchStr = location.search;
    var find = '%20';
    var re = new RegExp(find, 'g');
    var pageName = "tutorial";
    var path = window.location.pathname;

    LocationSearchStr = LocationSearchStr.replace(re, ' ');

    if (LocationSearchStr.indexOf('passkey=') > 0) {
        var ar = LocationSearchStr.split('passkey=');
        var accountactivationkey = ar[1];
        activateAccount(accountactivationkey);
        return;
    }
    try{
        if (localStorage.getItem("cookieAccepted") == "y") {
            document.getElementById("cookie-div-id").style.display = "none"
        } else{
            document.getElementById("cookie-div-id").style.display = "block"
        }
    }catch{

    }

    var myCookie = getCookie("cookname");

    if (myCookie == null) {
        localStorage.setItem("userLoggedIn", "n");
        //if (!onMobileBrowser()) {
        //    document.getElementById("loginLinkId").style.display = "block";
        //}
        document.getElementById("loginLinkId").style.display = "block";
        document.getElementById("logoutLinkId").style.display = "none";
        document.getElementById("profileLinkId").style.display = "none";

    } else {
        localStorage.setItem("userLoggedIn", "y");
        document.getElementById("loginLinkId").style.display = "none";
        document.getElementById("logoutLinkId").style.display = "block";
        document.getElementById("profileLinkId").style.display = "block";
        if (localStorage.getItem("userLvl") == "9") {
            the.smusr = true;
        }

        $.ajax({
            url: the.hosturl + '/php/process.php',
            data: { usrfunction: "checklogin" },
            type: 'POST',
            dataType: 'json',
            success: function (retstatus) {
                if (retstatus == "err") {
                    localStorage.setItem("userLoggedIn", "n");
                    //if (!onMobileBrowser()) {
                    //    document.getElementById("loginLinkId").style.display = "block";
                    //}
                    document.getElementById("loginLinkId").style.display = "block";
                    document.getElementById("logoutLinkId").style.display = "none";
                    document.getElementById("profileLinkId").style.display = "none";
                }
            },
            error: function (xhr, status, error) {

            }
        });


    }

    if (path.indexOf('topics/') > 0) {
        //var songtitle = path.replaceAll("/antaksharee/lyrics/","");

        if (sessionStorage.getItem("LanguageHelpCodeAndIds") == null) {
            //document.getElementById("loaderDivId").style.display = "block";
            setTimeout(function () {
                //document.getElementById("loaderDivId").style.display = "none";
                checkURL();
            }, 500);
            return;
        }

        document.getElementById("languageScanResultDivId").style.display = "none";
        document.getElementById("languageOverride").style.display = "none";
        document.getElementById("helpDetailsDivId").style.display = "none";
        document.getElementById("loginDivId").style.display = "none";
        document.getElementById("contactusDivId").style.display = "none";
        document.getElementById("howtoDivId").style.display = "none";
        document.getElementById("homeDivId").style.display = "none";

        document.getElementById("filescannerDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none"

        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("helpDisplayDivId").style.display = "none";

        document.getElementById("tutorialDivId").style.display = "block";

        document.getElementById("tutorialEditDivId").style.display = "block";


        var tutorialStr = path.substring(path.indexOf("topics/") + 7);

        if (screen.width < 700 || window.innerWidth < 700) {
            //document.getElementById("tutorialSearchDivId").style.display = "none";
            document.getElementById("tutorialEditDivId").style.display = "none";
        } else {
            //populateTutorialList();
        }

        if (tutorialStr.indexOf('/') > 0) {
            document.getElementById("mainContainer").style.width = "100%";
            document.getElementById("tutorialEditDivId").style.width = "20%";
            document.getElementById("tutorialEditDivId").innerHTML = "";
            getTutorial(tutorialStr);
            document.getElementById("loaderDivId").style.display = "none";
        } else {
            document.getElementById("slideInDivId").style.display = "none";
            tutorialStr = decodeURI(tutorialStr);
            document.getElementById("tutorialDivId").style.display = "none";
            document.getElementById("tutorialEditDivId").style.display = "none";
            document.getElementById("tutorialListDivId").style.display = "block";
            document.getElementById("tutorialListDivId").style.width = "100%";
            //populateTutorialList();
            showTechnology(tutorialStr)
            document.getElementById("loaderDivId").style.display = "none";
        }


        return;
    }

    if (LocationSearchStr.indexOf('resetkey=') > 0) {
        var ar = LocationSearchStr.split('resetkey=');
        var passwordresetkey = ar[1];
        //resetPassword(passwordresetkey);
        sessionStorage.setItem("passwordresetkey", passwordresetkey);

        document.getElementById("helpDisplayDivId").style.display = "block";
        //Update url

        document.getElementById("languageScanResultDivId").style.display = "none";
        document.getElementById("languageOverride").style.display = "none";
        document.getElementById("helpDetailsDivId").style.display = "none";
        document.getElementById("contactusDivId").style.display = "none";
        document.getElementById("howtoDivId").style.display = "none";

        document.getElementById("filescannerDivId").style.display = "none";
        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none";
        document.getElementById("loginDivId").style.display = "block";
        //document.getElementById("loginDivId").style.width = "70%";



        document.getElementById("loginerrormsg").innerHTML = "";

        //document.getElementById("helpDisplayDivId").style.width = "30%";


        showHelpDivMessage("Login to add or make updates to the help scan codes");

        document.getElementById("loginSecDivId").style.display = "none";
        document.getElementById("forgotPWDivId").style.display = "block";
        document.getElementById("loaderDivId").style.display = "none";
        return;
    }

    if (LocationSearchStr.indexOf('target=') > 0) {
        var ar = LocationSearchStr.split('target=');
        pageName = ar[1];
    }

    //if (onMobileBrowser()){
    //alert("On mobile")
    //showMobileMenu(pageName);

    //return;
    //}else {

    //}

    if (sessionStorage.getItem("LanguageHelpCodeAndIds") == null) {
        //document.getElementById("loaderDivId").style.display = "block";
        setTimeout(function () {
            //console.log("LanguageHelpCodeAndIds is null. Will retry after 1 seconds");
            //document.getElementById("loaderDivId").style.display = "none";
            checkURL();
        }, 1000);
        return;
    } else {
        the.LanguageHelpCodeAndIds_LclJson = JSON.parse(sessionStorage.getItem("LanguageHelpCodeAndIds"));
        document.getElementById("loaderDivId").style.display = "none";
    }

    document.getElementById("filescannerDivId").style.display = "none";
    document.getElementById("HelpTopicsDivId").style.display = "none";
    document.getElementById("projectscannerDivId").style.display = "none";
    document.getElementById("loginDivId").style.display = "none";
    document.getElementById("contactusDivId").style.display = "none";
    document.getElementById("howtoDivId").style.display = "none";
    document.getElementById("homeDivId").style.display = "none";
    document.getElementById("tutorialDivId").style.display = "none";
    document.getElementById("tutorialListDivId").style.display = "none";
    document.getElementById("tutorialEditDivId").style.display = "none";


    document.getElementById(pageName + "DivId").style.display = "block";






    populateLanguages("helpTopics-lang-box");
    try {
        x = document.getElementById(pageName + "LinkId");
        x.className += " active";
    } catch {
    }

    if (pageName == "HelpTopics") {

        if ((localStorage.getItem("userLoggedIn") == "n") || (localStorage.getItem("userLvl") != "9")) {
            //pageName = "projectscanner";
            Show("projectscanner");
            return
        }

        populateHelpTopics();
        document.getElementById("HelpTopicsDivId").style.width = "100%";
        document.getElementById("loaderDivId").style.display = "none";

    } else if (pageName == "projectscanner") {
        document.getElementById("bgSVGId").style.display = "none";
        populateStoredProjectList();
        if ((localStorage.getItem("userLoggedIn") == "y") && (localStorage.getItem("userLvl") == "9")) {
            document.getElementById("addNewProjBtnId").style.display = "block";
        }
        document.getElementById("projectscannerDivId").style.width = "100%";
        document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + "Upload project files and click on the file to scan the code"
        document.getElementById("loaderDivId").style.display = "none";
    } else if (pageName == "login") {
        document.getElementById("filescannerDivId").style.display = "none";
        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none";
        document.getElementById("loginDivId").style.display = "block";
        document.getElementById("helpDisplayDivId").style.display = "none";
        document.getElementById("loaderDivId").style.display = "none";
        //showHelpDivMessage("Login to add or make updates to the help scan codes");
    } else if (pageName == "contactus") {
        document.getElementById("filescannerDivId").style.display = "none";
        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none";
        document.getElementById("contactusDivId").style.display = "block";


        refreshCaptcha();
        document.getElementById("helpDisplayDivId").style.display = "none";
        //showHelpDivMessage("Contact us if you have any questions, feedback or are interested in purchasing the software. Some features have been disabled on the web version for security reasons. Full feature software can be used for software training/development, creating references and documentation for the software application. <br><br> If you found the site helpful, you can support our work by buying me a coffee by clicking on the coffee button at the top.");
        document.getElementById("loaderDivId").style.display = "none";
    } else if (pageName == "profile") {
        document.getElementById("bgSVGId").style.display = "none";
        showProfile();
        document.getElementById("loaderDivId").style.display = "none";
    } else if (pageName == "howto") {
        document.getElementById("bgSVGId").style.display = "none";
        document.getElementById("filescannerDivId").style.display = "none";
        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none";
        document.getElementById("helpDisplayDivId").style.display = "none";
        document.getElementById("contactusDivId").style.display = "none";
        document.getElementById("howtoDivId").style.display = "block";
        document.getElementById("howtoDivId").style.width = "95%";
        //document.getElementById("mainContainer").style.width = "100%";
        listVideos();
        document.getElementById("loaderDivId").style.display = "none";
    } else if (pageName == "filescanner") {
        document.getElementById("bgSVGId").style.display = "none";
        document.getElementById("btnCloseFileScanner").style.display = "none";
        if (localStorage.getItem("newWindowFileName") != null) {
            loadFile();

            localStorage.setItem("newWindowFileName", null);
            localStorage.setItem("newWindowFileObj", null);
        }
        document.getElementById("filescannerDivId").style.width = "100%";
        document.getElementById("loaderDivId").style.display = "none";
    } else if (pageName == "tutorial") {
        document.getElementById("filescannerDivId").style.display = "none";
        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none";
        document.getElementById("helpDisplayDivId").style.display = "none";
        document.getElementById("contactusDivId").style.display = "none";
        document.getElementById("howtoDivId").style.display = "none";
        //document.getElementById("tutorialDivId").style.width = "100%";
        document.getElementById("tutorialDivId").style.display = "none";
        document.getElementById("tutorialEditDivId").style.display = "none";
        document.getElementById("slideInDivId").style.display = "none";
        document.getElementById("tutorialListDivId").style.width = "100%";
        populateTutorialList();
        //document.getElementById("mainContainer").style.width = "100%";
        $(".cardsContainerDivClassPadd").css("height", "200px");
        document.getElementById("loaderDivId").style.display = "none";
    }
    else if (pageName == "home") {
        document.getElementById("filescannerDivId").style.display = "none";
        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("projectscannerDivId").style.display = "none";
        document.getElementById("helpDisplayDivId").style.display = "none";
        document.getElementById("contactusDivId").style.display = "none";
        document.getElementById("howtoDivId").style.display = "none";
        document.getElementById("homeDivId").style.width = "100%";
        //document.getElementById("mainContainer").style.width = "100%";
        document.getElementById("loaderDivId").style.display = "none";
    }
}

function getTutorial(tutorialStr) {
    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "getTutorial",
            tutorialstr: tutorialStr
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {

            tags = JSON.parse(response);
            var itemid = tags[0].itemid;
            var technology = tags[0].technology;
            var technologyseq = tags[0].technologyseq;
            var itemimage = tags[0].itemimage;
            var subpath = tags[0].subpath;
            var subpathseq = tags[0].subpathseq;
            var title = tags[0].title;
            var titleseq = tags[0].titleseq;
            var shortdescription = tags[0].shortdescription;
            var description = tags[0].description;
            var writer = tags[0].writer;
            var keywords = tags[0].keywords;
            var discontinue = tags[0].discontinue;
            var techclass = tags[0].techclass;

            var path = window.location.pathname;
            var myUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1)

            //START: Find the next tutorial to be put at the bottom of the page

            var tf = JSON.parse(sessionStorage.getItem("tutorialList"));

            var nextTutorialTitle = "";
            var nextTutorialTitleURL = "";
            var rows = JSON.parse(tf);

            rows = rows.filter(function (entry) {
                return entry.discontinue == "0" && entry.technology == technology;
            });

            var path = window.location.pathname;
            var myUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1);

            for (var i = 0; i < rows.length; i++) {
                if (rows[i].itemid == itemid) {

                    if (rows[i + 1] != undefined) {
                        itemName = rows[i + 1].title;
                        itemName = itemName.replaceAll(" ", "-");
                        nextSubpath = rows[i + 1].subpath;
                        nextSubpath = nextSubpath.replaceAll(" ", "-");
                        nextTechnology = (rows[i + 1].technology).toLowerCase();
                        nextTechnology = nextTechnology.replaceAll(" ", "-");
                        //nextTutorialTitleURL = myUrl + "topics/" + nextTechnology + "/" + nextSubpath.toLowerCase() + "/" + itemName.toLowerCase();
                        nextTutorialTitleURL = myUrl + "topics/" + nextTechnology + "/" + itemName.toLowerCase();
                        nextTutorialTitle = rows[i + 1].subpath;
                    }

                    break;
                }
            }
            //END: Find the next tutorial to be put at the bottom of the page


            var tutorialUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1) + "?target=tutorial";
            var technologyUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1) + "topics/" + technology;

            var newHTML = "<div classXX = 'songContainer' ><div class='topNavDivCls'>" +
                '<a href ="' + tutorialUrl + '" class="tutorialTopLinkCls" ' + ' >' + "Topics</a>" + " > " +
                '<a href ="' + technologyUrl + '" class="tutorialTopLinkCls"  >' + technology + "</a>" + " > " +
                '<a href ="' + window.location.href + '" class="tutorialTopLinkCls"  >' + title + "</a></div>";
            newHTML = newHTML + "<div class = 'curvedBox bgcolor_11 padding_50px color_white text_align_center' > <h1 id ='docHeader' > " + subpath + "</h1></div>";

            if (localStorage.getItem("userLoggedIn") == "n") {

            } else if (localStorage.getItem("userLvl") == "9") {

                sessionStorage.setItem("data-description", description);

                //newHTML = newHTML + '<a href="#" class="btn" onclick="editItem(' + "'" + itemid + "'," + "'" + technology + "'," + "'" + technologyseq + "'," + "'" + subpath + "',"+ "'" + subpathseq + "',"+ "'" + title + "',"+ "'" + titleseq + "',"+ "'" + shortdescription + "',"+ "'" + description + "',"+ "'" + writer + "',"+ "'" + keywords + "',"+ "'" + discontinue + "'"+');return false;" >Edit</a>';

                newHTML = newHTML + '<button class="btn" data-itemid= "' + itemid + '" data-technology= "' + technology + '" data-technologyseq= "' + technologyseq + '" data-itemimage= "' + itemimage + '" data-subpath= "' + subpath + '" data-subpathseq= "' + subpathseq + '" data-title= "' + title + '" data-titleseq= "' + titleseq + '" data-shortdescription= "' + shortdescription + '"  data-writer= "' + writer + '" data-keywords= "' + keywords + '" data-discontinue= "' + discontinue + '"  data-techclass= "' + techclass + '" onclick="editItem(this)" >Edit</button>';
                newHTML = newHTML + '<div class="printBtnDivCls"><button class="printBtn" onclick="printStoryBook()">Print Image Story Book</button></div>'
                newHTML = newHTML + '<div class="printBtnDivCls"><button class="printBtn" onclick="copyStoryBookToClipboard()">Copy Image Story Book</button></div>'

            }
            newHTML = newHTML + '<div class="printBtnDivCls"><button class="printBtn" onclick="window.print()">Printable</button></div>'
            newHTML = newHTML + '<div classXX="songDeltsNImg">';
            newHTML = newHTML + '<div classXX="songDelts">'

            let max = 80;
            let min = 50;
            let percentNumber = Math.floor(Math.random() * (max - min + 1)) + min;

            if (!isNaN(subpathseq)) {
                if (subpathseq != "0") {
                    percentNumber = subpathseq;
                }
            }

            let userdata = sessionStorage.getItem("userdata");
            let pageHdr = subpath;
            let lastResult = "";

            try{
                if ((userdata != null) && (userdata != "")) {
                    let userObjs = JSON.parse(userdata);
                    let quizScores = userObjs.scores;

                    let thisQuizResults = quizScores.filter(quizDet => quizDet.quiz === document.URL);
                    //let thisQuizResults = quizScores.filter(quiz => quiz.title === pageHdr);
    
                    // Sort the John students by grade in ascending order
                    //thisQuizResults.sort((a, b) => b.time.localeCompare(a.time));
    
                    thisQuizResults.sort((a, b)=> {
                        const dateA = new Date(a.time);
                        const dateB = new Date(b.time);
                        return dateB - dateA;
                    });
    
                    // Get the first element (with the least grade) from the sorted John students
                    lastResult = thisQuizResults[0].percent;
                }
            }catch{

            }

            try{
                if (description.includes("sbmtqzdivid")) {
                    newHTML = newHTML + '<div class="scoresPie"><div id="avgResultsDivId" class="resultsPie chartDiv text_align_center margin_10px_auto padding_10px slide-in-left" style="animation-duration: 0.2;  background:none; border: none">'
                    + '<div class="pie" style="--p:' + percentNumber + ';--b:20px;--w:130px; --c:green;">' + percentNumber + '%</div><br><span class="scoreText">Public Average Score</span>'
                    + '</div>';
                    
                    if (lastResult != ""){
                        newHTML = newHTML + '<div id="lastResultsDivId" class="resultsPie chartDiv text_align_center margin_10px_auto padding_10px slide-in-left" style="animation-duration: 0.2;  background:none; border: none">'
                        + '<div class="pie" style="--p:' + lastResult + ';--b:20px;--w:130px; --c:green;">' + lastResult + '%</div><br><span class="scoreText">My Previous Score</span>'
                        + '</div>';
                    }
    
                    newHTML = newHTML + '</div>';
                }
                if (description.includes("sbmtoneqzdivid")) {
                    showOneQnAtATimeKnowledgeTest("0");
                }
    
            }catch{

            }

            if (description != undefined) {
                if (description != "") {
                    newHTML = newHTML + "" + "<div class = 'songLyrics' >" + description + "</div>";
                }
            }

            newHTML = newHTML + "</div>";
            newHTML = newHTML + "</div>";
            if (description == undefined) {
                newHTML = "<div class = 'songContainer' >Page not found</div>";
            }

            if (nextTutorialTitle != "") {
                newHTML = newHTML + '<div class="bottomNavDivCls"><br><br>' + 'Next: <a href ="' + nextTutorialTitleURL + '" class="tutorialTopLinkCls"  >' + nextTutorialTitle + "</a> <br> <br></div>";

            }

            newHTML = newHTML + '<div class="bottomCommentDivCls"><br><br><br><br><br><br><br><br><br><hr><b>Leave a Comment</b>' + document.getElementById("sndmsgdivid").innerHTML + '</div>';

            document.getElementById("tutorialDivId").innerHTML = newHTML;
            refreshCaptcha();
            showTechnology(technology);
            //START: Change the background color of the active tutorial link 
            var elemId = "tutorialDiv-" + itemid;
            document.getElementById(elemId).style.backgroundColor = "orange";
            //END: Change the background color of the active tutorial link
            document.getElementById("slideInDivId").style.display = "block";
            var metaDesc = shortdescription;

            var metaKey = technology + "," + subpath + "," + keywords;


            document.querySelector('meta[name="description"]').setAttribute("content", metaDesc);
            document.querySelector('meta[name="keywords"]').setAttribute("content", metaKey);
            //document.title = technology + " " + subpath + ". " + title ;
            document.title = subpath + " | ReaderNook";

            sessionStorage.setItem("lastUrl", window.location.href);
            // if (localStorage.getItem("cookieAccepted") == "y"){
            //     document.getElementById("cookie-div-id").style.display = "none"
            // }

            const structuredData = {
                "@context": "https://schema.org/",
                "@type": "WebSite",
                "name": title,
                "url": "https://readernook.com/" + tutorialStr,
                "datePublished": "2022-07-10",
                "description": metaDesc,
                "thumbnailUrl": "https://readernook.com/images/banner.png"
            };

            let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
            jsonLdScript.innerHTML = JSON.stringify(structuredData);

            if ((sessionStorage.getItem("hideLeftMenuBar") == "Y") || (onMobileBrowser())) {
                setTimeout(() => {
                    toggleLeftSideMenu("hide");
                }, 50);
            }

            $('html, body').animate({
                scrollTop: -20
                //scrollTop: $("#tutorialListDivId").offset().top 
            }, 100);

            setTimeout(function () {
                $(".qz1-ans").on("click", function () {
                    $(this).find(".dynamicradio").prop("checked", true);
                });
            }, 800);

        },
        error: function (xhr, status, error) {
            //console.log(error);
            //console.log(xhr);
        }
    });
}


function editItem(btn) {
    itemid = btn.dataset.itemid;
    technology = btn.dataset.technology;
    technologyseq = btn.dataset.technologyseq;
    subpath = btn.dataset.subpath;
    subpathseq = btn.dataset.subpathseq;
    title = btn.dataset.title;
    titleseq = btn.dataset.titleseq;
    shortdescription = btn.dataset.shortdescription;
    //description = btn.dataset.description;
    description = sessionStorage.getItem("data-description");
    writer = btn.dataset.writer;
    keywords = btn.dataset.keywords;
    itemimage = btn.dataset.itemimage;
    discontinue = btn.dataset.discontinue;
    techclass = btn.dataset.techclass;
    
    document.body.classList.remove('image-story-book-style');
    document.body.classList.add('image-story-book-edit-style');
    
    $.ajax({
        url: the.hosturl + '/php/process.php',
        data: { usrfunction: "checksession" },
        type: 'POST',
        dataType: 'json',
        success: function (retstatus) {
            if (retstatus == "err") {
                //alert("Please relogin");
                //showLogin();
                goToLogin();
            }
        },
        error: function (xhr, status, error) {
            //console.log("")
        }
    });
    var newHTML = "<div class = 'songContainer' >";
    newHTML = newHTML + " ";

    setTimeout(() => {
        addImageFrames();
        addCopyButtons();
    }, 2000);

    newHTML = newHTML +
        "<div class = 'editFieldHead'>Title(URL-Path): </div><br>"
        +
        "<input type='text'  id='title-" + itemid + "' style='width:95%; margin:auto;' value='" + title + "'>"
        + "";

    newHTML = newHTML +
        "<br><br><div class = 'editFieldHead'>SubPath(Page-Heading): </div><br>" +
        "<input type='text' id='subpath-" + itemid + "' style='width:95%; margin:auto;' value='" + subpath + "'>";

    newHTML = newHTML +
        "<br><br><div class = 'editFieldHead'>Title Sort Sequence: </div><br>" +
        "<input type='text' id='titleseq-" + itemid + "' style='width:95%; margin:auto;' value='" + titleseq + "'>";

    newHTML = newHTML + "<br><br><div class = 'editFieldHead'>Technology: </div><br>" +
        "<input type='text' id='technology-" + itemid + "' style='width:95%; margin:auto;'  value='" + technology + "'>";

    newHTML = newHTML +
        "<br><br><div class = 'editFieldHead'>Technology Sort Sequence: </div><br>" +
        "<input type='text' id='technologyseq-" + itemid + "' style='width:95%; margin:auto;' value='" + technologyseq + "'>";


    newHTML = newHTML +
        "<br><br><div class = 'editFieldHead'>Path Sort Sequence(Used for Quiz%): </div><br>" +
        "<input type='text' id='subpathseq-" + itemid + "' style='width:95%; margin:auto;' value='" + subpathseq + "'>";



    newHTML = newHTML +
        "<br><br><div class = 'editFieldHead'>Short Description (meta-desc): </div><br>" +
        "<textarea id='shortdescription-" + itemid + "' style='width:95%; margin:auto;' >" + shortdescription + "</textarea>";

    toolbarHTML = "";
    //toolbarHTML =  "<button  type='button' class='itmToggledBtn btn btn-primary' onclick=toggleDescView('" + itemid + "') >Toggle View</button>" + "<br>" ;

    toolbarHTML = toolbarHTML + "<div id='toolBarId' class = 'toolBar'><div>" +
        "<button  data-title='toggle desc view' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=toggleDescView('" + itemid + "') >TglDesc</button>" +
        "<button  data-title='toggle hide' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=toggleToolBarView() >TglHide</button>" +

        "<label class='toolBarlabel'>Paragraphs</label>" +
        "<button data-title='paragraph1' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','paragraph1') >P1</button>" +
        "<button data-title='paragraph2 white BG' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','paragraph2') >P2</button>" +
        "<button title='adminEditDiv white BG' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','adminEditDiv') >Ad</button>" +
        "<label class='toolBarlabel'>Ordered Lists</label>" +
        "<button data-title='ordered-list' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','orderedlist') >OL1</button>" +
        "<button data-title='sub-ordered-list' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','suborderedlist') >OL2</button>" +
        "<label class='toolBarlabel'>Unordered Lists</label>" +
        "<button data-title='un-ordered-list' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','unorderedlist') >UL1</button>" +
        "<button data-title='sub-un-ordered-list' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','subunorderedlist') >UL2</button>" +
        "<button data-title='sub2-un-ordered-list' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','sub2unorderedlist') >UL3</button>" +
        "<label class='toolBarlabel'>Code Snippets</label>" +
        "<button data-title='Code-Dark Intellij' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','codescript1') >Dark</button>" +
        "<button data-title='Code-Light-VSCode' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','codescript2') >Light</button>" +
        "<button data-title='Code-CommandLine'' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','codescript3') >Cmd</button>" +
        "<label class='toolBarlabel'>Headers</label>" +
        "<button data-title='header1-padding' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','header3') >H1-Style1</button>" +
        "<button data-title='header1' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','header1') >H1-Style2</button>" +
        "<button data-title='header2' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','header2') >H2-Style1</button>" +
        "<button data-title='header3' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','header4') >H3-Style1</button>" +

        "<button data-title='Convert selected text to h2 inline' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','convert-to-h2-inline') >Convert text to h2</button>" +
        "<button data-title='Convert selected text to h3 inline' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','convert-to-h3-inline') >Convert text to h3</button>" +
        "<button data-title='Convert selected text to blue h3 inline' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','convert-to-blue-h3-inline') >Convert text to blue h3</button>" +
        
        "<label class='toolBarlabel'>Video Headers and lists</label>" +
        "<button data-title='Convert selected text to wavy header in video' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','convert-to-video-header') >Convert text to wavy header</button>" +
        "<button data-title='Convert selected text to wavy list item in video' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','convert-to-video-listitem') >Convert text to wavy listitem</button>" +
        "<button data-title='Convert selected text to staying header in video' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','convert-to-staying-header') >Convert text to staying header</button>" +
        "<button data-title='Convert selected text to staying building list item in video' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','convert-to-staying-listitem') >Convert text to staying listitem</button>" +
        "<input type='checkbox' id='toggleAspectRatio'>Portrait Mode" +

        "<label class='toolBarlabel'>Multi Shorts</label>" +
        "<button data-title='Shorts1'' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','shorts1') >Add Shorts Template</button>" +


        "<label class='toolBarlabel'>Alignment</label>" +
        "<button data-title='Left Align selected text' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','left-align') >Left</button>" +
        "<button data-title='Center Align selected text' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','center-align') >Center</button>" +
        "<button data-title='Right Align selected text' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','right-align') >Right</button>" +
        "<button data-title='Align Justify selected text' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','justify-align') >Justify</button>" +

        "<label class='toolBarlabel'>Images</label>" +
        "<button data-title='Image-Full-width' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','image1') >I1</button>" +
        "<button data-title='Image-Smaller' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','image2') >I2</button>" +
        "<button data-title='Image-Smallest' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','image3') >I3</button>" +
        "<button data-title='Insert at Carot' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','image4') >I@Car</button>" +
        "<label class='toolBarlabel'>Messages</label>" +

        "<button data-title='PageContent-Info' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','pageinfo') >PageContentInfo</button>" +

        "<button data-title='Warning'' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','warning') >Warn</button>" +
        "<button data-title='Error' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','error') >Err</button>" +
        "<button data-title='Green-Success' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','greenmsg') >Succ</button>" +

        "<label class='toolBarlabel'>Quiz</label>" +
        "<button data-title='Quiz1'' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','qz1') >Q1</button>" +
        "<button data-title='Quiz2' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','qz2') >Q2</button>" +
        "<button data-title='Submit Quiz Button' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=addComponent('" + itemid + "','sbmtqz') >SbmtQz</button>" +

        "<label class='toolBarlabel'>Insert Clipboard HTML</label>" +
        "<button id='insertHTMLbtnId' data-title='CTRL + b' type='button' class='itmUpdBtnSmallX btn btn-primary' onclick=insertClipboardHTMLAtCaret() >insertClipboardHTMLAtCaret</button>" +

        "<input type='text' id='htmlDataInsert' value='<div>Insert HTML</div>' placeholder='HTML to insert'>" +

        "<label for='insertInner'>Insert component before active Div:</label>" +
        "<input type='checkbox' id='insertInner' >" +
        "</div>";



    toolbarHTML = toolbarHTML +
        "Max image height/width (px):" +
        "<input type='text' class='imageszCls' id='imagesz-" + itemid + "' style='width:95%; margin:auto;'  value='2000'>" +
        "Upload Image:(e.g. myimage.png)" +
        "<input type='text' id='image-" + itemid + "' style='width:95%; margin:auto;'  value=''>"

        +
        "<br><img id='image-src-replace-" + itemid + "' src= '" + the.hosturl + "/img/" + "' style='width: 200px; height: 200px; background-color: white;' alt='Image not available' />"

        +
        "<br><input type='file'  id='image-replace-" + itemid + "' data-itemid = '" + itemid + "'   data-imageelementid='image-src-replace-' onchange='showImage(event)'>"

        +
        "<br><label id='image-ererrormsg-" + itemid + "' style='color: #cc0000; font-size: 14px; min-height: 20px;'></label>"
        +
        "<button data-title='Upload And Insert At Carot' class='itmUpdBtnSmall btn btn-primary' type='button' value='Upload And Insert At Carot' data-errormsgelementid='image-ererrormsg-' data-saveasnameelementid='image-' data-fileelementid='image-replace-' data-itemid = '" + itemid + "' onclick='uploadAndInsertFile(event);'  >UploadNInsert</button>"
        + "<button data-title='Upload New Image' class='itmUpdBtnSmall btn btn-primary' type='button' value='Upload New Image' data-errormsgelementid='image-ererrormsg-' data-saveasnameelementid='image-' data-fileelementid='image-replace-' data-itemid = '" + itemid + "' onclick='uploadFile(event);'  >Upload</button><br>"

        + "<label class='toolBarlabel'>Image Search</label>" 
        + "<input class = 'itmUpdBtnSmall' type='text' id='search-img' value='' placeholder = 'image to search'> "
        + "<button title='Image-Smallest' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=loadUNSPLImg('" + itemid + "')>Search Unsplash</button>"
        + "<button title='Image-Smallest' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=loadPixabImg('" + itemid + "')>Search Pixabay</button>"
        + "<button title='Image-Smallest' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=loadPexImg('" + itemid + "')>Search Pexel</button><br>"
        + "<div class='srchimages'></div>"



        + "<label class='toolBarlabel'>Video Search</label>" 
        + "<input class = 'itmUpdBtnSmall' type='text' id='search-vid' value='' placeholder = 'video to search'> "
        // + "<button title='Image-Smallest' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=loadUnsplashVid('" + itemid + "')>Search Unsplash</button>"
        + "<button title='Image-Smallest' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=loadPixabayVid('" + itemid + "')>Search Pixabay</button>"
        + "<button title='Image-Smallest' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=loadPexVid('" + itemid + "')>Search Pexel</button><br>"
        + "<div class='srchvideos'></div>"

        + "<label class='toolBarlabel'>Audio Search</label>" 
        + "<input class = 'itmUpdBtnSmall' type='text' id='search-audio' value='' placeholder = 'audio to search'> "
        + "<button title='Image-Smallest' type='button' class='itmUpdBtnSmall btn btn-primary' onclick=loadFreesoundAudio('" + itemid + "')>Search Audio</button>"
        + "<div class='srchaudios'></div>"
        
        + "</div><br><br><br>";

    newHTML = newHTML + "<br><br>" +
        "<textarea id='descriptionTextId' class = ''   ></textarea>"
        +
        "<div class='editDescriptionDiv' contenteditable='true'  class='span2 fullWidth lyricsDiv' id='description-" + itemid + "'  >" + description + "</div>";


    //newHTML = newHTML + "<br><br>" +
    //"<textarea id='description-" + itemid + " class = 'fullWidth tiny ' rows='5'>" + description + "</textarea>";


    newHTML = newHTML +
        "<br><br><div class = 'editFieldHead'>Writer: </div><br>" +
        "<input type='text' id='writer-" + itemid + "' style='width:95%; margin:auto;' value='" + writer + "'>";

    newHTML = newHTML +
    "<br><br><div class = 'editFieldHead'>techclass: </div><br>" +
    "<input type='text' id='techclass-" + itemid + "' style='width:95%; margin:auto;' value='" + techclass + "'>";

    newHTML = newHTML +
        "<br><br><div class = 'editFieldHead'>Keywords (tags): </div><br>" +
        "<textarea id='keywords-" + itemid + "' style='width:95%; margin:auto;' >" + keywords + "</textarea>";

    newHTML = newHTML +
    "<br><br><div class = 'editFieldHead'>Item Image: </div><br>" +
    "<textarea id='itemimage-" + itemid + "' style='width:95%; margin:auto;' >" + itemimage + "</textarea>";

    newHTML = newHTML +
        "<br><br><div class = 'editFieldHead'>Discontinue: </div> <br>" +
        "<input type='text' id='discontinue-" + itemid + "' style='width:95%; margin:auto;' value='" + discontinue + "'>"

        +
        "<label id='updateitemerrormsg-" + itemid + "' style='color: #cc0000; font-size: 14px; min-height: 20px;'></label>";

    newHTML = newHTML +
        "<div class = 'saveChangesDivCls'>" +
        "<button  id='saveChangesBtnId' data-title='CTRL + s' type='button' class='itmUpdSaveBtn btn btn-primary' onclick=updateItem('" + itemid + "','n') >Save Changes</button><br>" +
        "<button   type='button' class='itmUpdSaveBtn btn btn-primary' onclick=updateItem('" + itemid + "','y') >Save As New Item</button><br>" +
        "<button   type='button' class='itmUpdSaveBtn btn btn-danger' onclick=refreshPage() >Cancel</button><br>" +
        "</div>" +
        "<br><br><br><br><br><br><br><br><br></div></div>";

    newHTML = newHTML + "</div>";
    newHTML = newHTML + "</div>";
    newHTML = newHTML + "</div>";

    document.getElementById("tutorialDivId").innerHTML = newHTML;
    document.getElementById("tutorialEditDivId").innerHTML = toolbarHTML;


    document.getElementById("tutorialEditDivId").style.display = "block";

    document.getElementById("tutorialDivId").style.width = "100%";

    document.getElementById("mainContainer").style.width = "100%";
    document.getElementById("tutorialEditDivId").style.width = "20%";
    document.getElementById("tutorialListDivId").style.display = "none";
    document.getElementById("tutorialDivId").style.width = "80%";

}

function toggleToolBarView() {
    //console.log(document.getElementById("toolBarId").clientHeight);

    if (document.getElementById("toolBarId").clientHeight > 50) {
        document.getElementById("toolBarId").style.height = "50px";
    } else {
        //document.getElementById("toolBarId").style.height = "100%";
        document.getElementById("toolBarId").style.height = "600px";
    }
}

function toggleLeftSideMenu(hideFlag = "") {

    if (hideFlag == "") {
        if (document.getElementById("tutorialListInnerDivId").style.display != "none") {
            document.getElementById("tutorialListDivId").style.width = "10%";
            document.getElementById("tutorialEditDivId").style.width = "10%";
            document.getElementById("tutorialListDivId").style.minWidth = "0px";
            document.getElementById("tutorialListInnerDivId").style.display = "none";
            //document.getElementById("slideInDivId").innerHTML = '<i class="fa fa-list"></i>';
            sessionStorage.setItem("hideLeftMenuBar", "Y");
        } else {
            document.getElementById("tutorialListDivId").style.minWidth = "350px";
            //document.getElementById("tutorialListDivId").style.width = "100%";
            document.getElementById("tutorialListInnerDivId").style.display = "block";
            //document.getElementById("slideInDivId").innerHTML = '<i class="fa fa-caret-left"></i>';
            sessionStorage.setItem("hideLeftMenuBar", "N");
        }
    } else {
        document.getElementById("tutorialListDivId").style.width = "10%";
        document.getElementById("tutorialEditDivId").style.width = "10%";
        document.getElementById("tutorialListDivId").style.minWidth = "0px";
        document.getElementById("tutorialListInnerDivId").style.display = "none";
        //document.getElementById("slideInDivId").innerHTML = '<i class="fa fa-list"></i>';
        sessionStorage.setItem("hideLeftMenuBar", "Y");
    }


}

function popolatenewImageName(itemid) {
    let name = window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "-" + (Math.floor(Math.random() * 10000) + 1) + ".png";
    sessionStorage.setItem("saveasname", name);
    document.getElementById("image-" + itemid).value = name;
}

function popolatenewVideoName(itemid){
    let name = window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "-" + (Math.floor(Math.random() * 10000) + 1) + ".mp4";
    sessionStorage.setItem("saveasname", name);
    document.getElementById("image-" + itemid).value = name;
}

function loadUNSPLImg(itemid) {
    popolatenewImageName(itemid);
    var imageName = document.getElementById("search-img").value;
    if (imageName == "") {
        //imageName = "coffee";
        return;
    }
    const url = "https://api.unsplash.com/search/photos?query=" + imageName + "&per_page=100&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
    const imageDiv = document.querySelector('.srchimages');
    imageDiv.innerHTML = "";
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {

            for (let i = 0; i < data.results.length; i++) {

                /* Fetch only image that you want by using id. Example : https://unsplash.com/photos/6VhPY27jdps, id = '6VhPY27jdps'   */
                //if (data.results[i].id == "6VhPY27jdps") {
                let imageElement = document.createElement('img');
                imageElement.src = data.results[i].urls.regular;
                //imageElement.src = data.results[i].urls.thumb;
                imageElement.setAttribute('onclick', 'SaveImageAndInsertAtCarot(event)');
                imageElement.setAttribute('data-errormsgelementid', 'image-ererrormsg-');
                imageElement.setAttribute('data-saveasnameelementid', 'image-');
                imageElement.setAttribute('data-fileelementid', 'image-replace-');
                imageElement.setAttribute('data-itemid', itemid);
                imageElement.setAttribute('data-imageurl', data.results[i].urls.regular);

                imageDiv.append(imageElement);
                //}
            }
        });
}

function loadFreesoundAudio() {
    const audioName = document.getElementById("search-audio").value;
    if (audioName === "") return;

    const url = `https://freesound.org/apiv2/search/text/?query=${audioName}&fields=id,name,tags,previews,license,username&token=elApmIJzS55WKHd8DIe9FepWG5LdKC2YXZX4xy8E`;

    const audioDiv = document.querySelector('.srchaudios');
    audioDiv.innerHTML = "";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                audioDiv.innerHTML = "No results found.";
                return;
            }

            for (let i = 0; i < data.results.length; i++) {
                const result = data.results[i];

                // Filter for free-to-use sounds
                if (
                    result.license.includes("publicdomain") || 
                    result.license.includes("creativecommons.org/licenses/by/")
                ) {
                    // Ensure `previews` exists and contains `preview-hq-mp3`
                    const previewUrl = result.previews ? (result.previews["preview-hq-mp3"] || result.previews["preview-lq-mp3"]) : null;
                    if (!previewUrl) continue; // Skip if no preview available

                    const audioElement = document.createElement('div');
                    audioElement.classList.add('audio-item');

                    const audioPreview = document.createElement('audio');
                    audioPreview.src = previewUrl;
                    audioPreview.controls = true;

                    const selectButton = document.createElement('button');
                    selectButton.innerText = "Select Sound";
                    selectButton.setAttribute('data-audio-url', previewUrl);
                    selectButton.setAttribute('data-audio-name', result.name);
                    selectButton.onclick = SaveAudioAndInsertAtCarot;

                    audioElement.appendChild(audioPreview);
                    audioElement.appendChild(document.createElement('br'));
                    audioElement.appendChild(document.createTextNode(result.name));
                    audioElement.appendChild(selectButton);

                    audioDiv.appendChild(audioElement);
                }
            }
        })
        .catch(error => console.error('Error fetching sounds:', error));
}

//WORKING
function loadFreesoundAudio_Delit() {
    const audioName = document.getElementById("search-audio").value;
    if (audioName === "") return;

    const url = `https://freesound.org/apiv2/search/text/?query=${audioName}&fields=id,name,tags,previews,license,username&token=elApmIJzS55WKHd8DIe9FepWG5LdKC2YXZX4xy8E`;

    const audioDiv = document.querySelector('.srchaudios');
    audioDiv.innerHTML = "";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.results) {
                audioDiv.innerHTML = "No results found.";
                return;
            }
            console.log(data.results);
            for (let i = 0; i < data.results.length; i++) {
                const audioElement = document.createElement('div');
                audioElement.classList.add('audio-item');

                const audioPreview = document.createElement('audio');
                audioPreview.src = data.results[i].previews["preview-hq-mp3"];
                audioPreview.controls = true;

                const selectButton = document.createElement('button');
                selectButton.innerText = "Select Sound";
                selectButton.setAttribute('data-audio-url', data.results[i].previews["preview-hq-mp3"]);
                selectButton.setAttribute('data-audio-name', data.results[i].name);
                selectButton.onclick = SaveAudioAndInsertAtCarot;

                audioElement.appendChild(audioPreview);
                audioElement.appendChild(document.createElement('br'));
                audioElement.appendChild(document.createTextNode(data.results[i].name));
                audioElement.appendChild(selectButton);

                audioDiv.appendChild(audioElement);
            }
        })
        .catch(error => console.error('Error fetching sounds:', error));
}

function SaveAudioAndInsertAtCarot(event) {
    const audioUrl = event.target.getAttribute('data-audio-url');
    let audioName = event.target.getAttribute('data-audio-name');
    //const audioName = "abcd";
    const localAudioUrl = the.hosturl + "/audio/" + audioName + ".mp3";

    // Replace invalid characters with blanks in the filename
    audioName = audioName.replace(/[/\\?%*:|"<>]/g, '');

    fetch(audioUrl)
        .then(response => response.blob())
        .then(blob => {
            const formData = new FormData();
            formData.append("file", blob, audioName + ".mp3");
            formData.append("saveasname", audioName + ".mp3");
            formData.append("dir", "audio");

            let xhttp = new XMLHttpRequest();

            xhttp.open("POST", the.hosturl + "/php/upload.php", true);

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    let response = this.responseText;
                    //console.log(response);

                    addAudioElement(audioName, localAudioUrl)

                    // const randomId = "div-" + Math.floor(Math.random() * 1000000);
                    // const soundElementHTML = `
                    //     <div id="${randomId}" onmousedown="setLastFocusedDivId(this.id)" class="audio-desc">
                    //         <span>${audioName}</span>
                    //         <audio controls src="${localAudioUrl}"></audio>
                    //         <button title="Remove sound" onclick="deleteCurrentComponent(this)">Remove</button>
                    //     </div>
                    // `;
                    // insertImageAtCaret(soundElementHTML);
                }
            };

            xhttp.send(formData);


        })
        .catch(error => console.error('Error uploading sound:', error));
}

function addAudioElement(audioName, audioUrl) {
    const randomId = "audio-" + Math.floor(Math.random() * 1000000);
    //const audioContainer = document.getElementById("audio-container");

    // Create the main audio element
    const audioDiv = document.createElement("div");
    audioDiv.classList.add("audio-desc");
    //audioDiv.setAttribute("onclick", `toggleAudioDetails('${randomId}')`);

    // Display the audio name
    const audioNameElement = document.createElement("span");
    audioNameElement.setAttribute("onclick", `toggleParentDetails(this)`);
    audioNameElement.textContent = audioName;

    // Create the hidden details section
    const detailsDiv = document.createElement("div");
    detailsDiv.id = randomId;
    detailsDiv.classList.add("audio-details");

    // Editable fields for sound effect details
    detailsDiv.innerHTML = `
        <label>Start Time (seconds):</label>
        <div contenteditable="true" id="${randomId}-start">0</div>
        <label>Duration (seconds):</label>
        <div contenteditable="true" id="${randomId}-duration">3</div>
        <label>Volume % (eg. 50, 200):</label>
        <div contenteditable="true" id="${randomId}-volume">100</div>
        <label>Overlap with spoken text:</label>
        <select id="${randomId}-overlap">
            <option value="no">No</option>
            <option value="yes">Yes</option>
        </select>
        <label>Preview Sound:</label>
        <audio controls src="${audioUrl}"></audio>
        <button title="Remove sound" onclick="deleteAudioComponent(this)">Remove</button>
    `;

    // Append elements to the main div
    audioDiv.appendChild(audioNameElement);
    audioDiv.appendChild(detailsDiv);

    // Add to container
    //audioContainer.appendChild(audioDiv);
    insertContentAtCaret(audioDiv.outerHTML);
}

function deleteAudioComponent(element){
    deleteCurrentComponent(element.parentElement);
}
// Function to toggle the details section
function toggleParentDetails(spanElement) {
    // Find the 'div.audio-details' element within the parent element of spanElement
    const parentDiv = spanElement.parentNode;
    const detailsDiv = spanElement.parentElement.querySelector('div.audio-details');
    
    if (detailsDiv) { // Ensure detailsDiv exists
        // Toggle display style
        if (detailsDiv.style.display === "none" || detailsDiv.style.display === "") {
            detailsDiv.style.display = "block";
            parentDiv.style.display = "block";
            parentDiv.style.border = "1px solid #ccc";
        } else {
            detailsDiv.style.display = "none";
            parentDiv.style.display = "inline";
            parentDiv.style.border = "none";
        }
    } else {
        console.error("No element with class 'audio-details' found within the parent element.");
    }
}


function toggleAudioDetails(detailsId) {
    const detailsDiv = document.getElementById(detailsId);
    if (detailsDiv.style.display === "none" || detailsDiv.style.display === "") {
        detailsDiv.style.display = "block";
    } else {
        detailsDiv.style.display = "none";
    }
}

function loadPexImg(itemid) {
    popolatenewImageName(itemid)
    var imageName = document.getElementById("search-img").value;
    if (imageName == "") {
        //imageName = "coffee";
        return;
    }
    const imageDiv = document.querySelector('.srchimages');
    imageDiv.innerHTML = "";
    fetch("https://api.pexels.com/v1/search?per_page=100&query=" + imageName, {
        headers: {
            Authorization: "r133XPzHPTKK18x6bcaM5AInbsTp88RC4W4nemUhS4ktwBxMpnDpFT41"
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            arr = data.photos;
            for (let i = 0; i < arr.length; i++) {
                let imageElement = document.createElement('img');
                //imageElement.src = arr[i].src.original;
                imageElement.src = arr[i].src.landscape;

                //imageElement.src = arr[i].src.small;

                imageElement.setAttribute('onclick', 'SaveImageAndInsertAtCarot(event)');
                imageElement.setAttribute('data-errormsgelementid', 'image-ererrormsg-');
                imageElement.setAttribute('data-saveasnameelementid', 'image-');
                imageElement.setAttribute('data-fileelementid', 'image-replace-');
                imageElement.setAttribute('data-itemid', itemid);
                imageElement.setAttribute('data-imageurl', arr[i].src.landscape);

                imageDiv.append(imageElement);
            }
        });
}

function loadPexVid(itemid) {
    popolatenewVideoName(itemid)
    // Get the search term from the input field
    var videoName = document.getElementById("search-vid").value;
    if (videoName == "") {
        return;
    }
    
    // Select the container for displaying videos
    const videoDiv = document.querySelector('.srchvideos');
    videoDiv.innerHTML = ""; // Clear previous results
    
    // Fetch videos from Pexels API
    fetch("https://api.pexels.com/videos/search?per_page=100&query=" + videoName, {
        headers: {
            Authorization: "r133XPzHPTKK18x6bcaM5AInbsTp88RC4W4nemUhS4ktwBxMpnDpFT41" // Replace with your Pexels API key
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {

        const hdVideos = data.videos.filter(video => 
            video.video_files.some(file => file.width >= 1920 && file.height >= 1080)
        );

        const videos = hdVideos; // Array of videos
        
        // Iterate over the video array
        for (let i = 0; i < videos.length; i++) {
            let hdFile = videos[i].video_files.find(file => file.width >= 1920 && file.height >= 1080);

            if (hdFile) { // Ensure an HD file is found

                let videoElement = document.createElement('video');
                videoElement.src = hdFile.link; // Use the first video file link
                videoElement.controls = true; // Add video controls
                videoElement.setAttribute('width', '300'); // Set a fixed width (optional)
                videoElement.setAttribute('onclick', 'SaveVideoAndInsertAtCarot(event)'); // Custom onclick handler
                videoElement.setAttribute('data-errormsgelementid', 'image-errormsg-');
                videoElement.setAttribute('data-saveasnameelementid', 'image-');
                videoElement.setAttribute('data-fileelementid', 'video-replace-');
                videoElement.setAttribute('data-itemid', itemid);
                videoElement.setAttribute('data-videourl', hdFile.link); // Store video URL as data attribute
                
                // Append the video element to the container
                videoDiv.append(videoElement);
            }
        }
    })
    .catch(error => {
        console.error("Error loading videos:", error);
    });
}

function loadPixabayVid(itemid) { 
    popolatenewVideoName(itemid)
    // Get the search term from the input field
    var videoName = document.getElementById("search-vid").value;
    if (videoName == "") {
        return;
    }
    
    // Select the container for displaying videos
    const videoDiv = document.querySelector('.srchvideos');
    videoDiv.innerHTML = ""; // Clear previous results
    
    // Fetch videos from Pixabay API
    fetch("https://pixabay.com/api/videos/?key=33936925-b94dd0e302df74f271d1b84c5&per_page=100&q=" + encodeURIComponent(videoName), { // Replace `xyz` with your Pixabay API key
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        const allVideos = data.hits; // Array of videos
        // Filter videos to include only HD quality (minimum 1920x1080)
        const videos = allVideos.filter(video => 
            video.videos.large && 
            video.videos.large.width >= 1920 && 
            video.videos.large.height >= 1080
        );   

        // Iterate over the video array
        for (let i = 0; i < videos.length; i++) {
            let videoElement = document.createElement('video');
            videoElement.src = videos[i].videos.large.url; // Use the medium quality video link
            videoElement.controls = true; // Add video controls
            videoElement.setAttribute('width', '300'); // Set a fixed width (optional)
            videoElement.setAttribute('onclick', 'SaveVideoAndInsertAtCarot(event)'); // Custom onclick handler
            videoElement.setAttribute('data-errormsgelementid', 'image-errormsg-');
            videoElement.setAttribute('data-saveasnameelementid', 'image-');
            videoElement.setAttribute('data-fileelementid', 'video-replace-');
            videoElement.setAttribute('data-itemid', itemid);
            videoElement.setAttribute('data-videourl', videos[i].videos.medium.url); // Store video URL as data attribute
            
            // Append the video element to the container
            videoDiv.append(videoElement);
        }
    })
    .catch(error => {
        console.error("Error loading videos:", error);
    });
}

function loadUnsplashVid(itemid) { 
    popolatenewVideoName(itemid)
    // Get the search term from the input field
    var videoName = document.getElementById("search-vid").value;
    if (videoName == "") {
        return;
    }
    
    // Select the container for displaying videos
    const videoDiv = document.querySelector('.srchvideos');
    videoDiv.innerHTML = ""; // Clear previous results
    
    // Fetch videos from Unsplash (via search API for images and videos)
    fetch("https://api.unsplash.com/search/videos?query=" + videoName + "&per_page=100", {
        headers: {
            Authorization: "gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k" // Replace with your Unsplash API key
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        const videos = data.results; // Array of videos
        
        // Iterate over the video array
        for (let i = 0; i < videos.length; i++) {
            let videoElement = document.createElement('video');
            videoElement.src = videos[i].urls.regular; // Use the regular video link
            videoElement.controls = true; // Add video controls
            videoElement.setAttribute('width', '300'); // Set a fixed width (optional)
            videoElement.setAttribute('onclick', 'SaveVideoAndInsertAtCarot(event)'); // Custom onclick handler
            videoElement.setAttribute('data-errormsgelementid', 'image-errormsg-');
            videoElement.setAttribute('data-saveasnameelementid', 'image-');
            videoElement.setAttribute('data-fileelementid', 'video-replace-');
            videoElement.setAttribute('data-itemid', itemid);
            videoElement.setAttribute('data-videourl', videos[i].urls.regular); // Store video URL as data attribute
            
            // Append the video element to the container
            videoDiv.append(videoElement);
        }
    })
    .catch(error => {
        console.error("Error loading videos:", error);
    });
}


function loadPixabImg(itemid) {
    popolatenewImageName(itemid)
    var imageName = document.getElementById("search-img").value;
    if (imageName == "") {
        //imageName = "coffee";
        return;
    }
    const imageDiv = document.querySelector('.srchimages');
    var key = "33936925-b94dd0e302df74f271d1b84c5";
    const url = "https://pixabay.com/api/?key=" + key + "&per_page=100&q=" + imageName + "&image_type=photo";
    //const url = "https://pixabay.com/api/?key=33936925-b94dd0e302df74f271d1b84c5&q=yellow+flowers&image_type=photo&pretty=true&per_page=20";
    imageDiv.innerHTML = "";
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            arr = data.hits;
            //console.log(arr);
            for (let i = 0; i < arr.length; i++) {
                let imageElement = document.createElement('img');
                imageElement.src = arr[i].largeImageURL;
                //imageElement.src = arr[i].previewURL;

                imageElement.setAttribute('onclick', 'SaveImageAndInsertAtCarot(event)');
                imageElement.setAttribute('data-errormsgelementid', 'image-ererrormsg-');
                imageElement.setAttribute('data-saveasnameelementid', 'image-');
                imageElement.setAttribute('data-fileelementid', 'image-replace-');
                imageElement.setAttribute('data-itemid', itemid);
                imageElement.setAttribute('data-imageurl', arr[i].largeImageURL);

                imageDiv.append(imageElement);
            }
        });
}

function deleteCurrentComponent(btn) {

    //console.log("document.activeElement.tagName = " + document.activeElement.tagName);
    //console.log("document.activeElement.innerHTML = " + document.activeElement.innerHTML);
    //console.log("document.activeElement.parentElement.innerHTML = " + document.activeElement.parentElement.innerHTML);

    //console.log("btn.tagName = " + btn.tagName);
    //console.log("btn.parentElement.innerHTML = " + btn.parentElement.innerHTML);
    btn.parentElement.remove();
    //btn.parentElement.innerHTML = "";
}

function deleteCurrentComponentAndRemoveBK(btn){

    // Get the parent div of the button
    let parentDiv = $(btn).closest('div.image1-desc');

    // Find the image inside the parent div
    let imageElement = parentDiv.find('img.movieImageCls');
    
    // Get the source attribute of the image, which contains the image's name
    let imageName = imageElement.attr('src').split('/').pop();

    let formData = new FormData();
    formData.append("saveasname", imageName);
    formData.append("dir", "img");

    let xhttp = new XMLHttpRequest();

    // Set POST method and ajax file path
    xhttp.open("POST", the.hosturl + "/php/deletefile.php", true);

    // call on request changes state
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let response = this.responseText;
            //console.log(response);

         }
    };

    // Send request with data
    xhttp.send(formData);
    btn.parentElement.remove();
}

function deleteCurrentVideoComponentAndRemoveBK(btn){

    // Get the parent div of the button
    let parentDiv = $(btn).closest('div.video1-desc');

    // Find the video inside the parent div
    let videoElement = parentDiv.find('video.movieVideoCls');
    
    // Get the source attribute of the video, which contains the video's name
    let videoName = videoElement.attr('src').split('/').pop();

    let formData = new FormData();
    formData.append("saveasname", videoName);
    formData.append("dir", "videos");

    let xhttp = new XMLHttpRequest();

    // Set POST method and ajax file path
    xhttp.open("POST", the.hosturl + "/php/deletefile.php", true);

    // call on request changes state
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let response = this.responseText;
            console.log(response);

         }
    };

    // Send request with data
    xhttp.send(formData);
    btn.parentElement.remove();
}


function copyCurrentComponent(btn) {
    var text = btn.parentElement.textContent;
    text = text.substring(1, text.lastIndexOf('Copy'));

    navigator.clipboard.writeText(text);
    console.log(text);
}

function showImage(event) {
    var elem = event.target;
    var itemid = elem.dataset.itemid;
    var imageelementid = elem.dataset.imageelementid;

    popolatenewImageName(itemid);

    var output = document.getElementById(imageelementid + itemid);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src)
    }

}


function uploadFile(event) {
    if (localStorage.getItem("userLoggedIn") == "n") {

        error_message = "Not authorized";
        return;

    } else if (localStorage.getItem("userLvl") != "9") {
        error_message = "Not authorized";
        return;
    }
    var elem = event.target;
    var fileelementid = elem.dataset.fileelementid;
    var saveasnameelementid = elem.dataset.saveasnameelementid;
    var itemid = elem.dataset.itemid;

    var saveasname = document.getElementById(saveasnameelementid + itemid).value;
    saveasname = saveasname.trim();
    saveasname = saveasname.toLowerCase();

    // if (saveasnameelementid == 'image-') {
    //     if (elem.dataset.facing == "front") {
    //         saveasname = saveasname + "_front.png";
    //     } else {
    //         saveasname = saveasname + "_back.png";
    //     }
    // }

    var errormsgelementid = elem.dataset.errormsgelementid;


    if (!saveasname.includes(".png")) {
        saveasname = saveasname + ".png";
    }

    var files = document.getElementById(fileelementid + itemid).files;
    let maximumSize = document.getElementById('imagesz-' + itemid).value;

    if (files.length > 0) {

        resizeImage({
            file: files[0],
            maxSize: maximumSize
        }).then(function (resizedImage) {
            var formData = new FormData();
            formData.append("file", resizedImage);
            formData.append("saveasname", saveasname);
            formData.append("dir", "img");

            var xhttp = new XMLHttpRequest();

            // Set POST method and ajax file path
            xhttp.open("POST", the.hosturl + "/php/upload.php", true);

            // call on request changes state
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    var response = this.responseText;
                    //console.log(response);

                    document.getElementById(errormsgelementid + itemid).innerHTML = "<font color = #0000>" + response + "</font> ";
                }
            };

            // Send request with data
            xhttp.send(formData);

        }).catch(function (err) {
            //console.error(err);
        });

    } else {
        alert("Please select a file");
    }

}

function uploadAndInsertFile(event) {
    if (localStorage.getItem("userLoggedIn") == "n") {

        error_message = "Not authorized";
        return;

    } else if (localStorage.getItem("userLvl") != "9") {
        error_message = "Not authorized";
        return;
    }
    var elem = event.target;
    var fileelementid = elem.dataset.fileelementid;
    var saveasnameelementid = elem.dataset.saveasnameelementid;
    var itemid = elem.dataset.itemid;

    var saveasname = document.getElementById(saveasnameelementid + itemid).value;
    saveasname = saveasname.trim();
    saveasname = saveasname.toLowerCase();

    var errormsgelementid = elem.dataset.errormsgelementid;

    if (!saveasname.includes(".png")) {
        saveasname = saveasname + ".png";
    }

    var files = document.getElementById(fileelementid + itemid).files;
    let maximumSize = document.getElementById('imagesz-' + itemid).value;

    if (files.length > 0) {

        resizeImage({
            file: files[0],
            maxSize: maximumSize
        }).then(function (resizedImage) {

            var formData = new FormData();
            formData.append("file", files[0]);
            formData.append("saveasname", saveasname);
            formData.append("dir", "img");

            var xhttp = new XMLHttpRequest();

            xhttp.open("POST", the.hosturl + "/php/upload.php", true);

            // call on request changes state
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    var response = this.responseText;
                    //console.log(response);

                    document.getElementById(errormsgelementid + itemid).innerHTML = "<font color = #0000>" + response + "</font> ";
                    var imagename = document.getElementById("image-" + itemid).value;
                    var randomId = "div-" + Math.floor(Math.random() * 1000000);
                    var Str = "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'image1-desc'> " + "<img class='movieImageCls' alt ='' src= '" + the.hosturl + "/img/" + imagename + "'> " 
                
                    + "<div class='imageButtonsDiv'>"
                    + "<button title='clear image without deleting from backend' class='deleteDivInnImg' onclick=deleteCurrentComponent(this.parentElement) ></button>" 
                    + "<button title='Remove image and delete from backend' class='deleteDivInnImgBk' onclick=deleteCurrentComponentAndRemoveBK(this.parentElement) ></button>" 
                    + "<button class='copyHtmlButton' style='margin-left: 5px;'>Copy HTML</button>"
                    + "<button class='imagePropButton' style='margin-left: 5px;'>Toggle Properties</button>"
                    + "</div>"

                    + "</div>";
                    insertContentAtCaret(Str);
                }
            };

            xhttp.send(formData);
        }).catch(function (err) {
            //console.error(err);
        });
    } else {
        alert("Please select a file");
    }

}

function SaveImageAndInsertAtCarot(event) {
    if (localStorage.getItem("userLoggedIn") == "n") {

        error_message = "Not authorized";
        return;

    } else if (localStorage.getItem("userLvl") != "9") {
        error_message = "Not authorized";
        return;
    }
    var elem = event.target;
    var fileelementid = elem.dataset.fileelementid;
    var saveasnameelementid = elem.dataset.saveasnameelementid;
    var itemid = elem.dataset.itemid;
    popolatenewImageName(itemid);
    var saveasname = document.getElementById(saveasnameelementid + itemid).value;
    saveasname = saveasname.trim();
    saveasname = saveasname.toLowerCase();

    var errormsgelementid = elem.dataset.errormsgelementid;

    if (!saveasname.includes(".png")) {
        saveasname = saveasname + ".png";
    }

    const url = elem.dataset.imageurl;
    const fileName = 'tempName.png';

    fetch(url)
        .then(async response => {
            const contentType = response.headers.get('content-type')
            const blob = await response.blob()
            const filefromUrl = new File([blob], fileName, { contentType })
            let maximumSize = document.getElementById('imagesz-' + itemid).value;

            resizeImage({
                file: blob,
                maxSize: maximumSize
            }).then(function (resizedImage) {
                var formData = new FormData();
                formData.append("file", resizedImage);
                formData.append("saveasname", saveasname);
                formData.append("dir", "img");
                var xhttp = new XMLHttpRequest();

                xhttp.open("POST", the.hosturl + "/php/upload.php", true);

                // call on request changes state
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {

                        var response = this.responseText;
                        //console.log(response);

                        document.getElementById(errormsgelementid + itemid).innerHTML = "<font color = #0000>" + response + "</font> ";
                        var imagename = document.getElementById("image-" + itemid).value;
                        imagename = imagename.toLowerCase();
                        var randomId = "div-" + Math.floor(Math.random() * 1000000);
                        var Str = "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'image1-desc'> " + "<img class='movieImageCls' alt ='' src= '" + the.hosturl + "/img/" + imagename + "'> "  
                    
                        + "<div class='imageButtonsDiv'>"
                        + "<button title='clear image without deleting from backend' class='deleteDivInnImg' onclick=deleteCurrentComponent(this.parentElement) ></button>" 
                        + "<button title='Remove image and delete from backend' class='deleteDivInnImgBk' onclick=deleteCurrentComponentAndRemoveBK(this.parentElement) ></button>" 
                        + "<button class='copyHtmlButton' style='margin-left: 5px;'>Copy HTML</button>"
                        + "<button class='imagePropButton' style='margin-left: 5px;'>Toggle Properties</button>"
                        + "</div>"

                        + "</div>";
                        insertContentAtCaret(Str);
                    }
                };

                xhttp.send(formData);
            }).catch(function (err) {
                //console.error(err);
            });
        })


}

function SaveVideoAndInsertAtCarot(event) {

    if (localStorage.getItem("userLoggedIn") == "n") {
        error_message = "Not authorized";
        return;
    } else if (localStorage.getItem("userLvl") != "9") {
        error_message = "Not authorized";
        return;
    }

    var elem = event.target;
    var fileelementid = elem.dataset.fileelementid;
    var saveasnameelementid = elem.dataset.saveasnameelementid;
    var itemid = elem.dataset.itemid;

    let saveasname = window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "-" + (Math.floor(Math.random() * 1000000) + 1) + ".mp4";
    sessionStorage.setItem("saveasname", saveasname);

    //let saveasname = window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "-" + (Math.floor(Math.random() * 10000) + 1) ;

    saveasname = saveasname.trim();
    saveasname = saveasname.toLowerCase();

    var errormsgelementid = elem.dataset.errormsgelementid;

    if (saveasname.includes(".png")) {
        saveasname = saveasname.replace(".png", ".mp4");
    } else if (!saveasname.includes(".mp4")) {
        saveasname = saveasname + ".mp4";
    }

    const url = elem.dataset.videourl;
    const fileName = 'tempVideo.mp4';

    fetch(url)
        .then(async response => {
            const contentType = response.headers.get('content-type');
            const blob = await response.blob();
            const filefromUrl = new File([blob], fileName, { contentType });

            var formData = new FormData();
            formData.append("file", filefromUrl);
            formData.append("saveasname", saveasname);
            formData.append("dir", "videos");

            var xhttp = new XMLHttpRequest();

            xhttp.open("POST", the.hosturl + "/php/upload.php", true);

            // Handle response from server
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var response = this.responseText;

                    // document.getElementById(errormsgelementid + itemid).innerHTML =
                    //     "<font color = #0000>" + response + "</font> ";
                    
                    //var videoname = document.getElementById("image-" + itemid).value;
                    let videoname = sessionStorage.getItem("saveasname");
                    videoname = videoname.trim();
                    videoname = videoname.toLowerCase();
                    if (videoname.includes(".png")) {
                        videoname = videoname.replace(".png", ".mp4");
                    } else if (!videoname.includes(".mp4")) {
                        videoname = videoname + ".mp4";
                    }

                    var randomId = "div-" + Math.floor(Math.random() * 1000000);
                    var Str = "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id) class='video1-desc'>" +
                        "<video class='movieVideoCls' controls src='" + the.hosturl + "/videos/" + videoname + "'></video>" +
                        "<div class='videoButtonsDiv'>" +
                        "<button title='Clear video without deleting from backend' class='deleteDivInnImg' onclick=deleteCurrentComponent(this.parentElement) ></button>" +
                        "<button title='Remove video and delete from backend' class='deleteDivInnImgBk' onclick=deleteCurrentVideoComponentAndRemoveBK(this.parentElement) ></button>" +
                        "<button class='copyHtmlButton' style='margin-left: 5px;'>Copy HTML</button>" +
                        "<button class='videoPropButton' style='margin-left: 5px;'>Toggle Properties</button>" +
                        "</div>" +
                        "</div>";

                    insertContentAtCaret(Str);
                }
            };

            xhttp.send(formData);
        })
        .catch(err => {
            console.error(err);
        });
}

function SaveFileLocallyAndShow(event, isImage = true) {
    const elem = event.target;
    const url = isImage ? elem.dataset.imageurl : elem.dataset.videourl;
    const saveasnameelementid = elem.dataset.saveasnameelementid;
    const itemid = elem.dataset.itemid;

    let saveasname = document.getElementById(saveasnameelementid + itemid).value;
    //let saveasname = window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "-" + (Math.floor(Math.random() * 10000) + 1) ;
    saveasname = saveasname.trim();
    saveasname = saveasname.toLowerCase();

    if (isImage) {
        if (!saveasname.includes(".png")) {
            saveasname = saveasname + ".png";
        }
    } else {
        if (saveasname.includes(".png")) {
            saveasname = saveasname.replace(".png", ".mp4");
        } else if (!saveasname.includes(".mp4")) {
            saveasname = saveasname + ".mp4";
        }
    }

    const fileName = saveasname;

    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            // Create a download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Generate the HTML for insertion at caret
            const randomId = "div-" + Math.floor(Math.random() * 1000000);
            let htmlToInsert;

            if (isImage) {
                htmlToInsert = `
                    <div id='${randomId}' onmousedown='setLastFocusedDivId(this.id)' class='image1-desc'>
                        <img class='movieImageCls' alt='' src='${URL.createObjectURL(blob)}'>
                        <div class='imageButtonsDiv'>
                            <button title='Clear image without deleting from backend' class='deleteDivInnImg' onclick='deleteCurrentComponent(this.parentElement)'></button>
                            <button title='Remove image and delete from backend' class='deleteDivInnImgBk' onclick='deleteCurrentComponentAndRemoveBK(this.parentElement)'></button>
                            <button class='copyHtmlButton' style='margin-left: 5px;'>Copy HTML</button>
                            <button class='imagePropButton' style='margin-left: 5px;'>Toggle Properties</button>
                        </div>
                    </div>
                `;
            } else {
                htmlToInsert = `
                    <div id='${randomId}' onmousedown='setLastFocusedDivId(this.id)' class='video1-desc'>
                        <video class='movieVideoCls' controls src='${URL.createObjectURL(blob)}' style='max-width: 300px;'></video>
                        <div class='videoButtonsDiv'>
                            <button title='Clear video without deleting from backend' class='deleteDivInnVid' onclick='deleteCurrentComponent(this.parentElement)'></button>
                            <button title='Remove video and delete from backend' class='deleteDivInnVidBk' onclick='deleteCurrentVideoComponentAndRemoveBK(this.parentElement)'></button>
                            <button class='copyHtmlButton' style='margin-left: 5px;'>Copy HTML</button>
                            <button class='videoPropButton' style='margin-left: 5px;'>Toggle Properties</button>
                        </div>
                    </div>
                `;
            }

            // Insert the HTML at caret position
            insertContentAtCaret(htmlToInsert);
        })
        .catch(error => console.error('Error saving file locally:', error));
}

function insertContentAtCaret(html) {
    if (!html) {
        html = "<b>Dummy Content</b>";
    }

    let sel, range;

    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);

            // Check if the caret is inside an editable div
            let parentElement = range.commonAncestorContainer;
            let isInsideEditableDiv = false;

            while (parentElement) {
                if (parentElement.nodeType === 1 && parentElement.classList.contains("editDescriptionDiv")) {
                    isInsideEditableDiv = true;
                    break;
                }
                parentElement = parentElement.parentNode;
            }

            if (!isInsideEditableDiv) {
                alert("Please place the cursor inside an editable div with class 'editDescriptionDiv' to insert content.");
                return;
            }

            range.deleteContents();

            const el = document.createElement("div");
            el.innerHTML = html;

            const frag = document.createDocumentFragment();
            let lastNode;
            while (el.firstChild) {
                lastNode = frag.appendChild(el.firstChild);
            }

            range.insertNode(frag);

            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type !== "Control") {
        range = document.selection.createRange();
        let parentElement = range.parentElement();
        let isInsideEditableDiv = false;

        while (parentElement) {
            if (parentElement.nodeType === 1 && parentElement.classList.contains("editDescriptionDiv")) {
                isInsideEditableDiv = true;
                break;
            }
            parentElement = parentElement.parentNode;
        }

        if (!isInsideEditableDiv) {
            alert("Please place the cursor inside an editable div with class 'editDescriptionDiv' to insert content.");
            return;
        }

        range.pasteHTML(html);
    }
}

function insertVideoAtCaret(html) {
    if (html == "") {
        html = "<b>Dummy Text</b>";
    }

    let sel, range;

    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);

            let parentElement = range.commonAncestorContainer;
            let isInsideEditableDiv = false;

            while (parentElement) {
                if (parentElement.nodeType === 1 && parentElement.classList.contains("editDescriptionDiv")) {
                    isInsideEditableDiv = true;
                    break;
                }
                parentElement = parentElement.parentNode;
            }

            if (!isInsideEditableDiv) {
                alert("Please place the cursor inside an editable div with class 'editDescriptionDiv' to insert content.");
                return;
            }

            range.deleteContents();

            const el = document.createElement("div");
            el.innerHTML = html;

            const frag = document.createDocumentFragment();
            let lastNode;
            while (el.firstChild) {
                lastNode = frag.appendChild(el.firstChild);
            }

            range.insertNode(frag);

            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type !== "Control") {
        range = document.selection.createRange();
        let parentElement = range.parentElement();
        let isInsideEditableDiv = false;

        while (parentElement) {
            if (parentElement.nodeType === 1 && parentElement.classList.contains("editDescriptionDiv")) {
                isInsideEditableDiv = true;
                break;
            }
            parentElement = parentElement.parentNode;
        }

        if (!isInsideEditableDiv) {
            alert("Please place the cursor inside an editable div with class 'editDescriptionDiv' to insert content.");
            return;
        }

        range.pasteHTML(html);
    }
}


function resizeImage(settings) {
    let file = settings.file;
    let maxSize = settings.maxSize;
    let reader = new FileReader();
    let image = new Image();
    let canvas = document.createElement('canvas');

    let dataURItoBlob = function (dataURL) {
        let BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            let parts = dataURL.split(',');
            let contentType = parts[0].split(':')[1];
            let raw = parts[1];

            return new Blob([raw], { type: contentType });
        }

        let parts = dataURL.split(BASE64_MARKER);
        let contentType = parts[0].split(':')[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;

        let uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    };


    let resize = function () {
        let width = image.width;
        let height = image.height;
        if (width > height) {
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
            }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);

        //0.9 is the quality
        let dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        return dataURItoBlob(dataUrl);
    };
    return new Promise(function (ok, no) {
        if (!file.type.match(/image.*/)) {
            no(new Error("Not an image"));
            return;
        }
        reader.onload = function (readerEvent) {
            image.onload = function () { return ok(resize()); };
            image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    });
}

function toggleDescView(itemid) {
    var divId = 'description-' + itemid;

    // newHTML = document.getElementById(divId).innerHTML;
    // newHTML = addNewLineInText(newHTML);
    // document.getElementById("descriptionTextId").value = newHTML;





    if (document.getElementById("descriptionTextId").style.display == "block") {
        newHTML = document.getElementById("descriptionTextId").value;
        //**SM - May need to be reverted* */
        newHTML = removeNewLine(newHTML);
        document.getElementById(divId).innerHTML = newHTML;

        document.getElementById(divId).style.display = "block";
        document.getElementById("descriptionTextId").style.display = "none"
    } else {
        newHTML = document.getElementById(divId).innerHTML;
        //**SM - May need to be reverted* */
        newHTML = addNewLineInText(newHTML);
        document.getElementById("descriptionTextId").value = newHTML;

        document.getElementById(divId).style.display = "none";
        document.getElementById("descriptionTextId").style.display = "block"
    }

}

function addNewLineInText(innerHTML) {
    // innerHTML = innerHTML.replaceAll("<div", "\r\n<div");
    // innerHTML = innerHTML.replaceAll("<h1", "\r\n<h1");
    // innerHTML = innerHTML.replaceAll("<h2", "\r\n<h2");
    // innerHTML = innerHTML.replaceAll("<h3", "\r\n<h3");
    // innerHTML = innerHTML.replaceAll("<ol", "\r\n<ol");
    // innerHTML = innerHTML.replaceAll("<ul", "\r\n<ul");

    // Add line breaks before and after certain HTML tags in the textarea
    innerHTML = innerHTML.replace(/<div>/g, "\n\n<div>");
    innerHTML = innerHTML.replace(/<\/div>/g, "</div>\n\n");
    innerHTML = innerHTML.replace(/<p>/g, "\n\n<p>");
    innerHTML = innerHTML.replace(/<\/p>/g, "</p>\n\n");
    innerHTML = innerHTML.replace(/<br>/g, "\n\n<br>");
    innerHTML = innerHTML.replace(/<h1>/g, "\n\n<h1>");
    innerHTML = innerHTML.replace(/<\/h1>/g, "</h1>\n\n");

    innerHTML = innerHTML.replace(/<h2>/g, "\n\n<h2>");
    innerHTML = innerHTML.replace(/<\/h2>/g, "</h2>\n\n");

    innerHTML = innerHTML.replace(/<h3>/g, "\n\n<h3>");
    innerHTML = innerHTML.replace(/<\/h3>/g, "</h3>\n\n");

    innerHTML = innerHTML.replace(/<li>/g, "\n<li>");
    innerHTML = innerHTML.replace(/<\/li>/g, "</li>\n");

    innerHTML = innerHTML.replace(/<ul>/g, "\n\n<ul>");
    innerHTML = innerHTML.replace(/<\/ul>/g, "</ul>\n\n");

    innerHTML = innerHTML.replace(/<ol>/g, "\n\n<ol>");
    innerHTML = innerHTML.replace(/<\/ol>/g, "</ol>\n\n");

    return innerHTML;
}

function removeNewLine(innerHTML) {
    //innerHTML = innerHTML.replaceAll( "&#13;&#10;", "");
    //innerHTML = innerHTML.replace(/\r\n|\r|\n/g, "")

    innerHTML = innerHTML.replace(/\n\n<div>/g, "<div>");
    innerHTML = innerHTML.replace(/<\/div>\n\n/g, "</div>");
    innerHTML = innerHTML.replace(/\n\n<p>/g, "<p>");
    innerHTML = innerHTML.replace(/<\/p>\n\n/g, "</p>");
    innerHTML = innerHTML.replace(/\n\n<br>/g, "<br>");

    innerHTML = innerHTML.replace(/\n\n<h1>/g, "<h1>");
    innerHTML = innerHTML.replace(/<\/h1>\n\n/g, "</h1>");

    innerHTML = innerHTML.replace(/\n\n<h2>/g, "<h2>");
    innerHTML = innerHTML.replace(/<\/h2>\n\n/g, "</h2>");

    innerHTML = innerHTML.replace(/\n\n<h3>/g, "<h3>");
    innerHTML = innerHTML.replace(/<\/h3>\n\n/g, "</h3>");

    innerHTML = innerHTML.replace(/\n<li>/g, "<li>");
    innerHTML = innerHTML.replace(/<\/li>\n/g, "</li>");

    innerHTML = innerHTML.replace(/\n\n<ul>/g, "<ul>");
    innerHTML = innerHTML.replace(/<\/ul>\n\n/g, "</ul>");

    innerHTML = innerHTML.replace(/\n\n<ol>/g, "<ol>");
    innerHTML = innerHTML.replace(/<\/ol>\n\n/g, "</ol>");

    return innerHTML;
}

function addComponent(itemid, type) {
    var componentid = 'description-' + itemid;
    var AllHTML = document.getElementById(componentid).innerHTML;
    var partOneHTML = "";
    var partTwoHTML = "";
    var checkBox = document.getElementById("insertInner");
    var findStr = '<div id="' + last_focused_div_id;
    if (checkBox.checked == true) {
        partOneHTML = AllHTML.substring(0, AllHTML.indexOf(findStr));
        partTwoHTML = AllHTML.substring(AllHTML.indexOf(findStr));

    } else {
        partOneHTML = AllHTML;
    }

    var timestamp = new Date().getTime();
    var randomId = type + "-" + timestamp;
    
    //var randomId = type + "-" + Math.floor(Math.random() * 1000000);
    if (type == "codescript1") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'codescript1-desc'> <pre> TODO Edit - Code Script Style1 </pre><button class='copyDiv' onclick=copyCurrentComponent(this) >Copy</button><button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;
    } else if (type == "codescript2") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'codescript2-desc'> <pre> TODO Edit - Code Script Style2</pre><button class='copyDiv' onclick=copyCurrentComponent(this) >Copy</button> <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "codescript3") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'codescript3-desc'> <pre> TODO Edit - Code Script Style3 </pre><button class='copyDiv' onclick=copyCurrentComponent(this) >Copy</button><button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "header1") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  ><h1 class = 'header1-desc'> TODO Edit - Header1 </h1><button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "header2") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  ><h2 class = 'header2-desc'> TODO Edit - Header2 </h2><button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "header3") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  ><h1 class = 'header3-desc'> TODO Edit - Header1 </h1><button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;
    } else if (type == "header4") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  ><h3 class = 'header4-desc'> TODO Edit - Header3 </h3><button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "convert-to-h2-inline") {
        let selectedText = window.getSelection().toString();
      
        if (selectedText !== '') {
          // Create an h2 element
          let h2Element = document.createElement('h2');
          
          // Set the text content of the h2 element to the selected text
          h2Element.textContent = selectedText;
          h2Element.classList.add('convert-to-h2-inline-cls');
          // Replace the selected text with the h2 element
          let range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          range.insertNode(h2Element);
        }

    } else if (type == "convert-to-h3-inline") {
        let selectedText = window.getSelection().toString();
      
        if (selectedText !== '') {
          // Create an h2 element
          let h3Element = document.createElement('h3');
          
          // Set the text content of the h2 element to the selected text
          h3Element.textContent = selectedText;
          h3Element.classList.add('convert-to-h3-inline-cls');
          // Replace the selected text with the h2 element
          let range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          range.insertNode(h3Element);
        }
    } else if (type == "convert-to-blue-h3-inline") {
        let selectedText = window.getSelection().toString();
      
        if (selectedText !== '') {
          // Create an h2 element
          let h3Element = document.createElement('h3');
          
          // Set the text content of the h2 element to the selected text
          h3Element.textContent = selectedText;
          h3Element.classList.add('convert-to-blue-h3-inline-cls');
          // Replace the selected text with the h2 element
          let range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          range.insertNode(h3Element);
        }
    }else if (type == "convert-to-video-header") {
        let selectedText = window.getSelection().toString();
      
        if (selectedText !== '') {
          // Create an h2 element
          let h3Element = document.createElement('h3');
          
          // Set the text content of the h2 element to the selected text
          h3Element.textContent = selectedText;
          h3Element.classList.add('video-hdr-inline-cls');
          h3Element.classList.add('wavy');

          let videoHdrPropsDiv = document.createElement("div");
          videoHdrPropsDiv.classList.add("video-hdr-props");

          videoHdrPropsDiv.style.display = "none"; // Initially hide the div

          const randomId = "elm-" + Math.floor(Math.random() * 1000000);

          videoHdrPropsDiv.innerHTML = `
          <label>Place Holdr1:</label>
          <div class="imgPropsInput" contenteditable="true" id="${randomId}-vidhdrprop1">0</div>
          <label>Place Holdr2:</label>
          <div class="avatarFlgInput" contenteditable="true" id="${randomId}-vidhdrprop2">n</div>
          <button  onclick="closeMe(event,this)">Close</button>
          `;

         // Add toggle functionality
          h3Element.addEventListener('click', function () {
            videoHdrPropsDiv.style.display = "block" ;
          });

          h3Element.appendChild(videoHdrPropsDiv);


          // Replace the selected text with the h2 element
          let range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          range.insertNode(h3Element);
        }
    }else if (type == "convert-to-video-listitem") {
        let selectedText = window.getSelection().toString();
      
        if (selectedText !== '') {
          // Create an h2 element
          let h3Element = document.createElement('h3');
          
          // Set the text content of the h2 element to the selected text
          h3Element.textContent = selectedText;
          h3Element.classList.add('video-listitem-inline-cls');
          h3Element.classList.add('wavy');

          let videolistitemPropsDiv = document.createElement("div");
          videolistitemPropsDiv.classList.add("video-listitem-props");

          videolistitemPropsDiv.style.display = "none"; // Initially hide the div

          const randomId = "elm-" + Math.floor(Math.random() * 1000000);

          videolistitemPropsDiv.innerHTML = `
          <label>Place Holdr1:</label>
          <div class="imgPropsInput" contenteditable="true" id="${randomId}-vidlistitemprop1">0</div>
          <label>Place Holdr2:</label>
          <div class="avatarFlgInput" contenteditable="true" id="${randomId}-vidlistitemprop2">n</div>
          <button  onclick="closeMe(event,this)">Close</button>
          `;

         // Add toggle functionality
          h3Element.addEventListener('click', function () {
            videolistitemPropsDiv.style.display = "block" ;
          });

          h3Element.appendChild(videolistitemPropsDiv);


          // Replace the selected text with the h2 element
          let range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          range.insertNode(h3Element);
        }
    }else if (type == "convert-to-staying-header") {
        let selectedText = window.getSelection().toString();
      
        if (selectedText !== '') {
          // Create an h2 element
          let h3Element = document.createElement('h3');
          
          // Set the text content of the h2 element to the selected text
          h3Element.textContent = selectedText;
          h3Element.classList.add('video-hdr-inline-cls');
          h3Element.classList.add('staying');

          let videoHdrPropsDiv = document.createElement("div");
          videoHdrPropsDiv.classList.add("video-hdr-props");

          videoHdrPropsDiv.style.display = "none"; // Initially hide the div

          const randomId = "elm-" + Math.floor(Math.random() * 1000000);

          videoHdrPropsDiv.innerHTML = `
          <label>Place Holdr1:</label>
          <div class="imgPropsInput" contenteditable="true" id="${randomId}-vidhdrprop1">0</div>
          <label>Place Holdr2:</label>
          <div class="avatarFlgInput" contenteditable="true" id="${randomId}-vidhdrprop2">n</div>
          <button  onclick="closeMe(event,this)">Close</button>
          `;

         // Add toggle functionality
          h3Element.addEventListener('click', function () {
            videoHdrPropsDiv.style.display = "block" ;
          });

          h3Element.appendChild(videoHdrPropsDiv);


          // Replace the selected text with the h2 element
          let range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          range.insertNode(h3Element);
        }
    }else if (type == "convert-to-staying-listitem") {
        let selectedText = window.getSelection().toString();
      
        if (selectedText !== '') {
          // Create an h2 element
          let h3Element = document.createElement('h3');
          
          // Set the text content of the h2 element to the selected text
          h3Element.textContent = selectedText;
          h3Element.classList.add('video-listitem-inline-cls');
          h3Element.classList.add('staying');

          let videolistitemPropsDiv = document.createElement("div");
          videolistitemPropsDiv.classList.add("video-listitem-props");

          videolistitemPropsDiv.style.display = "none"; // Initially hide the div

          const randomId = "elm-" + Math.floor(Math.random() * 1000000);

          videolistitemPropsDiv.innerHTML = `
          <label>Place Holdr1:</label>
          <div class="imgPropsInput" contenteditable="true" id="${randomId}-vidlistitemprop1">0</div>
          <label>Place Holdr2:</label>
          <div class="avatarFlgInput" contenteditable="true" id="${randomId}-vidlistitemprop2">n</div>
          <button  onclick="closeMe(event,this)">Close</button>
          `;

         // Add toggle functionality
          h3Element.addEventListener('click', function () {
            videolistitemPropsDiv.style.display = "block" ;
          });

          h3Element.appendChild(videolistitemPropsDiv);


          // Replace the selected text with the h2 element
          let range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          range.insertNode(h3Element);
        }
    }else if (type == "left-align") {
        // let selectedRange = window.getSelection().getRangeAt(0);

        // // Create a span element
        // let spanElement = document.createElement('span');
        // spanElement.style.textAlign = 'left';
  
        // // Wrap the selected range with the span element
        // selectedRange.surroundContents(spanElement);


        let selectedText = window.getSelection().toString();
      
        if (selectedText !== '') {
          // Create an h2 element
          let spanElement = document.createElement('span');
          spanElement.classList.add('alignment-span');
          spanElement.style.textAlign = 'left';
          // Set the text content of the h2 element to the selected text
          spanElement.textContent = selectedText;

          // Replace the selected text with the h2 element
          let range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          range.insertNode(spanElement);
        }


    } else if (type == "center-align") {
        // let selectedRange = window.getSelection().getRangeAt(0);

        // // Create a span element
        // let spanElement = document.createElement('span');
        // spanElement.style.textAlign = 'center';
  
        // // Wrap the selected range with the span element
        // selectedRange.surroundContents(spanElement);

        let selectedText = window.getSelection().toString();
      
        if (selectedText !== '') {
          // Create an h2 element
          let spanElement = document.createElement('span');
          spanElement.style.textAlign = 'center';
          spanElement.classList.add('alignment-span');
          // Set the text content of the h2 element to the selected text
          spanElement.textContent = selectedText;

          // Replace the selected text with the h2 element
          let range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          range.insertNode(spanElement);
        }

    } else if (type == "right-align") {
        // let selectedRange = window.getSelection().getRangeAt(0);

        // // Create a span element
        // let spanElement = document.createElement('span');
        // spanElement.style.textAlign = 'right';
  
        // // Wrap the selected range with the span element
        // selectedRange.surroundContents(spanElement);
        let selectedText = window.getSelection().toString();
      
        if (selectedText !== '') {
          // Create an h2 element
          let spanElement = document.createElement('span');
          spanElement.style.textAlign = 'right';
          spanElement.classList.add('alignment-span');
          // Set the text content of the h2 element to the selected text
          spanElement.textContent = selectedText;

          // Replace the selected text with the h2 element
          let range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          range.insertNode(spanElement);
        }
    } else if (type == "justify-align") {
        let selectedText = window.getSelection().toString();
      
        if (selectedText !== '') {
          // Create an h2 element
          let spanElement = document.createElement('span');
          spanElement.style.textAlign = 'justify';
          spanElement.classList.add('alignment-span');
          // Set the text content of the h2 element to the selected text
          spanElement.textContent = selectedText;

          // Replace the selected text with the h2 element
          let range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          range.insertNode(spanElement);
        }

    } else if (type == "image1") {
        var imagename = document.getElementById("image-" + itemid).value;
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'image1-desc'> " + "<img class='movieImageCls' alt ='' src= '" + the.hosturl + "/img/" + imagename + "'> " + " <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "image2") {
        var imagename = document.getElementById("image-" + itemid).value;
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'image2-desc'> " + "<img class='movieImageCls' alt ='' src= '" + the.hosturl + "/img/" + imagename + "'> " + "  <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "image3") {
        var imagename = document.getElementById("image-" + itemid).value;
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'image3-desc'> " + "<img class='movieImageCls' alt ='' src= '" + the.hosturl + "/img/" + imagename + "'> " + " <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "image4") {
        var imagename = document.getElementById("image-" + itemid).value;
        var Str = "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'image1-desc'> " + "<img class='movieImageCls' alt ='' src= '" + the.hosturl + "/img/" + imagename + "'> " 
        
        + "<div class='imageButtonsDiv'>"
        + "<button title='clear image without deleting from backend' class='deleteDivInnImg' onclick=deleteCurrentComponent(this.parentElement) ></button>" 
        + "<button title='Remove image and delete from backend' class='deleteDivInnImgBk' onclick=deleteCurrentComponentAndRemoveBK(this.parentElement) ></button>" 
        + "<button class='copyHtmlButton' style='margin-left: 5px;'>Copy HTML</button>"
        + "<button class='imagePropButton' style='margin-left: 5px;'>Toggle Properties</button>"
        + "</div>"

        + "</div>";
        insertContentAtCaret(Str);

    } else if (type == "warning") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'warning-desc'> TODO Edit - warning <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "error") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'error-desc'> TODO Edit - error <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "greenmsg") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'greenmsg-desc'> TODO Edit - Success <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "pageinfo") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'pageinfo-desc'> TODO Edit - pageinfo <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;


    } else if (type == "paragraph1") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'paragraph1-desc'> TODO Edit - paragraph1 <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "paragraph2") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = 'paragraph2-desc'> TODO Edit - paragraph2 <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    }else if (type == "adminEditDiv") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  class = ' adminEditDiv'> TODO Edit - paragraph2 adminEditDiv <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>"+ partTwoHTML;

    } else if (type == "orderedlist") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  ><ol class = 'ordered-list-desc'> <li>TODO</li><li> Edit - list</li> </ol><button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "suborderedlist") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  ><ol class = 'subordered-list-desc'> <li>TODO</li><li> Edit - list</li> </ol><button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "unorderedlist") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  ><ul class = 'unordered-list-desc'> <li>TODO</li><li> Edit - list</li> </ul><button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "subunorderedlist") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  ><ul class = 'subunordered-list-desc'> <li>TODO</li><li> Edit - list</li> </ul><button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "sub2unorderedlist") {
        document.getElementById(componentid).innerHTML = partOneHTML + "<div id= '" + randomId + "' onmousedown=setLastFocusedDivId(this.id)  ><ul class = 'sub2unordered-list-desc'> <li>TODO</li><li> Edit - list</li> </ul><button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    } else if (type == "shorts1") {
        var tempCompHTML = partOneHTML + "<div id= '" + randomId + "-shorts' onmousedown=setLastFocusedDivId(this.id)  class = 'shorts' > TODO Edit - Enter Content and Images <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button>"
            + "<div data-title='title'   class = 'shorts-props shorts-title' placeholder='title'> title</div>"
            + "<div data-title='description'  class = 'shorts-props shorts-description' placeholder='description'>description </div>"
            + "<div  data-title='tags' class = 'shorts-props shorts-tags' placeholder='tags'>tags </div>"
            + "<div data-title='channel' class = 'shorts-props shorts-channel'  placeholder='channel'> channel</div>"
            + "<div data-title='playlist' class = 'shorts-props shorts-playlist'  placeholder='playlist'>playlist </div>"
            + "<div  data-title='ctatext' class = 'shorts-props shorts-ctatext'  placeholder='ctatext'> </div>"
            + "<div  data-title='avatar' class = 'shorts-props shorts-avatar'  placeholder='avatar'> </div>"
            + "</div>";
            document.getElementById(componentid).innerHTML = tempCompHTML + partTwoHTML;
        
    } else if (type == "qz1") {
        var tempCompHTML = partOneHTML + "<div id= '" + randomId + "-qs' onmousedown=setLastFocusedDivId(this.id)  class = 'qz1-qs'> TODO Edit - Write Question <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>"
            //+ "<div id= '" + randomId + "-allans' onmousedown=setLastFocusedDivId(this.id)  class = 'qz1-allans'> "
            + "<div id= '" + randomId + "-ans1' onmousedown=setLastFocusedDivId(this.id)  class = 'qz1-ans'> <input class='dynamicradio' type ='radio' name ='" + randomId + "' value='x'/>Option1 <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>"
            + "<div id= '" + randomId + "-ans2' onmousedown=setLastFocusedDivId(this.id)  class = 'qz1-ans'> <input class='dynamicradio' type ='radio' name ='" + randomId + "' value='q'/>Option2 <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>"
            + "<div id= '" + randomId + "-ans3' onmousedown=setLastFocusedDivId(this.id)  class = 'qz1-ans'> <input class='dynamicradio' type ='radio' name ='" + randomId + "' value='e'/>Option3 <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>"
            + "<div id= '" + randomId + "-ans4' onmousedown=setLastFocusedDivId(this.id)  class = 'qz1-ans'> <input class='dynamicradio' type ='radio' name ='" + randomId + "' value='t'/>Option4 <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>";

        //+ " <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>"
        if (the.smusr) {
            tempCompHTML = tempCompHTML + "<div id= '" + randomId + "-rtans' onmousedown=setLastFocusedDivId(this.id)  class = 'qz1-rtans'> TODO Edit - Correct Answer <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>";
        }

        document.getElementById(componentid).innerHTML = tempCompHTML + partTwoHTML;
    } else if (type == "sbmtqz") {
        document.getElementById(componentid).innerHTML = partOneHTML
            + "<div id= 'qzmsg' onmousedown=setLastFocusedDivId(this.id)  class = 'qzerr-div'> <div id= 'qzerr'></div><div id= 'qzres'></div>  <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>"
            + "<div id= 'sbmtqzdivid' onmousedown=setLastFocusedDivId(this.id)  class = 'sbmtqz-div' onclick='submitQuiz()'> Submit <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>"
            + "<div id= 'retryqzdivid' onmousedown=setLastFocusedDivId(this.id)  class = 'sbmtqz-div' onclick='refreshPage()'> Retry <button class='deleteDiv' onclick=deleteCurrentComponent(this) ></button></div>" + partTwoHTML;

    }



}

function closeMe(event, the) {
    event.stopPropagation(); // Prevents the click event from bubbling up to h3Element
    the.parentElement.style.display = 'none';

    
}

function submitQuiz() {
    var obj = JSON.parse(document.getElementById("hdmidivid").innerText);
    var keys = Object.keys(obj);
    var elems = document.getElementsByClassName("dynamicradio");
    var rtans = 0;
    var wans = 0;
    document.getElementById("qzerr").innerHTML = "";
    document.getElementById("qzerr").style.display = "none";
    document.getElementById("qzerr").style.width = "0%";

    for (i = 0; i < elems.length; i++) {
        if (elems[i].checked) {
            if (elems[i].value == obj[elems[i].name]) {
                rtans = rtans + 1;
                elems[i].parentElement.style.backgroundColor = "#C1F1E0";
            } else {
                wans = wans + 1;
                elems[i].parentElement.style.backgroundColor = "#FDCFC0";
            }
        } else if (elems[i].value == obj[elems[i].name]) {
            elems[i].parentElement.style.backgroundColor = "#C1F1E0";
        } else {
            elems[i].parentElement.style.backgroundColor = "white";
        }
    }

    if (rtans + wans < keys.length) {
        for (i = 0; i < elems.length; i++) {
            elems[i].parentElement.style.backgroundColor = "white";
        }

        document.getElementById("qzerr").innerHTML = "Please provide a response to all the questions";
        document.getElementById("qzerr").style.display = "block";
        document.getElementById("qzerr").style.width = "100%";
    } else {
        var percent = rtans * 100 / (rtans + wans);
        percent = percent.toFixed(2);
        storeTestResults(percent, window.location.pathname);

        $(".ansAddInfo").show();

        if (localStorage.getItem("userLoggedIn") == "n") {
            document.getElementById("qzres").innerHTML = "You scored " + percent + "%. Click on the button below to retry.<br> You can " + '<a href="' + the.hosturl + '/?target=login">login</a>' + " to store your scores and track progress.";
            document.getElementById("qzres").style.display = "block";
            document.getElementById("qzres").style.width = "100%";
        } else {
            document.getElementById("qzres").innerHTML = "You scored " + percent + "%. Click on the button below to retry.<br> The score has been recorded on the profile. You can view the progress by clicking on the Profile button at the top.";
            document.getElementById("qzres").style.display = "block";
            document.getElementById("qzres").style.width = "100%";
            var userdata = sessionStorage.getItem("userdata");
            var userObjs;
            var newscores = [];
            var date = new Date();
            let options = {
                weekday: "long", year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            };

            let pageHdr = document.getElementById("docHeader").innerHTML;
            pageHdr = pageHdr.trim();
            var newscore = { "quiz": document.URL, "percent": percent, "time": date.toLocaleTimeString("en-us", options), "title": pageHdr };

            if (userdata != "") {
                userObjs = JSON.parse(userdata);
                newscores = userObjs.scores;
                newscores.push(newscore);
                userObjs.scores = newscores;
            } else {
                newscores.push(newscore);
                userObjs = { scores: newscores };
            }


            var newdata = JSON.stringify(userObjs);

            sessionStorage.setItem("userdata", newdata);
            updateInfo(newdata);
        }

        document.getElementById("sbmtqzdivid").style.display = "none";
        document.getElementById("retryqzdivid").style.display = "block";

    }
}

function showOneQnAtATimeKnowledgeTest(currentQnNbr){
    let rtans = 0;
    let wans = 0;

    if (currentQnNbr != "0"){
        rtans = sessionStorage.getItem("rtans");
        wans = sessionStorage.getItem("wans");
    } 

    document.getElementById("retryqzdivid").style.display = "none";
    document.getElementById("sbmtoneqzdivid").style.display = "block";

    let obj = JSON.parse(document.getElementById("hdmidivid").innerText);
    let keys = Object.keys(obj);

    $(".ansAddInfo").hide();

    for (i = 0; i < keys.length; i++) {
        let id = keys[i];
        
        if(i == currentQnNbr ){
            //document.getElementById(id + "-qs").style.display = "none";
            $("#" + id + "-qs").show();
            let elements = $('[name="'+ id +'"]');
            elements.parent().show();
        }else{
            //document.getElementById(id + "-qs").style.display = "none";

            $("#" + id + "-qs").hide();
            let elements = $('[name="'+ id +'"]');
            elements.parent().hide();

        }
    }
    sessionStorage.setItem("rtans", rtans);
    sessionStorage.setItem("wans", wans);
    sessionStorage.setItem("currentQnNbr", currentQnNbr);

    if (currentQnNbr == "0"){
        createQzTimeAndStatus();
        // Update the timer every second
        timerInterval = setInterval(updateTimer, 1000);
    }else{
        updateQzTimeAndStatus();
    }
}

function showNextQ(){
    let currentQnNbr = sessionStorage.getItem("currentQnNbr");
    showOneQnAtATimeKnowledgeTest(parseInt(currentQnNbr) + 1);
}

function checkOneQuestion(){
    let obj = JSON.parse(document.getElementById("hdmidivid").innerText);
    let keys = Object.keys(obj);

    let currentQnNbr = sessionStorage.getItem("currentQnNbr");
    let rtans = sessionStorage.getItem("rtans");
    let wans = sessionStorage.getItem("wans");

    document.getElementById("qzerr").innerHTML = "";
    document.getElementById("qzerr").style.display = "none";
    document.getElementById("qzerr").style.width = "0%";

    let elems = $('.dynamicradio:visible');

    let ansMarked = 0;

    for (i = 0; i < elems.length; i++) {
        if (elems[i].checked) {
            ansMarked = 1;
            if (elems[i].value == obj[elems[i].name]) {
                rtans = parseInt(rtans) + 1;
                elems[i].parentElement.style.backgroundColor = "#C1F1E0";
            } else {
                wans = parseInt(wans) + 1;
                elems[i].parentElement.style.backgroundColor = "#FDCFC0";
            }
        } else if (elems[i].value == obj[elems[i].name]) {
            elems[i].parentElement.style.backgroundColor = "#C1F1E0";
        } else {
            elems[i].parentElement.style.backgroundColor = "white";
        }
    }
    if (!ansMarked){
        for (i = 0; i < elems.length; i++) {
            elems[i].parentElement.style.backgroundColor = "white";
        }

        document.getElementById("qzerr").innerHTML = "Please select an answer option";
        document.getElementById("qzerr").style.display = "block";
        document.getElementById("qzerr").style.width = "100%";
    } else{
        sessionStorage.setItem("rtans", rtans);
        sessionStorage.setItem("wans", wans);
        sessionStorage.setItem("currentQnNbr", currentQnNbr);



        let obj = JSON.parse(document.getElementById("hdmidivid").innerText);
        let keys = Object.keys(obj);
        for (i = 0; i < keys.length; i++) {
            let id = keys[i];
            
            if(i == currentQnNbr ){
                //document.getElementById(id + "-qs").style.display = "none";
                let elements = $('[addInfo="'+ id +'"]');
                elements.show();
            }
        }


        updateQzTimeAndStatus();

        document.getElementById("sbmtoneqzdivid").style.display = "none";

        if (currentQnNbr < (keys.length - 1) ){
            document.getElementById("retryqzdivid").style.display = "block";
        }else{
             clearInterval(timerInterval); // Stop the timer interval
        }
        
    }

}

function createQzTimeAndStatus(){
    let newHTML = "";
    let timeElapsed = "00:00";
    let obj = JSON.parse(document.getElementById("hdmidivid").innerText);
    let keys = Object.keys(obj);

    let currentQnNbr = sessionStorage.getItem("currentQnNbr");
    let rtans = sessionStorage.getItem("rtans");
    let wans = sessionStorage.getItem("wans");


    newHTML = newHTML + "<div id='currentQnNbrDivId' style='width:32%; text-align:left'>" + "#" + (parseInt(currentQnNbr) + 1) + "/" + (keys.length) + "</div>" + "<div id='scoresDivId' style='width:33%; text-align:center'> Score: " + rtans + "/" + (parseInt(rtans) + parseInt(wans)) + "</div>" + "<div id='timer' class='timerCls' style='width:35%; text-align:right'>" + timeElapsed + "</div>" ;
    document.getElementById("timeAndStatusDivId").innerHTML = newHTML;
}

function updateQzTimeAndStatus(){
    //let newHTML = "";
    //let timeElapsed = "00:00";
    let obj = JSON.parse(document.getElementById("hdmidivid").innerText);
    let keys = Object.keys(obj);

    let currentQnNbr = sessionStorage.getItem("currentQnNbr");
    let rtans = sessionStorage.getItem("rtans");
    let wans = sessionStorage.getItem("wans");

    document.getElementById("currentQnNbrDivId").innerHTML = "#" + (parseInt(currentQnNbr) + 1) + "/" + (keys.length);
    document.getElementById("scoresDivId").innerHTML = "Score: " + rtans + "/" + (parseInt(rtans) + parseInt(wans));

    //newHTML = newHTML + "<div class='currentQnNbrCls' style='width:32%; text-align:left'>" + "#" + (parseInt(currentQnNbr) + 1) + "/" + (keys.length) + "</div>" + "<div class='scoresCls' style='width:33%; text-align:center'> Score: " + rtans + "/" + (parseInt(rtans) + parseInt(wans)) + "</div>" + "<div id='timer' class='timerCls' style='width:35%; text-align:right'>" + timeElapsed + "</div>" ;
    //document.getElementById("timeAndStatusDivId").innerHTML = newHTML;
}

// Function to update the timer
function updateTimer() {
    const timerElement = document.getElementById("timer");
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    
    // Calculate minutes and seconds
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    
    // Format the time as MM:SS
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the timer element
    timerElement.textContent = formattedTime;
    }

function storeTestResults(percent, url) {
    let StrFunction = "storeTestResults";
    let title = document.getElementById("docHeader").innerHTML;

    $.ajax({
        url: the.hosturl + '/php/process.php',
        data: {
            url: url,
            percent: percent,
            addinfo: title,
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'json',
        success: function (retstatus) {

        },
        error: function (xhr, status, error) {

        }
    });
}


function showProfile() {
    document.getElementById("HelpTopicsDivId").style.display = "none";
    document.getElementById("accActivatedDivId").style.display = "none";
    document.getElementById("contactusDivId").style.display = "none";
    document.getElementById("filescannerDivId").style.display = "none";
    document.getElementById("forgotPWDivId").style.display = "none";
    document.getElementById("forgotPasswordSecDivId").style.display = "none";
    document.getElementById("helpDetailsDivId").style.display = "none";
    document.getElementById("homeDivId").style.display = "none";
    document.getElementById("howtoDivId").style.display = "none";
    document.getElementById("languageOverride").style.display = "none";
    document.getElementById("languageScanResultDivId").style.display = "none";
    document.getElementById("loginDivId").style.display = "none";
    document.getElementById("loginSecDivId").style.display = "none";
    document.getElementById("projectscannerDivId").style.display = "none";
    document.getElementById("registerSecDivId").style.display = "none";
    document.getElementById("tutorialDivId").style.display = "none";
    document.getElementById("tutorialEditDivId").style.display = "none";
    document.getElementById("tutorialListDivId").style.display = "none";
    document.getElementById("helpDisplayDivId").style.display = "none";


    document.getElementById("profileDivId").style.display = "block";
    document.getElementById("allScoresTab").innerHTML = getAllScoresHTML();
    document.getElementById("latestScoresTab").innerHTML = getLatestScoresHTML();

}

function getLatestScoresHTML(){
    let userdata = sessionStorage.getItem("userdata");
    let userObjs;
    let scoresList;
    let latestScores = {};

    let newHTML = "";
    let tf = JSON.parse(sessionStorage.getItem("tutorialList"));
    let quizRows = JSON.parse(tf);
    quizRows = quizRows.filter(function (entry) {
        return entry.title.toUpperCase().includes("QUIZ");
    });

    if (the.smusr) {
    } else {
        quizRows = quizRows.filter(function (entry) {
            return entry.discontinue == "0";
        });
    }

    let itemNameOrig = "";
    let itemName = "";
    let subpath = "";
    let technologyOrig = "";
    let technology = "";
    let path = window.location.pathname;
    let myUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1);

    if ((userdata != null) && (userdata != "")) {
        userObjs = JSON.parse(userdata);
        scoresList = userObjs.scores;

        // Iterate over the scoresList array to find the maximum timedate for each score
        scoresList.forEach((obj) => {
            const { quiz, time } = obj;
            if (!latestScores[quiz] || new Date(time) > new Date(latestScores[quiz])) {
                latestScores[quiz] = time;
            }
        });

        // Filter the scoresList array to include only objects with the maximum timedate for each name
        const latestUserScoresData = scoresList.filter((obj) => obj.time === latestScores[obj.quiz] );


        let quizURL = "";


        newHTML = newHTML + "<div class='scoresheader'>Quiz Scores</div>";
        newHTML = newHTML + "<table class ='scorestablecls' ><tr><th>Quiz</th><th>Score</th><th>Time</th></tr>";

        for (let i = 0; i < quizRows.length; i++) {
            itemNameOrig = quizRows[i].title;
            itemName = itemNameOrig.replaceAll(" ", "-");
    
            subpath = quizRows[i].subpath;
    
            technologyOrig = quizRows[i].technology;
    
            technology = technologyOrig.replaceAll(" ", "-");

            quizURL = myUrl + "topics/" + technology.toLowerCase() + "/" + itemName.toLowerCase();

            if ((i==0) || ( quizRows[i].technology !=  quizRows[i-1].technology)){
                newHTML = newHTML + "<tr style='background-color:#4d6981; color:white'><td colspan='3'>" + technologyOrig + "</td></tr>";
            }

            let latestResultForQuiz = "";
            let latestTestTime = "";

            let resultForQuiz = latestUserScoresData.filter((obj) => {
                let qzURL = (obj.quiz).split("/topics/");
                let link = qzURL[1];
                let dummy1 = link.split("/");
                return technology.toUpperCase() === dummy1[0].toUpperCase() && itemName.toUpperCase() === dummy1[1].toUpperCase() ; 
            })

            if (resultForQuiz.length != 0){
                obj = resultForQuiz[0];
                latestResultForQuiz = obj.percent;
                latestTestTime = obj.time;

                newHTML = newHTML + "<tr><td> <a class= 'tutorialLink' href='" + quizURL + "'> " + subpath + " </a></td><td>" + latestResultForQuiz + "% </td><td>" + latestTestTime + "</td></tr>";

            }else{
                newHTML = newHTML + "<tr><td> <a class= 'tutorialLink' href='" + quizURL + "'> " + subpath + " </a></td><td>" + "" + " </td><td>" + "" + "</td></tr>";

            }


        }


        newHTML = newHTML + "</table>";
    } else {
        newHTML = newHTML + "<div class='scoresheader'>Quiz Scores</div> No scores found";
    }

    return newHTML;
}

function getAllScoresHTML(){
    let userdata = sessionStorage.getItem("userdata");
    let userObjs;
    let scoresList;

    let newHTML = "";
    if ((userdata != null) && (userdata != "")) {
        userObjs = JSON.parse(userdata);
        scoresList = userObjs.scores;

        // Sort the array based on multiple fields: 'grade' in ascending order and 'age' in descending order
        scoresList.sort((a, b) => {
            if (a.quiz !== b.quiz) {
                // Sort by 'grade' field in ascending order
                return a.quiz.localeCompare(b.quiz);
            } else {
                // Sort by 'time' field in descending order
                const dateA = new Date(a.time);
                const dateB = new Date(b.time);
                return dateB - dateA;
            }
        });

        newHTML = newHTML + "<div class='scoresheader'>Quiz Scores</div>";
        newHTML = newHTML + "<table class ='scorestablecls' ><tr><th>Quiz</th><th>Score</th><th>Time</th></tr>";
        let lastSubject = "";
        for (let key in scoresList) {
            let obj = scoresList[key];

            let qzURL = (obj.quiz).split("/topics/");
            let link = qzURL[1];

            let title = obj.title;
            if (title == undefined){
                title = qzURL[1];
            }

            let dummy1 = link.split("/");
            let subject = dummy1[0];

            if (lastSubject != ""){
                if (lastSubject != subject){
                    newHTML = newHTML + "<tr style='background-color:#4d6981; color:white'><td colspan='3'>" + subject + "</td></tr>";
                }
            }else{
                newHTML = newHTML + "<tr style='background-color:#4d6981; color:white'><td colspan='3'>" + subject + "</td></tr>"; 
            }
            newHTML = newHTML + "<tr><td> <a class= 'tutorialLink' href='" + obj.quiz + "'> " + title + " </a></td><td>" + obj.percent + "% </td><td>" + obj.time + "</td></tr>"
            lastSubject = subject;
        }
        newHTML = newHTML + "</table>";
    } else {
        newHTML = newHTML + "<div class='scoresheader'>Quiz Scores</div> No scores found";
    }

    return newHTML;
}

function refreshPage() {
    var path = window.location.pathname;
    window.location.href = path;
}

function updateItem(itemid, createNewItem) {

    var usremail = localStorage.getItem("userEmail");

    var title = "(New) Please Edit";

    if (usremail == null) {
        error_message = "Not authorized";
        document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    } else if (usremail == "Guest") {
        error_message = "Not authorized";
        document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var ele = document.getElementsByClassName('dynamicradio');

    for (i = 0; i < ele.length; i++) {
        //if(ele[i].checked)
        //console.log(ele[i].parentElement.innerText);
        ele[i].value = ele[i].parentElement.innerText;


        //document.getElementById("result").innerHTML = "Gender: "+ele[i].value;
    }

    $('div.audio-details').css('display', 'none');
    $('div.image-props').css('display', 'none');

    $('div.audio-desc').css('display', 'inline');
    $('div.audio-desc').css('border', 'none');
    
    var elem = document.getElementsByClassName('qz1-rtans');
    var kys = {};
    var ki = "";
    var val = "";
    for (i = 0; i < elem.length; i++) {


        //ki = elem[i].id;
        //kys.ki = elem[i].innerText;

        ki = elem[i].id;
        ki = ki.replace("-rtans", "");

        val = elem[i].innerText;
        val = val.replace(/(\r\n|\n|\r)/gm, "");
        kys[ki] = val;

    }

    if (itemid == "" && createNewItem == "y") {
        if (localStorage.getItem("userLoggedIn") == "n") {

            error_message = "Not authorized";
            document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
            return;

        } else if (localStorage.getItem("userLvl") != "9") {
            error_message = "Not authorized";
            document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
            return;
        }


    } else {
        document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = red>" + " " + "</font> ";

        title = document.getElementById("title-" + itemid).value;
        titleseq = document.getElementById("titleseq-" + itemid).value;
        technology = document.getElementById("technology-" + itemid).value;
        technologyseq = document.getElementById("technologyseq-" + itemid).value;

        itemimage = document.getElementById("itemimage-" + itemid).value;

        subpath = document.getElementById("subpath-" + itemid).value;
        subpathseq = document.getElementById("subpathseq-" + itemid).value;
        shortdescription = document.getElementById("shortdescription-" + itemid).value;

        writer = document.getElementById("writer-" + itemid).value;
        keywords = document.getElementById("keywords-" + itemid).value;
        discontinue = document.getElementById("discontinue-" + itemid).value;
        techclass = document.getElementById("techclass-" + itemid).value;

        description = document.getElementById("description-" + itemid).innerHTML;

        var keys = Object.keys(kys);

        if (keys.length > 0) {
            if (description.includes("hdmidivid")) {
                description = description.substring(0, description.indexOf("hdmidivid") - 9);
            }

            description = description + "<div id='hdmidivid' class='hdmicls'>" + JSON.stringify(kys) + "</div>";


        }

        discontinue = document.getElementById("discontinue-" + itemid).value;


        if (localStorage.getItem("userLoggedIn") == "n") {

            error_message = "Not authorized";
            document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
            return;

        } else if (localStorage.getItem("userLvl") != "9") {
            error_message = "Not authorized";
            document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
            return;
        }
    }
    var StrFunction = "UpdateItem";

    title = removeSpecialCharactersAndKeepSpaces(title);
    technology = technology.replaceAll("'", "''");
    subpath = subpath.replaceAll("'", "''");
    shortdescription = shortdescription.replace(/"/g, '\'');
    shortdescription = shortdescription.replaceAll("'", "''");
    description = description.replaceAll("'", "''");
    //let regex = /\\/g;
    description = description.replace(/\\/g, "\\\\");

    writer = writer.replaceAll("'", "''");
    keywords = keywords.replaceAll("'", "''");
    techclass = techclass.replaceAll("'", "''");


    $.ajax({
        url: the.hosturl + '/php/process.php',
        data: {
            usremail: usremail,
            itemid: itemid,
            title: title,
            titleseq: titleseq,
            technology: technology,
            technologyseq: technologyseq,
            itemimage: itemimage,
            subpath: subpath,
            subpathseq: subpathseq,
            shortdescription: shortdescription,
            description: description,
            writer: writer,
            keywords: keywords,
            discontinue: discontinue,
            createNewItem: createNewItem,
            techclass: techclass,
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'json',
        success: function (retstatus) {
            //alert("Inside login success retstatus =" + retstatus);
            //console.log( "Inside updateItem success retstatus =" + retstatus);

            if (retstatus == "err") {
                //alert("Please relogin");
                goToLogin();
            }

            sessionStorage.setItem("tutorialList", null);
            //sessionStorage.setItem("itemList", null);
            getTutorialList();
            if (itemid == "") {
                //showMdaItems();

            } else {
                document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + "Processed successfully" + "</font> ";
                let x = document.getElementById("toastsnackbar");
                x.innerHTML = "Saved Successfully";
                x.classList.add("show");
                setTimeout(() => {
                    addImageFrames();
                    addCopyButtons();
                }, 2000);
                setTimeout(function () {
                    x.classList.remove("show");
                }, 3000);
            }
            //displayCart();

        },
        error: function (xhr, status, error) {
            if (!itemid == "") {
                document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + "Failed to update" + "</font> ";

                let x = document.getElementById("toastsnackbar");
                x.innerHTML = "Failed to update";
                x.classList.add("show");

                setTimeout(function () {
                    x.classList.remove("show");
                }, 3000);
            }
            //alert(xhr);

            //console.log(error);
            //console.log(xhr);
        }
    });
}

function removeSpecialCharactersAndKeepSpaces(text) {
    return text.replace(/[^a-zA-Z0-9\s]/g, '');
}

function updateInfo(data) {

    var StrFunction = "updateinfo"

    var usremail = localStorage.getItem("userEmail");

    if (usremail == null) {
        return;
    } else if (usremail == "Guest") {
        return;
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        data: {
            usremail: usremail,
            data: data,
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'json',
        success: function (retstatus) {

        },
        error: function (xhr, status, error) {

        }
    });
}
function activateAccount(pass) {

    $.ajax({
        url: the.hosturl + '/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "activateAcc",
            passkey: pass
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //console.log("success");
            //console.log(response);
            if (response == "s") {
                //console.log("Account activated");
                //Show('login');

                document.getElementById("helpDisplayDivId").style.display = "block";
                //Update url

                document.getElementById("languageScanResultDivId").style.display = "none";
                document.getElementById("languageOverride").style.display = "none";
                document.getElementById("helpDetailsDivId").style.display = "none";
                document.getElementById("contactusDivId").style.display = "none";
                document.getElementById("howtoDivId").style.display = "none";

                document.getElementById("filescannerDivId").style.display = "none";
                document.getElementById("HelpTopicsDivId").style.display = "none";
                document.getElementById("projectscannerDivId").style.display = "none";
                document.getElementById("loginDivId").style.display = "block";
                //document.getElementById("loginDivId").style.width = "70%";
                document.getElementById("loginerrormsg").innerHTML = "";

                //document.getElementById("helpDisplayDivId").style.width = "30%";



                showHelpDivMessage("Login to add or make updates to the help scan codes");

                document.getElementById("loginSecDivId").style.display = "none";
                document.getElementById("accActivatedDivId").style.display = "block";
                //markHelpCodes();

            } else {
                //console.log("Failed to activate account");
            }
        },
        error: function () {
            //console.log("Failed to activate account");
        }
    });
}

function setPassword() {

    document.getElementById("newpwerrormsg").innerHTML = "<font color = orange>" + " " + "</font> ";


    var StrPass = document.getElementById("newpassword").value
    var StrPassRe = document.getElementById("newpasswordRe").value

    var StrFunction = "setPassword";

    var error_message = "";


    if (StrPass.trim() == "") {
        error_message = "Please provide password with minimum 8 character length";
        document.getElementById("newpwerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass.length < 8) {
        error_message = "Please provide password with minimum 8 character length";
        document.getElementById("newpwerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass != StrPassRe) {
        error_message = "Entered passwords do not match";
        document.getElementById("newpwerrormsg").innerHTML = "<font color = orange>" + error_message + "</font> ";
        return;
    }

    var resetkey = sessionStorage.getItem("passwordresetkey");

    var StrAddress = "";

    $.ajax({
        url: the.hosturl + '/php/process.php',
        data: { usrpassword: StrPass, resetkey: resetkey, usrfunction: StrFunction },
        type: 'POST',
        dataType: 'JSON',
        success: function (retstatus) {
            //alert(msg);
            //console.log(retstatus);

            if (retstatus == "S") {
                //document.getElementById("newpwerrormsg").innerHTML = "Password has been set successfully.";
                document.getElementById("setPwDivId").style.display = "none";
                document.getElementById("setPwSuccessDivId").style.display = "block";
            }

            if (retstatus == "F") {
                document.getElementById("newpwerrormsg").innerHTML = "There was a problem in completing the request. Issue has been logged and will be resolved soon. Please try again later";

            }

            if ((retstatus != "S") && (retstatus != "F")) {
                document.getElementById("newpwerrormsg").innerHTML = "<font color = red>" + retstatus + "</font> ";

            }


        },
        error: function (xhr, status, error) {
            console.log(error);
            console.log(xhr);
            console.log(status);
            document.getElementById("newpwerrormsg").innerHTML = "There was a problem in completing the request. Issue has been logged and will be resolved soon. Please try again later";
        }
    });

}

function refreshCaptcha() {
    try{
        let captchaText = document.querySelector('#captcha');
        var ctx = captchaText.getContext("2d");
        ctx.font = "50px Roboto";
        ctx.fillStyle = "#000";
    
        ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    
    
        let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '2', '3', '4', '5', '6', '7', '8', '9'];
        let emptyArr = [];
    
        // This loop generates a random string of 7 characters using alphaNums
        // Further this string is displayed as a CAPTCHA
        for (let i = 1; i <= 7; i++) {
            emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
        }
        var c = emptyArr.join('');
        ctx.fillText(emptyArr.join(''), captchaText.width / 10, captchaText.height / 1.8);
        the.captcha = c;
    }catch(e){

    }

}

function refreshCaptchatwo() {

    let captchaText = document.querySelector('#captchatwo');
    var ctx = captchaText.getContext("2d");
    ctx.font = "50px Roboto";
    ctx.fillStyle = "#000";

    ctx.clearRect(0, 0, captchaText.width, captchaText.height);

    // alphaNums contains the characters with which you want to create the CAPTCHA
    let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '2', '3', '4', '5', '6', '7', '8', '9'];
    let emptyArr = [];

    // This loop generates a random string of 7 characters using alphaNums
    // Further this string is displayed as a CAPTCHA
    for (let i = 1; i <= 7; i++) {
        emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    var c = emptyArr.join('');
    ctx.fillText(emptyArr.join(''), captchaText.width / 10, captchaText.height / 1.8);
    the.captcha = c;
}


function uploadFiles(evt) {
    var files = evt.files; // FileList object


    the.uploadedFiles = files;
}

function handleFolderSelect(evt) {

    //console.log("handleFolderSelect called");

    var files = evt.files; // FileList object

    the.uploadedFiles = files;

    //Add the files list to newProjectContent variable
    //var subFolder = document.getElementById("project-sub-folder-box").value;

    for (var i = 0, f; f = files[i]; i++) {
        var str = f.webkitRelativePath;
        var pos = str.lastIndexOf("/")
        var subFolder = str.substr(0, pos);
        the.newProjectContent.push([subFolder, f.name]);
    }


    //Display the files in the output area

    var innerHTML = '<div >';

    for (var l = 0; l < the.newProjectContent.length; l++) {

        var hlpCode = the.newProjectContent[l][1];
        var hlpCdId = the.newProjectContent[l][1];
        var hlpCdGrp = the.newProjectContent[l][0];


        if (l > 0) {
            if (the.newProjectContent[l][0] != the.newProjectContent[l - 1][0]) {
                //first item in the group****Need to close previous li and open li for the new group
                innerHTML = innerHTML + '</ul> </li>';
                innerHTML = innerHTML + '<li class="day">' + '<i style = "color: black; font-style: normal; ">' + hlpCdGrp + '</i>' + ' <ul style="padding: 0; padding-left: 10px; list-style-type: none; margin: 0; ">';
                innerHTML = innerHTML + '<li>' + '<a href ="#" class="fileLink" onclick="fileClicked(' + "'" + hlpCdId + "'" + ');return false;" >' + hlpCode + "</a>" + '</li>';
            } else {
                //another item in the previous group
                innerHTML = innerHTML + '<li>' + '<a href ="#" class="fileLink" onclick="fileClicked(' + "'" + hlpCdId + "'" + ');return false;" >' + hlpCode + "</a>" + '</li>';
            }
        } else if (l == 0) {
            //First item in the list
            innerHTML = innerHTML + '<li class="day">' + '<i style = "color: black">' + hlpCdGrp + '</i>' + ' <ul style="padding: 0; padding-left: 10px; list-style-type: none; margin: 0; ">' + '<li>' + '<a href ="#" class="fileLink" onclick="fileClicked(' + "'" + hlpCdId + "'" + ');return false;" >' + hlpCode + "</a>" + '</li>';
        }

        //List is over
        if (l == the.newProjectContent.length - 1) {
            innerHTML = innerHTML + '</ul> </li></div>';
        }
    }
    document.getElementById("NewProjectStructureDisplayId").innerHTML = innerHTML;

    //SM: Added logic for help topics display


    $('li > ul').each(function (i) {
        // Find this list's parent list item.
        var parentLi = $(this).parent('li');

        // Style the list item as folder.
        parentLi.addClass('folder');

        // Temporarily remove the list from the
        // parent list item, wrap the remaining
        // text in an anchor, then reattach it.
        var subUl = $(this).remove();
        parentLi.wrapInner('<a/>').find('a').click(function () {
            // Make the anchor toggle the leaf display.
            subUl.toggle();
        });
        parentLi.append(subUl);
    });

    // Hide all lists except the outermost.
    $('ul ul').hide();

}

function handleFolderSelectTwo(evt) {

    //console.log("handleFolderSelect called");

    var files = evt.files; // FileList object

    the.uploadedFiles = files;
    the.newProjectContent = [];
    //Add the files list to newProjectContent variable
    //var subFolder = document.getElementById("project-sub-folder-box").value;

    for (var i = 0, f; f = files[i]; i++) {
        var str = f.webkitRelativePath;
        var pos = str.lastIndexOf("/")
        var subFolder = str.substr(0, pos);
        the.newProjectContent.push([subFolder, f.name]);
    }


    //Display the files in the output area

    var innerHTML = '<div style="overflow: hidden;">';

    for (var l = 0; l < the.newProjectContent.length; l++) {

        var hlpCode = the.newProjectContent[l][1];
        var hlpCdId = the.newProjectContent[l][1];
        var hlpCdGrp = the.newProjectContent[l][0];

        //if ((hlpCdGrp == null) ||(hlpCdGrp == "")){
        //	 hlpCdGrp = "Others";
        //}



        if (l > 0) {
            if (the.newProjectContent[l][0] != the.newProjectContent[l - 1][0]) {
                //first item in the group****Need to close previous li and open li for the new group
                innerHTML = innerHTML + '</ul> </li>';
                innerHTML = innerHTML + '<li class="day">' + '<i style = "color: black; font-style: normal; ">' + hlpCdGrp + '</i>' + ' <ul style="padding: 0; padding-left: 10px; list-style-type: none; margin: 0; ">';
                innerHTML = innerHTML + '<li>' + '<a href ="#" class="fileLink" onclick="fileClicked(' + "'" + hlpCdId + "'" + ');return false;" >' + hlpCode + "</a>" + '<button class="btnNewWindow" onclick="openFileInNewWindow(' + "'" + hlpCdId + "'" + ')" ></button>' + '</li>';
            } else {
                //another item in the previous group
                innerHTML = innerHTML + '<li>' + '<a href ="#" class="fileLink" onclick="fileClicked(' + "'" + hlpCdId + "'" + ');return false;" >' + hlpCode + "</a>" + '<button class="btnNewWindow" onclick="openFileInNewWindow(' + "'" + hlpCdId + "'" + ')" ></button>' + '</li>';
            }
        } else if (l == 0) {
            //First item in the list
            innerHTML = innerHTML + '<li class="day">' + '<i style = "color: black">' + hlpCdGrp + '</i>' + ' <ul style="padding: 0; padding-left: 10px; list-style-type: none; margin: 0; ">' + '<li>' + '<a href ="#" class="fileLink" onclick="fileClicked(' + "'" + hlpCdId + "'" + ');return false;" >' + hlpCode + "</a>" + '<button class="btnNewWindow" onclick="openFileInNewWindow(' + "'" + hlpCdId + "'" + ')" ></button>' + '</li>';
        }

        //List is over
        if (l == the.newProjectContent.length - 1) {
            innerHTML = innerHTML + '</ul> </li></div>';
        }
    }

    document.getElementById("NewProjectStructureDisplayIdTwo").innerHTML = innerHTML;

    //SM: Added logic for help topics display


    $('li > ul').each(function (i) {
        // Find this list's parent list item.
        var parentLi = $(this).parent('li');

        // Style the list item as folder.
        parentLi.addClass('folder');

        // Temporarily remove the list from the
        // parent list item, wrap the remaining
        // text in an anchor, then reattach it.
        var subUl = $(this).remove();
        parentLi.wrapInner('<a/>').find('a').click(function () {
            // Make the anchor toggle the leaf display.
            subUl.toggle();
        });
        parentLi.append(subUl);
    });

    // Hide all lists except the outermost.
    $('ul ul').hide();



}

function openFileInNewWindow(fileName) {
    //console.log(fileName + " is to be opened in new window");
    if (the.uploadedFiles == null) {
        return;
    }

    var files = the.uploadedFiles;

    for (var i = 0, f; f = files[i]; i++) {
        if (f.name == fileName) {
            localStorage.setItem("newWindowFileName", fileName);
            //localStorage.setItem("newWindowFileObj", JSON.stringify(f));
            //console.log(f);

            var reader = new FileReader();
            reader.onload = function (event) {
                localStorage.setItem("newWindowFileObj", event.target.result);
                myUrl = window.location.protocol + "//" + window.location.host +
                    window.location.pathname + "?target=" + "filescanner";

                window.open(myUrl);
            }
            reader.readAsText(f, "UTF-8");

            //return;
        }
    }


}

function loadFile() {
    try {
        var fileName = localStorage.getItem("newWindowFileName");
        //var f = JSON.parse(localStorage.getItem("newWindowFileObj"));
        var fileData = localStorage.getItem("newWindowFileObj");
        //console.log(f);
        //Display three
        document.getElementById("HelpTopicsDivId").style.display = "none";
        document.getElementById("helpDisplayDivId").style.display = "block";
        if (document.getElementById("filescannerDivId").style.display == "none") {
            document.getElementById("filescannerDivId").style.display = "block";
            document.getElementById("filescannerDivId").style.width = "50%";
            document.getElementById("projectscannerDivId").style.width = "20%";
        }
        //document.getElementById("helpDisplayDivId").style.width = "30%";


        //Show("filescanner");


        var arr = fileName.split(".");
        var fileExtension = arr[1];


        var newLanguage = getLanguageForFileExtension(fileExtension);


        //var reader = new FileReader();
        //var reader = new FileReader();


        //reader.onload = function(event) {

        document.getElementById("displayFileLoaderDivId").style.display = "none";
        //console.log("File loaded");
        if (the.editor) {
            the.editor.setValue(fileData);

            the.codetext = the.editor.getValue();
        } else {
            $('#source').val(fileData);
            the.codetext = fileData;
        }
        //the.codetext = event.target.result;
        document.getElementById("selectfile").innerHTML = "<i class='fas fa-folder-open' style='font-size:20px;color:purple'></i>&nbsp" + fileName;

        if (newLanguage != "") {
            the.codeLanguage = newLanguage;
            the.languageOverridden = true;
            //the.codetext = the.editor.getValue();
            //markHelpCodes();

            document.getElementById("language-box").value = newLanguage;


            markHelpCodes();

            var msg = "Code Language is " + newLanguage + " based on file extension" +
                ". If it looks incorrect, please enter the correct language in the box below and click on override button.";
            //console.log(msg)
            //document.getElementById("languageDeterminedDivId").style.display = "block";


            var gf = JSON.parse(sessionStorage.getItem("SpecialFiles"));

            var filteredRows = JSON.parse(gf).filter(function (entry) {
                var evalStr = entry.filename;
                return evalStr.toUpperCase() === fileName.toUpperCase();
            });


            if (filteredRows.length > 0) {
                document.getElementById("filelvlhelpdivid").innerHTML = filteredRows[0].description;
                document.getElementById("filelvlhelpdivid").style.display = "block";
            } else {
                if (the.filelvlhelp != null) {
                    if (the.filelvlhelp != "") {
                        document.getElementById("filelvlhelpdivid").innerHTML = the.filelvlhelp;
                        document.getElementById("filelvlhelpdivid").style.display = "block";
                    }
                }
            }




            document.getElementById("languageOverride").style.display = "block";
            document.getElementById("overrideMsg").innerHTML = "";
            document.getElementById("helpDivMessage").style.display = "block";
            document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + cleanWord(msg, '');
            populateLanguages();

            document.getElementById("languageScanResultDivId").style.display = "none";
            document.getElementById("helpDetailsDivId").style.display = "none";
            document.getElementById("sub-tech-div-id").style.display = "none";


        } else {

            the.codeLanguage = newLanguage;
            markHelpCodes();

            document.getElementById("destinationDiv").style.display = "block";


            languageNotDeterminedMsg();


        }

    } catch (err) {
        console.log(err);
    }


}
function fileClicked(fileName) {

    if (document.getElementById("filescannerDivId").style.width < "50%") {
        document.getElementById("filescannerDivId").style.width = "70%";
        document.getElementById("projectscannerDivId").style.width = "30%";
    }

    document.getElementById("filelvlhelpdivid").style.display = "none";
    if (the.uploadedFiles == null) {
        return;
    }

    var files = the.uploadedFiles;

    for (var i = 0, f; f = files[i]; i++) {
        if (f.name == fileName) {

            //Display three
            document.getElementById("HelpTopicsDivId").style.display = "none";
            document.getElementById("helpDisplayDivId").style.display = "block";

            if (document.getElementById("filescannerDivId").style.display == "none") {

                document.getElementById("filescannerDivId").style.display = "block";
                document.getElementById("btnCloseFileScanner").style.display = "inline-block";
                if (!onMobileBrowser()) {
                    document.getElementById("filescannerDivId").style.width = "70%";
                    document.getElementById("projectscannerDivId").style.width = "30%";
                }
                //document.getElementById("filescannerDivId").style.width = "50%";
                //document.getElementById("projectscannerDivId").style.width = "20%";
            }
            //document.getElementById("helpDisplayDivId").style.width = "30%";


            //Show("filescanner");

            if (onMobileBrowser()) {
                $('html, body').animate({
                    scrollTop: $("#filescannerDivId").offset().top
                }, 1000);
            }

            var arr = fileName.split(".");
            var fileExtension = arr[1];


            var newLanguage = getLanguageForFileExtension(fileExtension);


            //var reader = new FileReader();
            var reader = new FileReader();


            reader.onload = function (event) {
                document.getElementById("displayFileLoaderDivId").style.display = "none";
                //console.log("File loaded");
                if (the.editor) {
                    the.editor.setValue(event.target.result);

                    the.codetext = the.editor.getValue();
                } else {
                    $('#source').val(event.target.result);
                    the.codetext = event.target.result;
                }
                //the.codetext = event.target.result;
                document.getElementById("selectfile").innerHTML = "<i class='fas fa-folder-open' style='font-size:20px;color:purple'></i>&nbsp" + fileName;

                if (newLanguage != "") {
                    the.codeLanguage = newLanguage;
                    the.languageOverridden = true;
                    //the.codetext = the.editor.getValue();
                    //markHelpCodes();

                    document.getElementById("language-box").value = newLanguage;


                    markHelpCodes();

                    var msg = "Code Language is " + newLanguage + " based on file extension" +
                        ". If it looks incorrect, please enter the correct language in the box below and click on override button.";
                    //console.log(msg)
                    //document.getElementById("languageDeterminedDivId").style.display = "block";



                    var gf = JSON.parse(sessionStorage.getItem("SpecialFiles"));

                    var filteredRows = JSON.parse(gf).filter(function (entry) {
                        var evalStr = entry.filename;
                        return evalStr.toUpperCase() === fileName.toUpperCase();
                    });


                    if (filteredRows.length > 0) {
                        document.getElementById("filelvlhelpdivid").innerHTML = filteredRows[0].description;
                        document.getElementById("filelvlhelpdivid").style.display = "block";
                    } else {
                        if (the.filelvlhelp != null) {
                            if (the.filelvlhelp != "") {
                                document.getElementById("filelvlhelpdivid").innerHTML = the.filelvlhelp;
                                document.getElementById("filelvlhelpdivid").style.display = "block";
                            }
                        }
                    }




                    document.getElementById("languageOverride").style.display = "block";
                    document.getElementById("overrideMsg").innerHTML = "";
                    document.getElementById("helpDivMessage").style.display = "block";
                    document.getElementById("helpDivMessage").innerHTML = '<i class="fa fa-info-circle" style="display:none; float: left;  position: absolute; top:35px; left: 10px; color:orange;" ></i>' + cleanWord(msg, '');
                    populateLanguages();

                    document.getElementById("languageScanResultDivId").style.display = "none";
                    document.getElementById("helpDetailsDivId").style.display = "none";
                    document.getElementById("sub-tech-div-id").style.display = "none";


                } else {

                    the.codeLanguage = newLanguage;
                    markHelpCodes();

                    document.getElementById("destinationDiv").style.display = "block";


                    languageNotDeterminedMsg();


                }
            };
            document.getElementById("displayFileLoaderDivId").style.display = "block";
            reader.readAsText(f, "UTF-8");
            return;



        }
    }
}

function resetProjectFiles() {
    the.uploadedFiles = null;
    document.getElementById("NewProjectStructureDisplayId").innerHTML = "";
}

function saveProject() {

    //console.log("called saveProject");

    var myLanguage = document.getElementById("project-language-box").value;
    var myTechnology = document.getElementById("project-sub-tech-box").value;
    var myProjectName = document.getElementById("project-name-box").value;
    var myProjectPath = document.getElementById("project-path-box").value;
    var myProjectDetails = tinyMCE.get('project_details').getContent();

    var parts = myProjectDetails.split('\\');
    var myProjectDetails = parts.join('\\\\');

    if (myProjectName == "") {
        document.getElementById("saveProjectMsg").innerHTML = "Please provide project name";
        return;
    }

    if (myProjectPath == "") {
        document.getElementById("saveProjectMsg").innerHTML = "Please provide project path";
        return;
    }

    if (the.newProjectContent == null) {
        document.getElementById("saveProjectMsg").innerHTML = "Please provide project files";
        return;
    }

    var myProjectFiles = JSON.stringify(the.newProjectContent);

    if (myLanguage == "") {
        document.getElementById("saveProjectMsg").innerHTML = "Please enter language";
        return;
    }

    if (myProjectDetails == "") {
        document.getElementById("saveProjectMsg").innerHTML = "Please provide project details";
        return;
    }


    if (the.idOfProjectToUpdate == null) {
        /***Project does not exist*****/

        $.ajax({
            url: the.hosturl + '/php/process.php',
            type: 'POST',
            data: jQuery.param({
                usrfunction: "SaveNewProject",
                language: myLanguage,
                technology: myTechnology,
                project_name: myProjectName,
                project_details: myProjectDetails,
                project_path: myProjectPath,
                project_files: myProjectFiles

            }),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //console.log("success");
                //console.log(response);
                if (response == "true") {
                    document.getElementById("saveProjectMsg").innerHTML = "Record created successfully";

                    //Refresh the saved projects list list

                    $.ajax({
                        url: the.hosturl + '/php/process.php',
                        type: 'POST',
                        data: jQuery.param({
                            usrfunction: "GetSavedProjects"
                        }),
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            sessionStorage.setItem("SavedProjectsList", JSON.stringify(response));


                            var filteredRows = JSON.parse(response).filter(function (entry) {
                                return entry.language === myLanguage && entry.project_name === myProjectName;
                            });

                            the.idOfProjectToUpdate = filteredRows[0].project_id

                        },
                        error: function () {
                            //alert("error");
                        }
                    });

                    //markHelpCodes();

                } else { }
            },
            error: function () {
                //console.log("error-record creation failed");
            }
        });
    } else {
        $.ajax({
            url: the.hosturl + '/php/process.php',
            type: 'POST',
            data: jQuery.param({
                usrfunction: "UpdateProject",
                language: myLanguage,
                technology: myTechnology,
                project_name: myProjectName,
                project_details: myProjectDetails,
                project_path: myProjectPath,
                project_files: myProjectFiles,
                project_id: the.idOfProjectToUpdate

            }),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //console.log("success");
                //console.log(response);
                if (response == "true") {
                    document.getElementById("saveProjectMsg").innerHTML = "Project details updated successfully";

                    //Refresh the saved projects list list

                    $.ajax({
                        url: the.hosturl + '/php/process.php',
                        type: 'POST',
                        data: jQuery.param({
                            usrfunction: "GetSavedProjects"
                        }),
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            sessionStorage.setItem("SavedProjectsList", JSON.stringify(response));


                        },
                        error: function () {
                            //alert("error");
                        }
                    });

                    //markHelpCodes();

                } else { }
            },
            error: function () {
                //console.log("error - saving project");
            }
        });
    }
}

function addNewProject() {
    the.idOfProjectToUpdate = null;
    document.getElementById("StoredPrjDivId").style.display = "none";
    document.getElementById("AddNewProjectDivId").style.display = "block";
    document.getElementById("saveProjectMsg").innerHTML = "";

    document.getElementById("project-language-box").value = "";
    document.getElementById("project-sub-tech-box").value = "";
    document.getElementById("project-name-box").value = "";
    document.getElementById("project-path-box").value = "";
    tinyMCE.get('project_details').setContent("");

    the.newProjectContent = [];
    document.getElementById("NewProjectStructureDisplayId").innerHTML = "";

}

function cancelNewProjectAdd() {
    document.getElementById("StoredPrjDivId").style.display = "block";
    document.getElementById("AddNewProjectDivId").style.display = "none";
}

function showTechnology(tech) {

    var tf = JSON.parse(sessionStorage.getItem("tutorialList"));
    var rows = JSON.parse(tf);
    var elementId = "menucardparent-" + tech
    elementId = elementId.replaceAll(" ", "");
    if (tech != "") {
        tech = tech.toUpperCase();
        rows = rows.filter(function (entry) {
            return entry.technology.toUpperCase() == tech;
        });
    }

    populateTutorialList(rows);

    document.getElementById(elementId).style.width = "95%";
    document.getElementById(elementId).style.maxWidth = "1200px";
    document.getElementById(elementId).style.float = "none";
    document.getElementById(elementId).style.top = "20px";
    document.getElementById(elementId).style.margin = "auto";
    // document.getElementById(elementId).style.overflow = "expand";

    customizeViewForTechnology(tech);

}

function customizeViewForTechnology(tech){


}

function searchTutorial() {
    var searchText = document.getElementById("tutorial-search-box").value;

    var tf = JSON.parse(sessionStorage.getItem("tutorialList"));
    var rows = JSON.parse(tf);

    if (searchText != "") {
        searchText = searchText.toUpperCase();
        rows = rows.filter(function (entry) {
            return entry.title.toUpperCase().includes(searchText) || entry.technology.toUpperCase().includes(searchText) || entry.shortdescription.toUpperCase().includes(searchText) || entry.keywords.toUpperCase().includes(searchText);
        });
    }

    document.getElementById("tutorialDivId").style.display = "none";
    document.getElementById("tutorialListDivId").style.width = "100%";
    //document.getElementById("homeDivId").style.display = "none";
    populateTutorialList(rows);
    $(".cardsContainerDivClassPadd").css("width", "95%");
}
function populateTutorialDropDown(fieldId = "tutorial-search-box") {


    var tf = JSON.parse(sessionStorage.getItem("tutorialList"));
    var items = JSON.parse(tf);

    //var LHCAI = the.LanguageHelpCodeAndIds_LclJson;
    //console.log(LHCAI);
    //var codesWithHelpDetails = JSON.parse(LHCAI);

    var lookup = {};
    //var items = codesWithHelpDetails;
    var dropDownList = [];

    for (var item, i = 0; item = items[i++];) {
        var value = item.title;

        dropDownList.push(value);
    }

    //console.log(languages)
    autocomplete(document.getElementById(fieldId), dropDownList);
    //the.languageListPopulated = true;
}

function populateTutorialList(rows = "") {


    //console.log(document.getElementById("cardsContainerDivId").innerHTML);

    var tf = JSON.parse(sessionStorage.getItem("tutorialList"));


    if (rows == "") {
        rows = JSON.parse(tf);
    }


    if (the.smusr) {
    } else {
        rows = rows.filter(function (entry) {
            return entry.discontinue == "0";
        });
    }


    //var innerHTML = "<input id='tutorial-search-box' type='text'	name='tutorial' autocomplete='off' placeholder='search'/>" +
    //"<button class='buttonCls' onclick='searchTutorial(); return false;' >Update</button>";
    var innerHTML = "";
    var itemName = "";
    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1);
    var technologySqueezed = "";
    var technologyOrig = "";
    var technologyUrl = "";

    var defaultDisplayCount = 1000;
    var technologyMaxCount = 0;
    var currDisplayCount = 0;

    for (var i = 0; i < rows.length; i++) {

        itemName = rows[i].title;
        itemName = itemName.replaceAll(" ", "-");

        itemimage = rows[i].itemimage;

        subpath = rows[i].subpath;
        //subpath = subpath.replaceAll(" ", "-");

        technologyOrig = rows[i].technology;
        technology = rows[i].technology;

        technology = technology.replaceAll(" ", "-");

        //tutorialTitleURL = myUrl + "topics/" + technology.toLowerCase() + "/" + subpath.toLowerCase() + "/" + itemName.toLowerCase();
        tutorialTitleURL = myUrl + "topics/" + technology.toLowerCase() + "/" + itemName.toLowerCase();

        technologyUrl = myUrl + "topics/" + technologyOrig;

        let itemStr = technology.toLowerCase() + "/" + itemName.toLowerCase();

        technologySqueezed = rows[i].technology;
        technologySqueezed = technologySqueezed.replaceAll(' ', '')

        technologyMaxCount = sessionStorage.getItem("max-count-" + technologySqueezed);

        if (i == 0) {
            innerHTML = innerHTML + '<div id="menucardparent-' + technologySqueezed + '" class="cardsContainerDivClassPadd"  > <a class="technologyHeader" href ="' + technologyUrl + '">';
            if (the.smusr) {
                innerHTML = innerHTML + rows[i].technologyseq + '. ';
            }
            innerHTML = innerHTML + rows[i].technology +

                //  '<label class="switch technologyToggleLbl"  ><input class="toggleInput"  type="checkbox" checked data-cat="'+ rows[i].technology + '"  onchange="handleShowToggle(this);" ><span class="slider round"></span></label>' +
                // '<a class="goToTechLink" href ="'+ technologyUrl +'"> GO </a>' +

                '</a>';
            startingCharURL = myUrl + "starting/bollywood-tutorials-starting-with-" + rows[i].technology;

        } else if (rows[i].technology != rows[i - 1].technology) {


            if (sessionStorage.getItem("max-count-" + rows[i - 1].technology) > defaultDisplayCount) {
                sessionStorage.setItem("display-count-" + rows[i - 1].technology, defaultDisplayCount);
                innerHTML = innerHTML + '<div id="tutorialDiv-' + rows[i - 1].itemid + '" class="tutorialDiv technologyFooter ' + rows[i - 1].technology + ' " >' +
                    '<button id="showmore-' + rows[i - 1].technology + '"  type="button" class="showmore-btn" onclick=showMoretutorials("' + rows[i - 1].technology + '") >Show More</button>' +
                    '</div>';
            } else {
                sessionStorage.setItem("display-count-" + rows[i - 1].technology, currDisplayCount);
            }

            currDisplayCount = 0;

            innerHTML = innerHTML + '</div><div id="menucardparent-' + technologySqueezed + '" class="cardsContainerDivClassPadd"  ><a class="technologyHeader" href ="' + technologyUrl + '">';

            if (the.smusr) {
                innerHTML = innerHTML + rows[i].technologyseq + '. ';
            }

            innerHTML = innerHTML + rows[i].technology +
                //  '<label class="switch technologyToggleLbl"  ><input class="toggleInput"   type="checkbox" checked data-cat="'+ rows[i].technology + '"  onchange="handleShowToggle(this);" ><span class="slider round"></span></label>' +
                //'<a class="goToTechLink" href ="'+ technologyUrl +'"> GO </a>' +
                '</a>';

            startingCharURL = myUrl + "starting/bollywood-tutorials-starting-with-" + rows[i].technology;
        }

        currDisplayCount = currDisplayCount + 1;

        if (currDisplayCount >= defaultDisplayCount) {
            continue;
        }


        if (i == 0) {
            previousSubpath = "";
        } else {
            previousSubpath = rows[i - 1].subpath;
        }

        currentSubpath = rows[i].subpath;

        if (i == rows.length - 1) {
            nextSubPath = "";
        } else {
            nextSubPath = rows[i + 1].subpath;
        }

        var discontinuedFlgCls = "";

        if (rows[i].discontinue == "1") {
            discontinuedFlgCls = " discontinued ";
        }

        if (rows[i].discontinue == "3") {
            discontinuedFlgCls = " internal ";
        }
        
        let subPathQzRepl = rows[i].subpath;
        subPathQzRepl = subPathQzRepl.replace(/quiz/i, "<span class='quizTxt'>Quiz</span>");

        if (previousSubpath == currentSubpath) {
            //It is a child tutorial same as previous

            if (technologySqueezed.toLowerCase().includes("stories")) {
                innerHTML = innerHTML + '<div id="tutorialDiv-' + rows[i].itemid + '" class="max_4box_responsive itemDisplay itemContainerCls itemListView-container tutorialChild ' + discontinuedFlgCls + technologySqueezed + '" >';
                innerHTML = innerHTML + '<div class="position_relative hoverBtnParent cursor_pointer">'
                innerHTML = innerHTML + '<a class="tutorialLink"  href ="' + tutorialTitleURL + '">'
                innerHTML = innerHTML + ' <div class="itmImgContainer"><img class="myitemImages" style="display:block" src=';

    
                innerHTML = innerHTML + itemimage + '></div> </a></div><div class="itemListView-Header"><div class="shopItemTitle ">';

                if (the.smusr) {
                    innerHTML = innerHTML + rows[i].titleseq + '. ';
                }

                innerHTML = innerHTML + subPathQzRepl + '</div></div>';

                innerHTML = innerHTML + '</div>';

            }else {
                innerHTML = innerHTML + '<div id="tutorialDiv-' + rows[i].itemid + '" class="tutorialDiv tutorialChild ' + discontinuedFlgCls + technologySqueezed + '" >';
                innerHTML = innerHTML + '<a class="tutorialLink"  href ="' + tutorialTitleURL + '"> <span class="tutorialTitleSpan"  > <h2 class="tutorialTitleH2" >';
                if (the.smusr) {
                    innerHTML = innerHTML + rows[i].titleseq + '. ';
                }
    
                innerHTML = innerHTML + subPathQzRepl + ' </h2> </span> </a>';
                innerHTML = innerHTML + '</div>';   
            }


        } else if (nextSubPath == currentSubpath) {
            //It is a new child tutorial 

            innerHTML = innerHTML + '<div class="tutorialParent ' + technologySqueezed + '" >';
            innerHTML = innerHTML + currentSubpath;
            innerHTML = innerHTML + '</div>';

            if (technologySqueezed.toLowerCase().includes("stories")) {
                innerHTML = innerHTML + '<div id="tutorialDiv-' + rows[i].itemid + '" class="max_4box_responsive itemDisplay itemContainerCls itemListView-container tutorialChild ' + discontinuedFlgCls + technologySqueezed + '" >';
                innerHTML = innerHTML + '<div class="position_relative hoverBtnParent cursor_pointer">'
                innerHTML = innerHTML + '<a class="tutorialLink"  href ="' + tutorialTitleURL + '">'
                innerHTML = innerHTML + ' <div class="itmImgContainer"><img class="myitemImages" style="display:block" src=';

    
                innerHTML = innerHTML + itemimage + '></div> </a></div><div class="itemListView-Header"><div class="shopItemTitle ">';

                if (the.smusr) {
                    innerHTML = innerHTML + rows[i].titleseq + '. ';
                }

                innerHTML = innerHTML + subPathQzRepl + '</div></div>';

                innerHTML = innerHTML + '</div>';

            }else {
                innerHTML = innerHTML + '<div id="tutorialDiv-' + rows[i].itemid + '" class="tutorialDiv tutorialChild ' + discontinuedFlgCls + technologySqueezed + '" >';
                innerHTML = innerHTML + '<a class="tutorialLink"  href ="' + tutorialTitleURL + '"> <span class="tutorialTitleSpan"  > <h2 class="tutorialTitleH2" >';

                if (the.smusr) {
                    innerHTML = innerHTML + rows[i].titleseq + '. ';
                }

                innerHTML = innerHTML + subPathQzRepl + ' </h2> </span> </a>';
                innerHTML = innerHTML + '</div>';
            }
        } else {
            //It is not a new child tutorial
            
            if (technologySqueezed.toLowerCase().includes("stories")) {
                innerHTML = innerHTML + '<div id="tutorialDiv-' + rows[i].itemid + '" class="max_4box_responsive itemDisplay itemContainerCls itemListView-container ' + discontinuedFlgCls + technologySqueezed + '" >';
                innerHTML = innerHTML + '<div class="position_relative hoverBtnParent cursor_pointer">'
                innerHTML = innerHTML + '<a class="tutorialLink"  href ="' + tutorialTitleURL + '">'
                innerHTML = innerHTML + ' <div class="itmImgContainer"><img class="myitemImages" style="display:block" src=';

    
                innerHTML = innerHTML + itemimage + '></div> </a></div><div class="itemListView-Header"><div class="shopItemTitle ">';

                if (the.smusr) {
                    innerHTML = innerHTML + rows[i].titleseq + '. ';
                }

                innerHTML = innerHTML + subPathQzRepl + '</div></div>';

                innerHTML = innerHTML + '</div>';
            }else{
                innerHTML = innerHTML + '<div id="tutorialDiv-' + rows[i].itemid + '" class="tutorialDiv ' + discontinuedFlgCls + technologySqueezed + '" >';
                innerHTML = innerHTML + '<a class="tutorialLink" href ="' + tutorialTitleURL + '"> <span class="tutorialTitleSpan"  > <h2 class="tutorialTitleH2" >';
    
                if (the.smusr) {
                    innerHTML = innerHTML + rows[i].titleseq + '. ';
                }
    
                innerHTML = innerHTML + subPathQzRepl + ' </h2> </span> </a>';
                innerHTML = innerHTML + '</div>';
            }

        }


        if (i == rows.length - 1) {
            innerHTML = innerHTML + '</div>';
        }
    }

    if (sessionStorage.getItem("max-count-" + technologySqueezed) > defaultDisplayCount) {
        sessionStorage.setItem("display-count-" + technologySqueezed, defaultDisplayCount);
        innerHTML = innerHTML + '<div id="tutorialDiv-' + rows[i].itemid + '" class="tutorialDiv technologyFooter ' + technologySqueezed + ' " >' +
            '<button id="showmore-"' + rows[i - 1].technology + ' type="button" class="showmore-btn" onclick=showMoretutorials("' + technologySqueezed + '") >Show More</button>' +
            '</div>';
    } else {
        sessionStorage.setItem("display-count-" + technologySqueezed, currDisplayCount);
    }

    innerHTML = innerHTML + '</div>';
    //document.getElementById("tutorialDivId").innerHTML = innerHTML;
    document.getElementById("tutorialListDivId").style.display = "block";
    document.getElementById("tutorialListInnerDivId").innerHTML = innerHTML + "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>";
    populateTutorialDropDown();

}

function getItemAfterURLHistUpd(itemStr) {
    let path = window.location.pathname;
    let myUrl = path.substring(0, path.indexOf('/', path.indexOf(the.hostnm)) + 1) + "topics/" + itemStr;


    const nextURL = myUrl;
    const nextTitle = 'Code Helper';
    const nextState = {
        lasturl: window.location.href
    };

    // This will create a new entry in the browser's history, without reloading
    window.history.pushState(nextState, nextTitle, nextURL);
    document.getElementById("tutorialDivId").style.display = "block";
    document.getElementById("tutorialEditDivId").style.display = "block";
    document.getElementById("mainContainer").style.width = "100%";
    document.getElementById("tutorialEditDivId").style.width = "20%";
    document.getElementById("tutorialListDivId").style.width = "";
    document.getElementById("tutorialEditDivId").innerHTML = "";

    getTutorial(itemStr);
}

function handleShowToggle(checkbox) {
    var categorySqueezed = checkbox.dataset.cat;
    categorySqueezed = categorySqueezed.replaceAll(' ', '');

    var catCards = document.getElementsByClassName(categorySqueezed);

    if (checkbox.checked == false) {
        //document.getElementsByClassName('appBanner')[0].style.visibility = 'hidden';	

        for (var i = 0; i < catCards.length; i++) {
            //if (i > 1){
            catCards[i].style.display = 'none';
            //}
        }
    } else {
        for (var i = 0; i < catCards.length; i++) {
            //if (i > 1){
            catCards[i].style.display = 'block';
            //}
        }
    }
}

function goToHome() {

    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1)
    myUrl = myUrl + "?target=home";
    window.location.href = myUrl;
}

function goToTutorial() {

    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1)
    myUrl = myUrl + "?target=tutorial";
    window.location.href = myUrl;
}

function goToProjectscanner() {

    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1)
    myUrl = myUrl + "?target=projectscanner";
    window.location.href = myUrl;
}

function goToFilescanner() {

    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1)
    myUrl = myUrl + "?target=filescanner";
    window.location.href = myUrl;
}

function goToHowToVideos() {

    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1)
    myUrl = myUrl + "?target=howto";
    window.location.href = myUrl;
}

function goToContactUs() {

    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1)
    myUrl = myUrl + "?target=contactus";
    window.location.href = myUrl;
}

function goToLogin() {

    var path = window.location.pathname;
    sessionStorage.setItem("lastUrl", window.location.href);
    var myUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1)
    myUrl = myUrl + "?target=login";
    window.location.href = myUrl;
}

function goToHelpTopics() {

    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1)
    myUrl = myUrl + "?target=HelpTopics";
    window.location.href = myUrl;
}


function populateStoredProjectList() {

    /*
    REF: https://www.w3schools.com/howto/howto_js_collapsible.asp
    https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible
    */

    var innerHTML = '<div class="headerDivCls">Saved projects </div>';

    var tf = JSON.parse(sessionStorage.getItem("SavedProjectsList"));

    if (tf == null) {
        return;
    }
    var rows = JSON.parse(tf);
    var tempInnerHTML = document.getElementById("savedProjectList").innerHTML;
    tempInnerHTML = tempInnerHTML.trim();

    if (rows.length > 0 && tempInnerHTML != "") {
        //console.log(rows.length);
        //console.log(document.getElementById("savedProjectList").innerHTML);
        return;
    }


    var arr = [];

    for (var i = 0; i < rows.length; i++) {
        var myLanguage = rows[i].language;
        var myTechnology = rows[i].technology;
        var myProjectName = rows[i].project_name;
        var myProjectDetails = rows[i].project_details;
        var myProjectPath = rows[i].project_path;
        var myProjectFiles = JSON.parse(rows[i].project_files);
        var myProjectId = rows[i].project_id;


        var tf = JSON.parse(sessionStorage.getItem("LanguageForFileExtension"));



        var lookup = {};
        var uniqueExtensions = [];
        var extensionHTML = "";
        for (k = 0; k < myProjectFiles.length; k++) {
            var fileName = myProjectFiles[k][1];
            var a = fileName.split(".");
            var fileExtension = a[1];

            if (fileExtension == undefined) {
                continue;
            }

            var filteredRows = JSON.parse(tf).filter(function (entry) {
                var evalStr = entry.fileextension;
                return evalStr.toUpperCase() === fileExtension.toUpperCase();
            });

            if (filteredRows.length == 0) {
                //Go to next file
                continue;
            }
            if (!(fileExtension in lookup)) {
                lookup[fileExtension] = 1;
                if (fileExtension == undefined) {
                    continue;
                }
                uniqueExtensions.push(fileExtension);
                extensionHTML = extensionHTML + '<span class="dot">' + fileExtension + '</span>'
            }

        }

        innerHTML = innerHTML + '<div type="button" class="collapsible" style="height:auto; " onclick="toggleCollapse(this)"> <div class="projectNameNTech">' + myProjectName + '<hr> ' + myLanguage;
        if (myTechnology != "") {
            innerHTML = innerHTML + ', ' + myTechnology;
        }

        innerHTML = innerHTML + '</div>' + extensionHTML + "</div>";

        //Display the files in the output area

        var innerHTML = innerHTML + '<div class="content">' +
            '<button class="buttonCls" type="button" style="float: right" onclick="editProjectDetails(' + myProjectId + ')">Edit</button>' +
            '<div style="margin-top: 5px;">' +
            '<table class="ProjectPropertiesTable">' +
            '<tr class="ProjectPropertiesTR"><td style="background-color: #F1F1F1" >Language </td>' + '<td class="ProjectPropertiesTD"><text>' + myLanguage + '</text>' + '</td></tr>' +
            '<tr class="ProjectPropertiesTR"><td style="background-color: #F1F1F1">Technology</td>' + '<td class="ProjectPropertiesTD"><text>' + myTechnology + '</text>' + '</td></tr>' +
            '<tr class="ProjectPropertiesTR"><td style="background-color: #F1F1F1">Project name</td>' + '<td class="ProjectPropertiesTD"><text>' + myProjectName + '</text>' + '</td></tr>' +
            '<tr class="ProjectPropertiesTR"><td style="background-color: #F1F1F1">Project path</td>' + '<td class="ProjectPropertiesTD"><text>' + myProjectPath + '</text>' + '</td></tr>' +
            '</table>' +
            '</div>' +
            '<br>' + 'Details:' + '<br>' +
            '<textarea id="projectDetailsId" class = "fullWidth tiny" rows="5">' + myProjectDetails + '</textarea>' +
            '<br><input id="picker" type="file" onchange="uploadFiles(this)" webkitdirectory multiple />' +
            ' <div  class="ProjectFilesListDiv">';

        for (var l = 0; l < myProjectFiles.length; l++) {

            var hlpCode = myProjectFiles[l][1];
            var hlpCdId = myProjectFiles[l][1];
            var hlpCdGrp = myProjectFiles[l][0];

            //if ((hlpCdGrp == null) ||(hlpCdGrp == "")){
            //	 hlpCdGrp = "Others";
            //}



            if (l > 0) {
                if (myProjectFiles[l][0] != myProjectFiles[l - 1][0]) {
                    //first item in the group****Need to close previous li and open li for the new group
                    innerHTML = innerHTML + '</ul> </li>';
                    innerHTML = innerHTML + '<li class="day">' + '<i style = "color: black; font-style: normal; ">' + hlpCdGrp + '</i>' + ' <ul style="padding: 0; padding-left: 10px; list-style-type: none; margin: 0; ">';
                    innerHTML = innerHTML + '<li>' + '<a href ="#" class="fileLink" onclick="fileClicked(' + "'" + hlpCdId + "'" + ');return false;" >' + hlpCode + "</a>" + '</li>';
                } else {
                    //another item in the previous group
                    innerHTML = innerHTML + '<li>' + '<a href ="#" class="fileLink" onclick="fileClicked(' + "'" + hlpCdId + "'" + ');return false;" >' + hlpCode + "</a>" + '</li>';
                }
            } else if (l == 0) {
                //First item in the list
                innerHTML = innerHTML + '<li class="day">' + '<i style = "color: black">' + hlpCdGrp + '</i>' + ' <ul style="padding: 0; padding-left: 10px; list-style-type: none; margin: 0; ">' + '<li>' + '<a href ="#" class="fileLink" onclick="fileClicked(' + "'" + hlpCdId + "'" + ');return false;" >' + hlpCode + "</a>" + '</li>';
            }

            //List is over
            if (l == myProjectFiles.length - 1) {
                innerHTML = innerHTML + '</ul> </li></div> </div>';
            }
        }

    }

    //document.getElementById("savedProjectList").innerHTML = innerHTML;

    $('li > ul').each(function (i) {
        // Find this list's parent list item.
        var parentLi = $(this).parent('li');

        // Style the list item as folder.
        parentLi.addClass('folder');

        // Temporarily remove the list from the
        // parent list item, wrap the remaining
        // text in an anchor, then reattach it.
        var subUl = $(this).remove();
        parentLi.wrapInner('<a/>').find('a').click(function () {
            // Make the anchor toggle the leaf display.
            subUl.toggle();
        });
        parentLi.append(subUl);
    });

    // Hide all lists except the outermost.
    $('ul ul').hide();

}

function editProjectDetails(projectId) {
    the.idOfProjectToUpdate = projectId;

    document.getElementById("StoredPrjDivId").style.display = "none";
    document.getElementById("AddNewProjectDivId").style.display = "block";
    document.getElementById("saveProjectMsg").innerHTML = "";
    var tf = JSON.parse(sessionStorage.getItem("SavedProjectsList"));
    var rows = JSON.parse(tf);

    var arr = [];
    var innerHTML = "<div>";

    for (var i = 0; i < rows.length; i++) {
        if (rows[i].project_id == projectId) {
            var myLanguage = rows[i].language;
            var myTechnology = rows[i].technology;
            var myProjectName = rows[i].project_name;
            var myProjectDetails = rows[i].project_details;
            var myProjectPath = rows[i].project_path;
            var myProjectFiles = JSON.parse(rows[i].project_files);

            document.getElementById("project-language-box").value = myLanguage;
            document.getElementById("project-sub-tech-box").value = myTechnology;
            document.getElementById("project-name-box").value = myProjectName;
            document.getElementById("project-path-box").value = myProjectPath;
            //console.log("Setting project details" + myProjectDetails);
            //document.getElementById("project_details").value = myProjectDetails;
            tinyMCE.get('project_details').setContent(myProjectDetails);




            for (var l = 0; l < myProjectFiles.length; l++) {

                var hlpCode = myProjectFiles[l][1];
                var hlpCdId = myProjectFiles[l][1];
                var hlpCdGrp = myProjectFiles[l][0];

                //if ((hlpCdGrp == null) ||(hlpCdGrp == "")){
                //	 hlpCdGrp = "Others";
                //}



                if (l > 0) {
                    if (myProjectFiles[l][0] != myProjectFiles[l - 1][0]) {
                        //first item in the group****Need to close previous li and open li for the new group
                        innerHTML = innerHTML + '</ul> </li>';
                        innerHTML = innerHTML + '<li class="day">' + '<i style = "color: black; font-style: normal; ">' + hlpCdGrp + '</i>' + ' <ul style="padding: 0; padding-left: 10px; list-style-type: none; margin: 0; ">';
                        innerHTML = innerHTML + '<li>' + '<a href ="#" class="fileLink" onclick="fileClicked(' + "'" + hlpCdId + "'" + ');return false;" >' + hlpCode + "</a>" + '</li>';
                    } else {
                        //another item in the previous group
                        innerHTML = innerHTML + '<li>' + '<a href ="#" class="fileLink" onclick="fileClicked(' + "'" + hlpCdId + "'" + ');return false;" >' + hlpCode + "</a>" + '</li>';
                    }
                } else if (l == 0) {
                    //First item in the list
                    innerHTML = innerHTML + '<li class="day">' + '<i style = "color: black">' + hlpCdGrp + '</i>' + ' <ul style="padding: 0; padding-left: 10px; list-style-type: none; margin: 0; ">' + '<li>' + '<a href ="#" class="fileLink" onclick="fileClicked(' + "'" + hlpCdId + "'" + ');return false;" >' + hlpCode + "</a>" + '</li>';
                }

                //List is over
                if (l == myProjectFiles.length - 1) {
                    innerHTML = innerHTML + '</ul> </li></div>';
                }
            }


            the.newProjectContent = myProjectFiles;
            document.getElementById("NewProjectStructureDisplayId").innerHTML = innerHTML;

            $('li > ul').each(function (i) {
                // Find this list's parent list item.
                var parentLi = $(this).parent('li');

                // Style the list item as folder.
                parentLi.addClass('folder');

                // Temporarily remove the list from the
                // parent list item, wrap the remaining
                // text in an anchor, then reattach it.
                var subUl = $(this).remove();
                parentLi.wrapInner('<a/>').find('a').click(function () {
                    // Make the anchor toggle the leaf display.
                    subUl.toggle();
                });
                parentLi.append(subUl);
            });

            // Hide all lists except the outermost.
            $('ul ul').hide();

            return;
        }
    }

}

function toggleCollapse(el) {
    //console.log("Div clicked");

    el.classList.toggle("active");
    var content = el.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }

}

function myTopNavFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function login() {
    document.getElementById("loginerrormsg").innerHTML = "<font color = red>" + " " + "</font> ";
    StrEmail = document.getElementById("emailid").value
    StrPass = document.getElementById("password").value

    var StrRemember = "Y"

    var StrFunction = "login";

    var error_message = "";

    if (StrEmail.trim() == "") {
        error_message = "Please enter the email id";
        document.getElementById("loginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var atpos = StrEmail.indexOf("@");
    var dotpos = StrEmail.lastIndexOf(".");

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= StrEmail.length) {
        error_message = "Email id is not valid";
        document.getElementById("loginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(StrEmail))) {
        error_message = "Email id is not valid";
        document.getElementById("loginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass.trim() == "") {
        error_message = "Please provide password";
        document.getElementById("loginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        data: { usremail: StrEmail, usrpassword: StrPass, usrremember: StrRemember, usrfunction: StrFunction },
        type: 'POST',
        dataType: 'json',
        success: function (retstatus) {
            //alert("Inside login success retstatus =" + retstatus);
            //console.log( "Inside login success retstatus =" + retstatus);

            if (retstatus.substring(0, 2) == "6S") {
                document.getElementById("loginerrormsg").innerHTML = "Login Successful"

                loggedIn = "Y";
                document.getElementById("loginLinkId").style.display = "none";
                document.getElementById("logoutLinkId").style.display = "block";
                document.getElementById("profileLinkId").style.display = "block";
                //Show("projectscanner");

                localStorage.setItem("userLoggedIn", "y");
                localStorage.setItem("userLvl", retstatus.substring(2, 3));
                sessionStorage.setItem("userdata", retstatus.substring(3));
                localStorage.setItem("userEmail", StrEmail);
                getStoredProjectList();
                var path = window.location.pathname;
                var dummyUrl = path.substring(0, path.indexOf('/', path.indexOf('readernook')) + 1)

                var myUrl = window.location.protocol + "//" + window.location.host +
                dummyUrl;

                //var lastUrl = sessionStorage.getItem("lastUrl");
                lastUrl = document.referrer;

                if (lastUrl == null) {
                    //lastUrl = myUrl + "?target=" + "home"
                    lastUrl = myUrl + "home";
                }else{
                    if (lastUrl.indexOf('readernook') > 0){
                        if (lastUrl.indexOf('login') > 0){
                            lastUrl = myUrl + "home";
                        }
                    }else{
                        lastUrl = myUrl + "home";
                    }
                }
                window.open(lastUrl, "_self");

                //window.open(myUrl + "?target=" + "projectscanner", "_self");


                //document.getElementById("addNewProjBtnId").style.display = "block";
                //localStorage.setItem("userLoggedIn", "y");

            }

            else {
                document.getElementById("loginerrormsg").innerHTML = "<font color = #cc0000>" + retstatus + "</font> ";
            }
        },
        error: function (xhr, status, error) {
            //alert(xhr);
            console.log(error);
            console.log(xhr);
        }
    });
}

function loginWithoutRefresh() {
    document.getElementById("Subloginerrormsg").innerHTML = "<font color = red>" + " " + "</font> ";
    StrEmail = document.getElementById("Subemailid").value
    StrPass = document.getElementById("Subpassword").value

    var StrRemember = "Y"

    var StrFunction = "login";

    var error_message = "";

    if (StrEmail.trim() == "") {
        error_message = "Please enter the email id";
        document.getElementById("Subloginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var atpos = StrEmail.indexOf("@");
    var dotpos = StrEmail.lastIndexOf(".");

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= StrEmail.length) {
        error_message = "Email id is not valid";
        document.getElementById("Subloginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(StrEmail))) {
        error_message = "Email id is not valid";
        document.getElementById("Subloginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass.trim() == "") {
        error_message = "Please provide password";
        document.getElementById("Subloginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    $.ajax({
        url: the.hosturl + '/php/process.php',
        data: { usremail: StrEmail, usrpassword: StrPass, usrremember: StrRemember, usrfunction: StrFunction },
        type: 'POST',
        dataType: 'json',
        success: function (retstatus) {
            //alert(substr(retstatus,4));
            //alert("Inside login loginWithoutRefresh retstatus =" + retstatus);
            //console.log( "Inside loginWithoutRefresh success retstatus =" + retstatus);
            if (retstatus.substring(0, 2) == "6S") {
                //document.getElementById("Subloginerrormsg").innerHTML = "Login Successful"

                loggedIn = "Y";
                document.getElementById("loginLinkId").style.display = "none";
                document.getElementById("SubloginDivId").style.display = "none";
                document.getElementById("logoutLinkId").style.display = "block";
                document.getElementById("profileLinkId").style.display = "block";
                document.getElementById("helpAddUpdateMsg").innerHTML = "";
                //Show("projectscanner");

                localStorage.setItem("userLoggedIn", "y");
                localStorage.setItem("userLvl", retstatus.substring(2, 3));

            }

            else {
                document.getElementById("Subloginerrormsg").innerHTML = "<font color = orange>" + retstatus + "</font> ";
            }
        },
        error: function (xhr, status, error) {
            alert(xhr);
            console.log(error);
            console.log(xhr);
        }
    });
}

function SubshowCreateAccount() {
    document.getElementById("SubloginSecDivId").style.display = "none"
    document.getElementById("SubregisterSecDivId").style.display = "block"
}

function SubshowLogin() {
    document.getElementById("SubregisterSecDivId").style.display = "none"
    document.getElementById("SubloginSecDivId").style.display = "block"
}

function Logout() {
    StrFunction = "logout";
    error_message = "";

    $.ajax({
        url: the.hosturl + '/php/process.php',
        data: { usrfunction: StrFunction },
        type: 'POST',
        dataType: 'json',
        success: function (retstatus) {
            //alert(substr(retstatus,4));

            if (retstatus == "S") {
                loggedIn = "N";
                //if (!onMobileBrowser()) {
                //    document.getElementById("loginLinkId").style.display = "block";
                //}
                document.getElementById("loginLinkId").style.display = "block";
                document.getElementById("logoutLinkId").style.display = "none";
                document.getElementById("profileLinkId").style.display = "none";
                localStorage.setItem("userLoggedIn", "n");
                sessionStorage.setItem("SavedProjectsList", null);
                sessionStorage.setItem("userdata", null);
                //Show("projectscanner");

                //var myUrl = window.location.protocol + "//" + window.location.host +	window.location.pathname ;
                //window.open(myUrl + "?target=" + "projectscanner", "_self");	

                window.open(window.location.href, "_self");
            }

            else {
                //console.log(retstatus);	
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
            console.log(xhr);
        }
    });
}

function cookieAccepted() {
    document.getElementById("cookie-div-id").style.display = "none"
    localStorage.setItem("cookieAccepted", "y");
}

function register() {

    document.getElementById("registererrormsg").innerHTML = "<font color = orange>" + " " + "</font> ";

    var StrEmail = document.getElementById("registeremailid").value
    var StrName = document.getElementById("registerusname").value
    var StrPass = document.getElementById("registerpassword").value
    var StrPassRe = document.getElementById("registerpasswordre").value

    var StrFunction = "register";

    var error_message = "";

    if (StrName.trim() == "") {
        error_message = "Please provide your name";
        document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrEmail.trim() == "") {
        error_message = "Please enter the email id";
        document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var atpos = StrEmail.indexOf("@");
    var dotpos = StrEmail.lastIndexOf(".");

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= StrEmail.length) {
        error_message = "Email id is not valid";
        document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(StrEmail))) {
        error_message = "Email id is not valid";
        document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass.trim() == "") {
        error_message = "Please provide password with minimum 8 character length";
        document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass.length < 8) {
        error_message = "Please provide password with minimum 8 character length";
        document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass != StrPassRe) {
        error_message = "Entered passwords do not match";
        document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var StrAddress = "";

    $.ajax({
        url: the.hosturl + '/php/process.php',
        data: { usremail: StrEmail, usrpassword: StrPass, usrfullname: StrName, usraddress: StrAddress, usrfunction: StrFunction },
        type: 'POST',
        dataType: 'JSON',
        success: function (retstatus) {
            //alert(msg);
            //console.log(retstatus);

            if (retstatus == "S") {
                document.getElementById("registererrormsg").innerHTML = "Registration completed successfully. Please check your email for account activation.";
            }

            if (retstatus == "F") {
                document.getElementById("registererrormsg").innerHTML = "There was a problem in completing registration. Issue has been logged and will be resolved soon. Please try again later";

            }

            if ((retstatus != "S") && (retstatus != "F")) {
                document.getElementById("registererrormsg").innerHTML = "<font color = orange>" + retstatus + "</font> ";

            }


        },
        error: function (xhr, status, error) {
            console.log(error);
            console.log(xhr);
            console.log(status);
            document.getElementById("registererrormsg").innerHTML = "There was a problem in completing registration. Issue has been logged and will be resolved soon. Please try again later";
        }
    });
}

function Subregister() {
    document.getElementById("Subregistererrormsg").innerHTML = "<font color = orange>" + " " + "</font> ";

    var StrEmail = document.getElementById("Subregisteremailid").value
    var StrName = document.getElementById("Subregisterusname").value
    var StrPass = document.getElementById("Subregisterpassword").value
    var StrPassRe = document.getElementById("Subregisterpasswordre").value

    var StrFunction = "register";

    var error_message = "";

    if (StrName.trim() == "") {
        error_message = "Please provide your name";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrEmail.trim() == "") {
        error_message = "Please enter the email id";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var atpos = StrEmail.indexOf("@");
    var dotpos = StrEmail.lastIndexOf(".");

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= StrEmail.length) {
        error_message = "Email id is not valid";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(StrEmail))) {
        error_message = "Email id is not valid";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass.trim() == "") {
        error_message = "Please provide password with minimum 8 character length";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass.length < 8) {
        error_message = "Please provide password with minimum 8 character length";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass != StrPassRe) {
        error_message = "Entered passwords do not match";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var StrAddress = "";

    $.ajax({
        url: the.hosturl + '/php/process.php',
        data: { usremail: StrEmail, usrpassword: StrPass, usrfullname: StrName, usraddress: StrAddress, usrfunction: StrFunction },
        type: 'POST',
        dataType: 'JSON',
        success: function (retstatus) {
            //alert(msg);
            //console.log(retstatus);

            if (retstatus == "S") {
                document.getElementById("Subregistererrormsg").innerHTML = "Registration completed successfully. Please check your email for account activation.";
            }

            if (retstatus == "F") {
                document.getElementById("Subregistererrormsg").innerHTML = "There was a problem in completing registration. Issue has been logged and will be resolved soon. Please try again later";

            }

            if ((retstatus != "S") && (retstatus != "F")) {
                document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + retstatus + "</font> ";

            }


        },
        error: function (xhr, status, error) {
            console.log(error);
            console.log(xhr);
            console.log(status);
            document.getElementById("Subregistererrormsg").innerHTML = "There was a problem in completing registration. Issue has been logged and will be resolved soon. Please try again later";
        }
    });
}

function forgotpw() {
    document.getElementById("forgotpwerrormsg").innerHTML = "<font color = #cc0000>" + " " + "</font> ";

    var StrEmail = document.getElementById("forgotpwemailid").value

    var StrFunction = "forgotpw";

    var error_message = "";


    if (StrEmail.trim() == "") {
        error_message = "Please enter the email id";
        document.getElementById("forgotpwerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var atpos = StrEmail.indexOf("@");
    var dotpos = StrEmail.lastIndexOf(".");

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= StrEmail.length) {
        error_message = "Email id is not valid";
        document.getElementById("forgotpwerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(StrEmail))) {
        error_message = "Email id is not valid";
        document.getElementById("forgotpwerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }


    $.ajax({
        url: the.hosturl + '/php/process.php',
        data: { usremail: StrEmail, usrfunction: StrFunction },
        type: 'POST',
        dataType: 'JSON',
        success: function (retstatus) {
            //alert(msg);
            //console.log(retstatus);

            if (retstatus == "S") {
                document.getElementById("forgotpwerrormsg").innerHTML = "Request processed. Please check your email for password reset link.";
            }

            if (retstatus == "F") {
                document.getElementById("forgotpwerrormsg").innerHTML = "Email id not found";

            }

            if ((retstatus != "S") && (retstatus != "F")) {
                document.getElementById("forgotpwerrormsg").innerHTML = "<font color = red>" + retstatus + "</font> ";

            }


        },
        error: function (xhr, status, error) {
            console.log(error);
            console.log(xhr);
            console.log(status);
            document.getElementById("forgotpwerrormsg").innerHTML = "There was a problem in completing the request. Issue has been logged and will be resolved soon. Please try again later";
        }
    });
}
function contactus() {
    document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + " " + "</font> ";
    var StrEmail = document.getElementById("contactusemailid").value
    var StrName = document.getElementById("contactusname").value
    var StrComment = document.getElementById("contactus_msg").value;

    var StrFunction = "contactus";

    var error_message = "";

    if (StrName.trim() == "") {
        error_message = "Please provide your name";
        document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrEmail.trim() == "") {
        error_message = "Please enter the email id";
        document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var atpos = StrEmail.indexOf("@");
    var dotpos = StrEmail.lastIndexOf(".");

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= StrEmail.length) {
        error_message = "Email id is not valid";
        document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(StrEmail))) {
        error_message = "Email id is not valid";
        document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }



    if (StrComment.trim() == "") {
        error_message = "Please provide message";
        document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    StrComment = StrComment + "<br><br><br>" + window.location.pathname;

    if (the.captcha != document.getElementById("enteredCaptchaText").value) {
        if ((localStorage.getItem("userLoggedIn") == "n") || (localStorage.getItem("userLvl") != "9")) {
            error_message = "Entered code is incorrect";
            document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
            return;
        }
    }
    $.ajax({
        url: the.hosturl + '/php/process.php',
        data: { usrname: StrName, usremail: StrEmail, usrcomment: StrComment, usrfunction: StrFunction },
        type: 'POST',
        dataType: 'json',
        success: function (retstatus) {
            //alert(substr(retstatus,4));
            //console.log(retstatus);
            document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + "Thank you for your message. We will get back to you shortly" + "</font> ";

        },
        error: function (xhr, status, error) {
            //console.log(error);
            //console.log(xhr);
        }
    });
}
function toggleHideLeftParent(elem) {
    //elem.parentElement.classList.toggleClass("panel-hide-left");
    $("#tutorialListDivId").toggle("slide")
}
function printStoryBook(){
    cleanUpExtraBlankLines();
    //alignImages();

    document.body.classList.add('apply-print-image-story-book-style');
    window.print();
}

function copyStoryBookToClipboard(){
    cleanUpExtraBlankLines();
    //alignImages();

    document.body.classList.add('copy-image-story-book-style');
    
    setTimeout(function() {
        copyBodyContent();
        document.body.classList.remove('copy-image-story-book-style');
    }, 10);
    
}

function copyBodyContent() {
    // Create a range object to select the content
    const range = document.createRange();
    // Get the body element
    const body = document.body;
    // Select all the content within the body
    range.selectNode(body);

    // Use the selection object to apply the range
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Execute the copy command
    try {
        document.execCommand('copy');
        alert('Content copied to clipboard with styles!. Paste in Google docs');
    } catch (err) {
        console.error('Failed to copy body content:', err);
    }

    // Optionally, clear the selection
    selection.removeAllRanges();
}

function copyContentWithStyles() {
    // Get the content to be copied
    const content = document.getElementById('tutorialDivId');

    // Create a new div to hold the cloned content
    const clonedContent = content.cloneNode(true);

    // Inline the styles
    inlineStyles(clonedContent);

    // Create a new container for the HTML content
    const container = document.createElement('div');
    container.appendChild(clonedContent);

    // Create a blob from the container's innerHTML
    const blob = new Blob([container.innerHTML], { type: 'text/html' });

    // Copy the HTML to the clipboard
    const data = [new ClipboardItem({ 'text/html': blob })];
    navigator.clipboard.write(data).then(() => {
        alert('Content copied to clipboard with styles!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Function to inline styles
function inlineStyles(element) {
    const computedStyles = window.getComputedStyle(element);

    for (let i = 0; i < computedStyles.length; i++) {
        const key = computedStyles[i];
        element.style[key] = computedStyles.getPropertyValue(key);
    }

    // Inline styles for child elements
    for (let child of element.children) {
        inlineStyles(child);
    }
}


function alignImages(){
    const images = document.querySelectorAll('.image1-desc');
    images.forEach((image, index) => {
        if (index % 2 === 0) {
            image.classList.add('image-left');
        } else {
            image.classList.add('image-right');
        }
    });
}

function cleanUpExtraBlankLines() {
    const imageContainers = document.querySelectorAll('.image1-desc');
    
    imageContainers.forEach(function(imageContainer) {
        const prevElement = imageContainer.previousElementSibling;
        const nextElement = imageContainer.nextElementSibling;

        // Remove empty <p> before the image
        if (prevElement && prevElement.tagName === 'P' && prevElement.textContent.trim() === '') {
            prevElement.remove();
        }

        // Remove empty <p> after the image
        if (nextElement && nextElement.tagName === 'P' && nextElement.textContent.trim() === '') {
            nextElement.remove();
        }
    });
}

function changeMainImage(imageUrl, thumbnail) {
    // Find the closest parent product-container of the clicked thumbnail
    const container = thumbnail.closest('.product-container');
    if (container) {
        // Find the mainImage element inside this product-container
        const mainImage = container.querySelector('#mainImage');
        if (mainImage) {
            mainImage.src = imageUrl; // Update the main image source
        }
    }
}

function onMobileBrowser() {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        return true;
    } else {
        // false for not mobile device
        return false;
    }

}
function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function addImageFrames() {
    document.querySelectorAll(".image1-desc").forEach((container) => {
        // Check if a frame already exists
        let storyImageFrame = container.querySelector(".camera-frame")
        let storyImageResizeHandle = null;

        if (storyImageFrame) {
            storyImageResizeHandle = storyImageFrame.querySelector(".story-image-resize-handle");
        }
        else {
            // Create the camera frame
            storyImageFrame = document.createElement("div");
            storyImageFrame.classList.add("camera-frame");

            // Create the resize handle
            storyImageResizeHandle = document.createElement("div");
            storyImageResizeHandle.classList.add("story-image-resize-handle");

            // Append the resize handle to the frame
            storyImageFrame.appendChild(storyImageResizeHandle);

            // Append the frame to the container
            container.appendChild(storyImageFrame);


            // Initialize frame size to match the parent container
            const parentWidth = container.offsetWidth * 0.99;
            storyImageFrame.style.width = `${parentWidth}px`;
            storyImageFrame.style.height = `${(parentWidth / 16) * 9}px`;
        }


        let isFrameDragging = false;
        let isFrameResizing = false;
        let initialMouseX, initialMouseY, initialFrameX, initialFrameY;
        let initialWidth, initialHeight;

        // Dragging functionality
        storyImageFrame.addEventListener("mousedown", (event) => {
            if (event.target === storyImageResizeHandle) return; // Avoid dragging when resizing

            isFrameDragging = true;
            initialMouseX = event.clientX;
            initialMouseY = event.clientY;
            initialFrameX = storyImageFrame.offsetLeft;
            initialFrameY = storyImageFrame.offsetTop;
        });

        // Resizing functionality
        storyImageResizeHandle.addEventListener("mousedown", (event) => {
            event.preventDefault();
            isFrameResizing = true;
            initialMouseX = event.clientX;
            initialMouseY = event.clientY;
            initialWidth = storyImageFrame.offsetWidth;
            initialHeight = storyImageFrame.offsetHeight;
        });

        document.addEventListener("mousemove", (event) => {
            const storyImageContainerRect = container.getBoundingClientRect();

            // Handle dragging
            if (isFrameDragging) {
                const deltaX = event.clientX - initialMouseX;
                const deltaY = event.clientY - initialMouseY;

                // Constrain within container
                const newLeft = Math.max(
                    0,
                    Math.min(
                        storyImageContainerRect.width - storyImageFrame.offsetWidth,
                        initialFrameX + deltaX
                    )
                );
                const newTop = Math.max(
                    0,
                    Math.min(
                        storyImageContainerRect.height - storyImageFrame.offsetHeight,
                        initialFrameY + deltaY
                    )
                );

                storyImageFrame.style.left = `${newLeft}px`;
                storyImageFrame.style.top = `${newTop}px`;
            }

            // Handle resizing
            if (isFrameResizing) {
                const deltaX = event.clientX - initialMouseX;
                const aspectRatioCheckbox = document.getElementById("toggleAspectRatio");
                let newWidth = initialWidth + deltaX;
                let aspectRatio = aspectRatioCheckbox.checked ?  (16 / 9) : (9 / 16) ; // Check current aspect ratio
                let newHeight = newWidth * aspectRatio;

                // Constrain within container
                if (storyImageFrame.offsetLeft + newWidth > storyImageContainerRect.width) {
                    newWidth = storyImageContainerRect.width - storyImageFrame.offsetLeft;
                    newHeight = newWidth * aspectRatio;
                }
                if (storyImageFrame.offsetTop + newHeight > storyImageContainerRect.height) {
                    newHeight = storyImageContainerRect.height - storyImageFrame.offsetTop;
                    newWidth = newHeight / aspectRatio;
                }
                // Adjust width and maintain 16:9 aspect ratio
                //let newWidth = initialWidth + deltaX;
                //let newHeight = (newWidth / 16) * 9;



                // Constrain within container
                // if (
                //     storyImageFrame.offsetLeft + newWidth >
                //     storyImageContainerRect.width
                // ) {
                //     newWidth =
                //         storyImageContainerRect.width - storyImageFrame.offsetLeft;
                //     newHeight = (newWidth / 16) * 9;
                // }
                // if (
                //     storyImageFrame.offsetTop + newHeight >
                //     storyImageContainerRect.height
                // ) {
                //     newHeight =
                //         storyImageContainerRect.height - storyImageFrame.offsetTop;
                //     newWidth = (newHeight / 9) * 16;
                // }

                storyImageFrame.style.width = `${newWidth}px`;
                storyImageFrame.style.height = `${newHeight}px`;
            }
        });

        // Stop dragging or resizing on mouseup
        document.addEventListener("mouseup", () => {
            isFrameDragging = false;
            isFrameResizing = false;
        });
    });
}

// Function to copy HTML with modified ID to the clipboard
function copyDivHtml(button) {
    //const parentDiv = button.parentElement;
    const parentDiv = button.closest(".image1-desc"); // Finds nearest parent with class 'image1-desc'

    if (parentDiv) {
        // Clone the div
        const clonedDiv = parentDiv.cloneNode(true);

        // Generate a random number and update the ID
        const randomId = `div-${Math.floor(Math.random() * 1_000_000_000)}`;
        clonedDiv.id = randomId;

        // Copy the cloned HTML to the clipboard
        const tempElement = document.createElement('textarea');
        tempElement.value = clonedDiv.outerHTML;
        document.getElementById("htmlDataInsert").value = tempElement.value;
        
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);

        

        //alert(`HTML copied with new ID: ${randomId}`);

    }
}

function copyVideoDivHtml(button) {
    //const parentDiv = button.parentElement;
    const parentDiv = button.closest(".video1-desc"); // Finds nearest parent with class 'image1-desc'

    if (parentDiv) {
        // Clone the div
        const clonedDiv = parentDiv.cloneNode(true);

        // Generate a random number and update the ID
        const randomId = `div-${Math.floor(Math.random() * 1_000_000_000)}`;
        clonedDiv.id = randomId;

        // Copy the cloned HTML to the clipboard
        const tempElement = document.createElement('textarea');
        tempElement.value = clonedDiv.outerHTML;
        document.getElementById("htmlDataInsert").value = tempElement.value;
        
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);       

        //alert(`HTML copied with new ID: ${randomId}`);

    }
}
// Add the "Copy" button to each matching element
function addCopyButtons() {
    const elements = document.querySelectorAll('div.image1-desc');
    elements.forEach(element => {
        // Check if a "Copy" button already exists
        const existingButton = element.querySelector('.copyHtmlButton');
        if (!existingButton) {
            // Create the button
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy HTML';
            copyButton.className = 'copyHtmlButton';
            copyButton.style.marginLeft = '5px';
            copyButton.onclick = function () {
                copyDivHtml(this);
            };

            // Append the button to the element
            element.appendChild(copyButton);
        }else{
            existingButton.onclick = function () {
                copyDivHtml(this);
            };
        }

        let propButton = element.querySelector('.imagePropButton');
        if (!propButton) {
            // Create the button
            propButton = document.createElement('button');
            propButton.textContent = 'Toggle Properties';
            propButton.className = 'imagePropButton';
            propButton.style.marginLeft = '5px';
            propButton.onclick = function () {
                toggleImageProps(this);
            };

            // Append the button to the element
            element.appendChild(propButton);
        }else{
            propButton.onclick = function () {
                toggleImageProps(this);
            };
        }

        let imagePropsDiv = element.querySelector('.image-props');
        if (!imagePropsDiv) {
            imagePropsDiv = document.createElement("div");
            imagePropsDiv.classList.add("image-props");
            const randomId = "img-" + Math.floor(Math.random() * 1000000);

            imagePropsDiv.innerHTML = `
            <label>Animation (Clear if no animation needed):</label>
            <div class="imgPropsInput" contenteditable="true" id="${randomId}-imganimation">Zoom In</div>
            <label>Duration (seconds. Enter if image show duration is to be fixed instead of the preceding text TTS duration):</label>
            <div class="imgPropsInput" contenteditable="true" id="${randomId}-imgduration">0</div>
            <label>Show Avatar for the preceding text duration (y/n):</label>
            <div class="avatarFlgInput" contenteditable="true" id="${randomId}-avatarflag">n</div>
            `;
            element.appendChild(imagePropsDiv);
        }


    });


    //Add buttons for Videos
    const vidEelements = document.querySelectorAll('div.video1-desc');
    vidEelements.forEach(element => {
        // Check if a "Copy" button already exists
        const existingButton = element.querySelector('.copyHtmlButton');
        if (!existingButton) {
            // Create the button
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy HTML';
            copyButton.className = 'copyHtmlButton';
            copyButton.style.marginLeft = '5px';
            copyButton.onclick = function () {
                copyVideoDivHtml(this);
            };

            // Append the button to the element
            element.appendChild(copyButton);
        }else{
            existingButton.onclick = function () {
                copyVideoDivHtml(this);
            };
        }

        let propButton = element.querySelector('.videoPropButton');
        if (!propButton) {
            // Create the button
            propButton = document.createElement('button');
            propButton.textContent = 'Toggle Properties';
            propButton.className = 'videoPropButton';
            propButton.style.marginLeft = '5px';
            propButton.onclick = function () {
                toggleVideoProps(this);
            };

            // Append the button to the element
            element.appendChild(propButton);
        }else{
            propButton.onclick = function () {
                toggleVideoProps(this);
            };
        }

        let videoPropsDiv = element.querySelector('.video-props');
        if (!videoPropsDiv) {
            videoPropsDiv = document.createElement("div");
            videoPropsDiv.classList.add("video-props");
            const randomId = "img-" + Math.floor(Math.random() * 1000000);

            videoPropsDiv.innerHTML = `
            <label>Duration (seconds. Enter if image show duration is to be fixed instead of the preceding text TTS duration):</label>
            <div class="imgPropsInput" contenteditable="true" id="${randomId}-vidduration">0</div>
            <label>Show Avatar for the preceding text duration (y/n):</label>
            <div class="avatarFlgInput" contenteditable="true" id="${randomId}-avatarflag">n</div>
            <label>Loop the video if shorter than preeding text (y/n):</label>
            <div class="loopFlgInput" contenteditable="true" id="${randomId}-loopflag">n</div>
            `;
            element.appendChild(videoPropsDiv);
        }


    });
}

function toggleImageProps(spanElement) {
    // Find the 'div.audio-details' element within the parent element of spanElement
    const parentDiv = spanElement.closest(".image1-desc");;
    const detailsDiv = parentDiv.querySelector('div.image-props');
    
    if (detailsDiv) { // Ensure detailsDiv exists
        // Toggle display style
        if (detailsDiv.style.display === "none" || detailsDiv.style.display === "") {
            detailsDiv.style.display = "block";
            //parentDiv.style.display = "block";
            //parentDiv.style.border = "1px solid #ccc";
        } else {
            detailsDiv.style.display = "none";
            //parentDiv.style.display = "inline";
            //parentDiv.style.border = "none";
        }
    } else {
        console.error("No element with class 'image-props' found within the parent element.");
    }
}

function toggleVideoProps(spanElement) {
    // Find the 'div.audio-details' element within the parent element of spanElement
    const parentDiv = spanElement.closest(".video1-desc");;
    const detailsDiv = parentDiv.querySelector('div.video-props');
    
    if (detailsDiv) { // Ensure detailsDiv exists
        // Toggle display style
        if (detailsDiv.style.display === "none" || detailsDiv.style.display === "") {
            detailsDiv.style.display = "block";
            //parentDiv.style.display = "block";
            //parentDiv.style.border = "1px solid #ccc";
        } else {
            detailsDiv.style.display = "none";
            //parentDiv.style.display = "inline";
            //parentDiv.style.border = "none";
        }
    } else {
        console.error("No element with class 'video-props' found within the parent element.");
    }
}

//DND - Not required but working
// setTimeout(() => {
//     addImageFrames()
// }, 2000);

function logCommon(msg) {
    //console.log("At " + new Date().toLocaleString() + " from common-functions.js " + msg )
}
