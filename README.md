# Quotes Generator

Project made to showcase my skills when it comes to interacting with APIs and updating big chunks of the DOM at once. 

# Requirement

Requires "Live Server" extension found on VS Code store.
You can get it here: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

# Features & Usage

- The user can fetch a quote from their desired category from a "select" type input from https://api-ninjas.com/api/quotes (respect their terms and rights). 

- Button functionality:
    - The "New Quote" button will automatically generate new random quotes from the selected category until changed.
    - The "Generate Random Quote" button will randomize and generate a random quote from the new randomly selected category.
    - And lastly, the "Copy" button which lets the user copy the generated quote to the clipboard.

- About the DOM updating:
    - Enough to say that in order to provide a seamless dynamic content generation experience, the DOM must suffer quite a lot of changes at once, namely, class removal and adding as well as "textContent" updating. See the "createQuoteEl" function for a concrete example.

[!NOTE]
I'm **__not__** responsible for **__any potentially offensive__** quote/s. Contact the API developer/s regarding it.
