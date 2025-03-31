import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export class HomeAnim {
	constructor() {
		this.competItems = document.querySelectorAll(".home-competencies__item");
		this.handleMouseEnter = null;
	}

	async enterAnim() {
		this.toggleCompetenciesItem();
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

	handleMouseEnterFunc = (event) => {
		const items = this.competItems;

		gsap.to(items, { opacity: 0.4, duration: 0.3, ease: "power2.out" });
		gsap.to(event.currentTarget, { opacity: 1, duration: 0.3, ease: "power2.out" });
	};

	handleMouseLeaveFunc = () => {
		const items = this.competItems;
		gsap.to(items, { opacity: 1, duration: 0.3, ease: "power2.out" });
	};

	toggleCompetenciesItem = () => {
		const items = this.competItems;
		this.handleMouseEnter = this.handleMouseEnterFunc.bind(this);
		items.forEach((item) => {
			item.addEventListener("mouseenter", this.handleMouseEnter);
		});
	};

	CompetenciesItemAnimTroughScrollTrigger() {
		gsap.to(this.competItems, {
			scrollTrigger: {
				trigger: this.competItems,
				start: "top 50%",
				end: "bottom 50%",
			},
			opacity: 1,
			duration: 0.3,
			ease: "power2.out",
		});
	}

	projectClone() {
		const container = document.querySelector(".home-project__item-container");
		container.after(container.cloneNode(true));
	}

	resetEventListener() {
		const items = this.competItems;
		items.forEach((item) => {
			item.removeEventListener("mouseenter", this.handleMouseEnter);
		});
		this.competItems = document.querySelectorAll(".home-competencies__item");
	}
}
