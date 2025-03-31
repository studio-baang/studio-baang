let lastHeight = window.innerHeight;
let lastWidth = window.innerWidth;

filterResizeMobile = (callback) => {
	const currentHeight = window.innerHeight;
	const currentWidth = window.innerWidth;

	const heightDiff = Math.abs(currentHeight - lastHeight);
	const widthDiff = Math.abs(currentWidth - lastWidth);

	// width가 변했거나, height 차이가 충분히 클 때만 처리
	if (widthDiff > 0 || heightDiff > 100) {
		lastHeight = currentHeight;
		lastWidth = currentWidth;
		console.log("Significant resized");

		callback();
	}
};

export { filterResizeMobile };
