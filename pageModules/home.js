"use strict";

const hotKits = {
	song51: {
		title: "Trapped In Asia",
		genre: "Pop",
		key: "B Major",
		BPM: 95,
		creator: "Maybon",
		tags: ["Flume", "Asia", "Glitch"],
		startStem: {Drum: false, Melody: false, Bass: true, Lead: true},
		disable: {Drum: false, Melody: false, Bass: false, Lead: false},
		hot: false, //Leave on false.
		price: 0, //$
		discount: 0, //$
		series: "Edvyn Beats vol 1",
	},
	sundayFlowers: {
		title: "Sunday Flowers",
		genre: "Pop",
		key: "C Minor",
		BPM: 130,
		creator: "EDVYN",
		tags: ["Guitar", "Summer", "Happy"],
		startStem: {Drum: false, Melody: true, Bass: false, Lead: true},
		disable: {Drum: false, Melody: false, Bass: false, Lead: false},
		hot: true,
		price: 15, //$
		discount: 0, //$
		series: "Edvyn Beats vol 1",
	},
	song52: {
		title: "Dehli",
		creator: "Maybon",
		genre: "World",
		BPM: 95,
		key: "F# Minor",
		series: "Edvyn Beats vol 1",
		tags: ["Asia", "Indian", "Sitar"],
		price: 9, //$
		discount: 0, //$
		startStem: {Drum: true, Melody: true, Bass: false, Lead: false},
		disable: {Drum: false, Melody: false, Bass: false, Lead: false},
		hot: true,
	},
	song50: {
		title: "Astrotype",
		genre: "Trap",
		key: "B Major",
		BPM: 95,
		creator: "EDVYN",
		tags: ["Travis Scott", "Dark", "Synth"],
		startStem: {Drum: false, Melody: true, Bass: true, Lead: false},
		disable: {Drum: false, Melody: false, Bass: false, Lead: false},
		hot: false,
		price: 10, //$
		discount: 5, //$
		series: "Edvyn Beats vol 1",
	},
};

let chosenKit = null;

const hotKitCont = document.querySelector(".hot-kit-cont");

for (let i = 0; i < Object.keys(hotKits).length; i++) {
	createCard(Object.keys(hotKits)[i]);
}

function createCard(aKit) {
	const currentKit = hotKits[aKit];

	const cardElement = document.createElement("div");
	cardElement.classList.add("card-element");

	const imgCont = document.createElement("div");
	imgCont.classList.add("card-img-cont");

	const cardImg = document.createElement("img");
	cardImg.classList.add("card-img");
	cardImg.classList.add("hot-kit-img");
	cardImg.src = `../../media/coverImg/${currentKit.series}.jpg`;
	console.log(cardImg.src);

	const cardInfo = document.createElement("div");
	cardInfo.classList.add("card-info");

	const lgTxt = document.createElement("h3");
	lgTxt.classList.add("lg-txt");
	lgTxt.innerText = currentKit.title.toString();

	const mdTxt = document.createElement("h4");
	mdTxt.classList.add("md-txt");
	mdTxt.innerText = currentKit.creator;

	const smTxt = document.createElement("h5");
	smTxt.classList.add("sm-txt");
	smTxt.innerText = currentKit.genre;

	const price = document.createElement("div");
	price.classList.add("price");

	if (currentKit.price == 0) {
		price.innerText = "FREE!";
		price.style.backgroundColor = "orange";
	} else {
		if (currentKit.discount != 0) {
			price.innerHTML = '<strike style="color: grey;">' + currentKit.price.toString() + "$ </strike>" + currentKit.discount.toString() + "$";
			price.style.backgroundColor = "orange";
		} else {
			price.innerText = currentKit.price + "$";
		}
	}

	hotKitCont.appendChild(cardElement);
	cardElement.appendChild(imgCont);
	imgCont.appendChild(cardImg);
	cardElement.appendChild(cardInfo);
	cardInfo.appendChild(lgTxt);
	cardInfo.appendChild(mdTxt);
	cardInfo.appendChild(smTxt);
	cardElement.appendChild(price);

	lgTxt.addEventListener("mousedown", function () {
		//window.location.href = `shop.html#!/products/${currentKit.title.toLowerCase()}`;
	});

	lgTxt.addEventListener("mouseover", function () {
		lgTxt.style.color = "orange";
	});
	lgTxt.addEventListener("mouseleave", function () {
		lgTxt.style.color = "white";
	});

	mdTxt.addEventListener("mousedown", function () {
		//window.location.href = `./${currentKit.creator.toLowerCase()}.html`;
	});

	cardElement.addEventListener("mousedown", function () {
		//window.location.href = `shop.html#!/products/${currentKit.title.toLowerCase()}`;
		chosenKit = currentKit.title;
		sessionStorage.setItem("chosenKit", chosenKit);
		//window.location.href = "kits.html";
	});
}
