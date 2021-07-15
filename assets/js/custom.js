gapi.load("client", loadClient);
  
function loadClient() {
    gapi.client.setApiKey("AIzaSyDQosbbyQReZBTZwNu_5cBV3pwaYu00Vzw");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); 
            })};



var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'vJn08ZWWsiE',
    playerVars: {
    'playsinline': 1
    },
    events: {
    'onReady': onPlayerReady,
    }
});
}

function onPlayerReady(event) {
    event.target.playVideo();
  }


    // Make sure the client is loaded and sign-in is complete before calling this method.
    function execute() {
        console.log("test")
        return gapi.client.youtube.search.list({
          "part": [
            "snippet"
          ],
          "maxResults": 5,
          "order": "viewCount",
          "q": "surfing"
        })
            .then(function(response) {
                    // Handle the results here (response.result has the parsed body).
                    console.log("Response", response);
                  },
                  function(err) { console.error("Execute error", err); });
      }
      
        gapi.load("client", loadClient);
        
      
    