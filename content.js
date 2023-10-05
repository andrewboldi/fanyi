const handleSelection = (e) => {
    var fanyi_create = document.createElement("fanyi"); 
    fanyi_create.setAttribute("id", "fanyi");
    document.body.appendChild(fanyi_create);

    var fanyi = document.getElementById("fanyi");
    fanyi.innerText = window.getSelection().toString();
    fanyi.style.position = "absolute";
    fanyi.style.borderStyle = "solid";
    fanyi.style.borderRadius = "15px";
    fanyi.style.left = window.pageXOffset + e.clientX + "px";
    fanyi.style.top = window.pageYOffset + e.clientY + "px";
    fanyi.style.background = "#FFE599";
    fanyi.style.fontSize = "24px";
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
