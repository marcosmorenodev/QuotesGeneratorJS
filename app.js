//DOM Related Variables

const quoteContainer = document.querySelector(".quote__container");
const categorySelection = document.getElementById("category-selection");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const copyBtn = document.getElementById("copy-btn");
const newQuoteBtn = document.getElementById("quote-btn");
const randomQuoteBtn = document.getElementById("random-quote-btn");
const currentCategoryContainer = document.getElementById("current-category__container");
const currentCategoryEl = document.getElementById("current-category");
const tooltipClipboard = document.getElementById("tooltip-clipboard");
const tooltipRandomQuote = document.getElementById("tooltip-random");

//==============================//

async function fetchQuote(chosenCategory) {
    const API_KEY = "C+TGaQpyttU+pHBklnrBYw==3Uupd21kBNyfEkVT";

    try {
        const res = await fetch('https://api.api-ninjas.com/v1/quotes?category=' + chosenCategory, {
            method: 'GET',
            headers: {
                'X-Api-Key': API_KEY,
                'Content-Type': 'application/json'
            }
        });
    
        if (!res.ok) { checkForError(res.statusText); }
    
        const generatedQuote = await res.json();
        
        createQuoteEl(generatedQuote);
    }

    catch(err) { checkForError(err.message); }
}

function createQuoteEl(data) {
    const {quote, author, category} = data[0]; //* The res itself is an array

    //Uncovers all the important elements
    currentCategoryContainer.classList.remove("hidden");
    quoteEl.classList.remove("hidden");
    authorEl.classList.remove("hidden");
    copyBtn.classList.remove("hidden");
    categorySelection.classList.add("hidden");
    randomQuoteBtn.classList.remove("hidden");
    randomQuoteBtn.addEventListener("click", fetchRandomQuote);

    //And now, it populates their textContent
    currentCategoryEl.textContent = `Current category: ${category}`;
    quoteEl.textContent = quote;  
    authorEl.textContent = author;
    copyBtn.addEventListener("click", copyText);
}

function checkForError(err) {
    const errorEl = document.createElement("h1");

    errorEl.innerHTML = 
    `<h1 id = "error-msg">
        ${new Error(err)}!
    </h1>`;
    
    categorySelection.classList.add("hidden");

    if (quoteEl.textContent && authorEl.textContent) { appendError(errorEl); } //"Replaces" the text inside the quote container for the corresponding error

    else { quoteContainer.insertAdjacentElement("afterbegin", errorEl); }
}

function appendError(errorEl) {
    removeQuoteEl();
    quoteContainer.insertAdjacentElement("afterbegin", errorEl);
}

function removeQuoteEl() { //Pretty self explanatory, "resets" everything
    quoteEl.textContent = "";
    authorEl.textContent = "";

    quoteEl.classList.add("hidden");
    authorEl.classList.add("hidden");
    copyBtn.classList.add("hidden");
    randomQuoteBtn.classList.add("hidden");

    //Turns the "newQuote" button to a "reset" one
    newQuoteBtn.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i>`;
    newQuoteBtn.addEventListener("click", () => { window.location.reload() });
}

function fetchRandomQuote() {
    const optionsArr = categorySelection.options.length;
    const randomOption = Math.floor(Math.random() * optionsArr + 1); //Avoids selecting the first, an empty value
    
    categorySelection.selectedIndex = randomOption; //Randomizes the index value for future usage
    
    //*The line below will randomly assign an option from the "select" element and will fetch a random quote from it, exactly as it would normally be done with a user-chosen category.
    const category = categorySelection.options[randomOption].value;
    
    fetchQuote(category);
}

async function copyText() {
    const quote = quoteEl.textContent;
    const author = authorEl.textContent;
    
    const text = `"${quote}" ${author ? `\n-${author}` : "Unknown"}`;

    try { await navigator.clipboard.writeText(text); }
    
    catch (err) { checkForError(new Error(err.message)); }
}

newQuoteBtn.addEventListener("click", () => {
    const category = categorySelection.value === "" ? checkForError("You must choose a category first") : categorySelection.value;
    
    fetchQuote(category); 
});

// ===== Tooltips =====

tippy(newQuoteBtn, {
    content: "Generates a random quote from the selected category",
    placement: "bottom"
});

tippy(randomQuoteBtn, {
    content: "Generates a random quote from a random category",
    placement: "bottom"
});

tippy(copyBtn, {
    content: "Copies the current quote to the clipboard"
});