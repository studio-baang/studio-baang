import gsap from "gsap";
export async function enterSingleWorAnimation(lenis) {
	const tl = gsap.timeline();
	await tl
		.from(".single-work-title__content", {
			duration: 0.5,
			y: "100%",
			ease: "power2.Out",
		})
		.from(
			".single-work-category__content",
			{
				duration: 0.4,
				y: "100%",
				ease: "power2.Out",
			},
			"<"
		)
		.from(
			".single-work-info__item-wrapper",
			{
				y: "100%",
				duration: 0.4,
				stagger: 0.05,
			},
			"<"
		)
		.from(
			".single-work-thumbnail img",
			{
				y: "100%",
				opacity: 0,
				duration: 0.4,
				ease: "power2.Out",
			},
			"<"
		);
	lenis.start();
}
