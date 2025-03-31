export function disbleBarba() {
	document.querySelectorAll("#wpadminbar a").forEach((item) => item.setAttribute("data-barba-prevent", "self"));
}
