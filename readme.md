# Headphone Affiliate Site Demo
A quick site I made over a weekend to demonstrate my knowledge of HTML, CSS, Javascript. I attempted to make the site with a modern design: simple yet as apealing as possible; using a limited color pallete, and a general lack of clutter.

![gif of scrolling site](./Site_Photos/Site_Showoff.gif)

# Description
This site was created for a project in a web development course at Elon University. The site goals were extremley open ended: make a site with 20 headphone listings, with a "headphone reccomender" that reccomends headphones based on feeback from questions. Any decisions on how the site was designed visually was up to us. I had a lot of fun building this frontend, and thought I would share it.

One important constraint in the project of note is that we were *only* use HTML CSS and Javascript. No Database functionality. This meant rather awkwardly hardcoding this database of product listings into the Javascript file. Luckily, ECMA 2015 added Classes, which made doing so a little less painful.

Each product object had this structure:

```javascript
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
```
this allowed the javascript object to be created in a similar way to reading records from some non-local database (albeit in an ORM style).

# Usage
Fork the repo, and open the Proj_6.html file in any browser you like. Not much to do after that. Look around. Click some buttons. Stay a while.