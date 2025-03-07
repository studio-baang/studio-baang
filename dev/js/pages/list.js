import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export function worksListAnimation() {
	gsap.utils.toArray(".works-card").forEach((card, index) => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: card,
				scrub: true,
				pin: false,
			},
		});
		const bg = card.querySelector(".works-card__background");
		tl.fromTo(
			bg,
			{
				translateY: "-50%",
				ease: "none",
			},
			{
				translateY: "0%",
				ease: "none",
			}
		);
	});
}

export async function enterListAnimation() {
	const cards = gsap.utils.toArray(".works-card");
	await gsap.from(cards, {
		autoAlpha: 0,
		y: "10%",
		duration: 0.4,
		stagger: 0.04,
	});
}

export async function leaveListAnimation() {
	const cards = gsap.utils.toArray(".works-card");
	await gsap.to(cards, {
		autoAlpha: 0,
		y: "10%",
		duration: 0.4,
	});
}
