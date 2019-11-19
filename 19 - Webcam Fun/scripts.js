const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
    
//  DEPRECIATION : 
//       The following has been depreceated by major browsers as of Chrome and Firefox.
//       video.src = window.URL.createObjectURL(localMediaStream);
//       Please refer to these:
//       Depreceated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
//       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
      
      video.srcObject = localMediaStream;
      video.play();
    }).catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

function paintToCanvas(){
	const width = video.videoWidth;
	const height = video.videoHeight;

	canvas.width = width;
	canvas.height = height;

	return setInterval(()=>{
		ctx.drawImage(video, 0, 0, width , height);

		// 픽셀 값 받아오기
		let pixels = ctx.getImageData(0,0,width,height);
		// console.log(pixels);
		// 효과 실행
		// pixels = redEffect(pixels);
		pixels = rgbSplit(pixels);
		// 다시 픽셀에 넣어 효과 실행
		ctx.putImageData(pixels, 0,0);

	},16);
}

function takePhoto(){
	// 사진 찍는 소리
	snap.currentTime = 0;
	snap.play();

	// 사진 찍기
	const data = canvas.toDataURL('image/jpg');
	// console.log(data);
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download','hansome');
	link.innerHTML = `<img src="${data}" alt="HansomeMan"">`
	// link.textContent = 'Download_photo';
	strip.insertBefore(link,strip.firstChild);
}

function redEffect(pixels){
	for(let i = 0; i<pixels.data.length; i+=4){
		pixels.data[i + 0] = pixels.data[i + 0] + 100;//red
		pixels.data[i + 1] = pixels.data[i + 1] - 50; //g
		pixels.data[i + 2] = pixels.data[i + 2] * .5; //b
	}
	return pixels
}

function rgbSplit(pixels){
	for(let i = 0; i<pixels.data.length; i+=4){
		pixels.data[i - 150] = pixels.data[i + 0] + 100;//red
		pixels.data[i + 200] = pixels.data[i + 1] - 50; //g
		pixels.data[i - 150] = pixels.data[i + 2] * .5; //b
	}
	return pixels;
}

function greenScreen(){
	const levels = {};
	
}

getVideo();

video.addEventListener('canplay',paintToCanvas);