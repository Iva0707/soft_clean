// jQuery(function ($) {
// 	$(document).ready(() => {});
// });

// const main = () => {};

// window.onload = () => {
// 	main();
// };

// const spollersArray = document.querySelectorAll("[data-spollers]");

// if (spollersArray.length > 0) {
// 	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
// 		return !item.dataset.spollers.split(",")[0];
// 	});

// 	if (spollersRegular.length > 0) {
// 		initSpollers(spollersRegular);
// 	}
// }

// function initSpollers(spollersArray) {
// 	spollersArray.forEach((spollersBlock) => {
// 		if (spollersBlock) {
// 			spollersBlock.classList.add("_init");
// 			initSpollerBody(spollersBlock);
// 			spollersBlock.addEventListener("click", setSpollerAction);
// 		} else {
// 			spollersBlock.classList.remove("._init");
// 			initSpollerBody(spollersBlock, false);
// 			spollersBlock.removeEventListener("click", setSpollerAction);
// 		}
// 	});
// }

// function initSpollerBody(spollersBlock, hideSpollerBody = true) {
// 	const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
// 	if (spollerTitles.length > 0) {
// 		spollerTitles.forEach((spollerTitle) => {
// 			if (hideSpollerBody) {
// 				spollerTitle.removeAttribute("tabindex");
// 				if (!spollerTitle.classList.contains("_active")) {
// 					spollerTitle.nextElementSibling.hidden = true;
// 				}
// 			} else {
// 				spollerTitle.setAttribute("tabindex", "-1");
// 				spollerTitle.nextElementSibling.hidden = false;
// 			}
// 		});
// 	}
// }

// function setSpollerAction(e) {
// 	const el = e.target;
// 	if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
// 		const spollerTitle = el.hasAttribute("data-spoller") ? el : el.closest("[data-spoller]");
// 		const spollersBlock = spollerTitle.closest("[data-spollers]");
// 		const oneSpoller = spollersBlock.hasAttribute("data-one-spoller") ? true : false;
// 		if (!spollersBlock.querySelectorAll("._slide").length) {
// 			if (oneSpoller && !spollerTitle.classList.contains("_active")) {
// 				hideSpollersBody(spollersBlock);
// 			}
// 			spollerTitle.classList.toggle("_active");
// 			_slideToggle(spollerTitle.nextElementSibling, 500);
// 		}
// 		e.preventDefault();
// 	}
// }

// function hideSpollersBody(spollersBlock) {
// 	const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._active");
// 	if (spollerActiveTitle) {
// 		spollerActiveTitle.classList.remove("_active");
// 		_slideUp(spollerActiveTitle.nextElementSibling, 500);
// 	}
// }

// let _slideUp = (target, duration = 500) => {
// 	if (!target.classList.contains("_slide")) {
// 		target.classList.add("_slide");
// 		target.style.transitionProperty = "height, margin, padding";
// 		target.style.transitionDuration = duration + "ms";
// 		target.style.height = target.offsetHeight + "px";
// 		target.offsetHeight;
// 		target.style.overflow = "hidden";
// 		target.style.height = 0;
// 		target.style.paddingTop = 0;
// 		target.style.paddingBottom = 0;
// 		target.style.marginTop = 0;
// 		target.style.marginBottom = 0;
// 		window.setTimeout(() => {
// 			target.hidden = true;
// 			target.style.removeProperty("height");
// 			target.style.removeProperty("padding-top");
// 			target.style.removeProperty("padding-bottom");
// 			target.style.removeProperty("margin-top");
// 			target.style.removeProperty("margin-bottom");
// 			target.style.removeProperty("overflow");
// 			target.style.removeProperty("transition-duration");
// 			target.style.removeProperty("transition-property");
// 			target.classList.remove("_slide");
// 		}, duration);
// 	}
// };

// let _slideDown = (target, duration = 500) => {
// 	if (!target.classList.contains("_slide")) {
// 		target.classList.add("_slide");
// 		if (target.hidden) {
// 			target.hidden = false;
// 		}
// 		let height = target.offsetHeight;
// 		target.style.overflow = "hidden";
// 		target.style.height = 0;
// 		target.style.paddingTop = 0;
// 		target.style.paddingBottom = 0;
// 		target.style.marginTop = 0;
// 		target.style.marginBottom = 0;
// 		target.offsetHeight;
// 		target.style.transitionProperty = "height, margin, padding";
// 		target.style.transitionDuration = duration + "ms";
// 		target.style.height = height + "px";
// 		target.style.removeProperty("padding-top");
// 		target.style.removeProperty("padding-bottom");
// 		target.style.removeProperty("margin-top");
// 		target.style.removeProperty("margin-bottom");
// 		window.setTimeout(() => {
// 			target.style.removeProperty("height");
// 			target.style.removeProperty("overflow");
// 			target.style.removeProperty("transition-duration");
// 			target.style.removeProperty("transition-property");
// 			target.classList.remove("_slide");
// 		}, duration);
// 	}
// };

// let _slideToggle = (target, duration = 500) => {
// 	if (target.hidden) {
// 		return _slideDown(target, duration);
// 	} else {
// 		return _slideUp(target, duration);
// 	}
// };
// ____________ accordion ____________________

const accordion = ({ triggers, activeStateName, allowMultiple = false }) => {
	if (!triggers?.length) return;

	const toggleItem = ($trigger) => {
		const $parentEl = $trigger.closest(".accordion__item");
		const $bodyEl = $parentEl.querySelector(".accordion__body");
		const isActive = $parentEl.classList.contains(activeStateName);

		if (!allowMultiple) {
			closeAll();
		}

		if (!isActive) {
			$parentEl.classList.add(activeStateName);
			$bodyEl.style.maxHeight = $bodyEl.scrollHeight + "px";
		} else {
			$parentEl.classList.remove(activeStateName);
			$bodyEl.style.maxHeight = null;
		}
	};

	const closeAll = () => {
		triggers.forEach(($item) => {
			const $parentEl = $item.closest(".accordion__item");
			const $bodyEl = $parentEl.querySelector(".accordion__body");
			$parentEl.classList.remove(activeStateName);
			$bodyEl.style.maxHeight = null;
		});
	};

	triggers.forEach(($trigger) => {
		$trigger.addEventListener("click", () => toggleItem($trigger));

		const $parentEl = $trigger.closest(".accordion__item");
		const $bodyEl = $parentEl.querySelector(".accordion__body");
		if ($parentEl.classList.contains(activeStateName)) {
			$bodyEl.style.maxHeight = $bodyEl.scrollHeight + "px";
		}
	});
};

document.addEventListener("DOMContentLoaded", () => {
	const SELECTORS = {
		wrapper: ".js-accordion",
		trigger: ".js-accordion__trigger",
	};

	const CLASSNAMES = {
		activeItem: "accordion__item--active_state",
	};

	document.querySelectorAll(SELECTORS.wrapper).forEach(($wrapper) => {
		const $triggers = $wrapper.querySelectorAll(SELECTORS.trigger);
		accordion({
			triggers: $triggers,
			activeStateName: CLASSNAMES.activeItem,
			allowMultiple: false,
		});
	});
});

// ____________ tabs ____________________

const tabs = ({ triggers, contents }) => {
	if (!triggers?.length || !contents?.length) return;

	const activateTab = ($trigger) => {
		const tabId = $trigger.getAttribute("data-tab");
		if (!tabId) return;

		triggers.forEach(($el) => $el.removeAttribute("data-active"));
		contents.forEach(($el) => {
			$el.removeAttribute("data-active");
			$el.setAttribute("aria-expanded", "false");
		});

		$trigger.setAttribute("data-active", "");

		const $targetContent = [...contents].find(($el) => $el.getAttribute("data-tab") === tabId);
		if ($targetContent) {
			$targetContent.setAttribute("data-active", "");
			$targetContent.setAttribute("aria-expanded", "true");
		}
	};

	triggers.forEach(($trigger) => {
		$trigger.addEventListener("click", (e) => {
			e.preventDefault();
			activateTab($trigger);
		});
	});
};

document.addEventListener("DOMContentLoaded", () => {
	const SELECTORS = {
		wrapper: ".js-tabs",
		trigger: ".js-tabs-trigger",
		content: ".js-tabs-body [data-tab]",
	};

	document.querySelectorAll(SELECTORS.wrapper).forEach(($wrapper) => {
		const $triggers = $wrapper.querySelectorAll(SELECTORS.trigger);
		const $contents = $wrapper.querySelectorAll(SELECTORS.content);

		tabs({
			triggers: $triggers,
			contents: $contents,
		});
	});
});

// ____________ slide cards ____________________

const beforeAfterSlider = ({ container, afterWrapper, sliderLine, sliderHandle }) => {
	let isDragging = false;

	const moveSlider = (x) => {
		const rect = container.getBoundingClientRect();
		let offsetX = x - rect.left;
		offsetX = Math.max(0, Math.min(offsetX, rect.width));
		const percent = (offsetX / rect.width) * 100;

		afterWrapper.style.width = `${percent}%`;
		sliderLine.style.left = `${percent}%`;
		sliderHandle.style.left = `calc(${percent}% - 31px)`;
	};

	const startDrag = (e) => {
		isDragging = true;
		moveSlider(e.touches ? e.touches[0].clientX : e.clientX);
	};

	const stopDrag = () => {
		isDragging = false;
	};

	const onDrag = (e) => {
		if (!isDragging) return;
		moveSlider(e.touches ? e.touches[0].clientX : e.clientX);
	};

	sliderHandle.addEventListener("mousedown", startDrag);
	sliderHandle.addEventListener("touchstart", startDrag);
	window.addEventListener("mouseup", stopDrag);
	window.addEventListener("touchend", stopDrag);
	window.addEventListener("mousemove", onDrag);
	window.addEventListener("touchmove", onDrag);
};

document.addEventListener("DOMContentLoaded", () => {
	const SELECTORS = {
		wrapper: ".gallery-slide__images",
		after: ".gallery-slide__after_wrapp",
		line: ".gallery-slide__line",
		handle: ".gallery-slide__handle",
	};

	document.querySelectorAll(SELECTORS.wrapper).forEach(($container) => {
		const $afterWrapper = $container.querySelector(SELECTORS.after);
		const $sliderLine = $container.querySelector(SELECTORS.line);
		const $sliderHandle = $container.querySelector(SELECTORS.handle);

		beforeAfterSlider({
			container: $container,
			afterWrapper: $afterWrapper,
			sliderLine: $sliderLine,
			sliderHandle: $sliderHandle,
		});
	});
});

// ____________ swiper ____________________

const swiper = new Swiper(".gallery__swiper", {
	spaceBetween: 18,
	slidesPerView: "auto",
	loop: true,
	spaceBetween: 20,
	allowTouchMove: false,
	autoHeight: true,

	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},

	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	breakpoints: {
		768: {
			spaceBetween: 60,
		},
	},
});
