import styles from './Slider.module.scss';
import ArrowButton from '../ArrowButton/ArrowButton';
import {
	useEffect,
	useRef,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from 'react';

interface SliderProps {
	selectedSlide: number;
	visibleSlides: number;
	slidesAmount: number;
	setSelectedSlide: Dispatch<SetStateAction<number>>;
	children: ReactNode;
}

const Slider = ({
	children,
	selectedSlide,
	visibleSlides,
	slidesAmount,
	setSelectedSlide,
}: SliderProps) => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const slidesRef = useRef<HTMLDivElement>(null);
	let slideWidth: number;

	useEffect(() => {
		const setOffset = () => {
			slideWidth = sliderRef.current!.clientWidth / visibleSlides;
			const offset =
				Math.floor(visibleSlides / 2) * slideWidth - slideWidth * selectedSlide;

			slidesRef.current!.style.transform = `translateX(${offset}px)`;
		};
		setOffset();
	}, [selectedSlide, visibleSlides]);

	const handlePrevClick = () => {
		setSelectedSlide(prev => (prev > 0 ? prev - 1 : 0));
	};

	const handleNextClick = () => {
		setSelectedSlide(prev =>
			prev < slidesAmount - 1 ? prev + 1 : slidesAmount - 1
		);
	};

	return (
		<div className={styles.slider} ref={sliderRef}>
			<div className={styles.slides} ref={slidesRef}>
				{children}
			</div>
			<div className={styles.prevButton}>
				<ArrowButton route='left' onClick={handlePrevClick} />
			</div>
			<div className={styles.nextButton}>
				<ArrowButton route='right' onClick={handleNextClick} />
			</div>
		</div>
	);
};

export default Slider;
