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

// ____________ utils ____________________

const resize = (callback, { callOnInit = true, debounceTime = 15 } = {}) => {
	if (!callback || typeof callback !== "function") return;

	const onResize = debounceTime > 0 ? debounce(debounceTime, () => callback(getWindowSize())) : () => callback(getWindowSize());

	window.addEventListener("resize", onResize);

	if (callOnInit) callback(getWindowSize());

	return () => window.removeEventListener("resize", onResize);
};

const getWindowSize = () => {
	return {
		windowWidth: window.innerWidth,
		windowHeight: window.innerHeight,
	};
};

const debounce = (delay, fn) => {
	let timerId;
	return (...args) => {
		if (timerId) clearTimeout(timerId);
		timerId = setTimeout(() => {
			fn(...args);
			timerId = null;
		}, delay);
	};
};

// ____________ accordion ____________________

const accordion = ({ triggers, activeStateName, allowMultiple = false }) => {
	if (!triggers?.length) return;

	const toggleItem = ($trigger) => {
		const $parentEl = $trigger.closest(".js-accordion-item");
		const $bodyEl = $parentEl.querySelector(".js-accordion-body");
		const isActive = $parentEl.classList.contains(activeStateName);

		if (!allowMultiple) closeAll();

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
			const $parentEl = $item.closest(".js-accordion-item");
			const $bodyEl = $parentEl.querySelector(".js-accordion-body");
			$parentEl.classList.remove(activeStateName);
			$bodyEl.style.maxHeight = null;
		});
	};

	const updateOpenHeights = () => {
		triggers.forEach(($trigger) => {
			const $parentEl = $trigger.closest(".js-accordion-item");
			const $bodyEl = $parentEl.querySelector(".js-accordion-body");
			if ($parentEl.classList.contains(activeStateName)) {
				$bodyEl.style.maxHeight = $bodyEl.scrollHeight + "px";
			}
		});
	};

	triggers.forEach(($trigger) => {
		$trigger.addEventListener("click", () => toggleItem($trigger));
	});

	updateOpenHeights();

	resize(updateOpenHeights);
};

const initAccordion = () => {
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
};

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

const initTabs = () => {
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
};

// ____________ gallery swiper ____________________

const initGallerySwiper = () => {
	new Swiper(".js-gallery-swiper", {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		allowTouchMove: false,
		autoHeight: true,
		keyboard: {
			enabled: true,
		},
		mouse: {
			enabled: true,
		},
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
};

// ____________ slide cards ____________________

const imageGallery = ({ containers }) => {
	if (!containers?.length) return;

	containers.forEach(($container) => {
		const $slider = $container.querySelector(".js-gallery-slide-images");
		const $afterWrapper = $container.querySelector(".js-gallery-slide-after");
		const $handle = $container.querySelector(".js-gallery-slide-handle");

		if (!$slider || !$afterWrapper || !$handle) return;

		let isDragging = false;

		const onMove = (event) => {
			if (!isDragging) return;

			const rect = $slider.getBoundingClientRect();
			const sliderWidth = $slider.clientWidth;
			const handleWidth = $handle.clientWidth;

			let x = (event.clientX || event.touches?.[0]?.clientX) - rect.left;
			x = Math.max(0, Math.min(x, sliderWidth));

			const percent = (x / sliderWidth) * 100;

			$afterWrapper.style.width = `${(100 - percent).toFixed(4)}%`;
			$handle.style.left = `calc(${percent.toFixed(4)}% - ${handleWidth / 2}px)`;
		};

		const startDrag = (event) => {
			event.preventDefault();
			isDragging = true;
			onMove(event);
		};

		const stopDrag = () => {
			isDragging = false;
		};

		$handle.addEventListener("mousedown", startDrag);
		$handle.addEventListener("touchstart", startDrag);

		window.addEventListener("mousemove", onMove);
		window.addEventListener("touchmove", onMove);

		window.addEventListener("mouseup", stopDrag);
		window.addEventListener("touchend", stopDrag);
		window.addEventListener("mouseleave", stopDrag);
	});
};

const initImageGallery = () => {
	const SELECTORS = {
		wrapper: ".js-image-gallery",
	};

	const $sliders = document.querySelectorAll(SELECTORS.wrapper);

	imageGallery({
		containers: $sliders,
	});
};

// ____________ gallery swiper ____________________

const initCertificatesSwiper = () => {
	new Swiper(".js-certificates-swiper", {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		autoHeight: true,
		keyboard: {
			enabled: true,
		},
		mouse: {
			enabled: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			480: {
				spaceBetween: 20,
				slidesPerView: 2,
			},
			768: {
				spaceBetween: 40,
				slidesPerView: 3,
			},
		},
	});
};
// ____________ burger ____________________

const burger = ({ header, burger, menu }) => {
	if (!header || !burger || !menu) return;

	const toggleClasses = () => {
		burger.classList.toggle("active");
		menu.classList.toggle("active");
		document.body.classList.toggle("scroll-lock");
		document.body.classList.toggle("body--overflow");
	};

	const closeMenu = () => {
		burger.classList.remove("active");
		menu.classList.remove("active");
		document.body.classList.remove("scroll-lock");
		document.body.classList.remove("body--overflow");
	};

	burger.addEventListener("click", (event) => {
		event.preventDefault();
		toggleClasses();
		window.scrollTo(0, 0);
	});

	document.addEventListener("click", (event) => {
		const isClickInsideHeader = header.contains(event.target);
		const isMenuActive = menu.classList.contains("active");

		if (!isClickInsideHeader && isMenuActive) {
			closeMenu();
		}
	});

	resize(({ windowWidth }) => {
		if (windowWidth > 1024) {
			closeMenu();
		}
	});
};

const initBurger = () => {
	const SELECTORS = {
		header: ".js-header",
		burger: ".js-burger",
		menu: ".js-header-nav",
	};

	const header = document.querySelector(SELECTORS.header);
	const burgerTrigger = document.querySelector(SELECTORS.burger);
	const menu = document.querySelector(SELECTORS.menu);

	burger({
		header,
		burger: burgerTrigger,
		menu,
	});
};

// ____________ navigation ____________________

gsap.registerPlugin(ScrollTrigger);

const stickyNav = () => {
	const navSection = document.querySelector(".js-navigation");
	const navLinks = document.querySelectorAll(".js-navigation-link");

	if (!navSection || !navLinks.length) return;

	ScrollTrigger.create({
		trigger: navSection,
		start: "top top",
		end: 99999,
		toggleClass: {
			targets: navSection,
			className: "navigation--sticky",
		},
	});

	const sections = [...navLinks]
		.map((link) => {
			const id = link.getAttribute("href")?.replace("#", "");
			const section = document.getElementById(id);
			return section ? { link, section } : null;
		})
		.filter(Boolean);

	sections.forEach(({ link, section }, index) => {
		const isLast = index === sections.length - 1;

		ScrollTrigger.create({
			trigger: section,
			start: isLast ? "top bottom-=100" : "top center+=100",
			end: isLast ? "bottom bottom" : "bottom center-=100",
			onEnter: () => setActiveLink(link),
			onEnterBack: () => setActiveLink(link),
			onUpdate: (self) => {
				if (self.isActive) setActiveLink(link);
			},
			refreshPriority: -1,
		});
	});

	function setActiveLink(activeLink) {
		document.querySelectorAll(".js-navigation-item").forEach((item) => item.classList.remove("navigation__item--active"));
		const parentItem = activeLink.closest(".js-navigation-item");
		if (parentItem) parentItem.classList.add("navigation__item--active");
	}

	resize(() => {
		ScrollTrigger.refresh(true);
	});

	window.addEventListener("load", () => {
		setTimeout(() => {
			ScrollTrigger.refresh(true);
		}, 100);
	});
};

// ____________ tel input validation ____________________

const phoneMask = ({ input }) => {
	if (!input) return;

	const formatPhoneInput = () => {
		let value = input.value.replace(/\D/g, "");
		value = value.slice(0, 12);

		let result = "+";

		if (value.startsWith("380")) {
			result += "380 ";
			if (value.length > 3) result += "(";
			if (value.length > 5) result += value.slice(3, 5) + ") ";
			else if (value.length > 3) result += value.slice(3);
			if (value.length > 8) result += value.slice(5, 8) + "-";
			else if (value.length > 5) result += value.slice(5);
			if (value.length > 10) result += value.slice(8, 10) + "-";
			else if (value.length > 8) result += value.slice(8);
			if (value.length > 10) result += value.slice(10, 12);
		} else {
			if (value.startsWith("0")) {
				value = "380" + value.slice(1);
			} else if (!value.startsWith("3")) {
				value = "380" + value;
			}

			result = "+380 ";
			if (value.length > 3) result += "(";
			if (value.length > 5) result += value.slice(3, 5) + ") ";
			else if (value.length > 3) result += value.slice(3);
			if (value.length > 8) result += value.slice(5, 8) + "-";
			else if (value.length > 5) result += value.slice(5);
			if (value.length > 10) result += value.slice(8, 10) + "-";
			else if (value.length > 8) result += value.slice(8);
			if (value.length > 10) result += value.slice(10, 12);
		}

		input.value = result;
	};

	const isValidPhone = (phone) => {
		const cleaned = phone.replace(/\D/g, "");
		return /^380\d{9}$/.test(cleaned);
	};

	input.addEventListener("input", formatPhoneInput);

	input.closest("form").addEventListener("submit", (e) => {
		if (!isValidPhone(input.value)) {
			e.preventDefault();
			input.classList.add("input--error");
		} else {
			input.classList.remove("input--error");
		}
	});
};

const initPhoneMask = () => {
	const SELECTORS = {
		input: "input[type='tel']",
	};

	const inputs = document.querySelectorAll(SELECTORS.input);

	inputs.forEach((input) => {
		phoneMask({
			input,
		});
	});
};

// ____________ main ____________________

const main = () => {
	initAccordion();
	initTabs();
	initGallerySwiper();
	initCertificatesSwiper();
	initImageGallery();
	initBurger();
	stickyNav();
	initPhoneMask();
};

window.onload = () => {
	main();
};
