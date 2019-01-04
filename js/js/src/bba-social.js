const BBASocialInfos = [
    {
        faClasses : ["fab","fa-twitter"],
        url : "https://twitter.com/bigbluearms"
    },
    {
        faClasses : ["fab","fa-facebook-f"],
        url : "https://www.facebook.com/bigbluearms"
    },
    {
        faClasses : ["fab","fa-youtube"],
        url : "https://www.youtube.com/channel/UCmcNxsoycWKv7jMsHkEEmMw"
    },

];

jQuery(function(){
    const socContainer = document.getElementsByClassName("bba-social")[0];
    BBASocialInfos.forEach((data)=>{
        const link = document.createElement("a");
        link.href = data.url;
        link.target = "_blank";
        const round = document.createElement("div");
        round.classList.add("bba-social-round");
        const icon = document.createElement("i");
        data.faClasses.forEach((cl)=>{
            icon.classList.add(cl);
        });
        round.appendChild(icon)
        link.appendChild(round);
        socContainer.appendChild(link);
    })
});
