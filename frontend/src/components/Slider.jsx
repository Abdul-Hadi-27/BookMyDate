import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Slider = () => {
  return (
    <div className="h-full w-full mt-3">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1.2}
        spaceBetween={20}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="h-full w-full"
      >
        {["slide1", "slide2", "slide3", "slide4", "slide5"].map((img, i) => (
          <SwiperSlide key={i} className="h-full">
            <img
              src={`/images/${img}.avif`}
              className="w-full h-full object-center rounded-xl"
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
