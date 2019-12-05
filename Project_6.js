function recommendButtonPressed(answerYes){
	setPromptText();

}

function fadeOutElementText(element_id){

}

function refineCheckButtonSelection(listing_name){
	let selectorElements = document.getElementsByName("Headphone_Selector");
	document.getElementsByClassName("selection-list")[0].innerHTML = "";
	for(let i=0;i<selectorElements.length;i++){
		element = selectorElements[i];
		if(element.checked){
			console.log();
			for(let j=0;j<productMockDB[element.id].length;j++){ 
				showProduct(productMockDB[element.id][j]) // make mocked DB call here
			}
		}
	}
}

function displayRecommenderListings(listingType){
	prodList = productMockDB[listingType]; // again, mocked DB call
	
	for(let i=0;i<prodList.length;i++){
		document.getElementsByClassName("selection-list")[1].appendChild(prodList[i].generateProductElement());
	}
}


function showProduct(productListing){
	document.getElementsByClassName("selection-list")[0].appendChild(productListing.generateProductElement());
}


class ProductListing{
	constructor(prod_name, price, description, img_src, link_src){
		this.prod_name = prod_name;
		this.price = price;
		this.description = description;
		this.img_src = img_src;
		this.link_src = link_src;
	}

	generateProductElement(){
		let img_html = '<a href="' + this.link_src + '" target="_blank"> <img src="' + this.img_src + '"></a>';
		let title_html = '<h2>' + this.prod_name + " - $" + this.price + '</h2>';
		let description = '<p>' + this.description+  '</p>'
		let product_div = document.createElement("div");
		product_div.innerHTML = img_html + '<div class="product-text">' + title_html + description + '</div>';
		return product_div;
	}
}


class PromptInfo{
	constructor(promptList){
		this.currentQuestionIdx = 0;
		this.promptList = promptList;
		this.selections = {over_ear:0, sports:0, earbuds:0};
	}


	renderPromptText(isYes){
		let currentPromptElement = document.getElementById("prompt-text");
		this.currentQuestionIdx++;
		

		if(this.currentQuestionIdx < this.promptList.length){
			let currentQuestion = this.promptList[this.currentQuestionIdx];
			currentPromptElement.innerHTML = currentQuestion.question;
			
			if(currentQuestion.question ==="Were these Questions Relevant to You?"){
				document.getElementsByClassName("recommender-button")[1].innerHTML = "Hell Yes";
			}

			if(isYes){
				this.selections[currentQuestion.itemYes]++;
			} else {
				this.selections[currentQuestion.itemNo]++;
			}

		} else if(this.currentQuestionIdx === this.promptList.length) {
			currentPromptElement.innerHTML = 'Dope. Check These Out:';
			let selection = this.getTopSelection();
			displayRecommenderListings(selection);
			

		} else {

		}
	}

	restart(){
		this.selections = {over_ear:0, sports:0, earbuds:0};
		this.currentQuestionIdx =0;
		this.setPromptText();
		document.getElementsByClassName("recommender-button")[1].innerHTML = 'No';
		document.getElementsByClassName("selection-list")[1].innerHTML = '';

	}

	setPromptText(){
		document.getElementById("prompt-text").innerHTML = this.promptList[this.currentQuestionIdx].question;
	}

	getTopSelection(){
		let topSelection = null;
		let topCount =0;
		for(let item in this.selections){
			let itemVal = this.selections[item];
			if(itemVal >topCount){
				topCount = itemVal;
				topSelection = item;
			}
		}
		return topSelection;
	}
}


class Question {
	constructor(question, itemYes, itemNo){
		this.question = question;
		this.itemYes = itemYes;
		this.itemNo = itemNo;
	}
}

// Note, Any images that are just stock images (or not found online for retail anywhere) just link back to this site.


var productMockDB = {
	over_ear:[
		new ProductListing("Sony Swaggem 300s", "500.00",
						   "Dang Bro/Brodette. You are stylin in them things. Black on black cups on grips??? Oh lawd somebody stop you.",
		 				   "./Photos/over_ear_001.png", "https://www.amazon.com/Sony-XB950B1-Wireless-Headphones-Control/dp/B01N5UVZBP/ref=sr_1_18?qid=1575428789&refinements=p_89%3ASony%2Cp_n_feature_two_browse-bin%3A509316&s=aht&sr=1-18"),

		new ProductListing("Silver 2s", "200.00", "Your rank in League of Legends. And the name of your next great purchase.", "./Photos/over_ear_002.png", "https://www.amazon.com/CANYON-Railwhip-Headphones-Pilot-look-Orange/product-reviews/B0045Y0ZLQ"),
		
		new ProductListing("Tech Support 7s", "200.00",
						   `Shaking uncontrollably because you didn't get your coffee fix this morning? 
						   <i>Pissed</i> because Karen called your team into work <u>early</u> for another pointless meeting? 
						   AGAIN KAREN?! ...You might hate this office, but damn, that headset looks good over 
						   that sweaty brow of yours.`,
						   "./Photos/over_ear_003.png", "https://www.amazon.com/Telex-Lightweight-Single-Sided-Broadcast-Microphone/dp/B07MHJSYBD/ref=sr_1_36?keywords=rts+headset&qid=1575429105&sr=8-36"),
		

		new ProductListing("Square Squadron 540s", "225.00", "They certainly can't call you a square after this purchase.", "./Photos/over_ear_004.png", "https://www.amazon.com/Sony-MDR-XB650BT-Bluetooth-Wireless-Headphones/dp/B01MSWZBGM/ref=sr_1_64?qid=1575429194&refinements=p_89%3ASony&s=aht&sr=1-64"),
		new ProductListing("Purple Beats", "200.00", "Purple Beats.", "./Photos/over_ear_005.png", "https://www.amazon.com/Beats-EP-On-Ear-Headphones-Red/dp/B01LYIN5V7?ref_=fsclp_pl_dp_14"),
		new ProductListing("High Flyer 2019s", "50,000.00", "Real talk, you can't wear these unless your whole outfit is earth-shatteringly fly. For men and women with that straight <i>drip</i> only.", "./Photos/over_ear_006.png", "https://www.amazon.com/Sennheiser-HD-598-SR-Open-Back/dp/B06WRMZZ45"),
		new ProductListing("HMD 300 PRO", "300.00", "Top quality audio. Sennheiser really doesn't mess around.", "./Photos/over_ear_007.png", "https://www.amazon.com/Sennheiser-Headphones-Black-HMD-PRO-XQ-2/dp/B07G4JHTFV/ref=sr_1_1?crid=1N03IIR328PUS&keywords=hmd+300+pro&qid=1575429388&s=electronics&sprefix=hmd+300%2Celectronics%2C124&sr=1-1"),
		new ProductListing("NBA Prospect 3s", "1,100.00", "Listen, the recruiter did not <i>bribe</i> me. These headphones just... uh... <i>happened</i> to have been misplaced into my possenion... by the recruiter.", "./Photos/over_ear_008.png", "https://www.amazon.com/Sony-MDRXB950BT-Extra-Bluetooth-Headphones/dp/B017TTACNO")

	],

	sports:[
		new ProductListing("Splash 2019s", "67.00", "For those of you who need a little more color in your daily life, and on the go.", "./Photos/sports_001.png", "https://audionic.co/"),
		new ProductListing("SHURE", "359.00 (Actual Price, No Lie)", "Hahahaha these look so uncomfortable; can you imagine wearing these?! Hahaha... *wipes tear* <b>Buy now.</b>", "./Photos/sports_002.png", "https://www.amazon.com/Shure-Wireless-Earphones-Bluetooth-Isolating/dp/B07W6S1FG7/ref=sr_1_9?keywords=shure+headphones&qid=1575429554&s=electronics&sr=1-9"),
		new ProductListing("Gaudy 1080s", "900.00", "The type of headphones Karen would wear.", "./Photos/sports_003.png", "http://www.buffalo-asia.com/forhome/mobile_life/earphone/bsep16-ap/"),
		new ProductListing("These Count", "122.00", "I'm almost certain that this is just a hearing aid... There are only so many transparent images of headphones, so I'll give you some rope and you can cut me some slack.", "./Photos/sports_004.png", "https://www.amazon.com/BlueAnt-Bluetooth-Headset-Multipoint-Promotional/dp/B0048J4ETW"),
		new ProductListing("Running Out of Jokes 3s", "20.00", "See above.", "./Photos/sports_005.png", ""),
	],

	earbuds:[
		
		new ProductListing("Circle K 5's", "12.00", "These headphones will literally break in under 3 days. Horrible quality. Horrible sound. Horrible. Spend your money on a slurpee instead.", "./Photos/earbuds_001.png", "https://www.indiamart.com/proddetail/mobile-handsfree-9864799097.html"),
		new ProductListing("Power Pro Elite", "200.00", "The highest quality buds we got.", "./Photos/earbuds_003.png", "https://www.amazon.com/Earphones-Licoers-Universal-Headphones-Isolating/dp/B07BHLHF92"),
		new ProductListing("Circle K 6's", "13.78", "Quite an upgrade from the pervious version. You can get up to around 4 days of moderately awful quality sound out of these. Worth the increased price.", "./Photos/earbuds_002.png", ""),
		new ProductListing("Genericz", "58.00", "... These headphones are getting so generic it's hard to find something to say about them... uh... they are very... functional...?", "./Photos/earbuds_004.png", ""),
		new ProductListing("Genericz 2s", "40.00", "Uh... kinda putting me on the spot here. Okay um, yall see the new Scorsese movie? It was uh... pretty good. *twittles thumbs* ... you ...er... come here often?", "./Photos/earbuds_005.png", ""),
		new ProductListing("Season 2 Ep 3", "Priceless", "Baaaaybe. Now my head is on backwards... and my feet at funny angles... and every time I take a step We're moooving forward faster. And latley I can't take it... baaaaaybe.", "./Photos/earbuds_006.png", "https://www.amazon.com/Williams-Sound-Pocketalker-Ultra-2-0/dp/B0161LU5YM"),
		new ProductListing("Lorem Ipsum OGs", "900.00", "Wow... you <i>actually</i> read through all of these. What a square. We got headphones for that.", "./Photos/earbuds_007.png", "")
	]
};


refineCheckButtonSelection();
var promptTextMockDB = [
	new Question('Are You Frequently on the Go?', 'earbuds','over_ear'),
	new Question('Do You go to the Gym Often?','sports','earbuds'),
	new Question('Is Style > Sound Quality?', 'over_ear','earbuds'),
	new Question('Do you Like Long Walks?', 'earbuds', 'sports'),
	new Question('Are you On a Budget?', 'earbuds','over_ear'),
	new Question('Do you Like Running?','sports', 'over_ear'),
	new Question('Can you Dunk?', 'sports', 'over_ear'),
	new Question("Don't lie to me, I <i>know</i> you at this point, right?", 'earbuds', 'sports'),
	new Question("I'll ask again: <i>can you dunk a basketball yes or no?</i>",'sports','over_ear'),
	new Question("Were these Questions Relevant to You?", '', '')


];
promptSection = new PromptInfo(promptTextMockDB);
promptSection.setPromptText();