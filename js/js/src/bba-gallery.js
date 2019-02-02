jQuery(function(){

    const images = Array.from(document.getElementsByClassName("bba-gallery-element"));
    if(images.length===0){
        return;
    }
    const parent = images[0].parentNode;

    for(let i = 0;i< images.length;i+=3){
        const imag1 = images[i];
        imag1.classList.add("big");
        parent.appendChild(imag1);

        const imag2 = images[i+1];
        if(!imag2){
            continue;
        }
        imag2.classList.add("small");
        const imag3 = images[i+2];
        if(!imag3){
            continue;
        }
        const cont = document.createElement("div");
        cont.classList.add("bba-gallery-small-container");
        cont.appendChild(imag2);
        cont.appendChild(imag3);
        imag3.classList.add("small");
        parent.appendChild(cont);
    }
    for(let i = 0;i< images.length;i++){
        const img = images[i];
        img.onclick = () =>{
            BigBlueModal.createModal("bba-gallery-"+i,BigBlueModal.configGallery, {
                htmlContent : `<img src = "${img.attributes['image'].nodeValue}" class = "bba-gallery-fullscreen">`
            });
        }
    }
});
