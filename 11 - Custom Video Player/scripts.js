const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// 기능
function togglePlay(){
    // if(video.paused){
    //     video.play();
    // }else{
    //     video.pause();
    // }
    const method = video.paused ? 'play' : 'pause';
    //띠용
    video[method]();
}
function updateBtn(){
    const icon = this.paused ? '▶' : '||';
    toggle.textContent = icon;
}
function skip(){
    console.log(video.currentTime);
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handelRangeUpdate(){
    console.log(this.value);
    console.log(this.name);
    video[this.name] = this.value;
}
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
// 이벤트 걸어주기
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateBtn);
video.addEventListener('pause',updateBtn);
video.addEventListener('timeupdate',handleProgress);

toggle.addEventListener('click',togglePlay);

skipButtons.forEach(btn=>
    btn.addEventListener('click',skip)
);

ranges.forEach(range=>
    range.addEventListener('change',handelRangeUpdate)
);
ranges.forEach(range=>
    range.addEventListener('mousemove',handelRangeUpdate)
);

let mousedown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=>mousedown && scrub(e));
progress.addEventListener('mousedown',()=> mousedown = true);
progress.addEventListener('mouseup',()=> mousedown = false);

