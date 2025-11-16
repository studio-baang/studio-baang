import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export class HomeAnim {
	constructor() {}

	async enterAnim() {
		this.projectClone();
	}

	async resetIntro() {
		const paths = document.querySelectorAll(".calligraphy-path");
		paths.forEach((path) => {
			const length = path.getTotalLength(); // 전체 길이 구하기
			path.style.strokeDasharray = length;
			path.style.strokeDashoffset = length;
		});
		await gsap.set(".home-intro__item", {
			autoAlpha: 0,
		});
	}

	async introAnim() {
		const tl = gsap.timeline();
		await tl
			.to(".calligraphy-path", {
				strokeDashoffset: 0,
				duration: 1.75,
				ease: "power4.inOut",
				stagger: 1,
			})
			.to(".home-intro__item", {
				autoAlpha: 1,
				duration: 0.5,
				stagger: 0.1,
			});
	}

	addScrollAnim() {
		const competItems = gsap.utils.toArray(".home-competencies__item");
		competItems.forEach((compet, i) => {
			const startPoint = Math.abs((i / (competItems.length + 1)) * 100);
			const endPoint = Math.abs(((i + 1) / (competItems.length + 1)) * 100);
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: ".sticky-effect",
					start: `${startPoint}% 10%`,
					end: `${endPoint}% 90%`,
					markers: true,
					scrub: 0.2,
				},
			});
			tl.to(compet, {
				opacity: 1,
				ease: "none",
			});
		});
	}

	projectClone() {
		const container = document.querySelector(".home-project__item-container");
		container.after(container.cloneNode(true));
	}
}
