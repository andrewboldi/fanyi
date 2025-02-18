let xhr;
const languages = {
    "ar": "في الفقرة PARAGRAPH، قدِّم شرحاً لمعنى WORD",
    "de": "Erklären Sie im Absatz PARAGRAPH, was WORD bedeutet",
    "en-US": "In the paragraph __PARAGRAPH__ explain what __WORD__ means. Explain in 50 words or less.",
    "en": "In the paragraph __PARAGRAPH__ explain what __WORD__ means. Explain in 50 words or less.",
    "es": "En el párrafo __PARAGRAPH__ explique qué significa __WORD__",
    "fr": "Dans le paragraphe PARAGRAPH, expliquez ce que signifie WORD",
    "it": "Nel paragrafo PARAGRAPH, spiega cosa significa WORD",
    "ja": "段落 PARAGRAPH で、WORD の意味を説明してください",
    "ko": "문단 __PARAGRAPH__에서 __WORD__의 의미를 설명하세요",
    "nl": "In de alinea PARAGRAPH, leg uit wat WORD betekent",
    "pt": "No parágrafo PARAGRAPH, explique o que significa WORD",
    "ru": "В абзаце PARAGRAPH объясните, что означает слово WORD",
    "zh": "在 50 个字以内，解释__PARAGRAPH__段落中__WORD__一词的含义",
    "zh-CN": "在 50 个字以内，解释__PARAGRAPH__段落中__WORD__一词的含义",
    "zh-TW": "在 50 个字以内，解释__PARAGRAPH__段落中__WORD__一词的含义",
    "hi": "अनुच्छेद __PARAGRAPH__ में स्पष्ट करें कि __WORD__ का क्या मतलब है",
    "el": "Στην παράγραφο __PARAGRAPH__ εξηγήστε τι σημαίνει το __WORD__",
    "tr": "__PARAGRAPH__ paragrafında __WORD__'nın ne anlama geldiğini açıklayın",
    "pl": "W akapicie __PARAGRAPH__ wyjaśnij, co oznacza __WORD__",
    "sv": "I avsnitt __PARAGRAPH__ förklara vad __WORD__ betyder",
    "fi": "Kappaleessa __PARAGRAPH__ selitä, mitä __WORD__ tarkoittaa",
    "no": "I avsnitt __PARAGRAPH__ forklar hva __WORD__ betyr",
    "da": "I afsnitt __PARAGRAPH__ forklar, hvad __WORD__ betyder",
    "hu": "__PARAGRAPH__ bekezdésben magyarázza meg, mit jelent a(z) __WORD__",
    "cs": "V odstavci __PARAGRAPH__ vysvětlete, co znamená __WORD__",
    "ro": "În paragraful __PARAGRAPH__ explicați ce înseamnă __WORD__",
    "vi": "Trong đoạn __PARAGRAPH__, giải thích ý nghĩa của __WORD__",
    "th": "ในย่อหน้า __PARAGRAPH__ อธิบายความหมายของ __WORD__",
    "id": "Dalam paragraf __PARAGRAPH__, jelaskan apa arti __WORD__",
    "ms": "Dalam perenggan __PARAGRAPH__, terangkan apa yang dimaksudkan oleh __WORD__",
    "af": "In paragraaf __PARAGRAPH__, verduidelik wat __WORD__ beteken",
    "bg": "В параграф __PARAGRAPH__ обяснете какво означава думата __WORD__",
    "hr": "U odlomku __PARAGRAPH__ objasnite što znači __WORD__",
    "et": "Lõigus __PARAGRAPH__ selgitage, mida tähendab sõna __WORD__",
    "sk": "V odseku __PARAGRAPH__ pojasnite, kaj pomeni __WORD__",
    "sl": "V odstavku __PARAGRAPH__ pojasnite, kaj pomeni __WORD__",
    "lv": "Izskaidrojiet, ko nozīmē vārds __WORD__ __PARAGRAPH__ rindiņā",
    "lt": "Paaiškinkite, ką reiškia žodis __WORD__ __PARAGRAPH__",
    "uk": "У параграфі __PARAGRAPH__ поясніть, що означає слово __WORD__",
    "he": "בפסקה __PARAGRAPH__, הסבירו מה משמע __WORD__",
    "ar-SA": "في الفقرة __PARAGRAPH__، شرح معنى __WORD__",
    "fa": "در پاراگراف __PARAGRAPH__ توضیح دهید که __WORD__ به چه معنی است",
    "ur": "پیراگراف __PARAGRAPH__ میں بتائیں کہ __WORD__ کا کیا مطلب ہے",
    "bn": "__PARAGRAPH__ প্যারাগ্রাফে __WORD__ মানে কি, তা ব্যাখ্যা করুন",
    "ta": "__PARAGRAPH__ பத்தியில் __WORD__ என்ன அர்த்தம் என்று விளக்கவும்",
    "tl": "Sa talata __PARAGRAPH__, ipaliwanag ang ibig sabihin ng __WORD__",
    "am": "በፕራግ __PARAGRAPH__ በቀላል __WORD__ ምን አለብን ፡፡",
    "sw": "Katika aya __PARAGRAPH__, eleza maana ya neno __WORD__",
    "yo": "Ni inu paragrafi __PARAGRAPH__, so fun kini oruko __WORD__ wa npe",
    "jw": "Ing paragraf __PARAGRAPH__, weruh apa sing diarani __WORD__",
    "ha": "A cikin rubutu __PARAGRAPH__, bayyana me kake so a ce __WORD__",
    "mn": "__PARAGRAPH__ хэсгийн дотор __WORD__ -ийн утгыг тайлбарлах",
    "ka": "__PARAGRAPH__ კონკრეტულ ალიას შეეხება, რას ნიშნავს __WORD__",
    "bn-IN": "__PARAGRAPH__ প্যারাগ্রাফে __WORD__ মানে কী, তা ব্যাখ্যা করুন",
    "te": "__PARAGRAPH__ పేరాగ్రాఫ్లో, __WORD__ అర్థం ఏమిటి అంటే చెప్పండి",
    "mr": "__PARAGRAPH__ पॅरॅग्रॅफमध्ये __WORD__ म्हणजे काय असं स्पष्टपणे सांगा",
    "gu": "__PARAGRAPH__ પેરાગ્રાફમાં, __WORD__ નો અર્થ શું છે તે સમજાવો",
    "kn": "__PARAGRAPH__ ಪ್ಯಾರಾಗ್ರಾಫ್ನಲ್ಲಿ, __WORD__ ಅರ್ಥವನ್ನು ವಿವರಿಸಿ",
    "ml": "__PARAGRAPH__ പാരഗ്രാഫിൽ, __WORD__ എന്നത് എന്താണ് അർത്ഥമെന്ന് വിശദമായി പറയുക",
    "pa": "__PARAGRAPH__ ਪੈਰਾਗ੍ਰਾਫ ਵਿੱਚ, __WORD__ ਦਾ ਮਤਲਬ ਕੀ ਹੈ ਉਸ ਦੀ ਵਿਆਖਿਆ ਕਰੋ",
    "ta-IN": "__PARAGRAPH__ பகுப்பில், __WORD__ என்ன அர்த்தம் என்று விளக்கவும்",
    "gu-IN": "__PARAGRAPH__ પેરાગ્રાફમાં, __WORD__ નો અર્થ શું છે તે સમજાવો",
    "ta-LK": "__PARAGRAPH__ பகுதியில், __WORD__ என்ன அர்த்தம் என்று விளக்கவும்",
    "my": "__PARAGRAPH__ စာပိုဒ်တွင် __WORD__ ကို ဘာကြောင့် ဆင်းရွက်ပါ",
    "ne": "__PARAGRAPH__ प्याराग्राफमा, __WORD__ को अर्थ कसरी बुझ्ने",
    "si": "__PARAGRAPH__ අක්ෂා __WORD__ යන්නට කුමුද?",
    "km": "នៅក្នុងជីអូល __PARAGRAPH__ ពិបាក __WORD__ ហៅនឹងអ្នកមិន្រូតរាត្រង់អ្នកវិញវាយ",
    "mn-MN": "__PARAGRAPH__ газар, __WORD__ үгийн утгыг тайлбарлана уу",
    "kk": "__PARAGRAPH__ бөлімінде, __WORD__ сөзінің мағынасын түсіндіріңіз",
    "ky": "__PARAGRAPH__ бөлүмүндө, __WORD__ сөздүн маанисин түшүндүрүңүз",
    "ta-MY": "__PARAGRAPH__ பகுப்பில், __WORD__ என்ன அர்த்தம் என்று விளக்கவும்",
    "lo": "ໃນບົດ __PARAGRAPH__ ກ່ອນ, ບອກວ່າເວັບ __WORD__ ເປັນແນວແຕ່ລະອາຍຸ",
    "ha-NE": "A cikin rubutu __PARAGRAPH__, bayyana me kake so a ce __WORD__",
    "ne-IN": "__PARAGRAPH__ प्याराग्राफमा, __WORD__ को अर्थ कसरी बुझ्ने",
    "si-LK": "__PARAGRAPH__ අක්ෂා __WORD__ යන්නට කුමුද?",
    "km-KH": "នៅក្នុងជីអូល __PARAGRAPH__ ពិបាក __WORD__ ហៅនឹងអ្នកមិន្រូតរាត្រង់អ្នកវិញវាយ",
    "kk-KZ": "__PARAGRAPH__ бөлімінде, __WORD__ сөзінің мағынасын түсіндіріңіз",
    "ky-KG": "__PARAGRAPH__ бөлүмүндө, __WORD__ сөздүн маанисин түшүндүрүңүз",
    "lo-LA": "ໃນບົດ __PARAGRAPH__ ກ່ອນ, ບອກວ່າເວັບ __WORD__ ເປັນແນວແຕ່ລະອາຍຸ",
    "my-MM": "__PARAGRAPH__ စာပိုဒ်တွင် __WORD__ ကို ဘာကြောင့် ဆင်းရွက်ပါ",
    "ta-SG": "__PARAGRAPH__ பகுப்பில், __WORD__ என்ன அர்த்தம் என்று விளக்கவும்",
    "hy-AM": "__PARAGRAPH__ բաժնում, __WORD__ բառը ի՞նչ նշանակում ունի",
    "ka-GE": "__PARAGRAPH__ კონკრეტულ ალიას შეეხება, რას ნიშნავს __WORD__",
    "ur-PK": "__PARAGRAPH__ پیراگراف میں بتائیں کہ __WORD__ کا کیا مطلب ہے",
    "ps-AF": "__PARAGRAPH__ پېښەوانۍ کړه، څه __WORD__ يو څنګه غورځوني",
    "ug-CN": "__PARAGRAPH__ پاراگرافتىكى، __WORD__ نىڭ مەنىسىنى تەپسىلاتلا",
    "af-ZA": "In paragraaf __PARAGRAPH__, verduidelik wat __WORD__ beteken",
    "sq-AL": "Në paragrafin __PARAGRAPH__, shpjego cilën kuptim ka __WORD__",
    "am-ET": "በፕራግ __PARAGRAPH__ በቀላል __WORD__ ምን አለብን ፡፡",
    "az-AZ": "__PARAGRAPH__ paragrafında, __WORD__ sözünün nə məna daşıdığını izah edin",
    "eu-ES": "__PARAGRAPH__ atalean, azaldu __WORD__ hitzaren esanahia",
    "be-BY": "У раздзеле __PARAGRAPH__ аб'ясніце, што значыць слова __WORD__",
    "bs-BA": "U odlomku __PARAGRAPH__ objasnite što znači __WORD__",
    "bg-BG": "В параграф __PARAGRAPH__ обяснете какво означава думата __WORD__",
    "ca-ES": "Al paràgraf __PARAGRAPH__, expliqueu què significa __WORD__",
    "hr-HR": "U odlomku __PARAGRAPH__ objasnite što znači __WORD__",
    "cs-CZ": "V odstavci __PARAGRAPH__ vysvětlete, co znamená __WORD__",
    "da-DK": "I afsnitt __PARAGRAPH__ forklar, hvad __WORD__ betyder",
    "nl-NL": "In de alinea PARAGRAPH, leg uit wat WORD betekent",
    "et-EE": "Lõigus __PARAGRAPH__ selgitage, mida tähendab sõna __WORD__",
    "fi-FI": "Kappaleessa __PARAGRAPH__ selitä, mitä __WORD__ tarkoittaa",
    "fr-FR": "Dans le paragraphe PARAGRAPH, expliquez ce que signifie WORD",
    "gl-ES": "No parágrafo __PARAGRAPH__, explique o que significa __WORD__",
    "ka-GE": "__PARAGRAPH__ კონკრეტულ ალიას შეეხება, რას ნიშნავს __WORD__",
    "de-DE": "Erklären Sie im Absatz PARAGRAPH, was WORD bedeutet",
    "el-GR": "Στην παράγραφο __PARAGRAPH__ εξηγήστε τι σημαίνει το __WORD__",
    "he-IL": "בפסקה __PARAGRAPH__, הסבירו מה משמע __WORD__",
    "hi-IN": "अनुच्छेद __PARAGRAPH__ में स्पष्ट करें कि __WORD__ का क्या मतलब है",
    "hu-HU": "__PARAGRAPH__ bekezdésben magyarázza meg, mit jelent a(z) __WORD__",
    "is-IS": "Í mæli __PARAGRAPH__, skýrið hvað __WORD__ þýðir",
    "id-ID": "Dalam paragraf __PARAGRAPH__, jelaskan apa arti __WORD__",
    "it-IT": "Nel paragrafo __PARAGRAPH__, spiega cosa significa __WORD__",
    "ja-JP": "段落 PARAGRAPH で、WORD の意味を説明してください",
    "kn-IN": "__PARAGRAPH__ ಪ್ಯಾರಾಗ್ರಾಫ್ನಲ್ಲಿ, __WORD__ ಅರ್ಥವನ್ನು ವಿವರಿಸಿ",
    "ko-KR": "문단 __PARAGRAPH__에서 __WORD__의 의미를 설명하세요",
    "lv-LV": "Izskaidrojiet, ko nozīmē vārds __WORD__ __PARAGRAPH__ rindiņā",
    "lt-LT": "Paaiškinkite, ką reiškia žodis __WORD__ __PARAGRAPH__",
    "mk-MK": "Во пасусот __PARAGRAPH__, објаснете што значи __WORD__",
    "ms-MY": "Dalam perenggan __PARAGRAPH__, terangkan apa yang dimaksudkan oleh __WORD__",
    "ml-IN": "__PARAGRAPH__ പാരഗ്രാഫിൽ, __WORD__ എന്നത് എന്താണ് അര്ഥമെന്ന് വിശദമായി പറയുക",
    "mr-IN": "__PARAGRAPH__ पॅरॅग्रॅफमध्ये __WORD__ म्हणजे काय असं स्पष्टपणे सांगा",
    "pl-PL": "W akapicie __PARAGRAPH__ wyjaśnij, co oznacza __WORD__",
    "pt-BR": "No parágrafo __PARAGRAPH__, explique o que significa __WORD__",
    "pt-PT": "No parágrafo __PARAGRAPH__, explique o que significa __WORD__",
    "ro-RO": "În paragraful __PARAGRAPH__ explicați ce înseamnă __WORD__",
    "ru-RU": "В абзаце __PARAGRAPH__ объясните, что означает слово __WORD__",
    "sr-RS": "U odlomku __PARAGRAPH__ objasnite šta znači reč __WORD__",
    "sk-SK": "V odseku __PARAGRAPH__ pojasnite, kaj pomeni __WORD__",
    "sl-SI": "V odstavku __PARAGRAPH__ pojasnite, kaj pomeni __WORD__",
    "es-ES": "En el párrafo __PARAGRAPH__ explique qué significa __WORD__",
    "sv-SE": "I avsnitt __PARAGRAPH__ förklara vad __WORD__ betyder",
    "th-TH": "ในย่อหน้า __PARAGRAPH__ อธิบายความหมายของ __WORD__",
    "tr-TR": "__PARAGRAPH__ paragrafında __WORD__'nın ne anlama geldiğini açıklayın",
    "uk-UA": "У параграфі __PARAGRAPH__ поясніть, що означає слово __WORD__",
    "vi-VN": "Trong đoạn __PARAGRAPH__, giải thích ý nghĩa của __WORD__",
    "zh-HK": "在段落 __PARAGRAPH__ 中，解釋 __WORD__ 的意思",
    "zh-TW": "在段落 __PARAGRAPH__ 中，解釋 __WORD__ 的意思"
}
const language = navigator.language || navigator.userLanguage;

const addResponse = (data) => {
    const fanyi = document.getElementById("fanyi");
    fanyi.innerText = data;
}
const req = (word, paragraph, callback) => {
    const message = languages[language]
    const link = "WORKER GO WRITE UR OWN BACKEND LOL" + message.replace("__PARAGRAPH__", paragraph).replace("__WORD__", word);

    xhr = new XMLHttpRequest();
    xhr.open("GET", link);
    xhr.send();
    xhr.responseType = "text";
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
          const chatReply = xhr.response;
          callback(chatReply);
      }
    }
}
const rTags = (input) => {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}
const handleSelection = (e) => {
    const paragraph = document.elementFromPoint(e.clientX, e.clientY).innerHTML.toString();
    const word = window.getSelection().toString()
    const fanyi_create = document.createElement("fanyi"); 

    fanyi_create.setAttribute("id", "fanyi");
    try {
        document.body.appendChild(fanyi_create);
    } catch {
        ;
    }

    const fanyi = document.getElementById("fanyi");
    fanyi.innerText = "Loading...";
    fanyi.style.position = "absolute";
//    fanyi.style.borderStyle = "solid";
    fanyi.style.padding = "6px";
    fanyi.style.borderRadius = "14px";
    fanyi.style.left = window.pageXOffset + e.clientX + "px";
    fanyi.style.top = window.pageYOffset + e.clientY + "px";
    fanyi.style.background = "#FFF2B3";
    fanyi.style.color = "black";
    fanyi.style.fontSize = "24px";
    fanyi.style.maxWidth = "35%";
    fanyi.style.inlineSize = "35%";
    fanyi.style.overflowWrap = "break-word";
    fanyi.style.textAlign = "left";
    fanyi.style.zIndex = "2147483647";
    req(word, rTags(paragraph), addResponse)
}
const handleDeselection = (e) => {
    try { // end request when exiting previous double click
        xhr.abort();
    } catch {
        ;
    }

    try {
        const fanyi = document.getElementById("fanyi");
        fanyi.remove();
    } catch(err) {
        ;
    }
}
window.addEventListener("dblclick", handleSelection);
window.addEventListener("click", handleDeselection);
