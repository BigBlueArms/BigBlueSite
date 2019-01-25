const BBASocialInfos = [
    {
        faClasses : ["bba-icon-felinn"],
        url : "https://tube.felinn.org/accounts/bigbluearms/",
        color : "#55acee",
    },
    {
        faClasses : ["fab","fa-twitter"],
        url : "https://twitter.com/bigbluearms",
        color : "#55acee",
    },
    {
        faClasses : ["fab","fa-facebook-f"],
        url : "https://www.facebook.com/bigbluearms",
        color : "#3b5999"
    },
    {
        faClasses : ["fab","fa-youtube"],
        url : "https://www.youtube.com/channel/UCmcNxsoycWKv7jMsHkEEmMw",
        color : "#cd201f"
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
        icon.style.color = data.color;
        round.appendChild(icon)
        link.appendChild(round);
        socContainer.appendChild(link);
    })
});
