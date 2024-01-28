//Function for image loading

//RESIZE EVENTS
function resize() {
	if (document.URL.includes("index.html")) {
		const headerCont = document.querySelector(".header-cont");

		if (window.innerWidth < 576) {
			headerCont.style.backgroundSize = "100%";
			headerCont.style.backgroundPosition = "center center";
		} else if (window.innerWidth > 1000) {
			headerCont.style.backgroundPosition = `center -100px`;
		} else {
			headerCont.style.backgroundSize = "100%";
			headerCont.style.backgroundPosition = `center -40px`;
		}
	}
}

resize();

window.addEventListener("resize", () => {
	resize();
});

//SCROLL EVENTS
window.addEventListener("scroll", () => {
	const body = document.body,
		html = document.documentElement;
	const screenHeight = screen.height;
	const pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - screenHeight;
	const scrolled = ((window.scrollY / pageHeight) * 100).toFixed(2);

	//html elements:
	const navbar = document.getElementById("navbar");

	if (document.URL.includes("index.html")) {
		const headerCont = document.querySelector(".header-cont");
		const headerIndex = document.querySelector(".header-index");

		if (scrolled > 0 && scrolled < 20) {
			headerIndex.style.marginLeft = (scrolled * 2).toString() + "%";
			if (window.innerWidth > 1300) {
				headerCont.style.backgroundPosition = `center ${-100 + -scrolled * 28}px`;
			} else if (window.innerWidth > 576) {
				headerCont.style.backgroundPosition = `center ${-40 + -scrolled * 10}px`;
			}
		}
	}

	if (scrolled <= 1) {
		navbar.style.boxShadow = "0px 0px 0px #00000000";
	} else {
		navbar.style.boxShadow = "2px 2px 25px 10px #000000";
	}
});

//OBSERVER EVENTS - OBS

//INDEX.HTML
if (document.URL.includes("index.html")) {
	const stemSelector = document.querySelector(".stem-selector-appear");
	const stemSelectorObs = new IntersectionObserver((entries) => {
		stemSelector.classList.toggle("fade-in", entries[0].isIntersecting);
	});

	const sc1 = document.querySelector(".sc1");
	const sc2 = document.querySelector(".sc2");
	const sc3 = document.querySelector(".sc3");
	const sc4 = document.querySelector(".sc4");

	const sc1Obs = new IntersectionObserver((entries) => {
		sc1.classList.toggle("slide-in", entries[0].isIntersecting);
	});
	const sc2Obs = new IntersectionObserver((entries) => {
		sc2.classList.toggle("slide-in", entries[0].isIntersecting);
	});
	const sc3Obs = new IntersectionObserver((entries) => {
		sc3.classList.toggle("slide-in", entries[0].isIntersecting);
	});
	const sc4Obs = new IntersectionObserver((entries) => {
		sc4.classList.toggle("slide-in", entries[0].isIntersecting);
	});

	const filterBody = document.querySelector(".filter-body");
	const filterBodyObs = new IntersectionObserver((entries) => {
		for (let i = 1; i <= 4; i++) {
			const circle = document.querySelector(`.circle${i}`);
			circle.classList.toggle("filter-anim", entries[0].isIntersecting);
		}
		//filterBody.classList.toggle('fade-in', entries[0].isIntersecting);
	});

	stemSelectorObs.observe(stemSelector);
	sc1Obs.observe(sc1);
	sc2Obs.observe(sc2);
	sc3Obs.observe(sc3);
	sc4Obs.observe(sc4);
	filterBodyObs.observe(filterBody);
}

//ABOUT.HTML

if (document.URL.includes("about.html")) {
	const box1 = document.querySelector("#box1");
	const box1Obs = new IntersectionObserver((entries) => {
		box1.classList.toggle("fade-in", entries[0].isIntersecting);
	});
	if (box1.style.opacity < 0.2) {
		box1Obs.observe(box1);
	}
	const box2 = document.querySelector("#box2");
	const box2Obs = new IntersectionObserver((entries) => {
		box2.classList.toggle("fade-in", entries[0].isIntersecting);
	});

	box2Obs.observe(box2);

	const box3 = document.querySelector("#box3");
	const box3Obs = new IntersectionObserver((entries) => {
		box3.classList.toggle("fade-in", entries[0].isIntersecting);
	});

	box3Obs.observe(box3);

	const box4 = document.querySelector("#box4");
	const box4Obs = new IntersectionObserver((entries) => {
		box4.classList.toggle("fade-in", entries[0].isIntersecting);
	});

	box4Obs.observe(box4);

	const box5 = document.querySelector("#box5");
	const box5Obs = new IntersectionObserver((entries) => {
		box5.classList.toggle("fade-in", entries[0].isIntersecting);
	});

	box5Obs.observe(box5);

	const box6 = document.querySelector("#box6");
	const box6Obs = new IntersectionObserver((entries) => {
		box6.classList.toggle("fade-in", entries[0].isIntersecting);
	});

	box6Obs.observe(box6);
}
