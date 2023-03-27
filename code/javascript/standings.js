const btnEl = document.querySelector('.standings-choice-buttons-group-button');   // get the button element

btnEl.addEventListener('mouseover', (event) => { // when the mouse is over the button
    const x = (event.pageX - btnEl.offsetLeft); // get the x position
    const y = (event.pageY - btnEl.offsetTop);  // get the y position

    btnEl.style.setProperty('--xPos', x + 'px'); // set the x position
    btnEl.style.setProperty('--yPos', y + 'px'); // set the y position
});