'use strict';

// Select elements -> cards, body, footer
let cards = document.querySelectorAll('.card');
let body = document.querySelector('body');
let footer = document.querySelector('footer');

// Initialize total price to keep track of favorite items
let totalPrice = 0;

// Create Favorites Section
let favoriteSection = document.createElement('section');
favoriteSection.classList = 'favorite-section';

// Create favorite section Title
let favoriteTitle = document.createElement('h3');
let favoriteTitleText = document.createTextNode('My Favorites');
favoriteTitle.appendChild(favoriteTitleText);

// Create Total Price Title
let totalPriceP = document.createElement('p');
let totalPriceText = document.createTextNode('Total Price: $');
totalPriceP.appendChild(totalPriceText);


// Add all children to favorite section
favoriteSection.appendChild(favoriteTitle);
favoriteSection.appendChild(totalPriceP);

// Add favorite section to the page, before the footer
body.insertBefore(favoriteSection, footer);

// Loop through each card to add functions
for (let card of cards) {
    // Get price and name from data attributes data-name data-price
    let prices = card.dataset.price;
    let name = card.dataset.name;


    // Create div with price and append to card
    let priceDiv = document.createElement('div');
    priceDiv.classList = 'priceDiv-style';
    let priceNode = document.createTextNode(prices);
    priceDiv.appendChild(priceNode);
    card.appendChild(priceDiv);


    // Create button with text and append to card
    let button = document.createElement('button');
    let buttonNode = document.createTextNode('Add To Favorites');
    button.appendChild(buttonNode);
    card.appendChild(button);
    button.addEventListener('click', addToFavorites);


    // Function to add item to favorites section dynamically
    function addToFavorites () {

        // Highlight the cards border that has been added 
        card.classList.toggle('card-style');

        // Create <p> text that includes name and price, and append to favorite section
        let favItem = document.createElement('p');
        favItem.className = 'favorite-item';
        let favNode = document.createTextNode(name + " : " + prices);
        favItem.appendChild(favNode);
        favoriteSection.appendChild(favItem);

        // Update total price, converting the string to a number
        let price = parseFloat(prices.replace('$', ''));
        totalPrice += price;
        totalPriceText.nodeValue = 'Total Price: $' + totalPrice;

        // Change button text to remove and update the event listener to remove function
        buttonNode.nodeValue = 'Remove From Favorites';
        button.removeEventListener('click', addToFavorites);
        button.addEventListener('click', removeFromFavorites);

    }

    // Function to remove item from favorites section dynamically
    function removeFromFavorites () {

        // Remove the card highlight
        card.classList.toggle('card-style');

        //Remove item from favorites section by function
        removeFavItem();

        // Update total price
        let price = parseFloat(prices.replace('$', ''));
        totalPrice -= price;
        totalPriceText.nodeValue = 'Total Price: $' + totalPrice;

        // Change button text to add and update the event listner to add function
        buttonNode.nodeValue = 'Add To Favorites';
        button.removeEventListener('click', removeFromFavorites);
        button.addEventListener('click', addToFavorites);
    }

    /*
    Function to remove favorite item
    loops through favorite section class list 
    and selects item that matches data-name data-price description
    */
    function removeFavItem() {
        // loop through all children that have been appended to favorite section
        for(let i in favoriteSection.children) {
            // check at every index in favorite section if text content matches the cards name and price
            if(favoriteSection.children[i].textContent == (name + " : " + prices)) {
                // If matches, remove that child from favorite section
                favoriteSection.removeChild(favoriteSection.children[i]);
                // Exit the loop
                break;
            }
        }
    }
}


