function playTTS(element){

    var checkBox = document.getElementById("disableTTS");

    if (checkBox.checked == true){
        return;
    }

    const text = element.dataset.ttstext
    let ttsLanguage = element.dataset.ttslanguage
    let ttsName = element.dataset.ttsname
    let ttsGender = element.dataset.ttsgender

    let ttspitch = element.dataset.ttspitch
    let ttsspeed = element.dataset.ttsspeed

    //const text = "Hello, this is a sample text to be converted to speech.";
    const apiKey = "AIzaSyCgXotl6sz1EgxuZnPOf0W2dC-vNklyD3s"; // Replace with your API key

    //DND - Backup
    //let language = "en-US"; // Language code (e.g., en-US for English)
    //let voiceName = "en-US-Standard-H";
    //let gender = "FEMALE";
    //let audiopitch = "1";

    let language = "en-IN"; // Language code (e.g., en-US for English)
    let voiceName = "en-IN-Standard-C";
    let gender = "MALE";
    let audiopitch = "0";

   
    let audiospeed = "1";

    if (ttsLanguage != null){
      language = ttsLanguage;
    }

    if (ttsName != null){
      voiceName = ttsName;
    }

    if (ttsGender != null){
      gender = ttsGender;
    }

    if (ttspitch != null){
      audiopitch = ttspitch;
    }

    if (ttsspeed != null){
      audiospeed = ttsspeed;
    }

    //const audioPlayer = document.getElementById("audioPlayer");
    const audioPlayer = document.createElement("audio");
    // Construct the API URL with the text, language, and API key
    const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
  
    // Set up the request parameters
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: language, ssmlGender: gender, name: voiceName },
        audioConfig: { audioEncoding: "MP3", pitch: audiopitch, speakingRate: audiospeed },
      }),
    };
  
    // Make the API request
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Get the base64 encoded audio content from the response
        const audioContent = data.audioContent;
  
        // Convert the base64 audio content to a Blob
        const blob = b64toBlob(audioContent, "audio/mp3");
  
        // Create a URL from the Blob and set it as the audio source
        const audioUrl = URL.createObjectURL(blob);
        audioPlayer.src = audioUrl;
  
        // Play the audio
        audioPlayer.play();
      })
      .catch((error) => {
        console.error("Error fetching TTS API:", error);
      });
  }
  
  // Helper function to convert base64 to Blob
  function b64toBlob(base64Data, contentType) {
    contentType = contentType || "";
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }