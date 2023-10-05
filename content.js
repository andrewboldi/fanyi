const handleSelection = (e) => {
    var fanyi_create = document.createElement("fanyi"); 
    fanyi_create.setAttribute("id", "fanyi");
    document.body.appendChild(fanyi_create);

    var fanyi = document.getElementById("fanyi");
    fanyi.innerText = window.getSelection().toString();
    fanyi.style.width = "200px";
    fanyi.style.height = "200px";
    fanyi.style.position = "absolute";
    fanyi.style.left = window.pageXOffset + e.clientX + "px";
    fanyi.style.top = window.pageYOffset + e.clientY + "px";
    fanyi.style.background = "green";
    fanyi.style.fontSize = "24px";
}
window.addEventListener("dblclick", handleSelection);
