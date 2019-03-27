$(document).ready(function(){
	$('#peer_add').hide();
	$('#peer_remove').hide();

});
document.body.style= "background-color: #8c920c;"
var room = window.location.pathname.split("/").pop()
var webrtc = new SimpleWebRTC({
	localVideoEl: 'localVideo',
	remoteVideosEl: '',
	autoRequestMedia: true,
	debug: false,
	detectSpeakingEvents: true,
	url:"https://localhost:9443",
	media: { 
        audio: true,
        video: {
            mandatory: {
                maxWidth: 500,
                maxHeight: 180,        
                maxFrameRate: 15
           }
	}
	}
});
webrtc.on('readyToCall', function () {
	if(room){
		webrtc.joinRoom(room);	
	}
});
webrtc.on('videoAdded',  (video, peer)=> {
// var toast = new iqwerty.toast.Toast();
// toast.setText('This is a basic toast message!').show();
console.log('video added', peer);
let peer_length = peer.parent.peers
console.log(peer)
this.peer_length = peer_length.length;
if(this.peer_length <2){
	toastr.success('peer video added');
	var remotes = document.getElementById('remoteVideos');
	if (remotes) {
		var d = document.createElement('div');
		d.className = 'videoContainer';
		d.id = 'container_' + webrtc.getDomId(peer);
		d.appendChild(video);
		video.style.width = "500px";
		video.style.borderRadius = "40px";
		video.style.marginTop = "30px";
		remotes.appendChild(d);
	}

}
// else{
// 	toastr.info('maximum peers added')
// }
	// console.log(room)
	// let peer_length = peer.parent.peers
	// console.log(peer)
	// this.peer_length = peer_length.length;
	// if(this.peer_length <2){
	// 	this.hide = true;
	// 	let remotes = document.getElementById("remoteVideos")
	// 	let v = document.createElement('video')
	// 	let stream =  peer.stream
	// 	v.srcObject = stream;
	// 	v.style.width = "500px";
	// 	v.style.borderRadius = "40px";
	// 	v.style.marginTop = "30px";
	// 	v.className = 'videoContainer';
	// 	v.play();
	// 	v.id = 'container_' + webrtc.getDomId(peer);
	// 	remotes.appendChild(v)
	// }
});
webrtc.on('videoRemoved', function (video, peer) {
	let peer_length = peer.parent.peers
	console.log(peer)
	this.peer_length = peer_length.length;
	console.log(this.peer_length)

	var remotes = document.getElementById('remoteVideos');
// var remotes = document.getElementById(webrtc.getDomId(peer));
var el = document.getElementById('container_' + webrtc.getDomId(peer));
if (remotes && el) {
	remotes.removeChild(el);
	if(this.peer_length <2){
		toastr.info('peer video removed');
	}
	}
// }
});
webrtc.on('channelMessage', (peer, channel, data)=> {
    if (channel === 'video_pause') {
		toastr.warning('peer video paused')
		console.log(channel)
    } else if (channel === 'presence') {
    }
});

$(window).load(function(){
    $('#video_play').hide();
    $('#audio_play').hide();
});
$('#video_pause').click(function(){
	$('#video_pause').hide();
	$('#video_play').show();
	webrtc.pauseVideo();
	webrtc.sendDirectlyToAll('video_pause');
	toastr.warning('video paused');
});

$('#video_play').click(function(){
	$('#video_play').hide();
	$('#video_pause').show();
	webrtc.resumeVideo();
	toastr.success('video resume');

});
  
$('#audio_pause').click(function(){
	$('#audio_pause').hide();
	$('#audio_play').show();
	webrtc.mute();
	toastr.warning('audio paused');

});
  
$('#audio_play').click(function(){
	$('#audio_play').hide();
	$('#audio_pause').show();
	webrtc.unmute();
	toastr.success('audio resume');

});