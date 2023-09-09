const localizationTextData = {
    English: {
        "Name": "Name",
        "Age": "Age",
        "Address": "Address",
        "All Successors to get properties" : "All Successors to get properties",
        "Add Successor" : "Add Successor",
        "List Properties and Assign Successors" : "List Properties and Assign Successors",
        "Add Property" : "Add Property",
        "Generate Will" : "Generate Will",
        "Start Again" : "Start Again" ,
        "Last Will Generator" : "Last Will Generator" ,
        "Your Information" : "Your Information",
        "Successor Name" : "Successor Name" ,
        "Relation" : "Relation",
        "Property Name" : "Property Name" ,
        "Address/other information" : "Address/other information",
        "Assign Successor" : "Assign Successor",
        "Remove" : "Remove",
        "Percentage Share" : "Percentage Share",
        "Property Details" : "Property Details",
        "Successor" : "Successor",
        "Print" : "Print"

    },
    Hindi: {
        "Name": "नाम",
        "Age": "आयु",
        "Address": "पता",
        "All Successors to get properties" : "उन सभी उत्तराधिकारियों की सूची जिन्हें संपत्ति मिलेगी",
        "Add Successor" : "उत्तराधिकारी जोड़ें",
        "List Properties and Assign Successors" : "सम्पत्तियाँ और उत्तराधिकारी",
        "Add Property" : "संपत्ति सूचना जोड़ें",
        "Generate Will" : "वसीयत तैयार करें",
        "Start Again" : "फिर से शुरू करें" ,
        "Last Will Generator" : "अपनी वसीयत बनायें" ,
        "Your Information": "आपका विवरण",
        "Successor Name" : "उत्तराधिकारी का नाम" ,
        "Relation" : "रिश्ता",
        "Property Name" : "संपत्ति का नाम" ,
        "Address/other information" : "पता/अन्य जानकारी",
        "Assign Successor" : "उत्तराधिकारी नियुक्त करें",
        "Remove" : "हटाएँ",
        "Percentage Share" : "प्रतिशत हिस्सेदारी",
        "Property Details" : "संपत्ति का विवरण",
        "Successor" : "उत्तराधिकारी",
        "Print" : "प्रिंट करें"
    }
    // Add more languages and translations as needed
};

const localizationHTMLData = {
    English: {
        "relType": "<select id='relType'><option>Son</option><option>Daughter</option><option>Wife</option></select> of"
    },
    Hindi: {
        "relType": "<select id='relType'><option>पुत्र</option><option>पुत्री</option><option>पत्नी</option></select> श्री"
    }
    // Add more languages and translations as needed
};

const outputData = {
    English: {
        "vasiyatPart1" : "Last will and testament",
        "vasiyatPart2" : "I ",
        "vasiyatPart2B" : " of ",
        "vasiyatPart2C" : " age ",
        "vasiyatPart2D" : " years ",
        "vasiyatPart2E" : " residing at ",
        "vasiyatPart3" : "hereby write and declare this instrument as my last will in good health and sound mind without any compulsion. ",
        "vasiyatPart4" : "I am the sole owner of my property which is being executed by the said will and I have full right to execute it.  There is no assurance of life, so I want that after my death there should not be any dispute about the successor of my said property, so I execute the property by will during my lifetime. During my lifetime, I will be the owner and possessor of my said property and will be able to use and enjoy it in any way. After my death the following shall be the successor owners of the said property:",
        "vasiyatPart5" : "S.N.",
        "vasiyatPart6" : "Property",
        "vasiyatPart6B" : "Address",
        "vasiyatPart7" : "Share (%)",
        "vasiyatPart8" : "Successor",
        "vasiyatPart9" : " In witness whereof I have signed my name on day_ _ _ _  of month _ _ _ _ _ _ _ _ _ year _ _ _ _ _ _ at location _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ declaring and publishing this instrument as my last will and testament.  ",
        "vasiyatPart9B" : "<br>Signed At:<br>Date:",
        "vasiyatPart10" : "Signature:",
        "vasiyatPart10B" : "(Testator)",
        "vasiyatPart11" : "The said will was signed by ",
        "vasiyatPart12" : "as his last will and testament in the presence of both of us, and we both sign in his presence and in the presence of each other as witnesses.",
         "vasiyatPart13" : "<b>Details of witnesses:</b> <br><br>(1).Signature:<br>Name:<br>Address:<br><br><br><br>(2).Signature:<br>Name:<br>Address:"
    },
    Hindi: {
        "vasiyatPart1" : "वसीयतनामा",
        "vasiyatPart2" : "मैं ",
        "vasiyatPart2B" : " श्री ",
        "vasiyatPart2C" : " आयु ",
        "vasiyatPart2D" : " वर्ष ",
        "vasiyatPart2E" : " निवासी ",
        "vasiyatPart3" : "इस लेख्य पत्र को अपने अंतिम वसीयत के रूप में अपने स्वास्थ्यचित एवं पूर्ण होशहवास में बिना किसी दबाब के एतदद्वारा लिखता हूँ और घोषित करता हूँ। ",
        "vasiyatPart3F" : "इस लेख्य पत्र को अपने अंतिम वसीयत के रूप में अपने स्वास्थ्यचित एवं पूर्ण होशहवास में बिना किसी दबाब के एतदद्वारा लिखती हूँ और घोषित करती हूँ। ",
        "vasiyatPart4" : "मेरी संपत्ति जिसका निष्पादन उक्त वसीयत द्वारा किया जा रहा है उसका मैं एकमात्र स्वामी हूँ व उसके निष्पादन का मुझे पूर्ण अधिकार है।  जीवन का कोई भरोसा नहीं है अतः मैं चाहता हूँ की मेरी मृत्यु के बाद मेरी उक्त संपत्ति के उत्तराधिकारी के बारे में किसी प्रकार का विवाद न हो इसलिए मेरे जीवन काल में ही वसीयत द्वारा संपत्ति का निष्पादन करता हूँ। मेरे जीवन काल में मेरी उक्त संपत्ति का मैं स्वयं मालिक व काबिज रहूंगा तथा किसी भी प्रकार से उपयोग व उपभोग कर सकूंगा।  मेरी मृत्यु के बाद उक्त संपत्ति के निम्नानुसार उत्तराधिकारी मालिक होंगे :",
        "vasiyatPart4F" : "मेरी संपत्ति जिसका निष्पादन उक्त वसीयत द्वारा किया जा रहा है उसकी मैं एकमात्र स्वामी हूँ व उसके निष्पादन का मुझे पूर्ण अधिकार है।  जीवन का कोई भरोसा नहीं है अतः मैं चाहती हूँ की मेरी मृत्यु के बाद मेरी उक्त संपत्ति के उत्तराधिकारी के बारे में किसी प्रकार का विवाद न हो इसलिए मेरे जीवन काल में ही वसीयत द्वारा संपत्ति का निष्पादन करती हूँ। मेरे जीवन काल में मेरी उक्त संपत्ति की मैं स्वयं मालिक व काबिज रहूंगी तथा किसी भी प्रकार से उपयोग व उपभोग कर सकूंगी।  मेरी मृत्यु के बाद उक्त संपत्ति के निम्नानुसार उत्तराधिकारी मालिक होंगे :",
        "vasiyatPart5" : "क्रं सं",
        "vasiyatPart6" : "संपत्ति",
        "vasiyatPart6B" : "निवासी",
        "vasiyatPart7" : "प्रतिशत (%)",
        "vasiyatPart8" : "उत्तराधिकारी",
        "vasiyatPart9" : " उपर्युक्त के साक्ष्य स्वरुप मैंने आज दिनांक_ _ _ _  माह _ _ _ _ _ _ _ _ _ सन _ _ _ _ _ _ को _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ नगर में अपने हस्ताक्षर कर दिए हैं।  ",
        "vasiyatPart9B" : "<br>स्थान:<br>दिनांक:",
        "vasiyatPart10" : "हस्ताक्षर:",
        "vasiyatPart10B" : "(वसीयतकर्ता)",
        "vasiyatPart11" : "उक्त इच्छा-पत्र पर ",
        "vasiyatPart12" : "द्वारा अपने अंतिम इच्छा-पत्र और वसीयत के रुप मे हम दोनो की एक साथ उपस्थिति मे हस्ताक्षर किया गया, और हम दोनो उनकी उपस्थिति में और एक दूसरे की उपस्थिति मे साक्षियों के रूप मे हस्ताक्षर कर रहे हैं।",
        "vasiyatPart13" : "<b>साक्षियों का विवरण:</b> <br><br>(1).हस्ताक्षर:<br>नाम:<br>पता:<br><br><br><br>(2).हस्ताक्षर:<br>नाम:<br>पता:"

    }
}

let vasiyatPart12_E_F = "as her last will and testament in the presence of both of us, and we both sign in her presence and in the presence of each other as witnesses.";
let vasiyatPart12_E_M  = "as his last will and testament in the presence of both of us, and we both sign in his presence and in the presence of each other as witnesses.";

let vasiyatPart3_H_M = "इस लेख्य पत्र को अपने अंतिम वसीयत के रूप में अपने स्वास्थ्यचित एवं पूर्ण होशहवास में बिना किसी दबाब के एतदद्वारा लिखता हूँ और घोषित करता हूँ। ";
let vasiyatPart3_H_F = "इस लेख्य पत्र को अपने अंतिम वसीयत के रूप में अपने स्वास्थ्यचित एवं पूर्ण होशहवास में बिना किसी दबाब के एतदद्वारा लिखती हूँ और घोषित करती हूँ। ";
let vasiyatPart4_H_M = "मेरी संपत्ति जिसका निष्पादन उक्त वसीयत द्वारा किया जा रहा है उसका मैं एकमात्र स्वामी हूँ व उसके निष्पादन का मुझे पूर्ण अधिकार है।  जीवन का कोई भरोसा नहीं है अतः मैं चाहता हूँ की मेरी मृत्यु के बाद मेरी उक्त संपत्ति के उत्तराधिकारी के बारे में किसी प्रकार का विवाद न हो इसलिए मेरे जीवन काल में ही वसीयत द्वारा संपत्ति का निष्पादन करता हूँ। मेरे जीवन काल में मेरी उक्त संपत्ति का मैं स्वयं मालिक व काबिज रहूंगा तथा किसी भी प्रकार से उपयोग व उपभोग कर सकूंगा।  मेरी मृत्यु के बाद उक्त संपत्ति के निम्नानुसार उत्तराधिकारी मालिक होंगे :";
let vasiyatPart4_H_F = "मेरी संपत्ति जिसका निष्पादन उक्त वसीयत द्वारा किया जा रहा है उसकी मैं एकमात्र स्वामी हूँ व उसके निष्पादन का मुझे पूर्ण अधिकार है।  जीवन का कोई भरोसा नहीं है अतः मैं चाहती हूँ की मेरी मृत्यु के बाद मेरी उक्त संपत्ति के उत्तराधिकारी के बारे में किसी प्रकार का विवाद न हो इसलिए मेरे जीवन काल में ही वसीयत द्वारा संपत्ति का निष्पादन करती हूँ। मेरे जीवन काल में मेरी उक्त संपत्ति की मैं स्वयं मालिक व काबिज रहूंगी तथा किसी भी प्रकार से उपयोग व उपभोग कर सकूंगी।  मेरी मृत्यु के बाद उक्त संपत्ति के निम्नानुसार उत्तराधिकारी मालिक होंगे :";


// let vasiyatPart1 = "वसीयतनामा";
// let vasiyatPart2 = "मैं ";
// let vasiyatPart3 = "इस लेख्य पत्र को अपने अंतिम वसीयत के रूप में अपने स्वास्थ्यचित एवं पूर्ण होशहवास में बिना किसी दबाब के एतदद्वारा लिखता हूँ और घोषित करता हूँ। ";
// let vasiyatPart4 = "मेरी संपत्ति जिसका निष्पादन उक्त वसीयत द्वारा किया जा रहा है उसका मैं एकमात्र स्वामी हूँ व उसके निष्पादन का मुझे पूर्ण अधिकार है।  जीवन का कोई भरोसा नहीं है अतः मैं चाहता हूँ की मेरी मृत्यु के बाद मेरी उक्त संपत्ति के उत्तराधिकारी के बारे में किसी प्रकार का विवाद न हो इसलिए मेरे जीवन काल में ही वसीयत द्वारा संपत्ति का निष्पादन करता हूँ। मेरे जीवन काल में मेरी उक्त संपत्ति का मैं स्वयं मालिक व काबिज रहूंगा तथा किसी भी प्रकार से उपयोग व उपभोग कर सकूंगा।  मेरी मृत्यु के बाद उक्त संपत्ति के निम्नानुसार उत्तराधिकारी मालिक होंगे :";
// let vasiyatPart5 = "क्रं सं";
// let vasiyatPart6 = "संपत्ति";
// let vasiyatPart6B = "निवासी";
// let vasiyatPart7 = "प्रतिशत (%)";
// let vasiyatPart8 = "उत्तराधिकारी";
// let vasiyatPart9 = " उपर्युक्त के साक्ष्य स्वरुप मैंने आज दिनांक_ _ _ _  माह _ _ _ _ _ _ _ _ _ सन _ _ _ _ _ _ को _ _ _ _ _ _ _ _ _ के दिन _ _ _ _ _ _ _ _ _ _ _ _ _ _ नगर में अपने हस्ताक्षर कर दिए हैं।  ";
// let vasiyatPart9B = "<br>स्थान:<br>दिनांक:";
// let vasiyatPart10 = "हस्ताक्षर:";
// let vasiyatPart10B = "(वसीयतकर्ता)";
// let vasiyatPart11 = "उक्त इच्छा-पत्र पर ";
// let vasiyatPart12 = "द्वारा अपने अंतिम इच्छा-पत्र और वसीयत के रुप मे हम दोनो की एक साथ उपस्थिति मे हस्ताक्षर किया गया, और हम दोनो उनकी उपस्थिति में और एक दूसरे की उपस्थिति मे साक्षियों के रूप मे हस्ताक्षर कर रहे हैं।";
// let vasiyatPart13 = "<b>साक्षियों का विवरण :</b> <br><br>(1).हस्ताक्षर:<br>नाम:<br>पता:<br><br><br><br>(2).हस्ताक्षर:<br>नाम:<br>पता:";




let SuccessorCount = 0;
let propertyCount = 0;

setTimeout(() => {
    $(".printBtnDivCls").hide();
    $(".curvedBox").hide();
    $(".printBtnDivCls").hide();
    $(".commentMsg").hide();
    $("#sndmsgdivid").hide();
    toggleLeftSideMenu("hide");
}, 100);



function updateTextContent(languageCode = "") {
    if (languageCode == ""){
        languageCode = document.getElementById("lang").value
    }
    const elementsWithName = document.querySelectorAll('[name]');
    elementsWithName.forEach(element => {
        const key = element.getAttribute('name');
        if (localizationTextData[languageCode] && localizationTextData[languageCode][key]) {
            element.textContent = localizationTextData[languageCode][key];
        }
    });


    const elementsWithInnHtmlName = document.querySelectorAll('[innHtmlName]');

    elementsWithInnHtmlName.forEach(element => {
        const key = element.getAttribute('innHtmlName');
        if (localizationHTMLData[languageCode] && localizationHTMLData[languageCode][key]) {
            element.innerHTML = localizationHTMLData[languageCode][key];
        }
    });

    try{
        document.getElementById("willContent").style.display = "none";
    }catch(e){

    }
    
}

updateTextContent("Hindi");

function generateWill(){

    let languageCode = document.getElementById("lang").value;

    let willTableHTML = "<table class='willTable'><tr><th style='width:40px'>" + outputData[languageCode]["vasiyatPart5"]  + "</th><th >" +  outputData[languageCode]["vasiyatPart6"] + "</th><th style='width:90px'>" +  outputData[languageCode]["vasiyatPart7"] + "</th><th>" +  outputData[languageCode]["vasiyatPart8"] + "</th></tr>";


    
    let willHTML = "";

    let allProps = document.getElementById("propertyList");

    let propArr = allProps.getElementsByClassName("newProp");

    for (let i = 0; i < propArr.length; i++) {
        let benArr = propArr[i].getElementsByClassName("benDiv");
        for (let j = 0; j < benArr.length; j++) {

            willTableHTML = willTableHTML + "<tr><td>" + (i+j+1) + "</td><td>" + (propArr[i].getElementsByClassName("property"))[0].value + ", " + (propArr[i].getElementsByClassName("address"))[0].value + "</td>";
            willTableHTML = willTableHTML + "<td style='text-align: center;'>" + (benArr[j].getElementsByClassName("percentage"))[0].value + "</td>";
            willTableHTML = willTableHTML + "<td>" + (benArr[j].getElementsByClassName("Successor"))[0].value + "</td></tr>";
            
        }
        
    }
    willTableHTML = willTableHTML + "</table>";

    if (languageCode == "Hindi"){
        if ((document.getElementById("relType").value == "पुत्री") ||
        (document.getElementById("relType").value == "पत्नी") ){
            outputData[languageCode]["vasiyatPart3"] = vasiyatPart3_H_F;    
            outputData[languageCode]["vasiyatPart4"] = vasiyatPart4_H_F;
    
        }else{
            outputData[languageCode]["vasiyatPart3"] = vasiyatPart3_H_M;    
            outputData[languageCode]["vasiyatPart4"] = vasiyatPart4_H_M;
        }
    }

    if (languageCode == "English"){
        if ((document.getElementById("relType").value == "Daughter") ||
        (document.getElementById("relType").value == "Wife") ){
            outputData[languageCode]["vasiyatPart12"] = vasiyatPart12_E_F;
        }else{
            outputData[languageCode]["vasiyatPart12"] = vasiyatPart12_E_M;
        }
    }

    willHTML = willHTML + "<div class='stamp'><img class='stampImg' src='/readernook/images/20rupay.png'></div>"
    willHTML = willHTML + "<div class='willTitle'>" +  outputData[languageCode]["vasiyatPart1"] + "</div>";

    willHTML = willHTML +  outputData[languageCode]["vasiyatPart2"] +  document.getElementById("username").value + ", "+ (document.getElementById("relType").value). toLowerCase() + outputData[languageCode]["vasiyatPart2B"] +  document.getElementById("userrelationship").value + "," + outputData[languageCode]["vasiyatPart2C"] +  document.getElementById("userage").value + outputData[languageCode]["vasiyatPart2D"] + ", " + outputData[languageCode]["vasiyatPart2E"] + document.getElementById("useraddress").value + ", " +  outputData[languageCode]["vasiyatPart3"] ;
    willHTML = willHTML + "<br><br>" +  outputData[languageCode]["vasiyatPart4"];

    willHTML = willHTML + "<br><br>" + willTableHTML;

    willHTML = willHTML + "<div><br>" +  outputData[languageCode]["vasiyatPart9"];
    willHTML = willHTML + "<div><br><br>" +   outputData[languageCode]["vasiyatPart10"] + "<br>" + document.getElementById("username").value + " " + outputData[languageCode]["vasiyatPart10B"] ;
    willHTML = willHTML + outputData[languageCode]["vasiyatPart9B"] + "<br><br><br></div>";
    willHTML = willHTML + outputData[languageCode]["vasiyatPart11"] + " " + document.getElementById("username").value + " ";
    willHTML = willHTML + outputData[languageCode]["vasiyatPart12"] + "<br><br><br>";
    willHTML = willHTML + outputData[languageCode]["vasiyatPart13"];

    willHTML = willHTML + '<br><br><button name="Print" class="button4"  onclick="printRegular()">Print on Regular Paper</button>';

    willHTML = willHTML + '<button class="button4"  onclick="printStamp()">Print with Margin</button>';

    document.getElementById("willContent").innerHTML = willHTML;
    document.getElementById("willContent").style.display = "block";



     $('html, body').animate({
      scrollTop: $("#willContent").offset().top
     }, 500);
}

function printRegular(){
    $("#willContent").css("margin-top", "0px");
    window.print();
}

function printStamp(){
    $("#willContent").css("margin-top", "400px");
    window.print();
}

function addSuccessor(button) {
    SuccessorCount++;
    const SuccessorList = document.getElementById('Successor-list');
    const newSuccessorInput = document.createElement('div');
    newSuccessorInput.setAttribute("class", "newBen");
    newSuccessorInput.innerHTML = `
        <label name="Successor Name">Successor Name</label>
        <input type="text" class="benName" id="Successor${SuccessorCount}" >

        <label name="Relation">Relation</label>
        <input type="text" class="relation" >

        <label name="Address">Address</label>
        <input type="text" class="address" >
        <button name="Remove" class="deleteParentDiv" onclick="removeParentDiv(this)">Remove</button>

    `;
    SuccessorList.appendChild(newSuccessorInput);

    setTimeout(() => {
        updateTextContent();
    }, 50);
    

    // const select = button.previousElementSibling;
    // const SuccessorInput = document.createElement('input');
    // SuccessorInput.type = 'text';
    // SuccessorInput.placeholder = 'Successor Name';
    // select.appendChild(SuccessorInput);
}

function startAgain(){
    location.reload();
}

function removeParentDiv(btn){
    btn.parentElement.remove();
}
function addProperty() {
    propertyCount++;
    // Add property input fields dynamically
    const propertyList = document.getElementById('propertyList');
    const propertyDiv = document.createElement('div');
    propertyDiv.setAttribute("class", "newProp");
    propertyDiv.innerHTML = `
        <h3 name="Property Details">Property Details</h3>
        <label name="Property Name">Property Name</label>
        <input type="text" class="property" >

        <label name="Address/other information">Address/other information</label>
        <input type="text" class="address" >

        <div class="propertySuccessorList"></div>
        <button name="Assign Successor" type="button" class="button3" onclick="assignSuccessor(this)">Assign Successor</button>
        <button name="Remove" class="deleteParentDiv" onclick="removeParentDiv(this)">Remove</button>

    `;
    propertyList.appendChild(propertyDiv);
    setTimeout(() => {
        updateTextContent();
    }, 50);
}

function assignSuccessor(btn){

    let languageCode = document.getElementById("lang").value;
    let property = btn.parentElement;
     let listA = property.getElementsByClassName("propertySuccessorList");
     let propertySuccessorList = listA[0];
    const SuccessorDiv = document.createElement('div');
    SuccessorDiv.setAttribute("class", "benDiv");

    let allBen = document.getElementById("Successor-list");
    let benArr = allBen.getElementsByClassName("newBen");

    let benOptions = "";

    for (let i = 0; i < benArr.length; i++) {
        benOptions = benOptions + "<option>" + (benArr[i].getElementsByClassName("benName"))[0].value + " ("+ (benArr[i].getElementsByClassName("relation"))[0].value +") " + outputData[languageCode]["vasiyatPart6B"] + ": " + (benArr[i].getElementsByClassName("address"))[0].value + "</option>";
    }
    


    SuccessorDiv.innerHTML = `
        <label name="Successor">Successor</label>
        <select class="Successor" >
            ${benOptions}
        </select>
        
        <br>
        <label name="Percentage Share" >Percentage Share</label>
        <input type="number" class="percentage" >%<br>
        <button name="Remove" class="deleteParentDiv" onclick="removeParentDiv(this)">Remove</button>
    `;
    propertySuccessorList.appendChild(SuccessorDiv);
    setTimeout(() => {
        updateTextContent();
    }, 50);
}
try{
    document.getElementById('willForm').addEventListener('submit', function (e) {
        e.preventDefault();
    });
}catch(e){

}


// document.getElementById('willForm').addEventListener('submit', function (e) {
//     e.preventDefault();
    
//     // Collect user data
//     const name = document.getElementById('name').value;
//     const age = document.getElementById('age').value;
//     const relationship = document.getElementById('relationship').value;
//     const address = document.getElementById('address').value;
//     const kidsList = document.getElementById('kidsList').value;
//     const witness1 = document.getElementById('witness1').value;
//     const witness2 = document.getElementById('witness2').value;

//     // Generate will content (simplified)
//     const willContent = `
//         <h1>Last Will and Testament</h1>
//         <p>I, ${name}, aged ${age}, ${relationship}, residing at ${address}, hereby declare this to be my last will and testament.</p>
//         <h2>Kids and Relatives:</h2>
//         <p>${kidsList}</p>
//         <h2>List Properties and Assign Successors:</h2>
//         <!-- Display property and Successor details here -->
//         <h2>Witnesses:</h2>
//         <p>1. ${witness1}</p>
//         <p>2. ${witness2}</p>
//     `;

//     // Display the generated will
//     document.getElementById('willContent').style.display = 'block';
//     document.getElementById('willContent').innerHTML = willContent;
// });
