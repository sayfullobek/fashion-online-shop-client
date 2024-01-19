import Carousel from "react-multi-carousel";
import {APP_API} from "../config/AppApi";
import {RESPONSIVE} from "../utils/Utils";
import {DeleteHandler} from "../config/service/AppService";

export const Carous = ({item}) => {
    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={RESPONSIVE}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {item.photoId.map(ph => (
                <div>
                    <button onClick={()=>DeleteHandler(APP_API.photo, ph.id)} style={{position: 'absolute', right: '0'}} className={"btn btn-danger"}>
                        <i className="bi bi-trash"/>
                    </button>
                    <img
                        style={{
                            display: 'block',
                            height: '36vh',
                            margin: 'auto',
                            width: '100%'
                        }}
                        src={`${APP_API.download}${ph.photoId}`}
                        alt="1"/>
                </div>
            ))}
        </Carousel>
    )
}