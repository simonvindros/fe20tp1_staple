// Hämta värde från localStorage
const hasVisitedBefore = JSON.parse(localStorage.getItem('hasVisitedBefore'));
console.log(hasVisitedBefore);

// Hämtar modal
const modal = document.getElementById("landing-modal");

// Hämtar knappen i modal
const btn = document.getElementById("modal-button");

// Visar modulen om användaren inte har besökt sidan tidigare
document.addEventListener('DOMContentLoaded', function() {
    if(!hasVisitedBefore){
        modal.style.display = "block";
    }
}, false);

// När användaren klickar på knappen i modal-rutan stängs den
// Ett värde sparas i localStorage så användaren slipper se modal-rutan igen
btn.onclick = function() {
  modal.style.display = "none";
  localStorage.setItem('hasVisitedBefore', true);
}

// När användaren klickar utanför modal-rutan stängs den
// Ett värde sparas i localStorage så användaren slipper se modal-rutan igen
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}