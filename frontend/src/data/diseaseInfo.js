
const severityLabels = {
  Low: {
    english: "Low",
    marathi: "कमी",
  },

  Medium: {
    english: "Medium",
    marathi: "मध्यम",
  },

  High: {
    english: "High",
    marathi: "जास्त",
  },
};

export const diseaseInfo = {

  // ===========================================================
  // TOMATO EARLY BLIGHT
  // ===========================================================

  Tomato___Early_blight: {

    english: "Tomato Early Blight",

    marathi: "टोमॅटोचा प्रारंभिक करपा रोग",

    category: {
      english: "Fungal Disease",
      marathi: "बुरशीजन्य रोग",
    },

    severity: "Medium",

    cause: {

      english:
        "Early blight is caused by the fungus Alternaria solani. It commonly develops in warm and humid conditions.",

      marathi:
        "हा रोग Alternaria solani या बुरशीमुळे होतो. उष्ण आणि दमट वातावरणात हा रोग वेगाने पसरतो.",

    },

    observation: {

      english:
        "Brown circular spots with concentric rings were detected on the uploaded leaf image.",

      marathi:
        "अपलोड केलेल्या पानावर तपकिरी गोलाकार डाग आणि वर्तुळाकार चिन्हे आढळली.",

    },

    recommendation: {

      english:
        "Immediate treatment is recommended to stop further spread of the disease.",

      marathi:
        "रोगाचा प्रसार थांबवण्यासाठी त्वरित उपचार करण्याची शिफारस केली जाते.",

    },

    symptoms: {

      english: [

        "Brown circular leaf spots",

        "Yellowing around infected area",

        "Premature leaf drop",

      ],

      marathi: [

        "तपकिरी गोलाकार डाग",

        "डागाभोवती पिवळेपणा",

        "पाने लवकर गळणे",

      ],

    },

    spread: {

      english: [

        "Wind",

        "Rain splash",

        "Infected plant debris",

      ],

      marathi: [

        "वारा",

        "पावसाचे पाणी",

        "संक्रमित झाडांचे अवशेष",

      ],

    },

    prevention: {

      english: [

        "Rotate crops",

        "Maintain field hygiene",

        "Avoid overhead irrigation",

      ],

      marathi: [

        "पीक फेरपालट करा",

        "शेत स्वच्छ ठेवा",

        "वरून पाणी देणे टाळा",

      ],

    },

    farmerTip: {

      english:
        "Inspect lower leaves regularly because early blight usually starts there.",

      marathi:
        "प्रारंभिक करपा प्रथम खालच्या पानांवर दिसतो, त्यामुळे त्यांची नियमित तपासणी करा.",

    },

    suggestions: {

      english: [

        {

          title: "Remove infected leaves",

          detail:
            "Cut and destroy infected leaves immediately to reduce disease spread.",

        },

        {

          title: "Spray fungicide",

          detail:
            "Use Mancozeb or Chlorothalonil as recommended by your local agriculture expert.",

        },

        {

          title: "Avoid overhead watering",

          detail:
            "Water only near the roots to keep leaves dry.",

        },

      ],

      marathi: [

        {

          title: "आजारी पाने काढा",

          detail:
            "रोगग्रस्त पाने त्वरित काढून नष्ट करा.",

        },

        {

          title: "बुरशीनाशक फवारणी",

          detail:
            "मॅन्कोझेब किंवा क्लोरोथॅलोनील फवारणी करा.",

        },

        {

          title: "वरून पाणी देऊ नका",

          detail:
            "फक्त मुळाजवळ पाणी द्या.",

        },

      ],

    },

  },

  // ===========================================================
  // TOMATO LATE BLIGHT
  // ===========================================================

  Tomato___Late_blight: {

    english: "Tomato Late Blight",

    marathi: "टोमॅटोचा उशीरा करपा रोग",

    category: {

      english: "Fungal Disease",

      marathi: "बुरशीजन्य रोग",

    },

    severity: "High",

    cause: {

      english:
        "Late blight is caused by Phytophthora infestans and spreads rapidly in cool, wet weather.",

      marathi:
        "हा रोग Phytophthora infestans मुळे होतो आणि थंड व दमट वातावरणात वेगाने पसरतो.",

    },

    observation: {

      english:
        "Large dark lesions and water-soaked patches were detected on the leaf.",

      marathi:
        "पानावर मोठे काळपट डाग आणि ओलसर भाग आढळले.",

    },

    recommendation: {

      english:
        "Immediate fungicide application and removal of infected plants is strongly recommended.",

      marathi:
        "त्वरित बुरशीनाशक फवारणी करा आणि संक्रमित झाडे काढून टाका.",

    },

    symptoms: {

      english: [

        "Dark brown lesions",

        "White fungal growth",

        "Rapid leaf collapse",

      ],

      marathi: [

        "गडद तपकिरी डाग",

        "पांढरी बुरशी",

        "पाने पटकन कोमेजणे",

      ],

    },

    spread: {

      english: [

        "Rain",

        "Wind",

        "High humidity",

      ],

      marathi: [

        "पाऊस",

        "वारा",

        "जास्त आर्द्रता",

      ],

    },

    prevention: {

      english: [

        "Remove infected plants",

        "Improve airflow",

        "Use preventive fungicide",

      ],

      marathi: [

        "संक्रमित झाडे काढा",

        "हवेचा प्रवाह वाढवा",

        "प्रतिबंधात्मक फवारणी करा",

      ],

    },

    farmerTip: {

      english:
        "Do not leave infected leaves in the field. Destroy them safely.",

      marathi:
        "रोगग्रस्त पाने शेतात टाकू नका. त्यांचा सुरक्षित नाश करा.",

    },

    suggestions: {

      english: [

        {

          title: "Copper fungicide",

          detail:
            "Apply copper-based fungicide immediately.",

        },

        {

          title: "Improve ventilation",

          detail:
            "Increase spacing between plants.",

        },

        {

          title: "Remove infected plants",

          detail:
            "Destroy severely infected plants to stop disease spread.",

        },

      ],

      marathi: [

        {

          title: "तांब्यावर आधारित फवारणी",

          detail:
            "त्वरित तांब्यावर आधारित बुरशीनाशक वापरा.",

        },

        {

          title: "हवेचा प्रवाह सुधारा",

          detail:
            "झाडांमध्ये योग्य अंतर ठेवा.",

        },

        {

          title: "रोगग्रस्त झाडे काढा",

          detail:
            "जास्त संक्रमित झाडे नष्ट करा.",

        },

      ],

    },

  },

  // ===========================================================
  // TOMATO HEALTHY
  // ===========================================================

  Tomato___healthy: {

    english: "Healthy Tomato Plant",

    marathi: "निरोगी टोमॅटो पीक",

    category: {

      english: "Healthy Plant",

      marathi: "निरोगी पीक",

    },

    severity: "Low",

    cause: {

      english:
        "No disease symptoms were detected. The plant appears healthy and is growing normally.",

      marathi:
        "कोणतीही रोगाची लक्षणे आढळली नाहीत. पीक निरोगी असून सामान्य वाढ होत आहे.",

    },

    observation: {

      english:
        "The uploaded leaf shows healthy green color with no visible disease spots or damage.",

      marathi:
        "अपलोड केलेल्या पानावर कोणतेही रोगाचे डाग किंवा नुकसान दिसत नाही. पान निरोगी हिरवे आहे.",

    },

    recommendation: {

      english:
        "Continue regular crop management practices and monitor the crop periodically.",

      marathi:
        "नियमित पीक व्यवस्थापन सुरू ठेवा आणि वेळोवेळी पिकाची तपासणी करा.",

    },

    symptoms: {

      english: [

        "Healthy green leaves",

        "No visible spots",

        "Normal plant growth",

      ],

      marathi: [

        "हिरवीगार पाने",

        "कोणतेही डाग नाहीत",

        "सामान्य वाढ",

      ],

    },

    spread: {

      english: [

        "No disease detected",

      ],

      marathi: [

        "कोणताही रोग आढळला नाही",

      ],

    },

    prevention: {

      english: [

        "Maintain proper watering schedule",

        "Use balanced fertilizer",

        "Inspect leaves regularly",

      ],

      marathi: [

        "योग्य पाणी द्या",

        "संतुलित खत वापरा",

        "पानांची नियमित तपासणी करा",

      ],

    },

    farmerTip: {

      english:
        "Healthy crops require regular monitoring. Early detection prevents major disease outbreaks.",

      marathi:
        "निरोगी पिकासाठी नियमित निरीक्षण आवश्यक आहे. लवकर रोग ओळखल्यास मोठे नुकसान टाळता येते.",

    },

    suggestions: {

      english: [

        {

          title: "Maintain watering schedule",

          detail:
            "Water the crop regularly without overwatering the soil.",

        },

        {

          title: "Ensure proper sunlight",

          detail:
            "Provide at least 6–8 hours of sunlight every day.",

        },

        {

          title: "Monitor crop weekly",

          detail:
            "Inspect leaves regularly to identify any disease at an early stage.",

        },

      ],

      marathi: [

        {

          title: "योग्य पाणी द्या",

          detail:
            "जमीन जास्त ओलसर होणार नाही याची काळजी घ्या.",

        },

        {

          title: "पुरेसा सूर्यप्रकाश",

          detail:
            "दररोज ६–८ तास सूर्यप्रकाश मिळेल याची खात्री करा.",

        },

        {

          title: "नियमित निरीक्षण",

          detail:
            "आठवड्यातून एकदा पानांची तपासणी करा.",

        },

      ],

    },

  },  // ===========================================================
  // POTATO EARLY BLIGHT
  // ===========================================================

  Potato___Early_blight: {

    english: "Potato Early Blight",

    marathi: "बटाट्याचा प्रारंभिक करपा रोग",

    category: {
      english: "Fungal Disease",
      marathi: "बुरशीजन्य रोग",
    },

    severity: "Medium",

    cause: {
      english:
        "Caused by the fungus Alternaria solani. It develops in warm and humid weather.",

      marathi:
        "हा रोग Alternaria solani या बुरशीमुळे होतो. उष्ण आणि दमट वातावरणात हा रोग वाढतो.",
    },

    observation: {
      english:
        "Brown circular spots with yellow edges were detected on the potato leaf.",

      marathi:
        "बटाट्याच्या पानावर तपकिरी गोलाकार डाग आणि पिवळ्या कडा आढळल्या.",
    },

    recommendation: {
      english:
        "Start fungicide treatment immediately and remove infected leaves.",

      marathi:
        "त्वरित बुरशीनाशक फवारणी करा आणि संक्रमित पाने काढून टाका.",
    },

    symptoms: {
      english: [
        "Brown circular spots",
        "Yellow leaf margins",
        "Drying leaves",
      ],

      marathi: [
        "तपकिरी गोल डाग",
        "पानांच्या कडा पिवळ्या होणे",
        "पाने वाळणे",
      ],
    },

    spread: {
      english: [
        "Wind",
        "Rain splash",
        "Crop residue",
      ],

      marathi: [
        "वारा",
        "पावसाचे पाणी",
        "संक्रमित अवशेष",
      ],
    },

    prevention: {
      english: [
        "Rotate crops",
        "Avoid excess moisture",
        "Maintain field sanitation",
      ],

      marathi: [
        "पीक फेरपालट करा",
        "जास्त ओलावा टाळा",
        "शेत स्वच्छ ठेवा",
      ],
    },

    farmerTip: {
      english:
        "Avoid watering late in the evening because wet leaves encourage fungal growth.",

      marathi:
        "संध्याकाळी उशिरा पाणी देणे टाळा कारण ओलसर पाने बुरशी वाढवतात.",
    },

    suggestions: {

      english: [

        {
          title: "Remove infected leaves",
          detail: "Destroy infected leaves immediately."
        },

        {
          title: "Spray fungicide",
          detail: "Use Mancozeb or Chlorothalonil as recommended."
        },

        {
          title: "Reduce leaf moisture",
          detail: "Avoid overhead irrigation."
        }

      ],

      marathi: [

        {
          title: "रोगग्रस्त पाने काढा",
          detail: "संक्रमित पाने लगेच नष्ट करा."
        },

        {
          title: "बुरशीनाशक फवारणी",
          detail: "मॅन्कोझेब किंवा क्लोरोथॅलोनील वापरा."
        },

        {
          title: "पानांवरील ओलावा कमी करा",
          detail: "वरून पाणी देणे टाळा."
        }

      ]

    }

  },



  // ===========================================================
  // POTATO LATE BLIGHT
  // ===========================================================

  Potato___Late_blight: {

    english: "Potato Late Blight",

    marathi: "बटाट्याचा उशीरा करपा रोग",

    category: {
      english: "Fungal Disease",
      marathi: "बुरशीजन्य रोग",
    },

    severity: "High",

    cause: {
      english:
        "Caused by Phytophthora infestans which spreads rapidly in cool and wet conditions.",

      marathi:
        "हा रोग Phytophthora infestans मुळे होतो आणि थंड, दमट वातावरणात झपाट्याने पसरतो.",
    },

    observation: {
      english:
        "Large black lesions and water-soaked patches were detected.",

      marathi:
        "मोठे काळपट डाग आणि ओलसर भाग आढळले.",
    },

    recommendation: {
      english:
        "Immediate disease management is required to avoid crop loss.",

      marathi:
        "पीक वाचवण्यासाठी त्वरित रोग व्यवस्थापन आवश्यक आहे.",
    },

    symptoms: {

      english: [
        "Dark lesions",
        "White fungal growth",
        "Rapid leaf death",
      ],

      marathi: [
        "गडद डाग",
        "पांढरी बुरशी",
        "पाने पटकन मरतात",
      ],

    },

    spread: {

      english: [
        "Rain",
        "Wind",
        "High humidity",
      ],

      marathi: [
        "पाऊस",
        "वारा",
        "जास्त आर्द्रता",
      ],

    },

    prevention: {

      english: [
        "Remove infected plants",
        "Use preventive fungicides",
        "Increase plant spacing",
      ],

      marathi: [
        "संक्रमित झाडे काढा",
        "प्रतिबंधात्मक फवारणी करा",
        "झाडांमध्ये योग्य अंतर ठेवा",
      ],

    },

    farmerTip: {

      english:
        "Check potato fields daily during rainy weather because late blight spreads very quickly.",

      marathi:
        "पावसाळ्यात दररोज निरीक्षण करा कारण उशीरा करपा अतिशय वेगाने पसरतो.",

    },

    suggestions: {

      english: [

        {
          title: "Copper fungicide",
          detail: "Apply copper-based fungicide immediately."
        },

        {
          title: "Destroy infected plants",
          detail: "Remove severely infected plants from the field."
        },

        {
          title: "Improve airflow",
          detail: "Maintain spacing between plants."
        }

      ],

      marathi: [

        {
          title: "तांब्यावर आधारित फवारणी",
          detail: "त्वरित फवारणी करा."
        },

        {
          title: "रोगग्रस्त झाडे नष्ट करा",
          detail: "जास्त संक्रमित झाडे काढून टाका."
        },

        {
          title: "हवेचा प्रवाह वाढवा",
          detail: "झाडांमध्ये योग्य अंतर ठेवा."
        }

      ]

    }

  },


  // ===========================================================
  // POTATO HEALTHY
  // ===========================================================

  Potato___healthy: {

    english: "Healthy Potato Plant",

    marathi: "निरोगी बटाटा पीक",

    category: {
      english: "Healthy Plant",
      marathi: "निरोगी पीक",
    },

    severity: "Low",

    cause: {
      english: "No disease symptoms were detected.",
      marathi: "कोणताही रोग आढळला नाही.",
    },

    observation: {
      english: "The uploaded potato leaf appears healthy with no visible disease.",
      marathi: "अपलोड केलेले बटाट्याचे पान पूर्णपणे निरोगी दिसत आहे.",
    },

    recommendation: {
      english: "Maintain regular irrigation and fertilizer schedule.",
      marathi: "नियमित पाणी आणि खत व्यवस्थापन सुरू ठेवा.",
    },

    symptoms: {
      english: [
        "Healthy green leaves",
        "No disease spots",
        "Normal growth"
      ],

      marathi: [
        "हिरवी पाने",
        "डाग नाहीत",
        "सामान्य वाढ"
      ]
    },

    spread: {
      english: [
        "No disease detected"
      ],

      marathi: [
        "रोग आढळला नाही"
      ]
    },

    prevention: {
      english: [
        "Weekly crop monitoring",
        "Balanced fertilizer",
        "Proper irrigation"
      ],

      marathi: [
        "साप्ताहिक निरीक्षण",
        "संतुलित खत",
        "योग्य सिंचन"
      ]
    },

    farmerTip: {
      english:
        "Healthy crops should still be monitored regularly to detect disease early.",

      marathi:
        "निरोगी पिकाचीही नियमित तपासणी करणे आवश्यक आहे."
    },

    suggestions: {

      english: [

        {
          title:"Maintain irrigation",
          detail:"Provide adequate water without overwatering."
        },

        {
          title:"Balanced nutrition",
          detail:"Use organic and balanced fertilizers."
        },

        {
          title:"Regular inspection",
          detail:"Inspect leaves every week."
        }

      ],

      marathi:[

        {
          title:"योग्य सिंचन",
          detail:"जास्त पाणी देऊ नका."
        },

        {
          title:"संतुलित खत",
          detail:"सेंद्रिय खत वापरा."
        },

        {
          title:"नियमित तपासणी",
          detail:"दर आठवड्याला निरीक्षण करा."
        }

      ]

    }

  },



  // ===========================================================
  // PEPPER BACTERIAL SPOT
  // ===========================================================

  Pepper__bell___Bacterial_spot: {

    english:"Pepper Bacterial Spot",

    marathi:"मिरचीवरील जीवाणूजन्य डाग",

    category:{
      english:"Bacterial Disease",
      marathi:"जीवाणूजन्य रोग"
    },

    severity:"Medium",

    cause:{
      english:
      "Caused by Xanthomonas bacteria under warm and humid conditions.",

      marathi:
      "हा रोग Xanthomonas जीवाणूमुळे होतो."
    },

    observation:{
      english:
      "Small dark spots surrounded by yellow halos were detected.",

      marathi:
      "लहान काळे डाग व पिवळ्या कडा आढळल्या."
    },

    recommendation:{
      english:
      "Apply bactericide and remove infected leaves immediately.",

      marathi:
      "जिवाणूनाशक वापरा आणि संक्रमित पाने काढा."
    },

    symptoms:{

      english:[
        "Dark spots",
        "Yellow halos",
        "Leaf drop"
      ],

      marathi:[
        "काळे डाग",
        "पिवळ्या कडा",
        "पाने गळणे"
      ]

    },

    spread:{

      english:[
        "Rain splash",
        "Contaminated tools",
        "Seeds"
      ],

      marathi:[
        "पावसाचे पाणी",
        "संक्रमित साधने",
        "बियाणे"
      ]

    },

    prevention:{

      english:[
        "Use certified seeds",
        "Avoid leaf wetness",
        "Disinfect tools"
      ],

      marathi:[
        "प्रमाणित बियाणे वापरा",
        "पाने ओलसर ठेवू नका",
        "साधने स्वच्छ ठेवा"
      ]

    },

    farmerTip:{

      english:
      "Always disinfect pruning tools before using them on another plant.",

      marathi:
      "एका झाडावरून दुसऱ्यावर जाण्यापूर्वी साधने निर्जंतुक करा."
    },

    suggestions:{

      english:[

        {
          title:"Remove infected leaves",
          detail:"Destroy infected leaves immediately."
        },

        {
          title:"Apply bactericide",
          detail:"Use copper bactericide according to recommendations."
        },

        {
          title:"Use clean irrigation",
          detail:"Avoid splashing water on leaves."
        }

      ],

      marathi:[

        {
          title:"रोगग्रस्त पाने काढा",
          detail:"ताबडतोब नष्ट करा."
        },

        {
          title:"जिवाणूनाशक वापरा",
          detail:"तांब्यावर आधारित औषध वापरा."
        },

        {
          title:"स्वच्छ सिंचन",
          detail:"पानांवर पाणी पडणार नाही याची काळजी घ्या."
        }

      ]

    }

  },



  // ===========================================================
  // PEPPER HEALTHY
  // ===========================================================

  Pepper__bell___healthy:{

    english:"Healthy Pepper Plant",

    marathi:"निरोगी मिरची पीक",

    category:{
      english:"Healthy Plant",
      marathi:"निरोगी पीक"
    },

    severity:"Low",

    cause:{
      english:"No disease detected.",
      marathi:"कोणताही रोग आढळला नाही."
    },

    observation:{
      english:
      "Healthy leaf with no visible disease symptoms.",

      marathi:
      "पान पूर्णपणे निरोगी दिसत आहे."
    },

    recommendation:{
      english:
      "Continue proper crop management.",

      marathi:
      "नियमित पीक व्यवस्थापन सुरू ठेवा."
    },

    symptoms:{

      english:[
        "Healthy leaves",
        "No spots",
        "Good growth"
      ],

      marathi:[
        "हिरवी पाने",
        "डाग नाहीत",
        "चांगली वाढ"
      ]

    },

    spread:{

      english:["None"],

      marathi:["नाही"]

    },

    prevention:{

      english:[
        "Regular inspection",
        "Balanced fertilizer",
        "Proper watering"
      ],

      marathi:[
        "नियमित निरीक्षण",
        "संतुलित खत",
        "योग्य पाणी"
      ]

    },

    farmerTip:{

      english:
      "Healthy plants should be monitored weekly for early disease detection.",

      marathi:
      "निरोगी पिकाचेही आठवड्यातून निरीक्षण करा."
    },

    suggestions:{

      english:[

        {
          title:"Maintain irrigation",
          detail:"Provide proper watering schedule."
        },

        {
          title:"Balanced fertilizer",
          detail:"Apply nutrients as required."
        },

        {
          title:"Weekly monitoring",
          detail:"Inspect leaves regularly."
        }

      ],

      marathi:[

        {
          title:"योग्य सिंचन",
          detail:"योग्य प्रमाणात पाणी द्या."
        },

        {
          title:"संतुलित खत",
          detail:"आवश्यक पोषकद्रव्ये द्या."
        },

        {
          title:"नियमित तपासणी",
          detail:"आठवड्यातून निरीक्षण करा."
        }

      ]

    }

  },


}; // <-- End of diseaseInfo object



// ===========================================================
// FALLBACK DATA
// ===========================================================

const fallbackSuggestions = {
  english: [
    {
      title: "Remove affected leaves",
      detail: "Remove infected leaves to reduce disease spread.",
    },
    {
      title: "Apply suitable treatment",
      detail: "Use the recommended pesticide or fungicide.",
    },
    {
      title: "Consult an expert",
      detail: "Contact your nearest agriculture officer.",
    },
  ],

  marathi: [
    {
      title: "आजारी पाने काढा",
      detail: "रोगाचा प्रसार कमी करण्यासाठी आजारी पाने काढा.",
    },
    {
      title: "योग्य औषध वापरा",
      detail: "योग्य कीटकनाशक किंवा बुरशीनाशक वापरा.",
    },
    {
      title: "तज्ज्ञांचा सल्ला घ्या",
      detail: "जवळच्या कृषी अधिकाऱ्यांचा सल्ला घ्या.",
    },
  ],
};



// ===========================================================
// GET DISPLAY DATA
// ===========================================================

export const getDiseaseDisplay = (
  diseaseKey,
  language = "english"
) => {

  const lang =
    language === "marathi"
      ? "marathi"
      : "english";

  const info = diseaseInfo[diseaseKey];

  if (!info) {

    return {

      name: diseaseKey || "Unknown Disease",

      category:
        lang === "marathi"
          ? "अज्ञात"
          : "Unknown",

      severity: severityLabels.Medium[lang],

      severityLevel: "Medium",

      cause:
        lang === "marathi"
          ? "माहिती उपलब्ध नाही."
          : "Information not available.",

      observation:
        lang === "marathi"
          ? "रोग ओळखण्यात अडचण आली."
          : "Unable to identify the disease.",

      recommendation:
        lang === "marathi"
          ? "कृषी तज्ज्ञांचा सल्ला घ्या."
          : "Consult an agriculture expert.",

      symptoms: [],

      spread: [],

      prevention: [],

      farmerTip:
        lang === "marathi"
          ? "पीक नियमित तपासा."
          : "Monitor your crop regularly.",

      suggestions:
        fallbackSuggestions[lang],

      isHealthy:
        diseaseKey
          ?.toLowerCase()
          .includes("healthy"),

    };

  }

  return {

    name: info[lang],

    category: info.category[lang],

    severity:
      severityLabels[
        info.severity
      ][lang],

    severityLevel:
      info.severity,

    cause:
      info.cause[lang],

    observation:
      info.observation[lang],

    recommendation:
      info.recommendation[lang],

    symptoms:
      info.symptoms[lang],

    spread:
      info.spread[lang],

    prevention:
      info.prevention[lang],

    farmerTip:
      info.farmerTip[lang],

    suggestions:
      info.suggestions[lang],

    isHealthy:
      diseaseKey
        ?.toLowerCase()
        .includes("healthy"),

  };

};



