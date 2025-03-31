import barba from "@barba/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import { debounce } from "lodash";

import { enterListAnimation, leaveListAnimation, worksListAnimation } from "./pages/list";
import { calcVhValue } from "./utils/calc-vh";
import { enterSingleWorAnimation } from "./pages/single";
import { HomeAnim } from "./pages/home";
import { disbleBarba } from "./utils/ignore-barba";
import { filterResizeMobile } from "./utils/ignore-mobile-resize";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
	lerp: 0.09,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
	lenis.raf(time * 1000);
});

document.addEventListener("DOMContentLoaded", () => {
	calcVhValue();
	disbleBarba();
});

window.addEventListener(
	"resize",
	debounce(() => {
		filterResizeMobile(calcVhValue);
	}, 100)
);

const homeAnim = new HomeAnim();

barba.init({
	transitions: [
		{
			name: "default-transition",
			beforeEnter: () => {
				if (lenis) {
					// scroll to the top using Lenis immediately (no smooth scrolling).
					lenis.scrollTo(0, { immediate: true });
					lenis.stop();
				} else {
					// If 'lenis' is not defined, fall back to the default browser scroll behavior.
					window.scrollTo(0, 0);
				}
			},
		},
		{
			name: "list-transtition",
			sync: false,
			from: {
				namespace: "works",
			},
			leave: ({ next }) => leaveListAnimation(next),
		},
		{
			name: "home",
			to: {
				namespace: "home",
			},
		},
	],
	views: [
		{
			namespace: "home",
			async afterEnter(data) {
				homeAnim.enterAnim();
				// if (data.current.isOnce) {
				// 	return;
				// }
				homeAnim.resetIntro();
				homeAnim.introAnim();
			},
			beforeEnter() {
				if (lenis) {
					// scroll to the top using Lenis immediately (no smooth scrolling).
					lenis.scrollTo(0, { immediate: true });
				} else {
					// If 'lenis' is not defined, fall back to the default browser scroll behavior.
					window.scrollTo(0, 0);
				}
				homeAnim.resetEventListener();
			},
		},
		{
			namespace: "works",
			afterLeave() {
				let triggers = ScrollTrigger.getAll();
				triggers.forEach(function (trigger) {
					trigger.kill();
				});
			},
			afterEnter() {
				if (lenis) {
					// scroll to the top using Lenis immediately (no smooth scrolling).
					lenis.scrollTo(0, { immediate: true });
				} else {
					// If 'lenis' is not defined, fall back to the default browser scroll behavior.
					window.scrollTo(0, 0);
				}
				enterListAnimation();
				worksListAnimation();
			},
		},
		{
			namespace: "single",
			afterEnter({ next }) {
				if (lenis) {
					// scroll to the top using Lenis immediately (no smooth scrolling).
					lenis.scrollTo(0, { immediate: true });
				} else {
					// If 'lenis' is not defined, fall back to the default browser scroll behavior.
					window.scrollTo(0, 0);
				}
				enterSingleWorAnimation(lenis);
			},
		},
	],
});
