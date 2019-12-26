import domready from 'domready';
import {TweenMax, Power3} from 'gsap';
import Drawer from './components/drawer';
// import Gallery from './components/gallery';
import Smoothscroll from './components/smoothscroll';
import SliderUI from './components/slider';

class App {
	constructor() {
		console.log('[Snooks Angel Books App]');

		this.initAnimations();
		this.initComponents();
	}
  	initAnimations() {
    	// Default easing for all components
    	TweenMax.defaultEase = Power3.easeOut;
  	}
  	initComponents() {

  		const body = document.getElementsByTagName('body')[0];

		if(body.className === 'home') {
			// Gallery().init();
		}

		// Drawers
		const drawers_arr = [].slice.call(document.querySelectorAll('.drawer'));
		drawers_arr.forEach((el) => {
			new Drawer({
		    	el: el,
		    	options: {
		      		closeSelector: '.drawer__close, .drawer__backdrop, a[href="#close-drawer"]'
		    	}
		  	});
		});

		// Smoothscroll
	    const smoothscroll_arr = [].slice.call(document.querySelectorAll('.smoothscroll'));
	    smoothscroll_arr.forEach((el) => {
	    	new Smoothscroll({
	        	el: el,
	        		options: {
	          			offsetTop: 32
	        		}
	      	});
		  });
		
		if(body.className === 'storybook') {
			// slider
			const grid = document.querySelector('.storybook');
			new SliderUI(grid);

			// file input
			const inputs = document.querySelectorAll( '.inputfile' );
			
			inputs.forEach( ( input ) => {
				const label	 = input.nextElementSibling;
				const labelVal = label.innerHTML;

				input.addEventListener( 'change', ( e ) => {
					{ let fileName = '';
						if( this.files && this.files.length > 1 ) {
							label.innerHTML = 'You can only upload 1 file.';
						} else {
							fileName = e.target.value.split( '\\' ).pop();
						}

						if( fileName ) {
							label.querySelector( 'span' ).innerHTML = fileName;
						} else {
							label.innerHTML = labelVal;
						}
					}
				});
			});

			// storybook activity
			const storybookActivityContainer = document.getElementById("step5");

			const textArea = storybookActivityContainer.querySelector('textarea');
			const maxTextAttr = textArea.getAttribute('maxlength');		
			const textAreaMessage = storybookActivityContainer.querySelector(".message");

			textAreaMessage.innerHTML = `<span> ${maxTextAttr - textArea.value.length} </span> Characters Remaining`;
				
			textArea.addEventListener("keyup", (e) => {
				const textLength = e.target.value.length;
				const remText = maxTextAttr - textLength;
					
				textAreaMessage.innerHTML = `<span> ${remText} </span> Characters Remaining`;	
			});
			

			
			
			
		}
	  }
}

domready(() => {
	new App();
});
