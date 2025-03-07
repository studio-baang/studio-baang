import barba from "@barba/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import { debounce } from "lodash";

import { enterListAnimation, leaveListAnimation, worksListAnimation } from "./pages/list";
import { calcVhValue } from "./utils/calc-vh";
import { enterSingleWorAnimation } from "./pages/single";
import { HomeAnim } from "./pages/home";

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
});

window.addEventListener(
	"resize",
	debounce(() => {
		calcVhValue();
	}, 100)
);

const homeAnim = new HomeAnim();

function setCookie() {
	let date = new Date();
	date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // 하루 후 만료
	let expires = "expires=" + date.toUTCString();
	document.cookie = `introAnim=false; ${expires}; path=/`;
}

function getCookie() {
	let cookies = document.cookie.split("; ");
	for (let cookie of cookies) {
		let [key, value] = cookie.split("=");
		if (key === "introAnim") return value;
	}
	return null;
}

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
			// once: async (data) => {
			// 	if (getCookie() == "false") {
			// 		gsap.set(".loading", {
			// 			autoAlpha: 0,
			// 		});
			// 		return;
			// 	}
			// 	const tl = gsap.timeline();
			// 	const words = gsap.utils.toArray(".loading__word");
			// 	lenis.scrollTo(0, { immediate: true });
			// 	lenis.stop();
			// 	homeAnim.resetIntro();
			// 	for (const word of words) {
			// 		tl.add(
			// 			gsap.from(word, 1, {
			// 				yPercent: 100,
			// 				duration: 0.5,
			// 				ease: "power2.out",
			// 			}),
			// 			"-=1"
			// 		);
			// 		tl.add(
			// 			gsap.to(word, {
			// 				autoAlpha: 0,
			// 				duration: 1.5,
			// 			})
			// 		);
			// 	}
			// 	tl.add(
			// 		gsap.to(".loading", {
			// 			autoAlpha: 0,
			// 			duration: 0.5,
			// 			onComplete: async () => {
			// 				await homeAnim.introAnim();
			// 				lenis.start();
			// 				data.current.isOnce = true;
			// 				setCookie();
			// 			},
			// 		})
			// 	);
			// },
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
