jQuery(function() {
  function initVideoHeader(fileName) {
    var videoContainer = document.createElement("div");
    videoContainer.id = "bba-header-video-container";
    videoContainer.innerHTML = `<div id="bba-header-video-container">
                <video autoplay muted loop id="bba-header-video" >
                    <source src="${
                      BigBlueApp.assetsUrl
                    }/videos/${fileName}" type="video/mp4">
                </video>
            </div>`;
    document.body.insertBefore(videoContainer, document.body.firstChild);
  }

  jQuery
    .getJSON(BigBlueApp.themeUrl + "/data/cfg-video-headers.json")
    .done(cfg_video => {
      if (cfg_video[BigBlueApp.postSlug]) {
        initVideoHeader(cfg_video[BigBlueApp.postSlug]);
      }
    });
});
