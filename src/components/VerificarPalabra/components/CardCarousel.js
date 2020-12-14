import {
    CarouselProvider,
    Slider,
    ButtonBack,
    ButtonNext,
} from "pure-react-carousel";
import React from "react";

import styles from "../VerificarWords.module.css";
import CustomCardSlide from "../components/CustomCardSlide";

const CardCarousel = ({ pendientes, refetch }) => (
    <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1.25}
        totalSlides={3}
        className={styles.contCarousel}
    >
        <div className={styles.contBtn}>
            <ButtonBack className={styles.btnAtras}>a</ButtonBack>
        </div>
        <Slider className={styles.contSlider}>
            {pendientes.map((pendiente) => (
                <CustomCardSlide
                    row={pendiente}
                    index={pendiente.id}
                    refetch={refetch}
                />
            ))}
        </Slider>
        <div className={styles.contBtn}>
            <ButtonNext className={styles.btnAdelante}>s</ButtonNext>
        </div>
    </CarouselProvider>
);

export default CardCarousel;
