window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "https://homes.cs.washington.edu/~kpar/nerfies/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  // for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
  //   var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
  //   interp_images[i] = new Image();
  //   interp_images[i].src = path;
  // }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    // preloadInterpolationImages();

    // $('#interpolation-slider').on('input', function(event) {
    //   setInterpolationImage(this.value);
    // });
    // setInterpolationImage(0);
    // $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    // Qualitative Comparison Carousel (adapted from VideoMaMa)
    initComparisonCarousel();
})

// Qualitative Comparison Carousels - data from third_party/webpage/index.html
const BASE = './projects/dage/comparison_videos';
const comparisonCarouselData = {
  'disp': [
    { video: BASE + '/compare_disp/blackswan_grid.mp4', label: 'Black Swan' },
    { video: BASE + '/compare_disp/train_grid.mp4', label: 'Train' },
    { video: BASE + '/compare_disp/breakdance_grid.mp4', label: 'Breakdance' },
    { video: BASE + '/compare_disp/schoolgirls_grid.mp4', label: 'Schoolgirls' },
    { video: BASE + '/compare_disp/soapbox_grid.mp4', label: 'Soapbox' },
    { video: BASE + '/compare_disp/stunt_grid.mp4', label: 'Stunt' },
    { video: BASE + '/compare_disp/paragliding-launch_grid.mp4', label: 'Paragliding Launch' },
    { video: BASE + '/compare_disp/kid-football_grid.mp4', label: 'Kid Football' },
    { video: BASE + '/compare_disp/dog_grid.mp4', label: 'Dog' },
    { video: BASE + '/compare_disp/breakdance-flare_grid.mp4', label: 'Breakdance Flare' },
    { video: BASE + '/compare_disp/hike_grid.mp4', label: 'Hike' },
    { video: BASE + '/compare_disp/goat_grid.mp4', label: 'Goat' },
    { video: BASE + '/compare_disp/gold-fish_grid.mp4', label: 'Gold Fish' },
    { video: BASE + '/compare_disp/car-roundabout_grid.mp4', label: 'Car Roundabout' },
    { video: BASE + '/compare_disp/paragliding_grid.mp4', label: 'Paragliding' },
    { video: BASE + '/compare_disp/motocross-bumps_grid.mp4', label: 'Motocross' },
    { video: BASE + '/compare_disp/ai_video6.mp4_grid.mp4', label: 'AI Video 6' },
    { video: BASE + '/compare_disp/ai_video5.mp4_grid.mp4', label: 'AI Video 5' },
    { video: BASE + '/compare_disp/ai_video9.mp4_grid.mp4', label: 'AI Video 9' },
    { video: BASE + '/compare_disp/ai_video10.mp4_grid.mp4', label: 'AI Video 10' },
    { video: BASE + '/compare_disp/ai_video11.mp4_grid.mp4', label: 'AI Video 11' },
    { video: BASE + '/compare_disp/ai_video12.mp4_grid.mp4', label: 'AI Video 12' },
    { video: BASE + '/compare_disp/ai_video13.mp4_grid.mp4', label: 'AI Video 13' }
  ],
  'depth': [
    { video: BASE + '/compare_depth/bear_depth_grid.mp4', label: 'Bear' },
    { video: BASE + '/compare_depth/bike-packing_depth_grid.mp4', label: 'Bike Packing' },
    { video: BASE + '/compare_depth/drift-turn_depth_grid.mp4', label: 'Drift Turn' },
    { video: BASE + '/compare_depth/horsejump-low_depth_grid.mp4', label: 'Horse Jump' },
    { video: BASE + '/compare_depth/swing_depth_grid.mp4', label: 'Swing' },
    { video: BASE + '/compare_depth/rollerblade_depth_grid.mp4', label: 'Rollerblade' },
    { video: BASE + '/compare_depth/lindy-hop_depth_grid.mp4', label: 'Lindy Hop' },
    { video: BASE + '/compare_depth/camel_depth_grid.mp4', label: 'Camel' }
  ]
};

const carouselIndices = { 'disp': 0, 'depth': 0 };

function getCarouselItems(carouselId) {
  return comparisonCarouselData[carouselId] || [];
}

function loadCarouselVideo(idx, carouselId) {
  const items = getCarouselItems(carouselId);
  if (items.length === 0) return;
  carouselIndices[carouselId] = ((idx % items.length) + items.length) % items.length;
  const item = items[carouselIndices[carouselId]];
  const videoA = document.getElementById('carousel-main-video-' + carouselId);
  const videoB = document.getElementById('carousel-buffer-video-' + carouselId);
  if (!videoA || !videoB || !item) return;
  var active = videoA.classList.contains('carousel-vid-active') ? videoA : videoB;
  var buffer = active === videoA ? videoB : videoA;
  buffer.src = item.video + '#t=0.01';
  buffer.muted = true;
  buffer.loop = true;
  buffer.style.cursor = 'pointer';
  function onBufferReady() {
    buffer.removeEventListener('loadeddata', onBufferReady);
    buffer.removeEventListener('error', onBufferReady);
    active.classList.remove('carousel-vid-active');
    active.classList.add('carousel-vid-buffer');
    buffer.classList.remove('carousel-vid-buffer');
    buffer.classList.add('carousel-vid-active');
    buffer.currentTime = 0;
    buffer.play().catch(function(){});
    active.pause();
    updateCarouselActiveState(carouselId);
  }
  buffer.addEventListener('loadeddata', onBufferReady);
  buffer.addEventListener('error', onBufferReady);
  buffer.load();
}

function buildCarouselGallery(carouselId) {
  const grid = document.getElementById('compare-gallery-grid-' + carouselId);
  if (!grid) return;
  const items = getCarouselItems(carouselId);
  const idx = carouselIndices[carouselId];
  grid.innerHTML = '';
  items.forEach(function(item, index) {
    const div = document.createElement('div');
    div.className = 'gallery-item' + (index === idx ? ' active' : '');
    div.dataset.index = index;
    div.onclick = function() {
      loadCarouselVideo(index, carouselId);
    };
    const thumbSrc = item.video;
    div.innerHTML = '<div class="gallery-thumb-wrap"><video class="gallery-thumb" src="' + thumbSrc + '#t=0.01" muted preload="metadata"></video></div><div style="text-align:center;padding:4px;font-size:0.7rem;font-weight:600;color:#555;">' + item.label + '</div>';
    grid.appendChild(div);
  });
}

function updateCarouselActiveState(carouselId) {
  const grid = document.getElementById('compare-gallery-grid-' + carouselId);
  if (!grid) return;
  const idx = carouselIndices[carouselId];
  const items = grid.querySelectorAll('.gallery-item');
  items.forEach(function(el, i) {
    el.classList.toggle('active', i === idx);
  });
}

function navigateComparisonCarousel(direction, carouselId) {
  const items = getCarouselItems(carouselId);
  if (items.length === 0) return;
  loadCarouselVideo(carouselIndices[carouselId] + direction, carouselId);
}

function initComparisonCarousel() {
  ['disp', 'depth'].forEach(function(id) {
    buildCarouselGallery(id);
    loadCarouselVideo(0, id);
    var box = document.querySelector('#carousel-main-video-' + id).closest('.single-video-box');
    if (box) {
      box.onclick = function() {
        var active = box.querySelector('.carousel-vid-active');
        if (active) {
          if (active.paused) active.play().catch(function(){});
          else active.pause();
        }
      };
    }
  });
}
