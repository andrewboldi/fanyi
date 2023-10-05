const req = async (word, paragraph) => {
    // Make an API request to OpenAI here
    const response = await fetch('https://api.openai.com/v1/endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            'prompt': "在段落" + paragraph + "中，解释" + word + "的含义",
            'max_tokens': 500  // Adjust as needed
        })
    });

    const data = await response.json();
    return data.choices[0].text;
}
const rTags = (input) => {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}
const handleSelection = (e) => {
    var fanyi_create = document.createElement("fanyi"); 
    fanyi_create.setAttribute("id", "fanyi");
    document.body.appendChild(fanyi_create);

    var fanyi = document.getElementById("fanyi");
    //fanyi.innerText = window.getSelection().toString() + "\n\n" + rTags(document.elementFromPoint(e.clientX, e.clientY).innerHTML);
    fanyi.style.position = "absolute";
    fanyi.style.borderStyle = "solid";
    fanyi.style.borderRadius = "15px";
    fanyi.style.left = window.pageXOffset + e.clientX + "px";
    fanyi.style.top = window.pageYOffset + e.clientY + "px";
    fanyi.style.background = "#FFE599";
    fanyi.style.fontSize = "24px";
    fanyi.innerText = req(window.getSelection().toString(), rTags(document.elementFromPoint(e.clientX, e.clientY).innerHTML));
}
const handleDeselection = (e) => {
    try {
        const fanyi = document.getElementById("fanyi");
        fanyi.remove();
    } catch(err) {
        ;
    }
}
window.addEventListener("dblclick", handleSelection);
window.addEventListener("click", handleDeselection);
