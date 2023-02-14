const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipe: false,
  swipeToSlide: false,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 500,
  pauseOnHover: true,
  centerMode: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        swipe: true,
        swipeToSlide: true,
        arrows: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        swipe: true,
        swipeToSlide: true,
        centerMode: false,
        arrows: true,
      },
    },
    {
      breakpoint: 408,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        swipeToSlide: true,
        centerMode: false,
        arrows: true,
      },
    },
  ],
};

export default settings;
