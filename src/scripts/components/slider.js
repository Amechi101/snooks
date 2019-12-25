export default class SliderUI {
	constructor( sliderContainer ) {
		//get slider UI container
		this.sliderContainer = sliderContainer;

		//get slider controls
		this.prevButton = this.sliderContainer.querySelector('#storybookPrev');
		this.nextButton = this.sliderContainer.querySelector('#storybookNext');

		//get slider tracker
		this.trackerCurrentSlide = this.sliderContainer.querySelector('.ui-slider-numbers__current');
		this.trackerTotalSlides = this.sliderContainer.querySelector('.ui-slider-numbers__total');

		//get all slides elements from DOM and convert to array
		this.slides = Array.prototype.slice.call(document.querySelectorAll('.storybook__sections > .storybook__section'));

		//get total number of slides
		this.totalSlides = this.slides.length;

		//counter to keep track of current slide
		this.slideNum = 0; 

		//hold state of current slide
		this.currentSlide;

		this.init();
	}

	init() {

		/*
		 * default state of slider
		 */
		// this.trackerCurrentSlide.textContent = this.slideNum + 1;
		// this.trackerTotalSlides.textContent = this.totalSlides;

		//first slide shown
		this.currentSlide = this.slides[this.slideNum];

		this.buttonState( this.slideNum );
		
		//apply "current" class to first slide
		this.currentSlide.classList.add('current');

		
		/*
		 * methods of slider
		 */
		this.bindMethods();
		this.addEvents();

	}

	bindMethods() {
		this.nextSlide = this.nextSlide.bind(this);
		this.prevSlide = this.prevSlide.bind(this);
	}

	addEvents() {
		this.nextButton.addEventListener('click', this.nextSlide, false);
		this.prevButton.addEventListener('click', this.prevSlide, false);
	}

	updateSlide( currentSlideNum ) {

		//slide tracker
        // this.trackerCurrentSlide.textContent = currentSlideNum + 1;
        console.log(currentSlideNum);

		//current slide
		this.currentSlide = this.slides[currentSlideNum];
		
		//apply "current" class to current slide
		this.currentSlide.classList.add('current');

		//update button state based on slide position
		this.buttonState( currentSlideNum );
	}

	buttonState( slideIdx ) {

		//first slide
		if(slideIdx === 0) {
			this.prevButton.classList.add('visually-hidden');
		
		//all slides in-between first and last slide
		}else if(slideIdx > 0 && slideIdx < (this.totalSlides - 1)) {
			this.prevButton.classList.remove('visually-hidden');
			this.nextButton.classList.remove('visually-hidden');

		//last slide
		} else if(slideIdx === (this.totalSlides - 1)) {
			this.nextButton.classList.add('visually-hidden');
			this.prevButton.classList.remove('visually-hidden');
		}
		
	}

	nextSlide( event ) {
		event.preventDefault();

		//remove class on current slide
		this.currentSlide.classList.remove('current');
		
		//increment counter to move slide forward
		this.slideNum++;

		//call slide component to load the next slide...
		this.updateSlide( this.slideNum );

	}

	prevSlide( event ) {
		event.preventDefault();

		//remove class on current slide
		this.currentSlide.classList.remove('current');

		//decrement counter to move slide backwards
		this.slideNum--;

		//call slide component to load previous slide...
		this.updateSlide( this.slideNum );
	}
}