
import { useEffect } from "react";
import "../styles/componentStyle/Modal.css"
const Modal = ({ children, isOpen, closeModal }) => {
	const handleModalContainerClick = (e) => e.stopPropagation();

	useEffect(() => {
		console.info("Abriendo componente Model.jsx..");
	}, []);
	
	const disableScroll = () => {
		isOpen && (document.body.style.overflow = "hidden");
	}
	
	const enableScroll = () => {
		document.body.style.overflow = "visible";
	}
	
	disableScroll();

	return (
		<>
			<article
				className={`modal ${isOpen && "is-open"}`}
				onClick={() => { closeModal(); enableScroll()}}
			>
				<div
					className="modal-container rounded-xl"
					onClick={handleModalContainerClick}
				>
					<button className="modal-close" onClick={() => { closeModal(); enableScroll()}}>
						❌
					</button>
					{children}
				</div>
			</article>
		</>
	);
};

export default Modal;