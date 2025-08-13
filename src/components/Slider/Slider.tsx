import styles from './Slider.module.scss';
import ArrowButton from '../ArrowButton/ArrowButton';
import {
	useEffect,
	useRef,
	useState,
	type PointerEvent,
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
	visibleSlides,
	slidesAmount,
	selectedSlide,
	setSelectedSlide,
}: SliderProps) => {
	const [isDragging, setIsDragging] = useState(false);
	const sliderRef = useRef<HTMLDivElement>(null);
	const slidesRef = useRef<HTMLDivElement>(null);
	const slideWidthRef = useRef(0);
	const startOffsetRef = useRef(0);
	const offsetRef = useRef(0);
	const dragStartXRef = useRef(0);

	useEffect(() => {
		slideWidthRef.current = sliderRef.current!.clientWidth / visibleSlides;
		startOffsetRef.current =
			Math.floor(visibleSlides / 2) * slideWidthRef.current;

		slidesRef.current!.style.translate = `${startOffsetRef.current}px`;
	}, [visibleSlides]);

	useEffect(() => {
		if (isDragging) return;
		const slideWidth = slideWidthRef.current;
		offsetRef.current = -(slideWidth * selectedSlide);

		slidesRef.current!.style.transform = `translateX(${offsetRef.current}px)`;
	}, [selectedSlide, isDragging]);

	const validateSlide = (action: 'prev' | 'next') => (prev: number) => {
		if (action === 'prev') return prev > 0 ? prev - 1 : 0;
		return prev < slidesAmount - 1 ? prev + 1 : slidesAmount - 1;
	};

	const handlePrevClick = () => {
		setSelectedSlide(validateSlide('prev'));
	};

	const handleNextClick = () => {
		setSelectedSlide(validateSlide('next'));
	};

	const handleDragStart = (e: PointerEvent) => {
		if ((e.target as HTMLElement).closest('button')) return;
		sliderRef.current!.setPointerCapture(e.pointerId);
		dragStartXRef.current = e.clientX;
		setIsDragging(true);
	};

	const handleDragMove = ({ clientX }: PointerEvent) => {
		if (!isDragging) return;
		const offset = offsetRef.current;
		const slideWidth = slideWidthRef.current;
		const dragStartX = dragStartXRef.current;

		const newOffset = offset + (clientX - dragStartX);
		slidesRef.current!.style.transform = `translateX(${newOffset}px)`;

		const newSelectedSlide = Math.round(-newOffset / slideWidth);

		if (newSelectedSlide !== selectedSlide)
			setSelectedSlide(
				validateSlide(newSelectedSlide > selectedSlide ? 'next' : 'prev')
			);
	};

	const handleDragEnd = (e: PointerEvent) => {
		sliderRef.current!.releasePointerCapture(e.pointerId);
		setIsDragging(false);
	};

	return (
		<div
			className={styles.slider}
			ref={sliderRef}
			onPointerDown={handleDragStart}
			onPointerMove={handleDragMove}
			onPointerUp={handleDragEnd}
			onPointerCancel={handleDragEnd}
			style={{
				cursor: isDragging ? 'grabbing' : 'grab',
			}}
		>
			<div
				className={styles.slides}
				ref={slidesRef}
				style={{
					transition: isDragging ? 'none' : 'ease-in-out transform 0.15s',
				}}
			>
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
