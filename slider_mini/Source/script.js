let time = 2000;
let slider = document.getElementsByClassName(`Slider`)[0];
let allSlides = slider.childNodes;
let allSlidesLength = allSlides.length-1;
let numberNextSlide = 1;
let numberBackSlide = 1;
let zIndex = 8;
let setI = setInterval(() => next(), time);
allSlides[0].style.zIndex = zIndex-1;

for ( let i = 0; i < allSlidesLength; i++ ) {
	allSlides[i].classList.add(`slide`);
	allSlides[i].classList.add(`slide${i+1}`);
	let buttonNumber = document.createElement(`div`);
	buttonNumber.classList.add(`buttonNumber`);
	buttonNumber.setAttribute(`onclick`, `next(${i+1})` );
	document.getElementsByClassName( `wrapButtonNumber` )[0].appendChild(buttonNumber);
}
let allButtonNumber = document.getElementsByClassName( `wrapButtonNumber` )[0].childNodes;
let virtualSlideNext = document.getElementsByClassName( `slide${numberNextSlide}` )[0];
let virtualSlideBack = document.getElementsByClassName( `slide${numberBackSlide}` )[0];

function next(number) {
	clearIntervalMini();
	if (number) {
		numberNextSlide = number;
		virtualSlideBack = virtualSlideNext;
	} else {
		numberBackSlide = numberNextSlide;
		numberNextSlide++;
		if (numberNextSlide > allSlidesLength) {
			numberNextSlide = 1;
		};
		virtualSlideBack = document.getElementsByClassName( `slide${numberBackSlide}` )[0];
	};
	virtualSlideNext = document.getElementsByClassName(`slide${numberNextSlide}`)[0];
	autoHover(numberNextSlide-1);
	if( virtualSlideBack == null ) {
		virtualSlideBack = document.getElementsByClassName(`slide${1}`)[0];};
		virtualSlideBack.style.cssText = `z-index: ${zIndex};`;
		zIndex++;
		virtualSlideNext.style.cssText = `z-index: ${zIndex};`;
};

function clearIntervalMini() {
	clearInterval(setI);
	setI = setInterval(	() => {
		next();
	}, time	);
};

function autoHover(number) {
	for ( let i = 0; i < allSlidesLength; i++ ) {
		allButtonNumber[i].classList.remove("sliderButtonActive");
	};
	allButtonNumber[number].classList.add("sliderButtonActive");
};
autoHover(numberBackSlide-1);
setInterval(() => {
	slider.style.height = virtualSlideNext.clientHeight + 'px'
}, 100);
window.onresize = function () {
	slider.style.height = virtualSlideNext.clientHeight + 'px'
};
