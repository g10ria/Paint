

document.querySelectorAll(".menu-option").forEach(function (option) {
    option.addEventListener("click", function() {
        console.log("clicked "+this);
        let content = this.id;
        console.log(content);
        document.body.style.cursor = 'url(img/cursors/menu-'+content+'.cur), crosshair';
    })
})