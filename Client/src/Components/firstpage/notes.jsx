import { useEffect, useRef } from 'react';
import './places.css';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import ktm from '../../assets/ktm.webp';
import ktm1 from '../../assets/ktm.webp';
import manang from '../../assets/manang.jpg';
import manangtour from '../../assets/manang.jpg';
import mustangvillage from '../../assets/mustangvillage.jpg';
import mustang from '../../assets/mustang.jpg';
import pokhara from '../../assets/pokhara.jpg';
import pokhara1 from '../../assets/pokhara1.jpg';






const Design = () => {
    const nextDom = useRef(null);
    const prevDom = useRef(null);
    const carouselDom = useRef(null);
    const SliderDom = useRef(null);
    const thumbnailBorderDom = useRef(null);

    const timeRunning = 1000;
    const timeAutoNext = 5000; // 5 seconds for each slide
    let runTimeOut;
    let runNextAuto;

    useEffect(() => {
        const thumbnailItemsDom = thumbnailBorderDom.current.querySelectorAll('.item');
        thumbnailBorderDom.current.appendChild(thumbnailItemsDom[0]);

        // Auto run next slide
        runNextAuto = setInterval(() => {
            nextDom.current.click();
        }, timeAutoNext);

        return () => {
            clearInterval(runNextAuto);
        };
    }, [timeAutoNext]);

    const showSlider = (type) => {
        const SliderItemsDom = SliderDom.current.querySelectorAll('.item');
        const thumbnailItemsDom = thumbnailBorderDom.current.querySelectorAll('.item');

        if (type === 'next') {
            SliderDom.current.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.current.appendChild(thumbnailItemsDom[0]);
            carouselDom.current.classList.add('next');
        } else {
            SliderDom.current.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.current.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            carouselDom.current.classList.add('prev');
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.current.classList.remove('next');
            carouselDom.current.classList.remove('prev');
        }, timeRunning);
    };

    return (
        <div>
                        <div className="carousel" ref={carouselDom}>
                <div className="list" ref={SliderDom}>
                <div className="item">
                        <img src={img2} alt="thumb2" />
                    </div>
                    <div className="item">
                        <img src={img3} alt="thumb3" />
                    </div>
                    <div className="item">
                        <img src={img4} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={ktm} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={ktm1} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={manang} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={manangtour} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={mustangvillage} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={pokhara} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={pokhara1} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={pokhara1} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={mustang} alt="thumb4" />
                    </div>

                </div>

                <div className="thumbnail" ref={thumbnailBorderDom}>
                    <div className="item">
                        <img src={img2} alt="thumb2" />
                    </div>
                    <div className="item">
                        <img src={img3} alt="thumb3" />
                    </div>
                    <div className="item">
                        <img src={img4} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={ktm} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={ktm1} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={manang} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={manangtour} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={mustangvillage} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={pokhara} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={pokhara1} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={pokhara1} alt="thumb4" />
                    </div>
                    <div className="item">
                        <img src={mustang} alt="thumb4" />
                    </div>

                </div>

                <div className="arrows">
                    <button ref={prevDom} onClick={() => showSlider('prev')}>&lt;</button>
                    <button ref={nextDom} onClick={() => showSlider('next')}>&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default Design;


















//////////


// body{
//     margin: 0;
//     background-color: #020000;
//     color: #0f924c;
//     font-family: Poppins;
//     font-size: 12px;
// }