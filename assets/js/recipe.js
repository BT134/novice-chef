const searchString = keyword.input.value;
const topResult = "";

// Function to fetch API for youtube
async function loadClient() {
  gapi.client.setApiKey("AIzaSyDQosbbyQReZBTZwNu_5cBV3pwaYu00Vzw");
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function () { console.log("GAPI client loaded for API"); },
      function (err) { console.error("Error loading GAPI client for API", err); });
}

// Function to execture search on Youtube
async function execute() {
  await loadClient();
  return gapi.client.youtube.search.list({
    "part": "snippet",
    "type": 'video',
    "maxResults": 5,
    "order": "viewCount",
    "q": searchString
  })
    .then(function (response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
    },
      function (err) { console.error("Execute error", err); });
}

gapi.load("client", loadClient);

window.onload = execute

// Function to load Youtube video into recipe page
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: topResult,
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


