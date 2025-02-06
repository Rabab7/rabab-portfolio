let moonIcon = document.querySelector("#moon");
let listItems = document.querySelectorAll('.nav ul a')


const skillsOffset = $("#skills").offset().top
$(window).on("scroll" , function(){
    if($(window).scrollTop() > skillsOffset){
        $("#navbar").addClass("fixed")
        $(".scroll-to-top").fadeIn(1000)

    }else{
        $("#navbar").removeClass("fixed")
        $(".scroll-to-top").fadeOut(500)
    }
})


$(".scroll-to-top").on("click" , function(){
    $("html , body").animate({scrollTop : 0} , 500);
})

$("#navbar ul li a").on("click" , function(){
    const currentSection = $(this).attr("href")
    const currentSectionOffsetTop = currentSection.offset().top
    $("html , body").animate({screenTop : currentSectionOffsetTop} ,2000 )
})

   

// dropdown menun

const menuButton = document.querySelector('.fa-bars'); // The bars icon
const dropdownMenu = document.getElementById('dropdownmenun'); // The dropdown menu
const menuLinks = dropdownMenu.querySelectorAll('a'); // Links inside the dropdown menu

// Initially hide the dropdown menu
dropdownMenu.classList.add("hidden");

// Toggle the dropdown menu on bars icon click
menuButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle("hidden");
});

// Close the dropdown menu when any link is clicked
menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    dropdownMenu.classList.add("hidden");
  });
});



// dark mode



let theme = localStorage.getItem("theme");
document.documentElement.classList.add(theme);



moonIcon.addEventListener("click", function () {
  if (theme === "light") {
    theme = "dark";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.add("dark");
  } else {
    theme = "light";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove("dark");
  }
});




//listItems

listItems.forEach((item)=>
{
  item.addEventListener('click' , ()=>{
    listItems.forEach( (a)=>{
      a.classList.remove('font-extrabold')
    })
    item.classList.remove('font-semibold')
    item.classList.add('font-extrabold')

  })

})

 

// Show projects related to clicked button
// Get all filter buttons and project cards
const filterButtons = document.querySelectorAll("#projects button[data-filter]");
const projectCards = document.querySelectorAll("#projects #projectCards > div");

// Add event listeners to filter buttons
filterButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default button behavior (form submission or page reload)

    filterButtons.forEach(btn => btn.classList.remove("active"))
    button.classList.add("active")

    // Get the filter value from the button's data-filter attribute
    const filterValue = button.getAttribute("data-filter");

    // Loop through all project cards
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute("data-name");

      // Show or hide cards based on the filter
      if (filterValue === "all" || cardCategory === filterValue) {
        card.classList.remove("hidden"); // Show the card
      } else {
        card.classList.add("hidden"); // Hide the card
      }
    });


    
    });
});





   
