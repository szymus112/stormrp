let currentShopCategory = "zestawy";
let cooldown = false;

setTimeout(() => {
  $(".loading").css("display", "none");
  $("#root").css("display", "block");
  $("#zestawy").css("display", "block");

  setTimeout(() => {
    AOS.init({ once: true });

    const observerRight = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("rightToLeft");
        }
      });
    });

    const observerLeft = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("leftToRight");
        }
      });
    });

    observerRight.observe(document.querySelector("#box-1"));
    observerLeft.observe(document.querySelector("#box-2"));
    observerRight.observe(document.querySelector("#box-3"));
  }, 100);
}, 2100);

function contact() {
  $(".contact-popup").css("display", "block");
  $(".contact-popup").fadeOut(0);
  $(".contact-popup").fadeIn(500);
}

function closePopup() {
  $(".contact-popup").fadeOut(500);
  setTimeout(() => {
    $(".contact-popup").css("display", "none");
  }, 600);
}

function changeCategory(elem, newCategory) {
  if (!cooldown) {
    cooldown = true;
    if (document.querySelectorAll(".categories > .selected")[0]) {
      document
        .querySelectorAll(".categories > .selected")[0]
        .classList.remove("selected");
    }
    elem.classList.add("selected");
    $("#" + currentShopCategory).animate(
      {
        left: "-200%",
      },
      275,
      function () {
        $("#" + currentShopCategory).css("display", "none");
        $("#" + newCategory).css("left", "200%");
        $("#" + newCategory).css("display", "block");
        $("#" + newCategory).animate(
          {
            left: "50%",
          },
          275,
          function () {
            currentShopCategory = newCategory;
            cooldown = false;
          }
        );
      }
    );

    document.getElementById("category-mobile-container").style.dispaly = "none";
  }
}

function closeShopPopup() {
  $(".shop-details-popup").css("display", "none");
}

function showBuyPopup(name) {
  document.getElementById("details-image").src = document
    .getElementById(name)
    .querySelectorAll("img")[0].src;
  document.getElementById("details-label").textContent = document
    .getElementById(name)
    .querySelectorAll(".label")[0].textContent;
  document.getElementById("details-price").textContent = document
    .getElementById(name)
    .querySelectorAll(".price")[0].textContent;
  // document.getElementById('cena').value = document.getElementById(name).querySelectorAll('.price')[0].textContent;
  console.log(
    document.getElementById(name).querySelectorAll(".cenafirst")[0].value
  );
  $("#cenapop").val(
    document.getElementById(name).querySelectorAll(".cenafirst")[0].value
  );
  $("#productidpop").val(
    document.getElementById(name).querySelectorAll(".productid")[0].value
  );

  if (name == "ub1" || name == "ub2" || name == "ub3") {
    $("#banid").fadeIn(0);
  } else {
    $("#banid").fadeOut(0);
  }

  $(".shop-details-popup").css("display", "block");
}

function insertAsThird(element, parent) {
  if (parent.children.length > 2) {
    parent.insertBefore(element, parent.children[2]);
  } else parent.appendChild(element);
}

let navbar = false;

function toggleNavbar() {
  navbar = !navbar;
  if (navbar) {
    $(".navbar > .buttons").css("display", "flex");
  } else {
    $(".navbar > .buttons").css("display", "none");
  }
}

function getPlayers() {
  const url =
    "https://api.codetabs.com/v1/proxy/?quest=http://83.168.68.86:30120/players.json";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById(
        "people"
      ).innerHTML = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>FiveM</title><path d="M22.4 24h-5.225c-.117 0-.455-1.127-1.026-3.375-1.982-6.909-3.124-10.946-3.417-12.12l3.37-3.325h.099c.454 1.42 2.554 7.676 6.299 18.768ZM12.342 7.084h-.048a3.382 3.385 0 0 1-.098-.492v-.098a102.619 102.715 0 0 1 3.272-3.275c.13.196.196.356.196.491v.05a140.694 140.826 0 0 1-3.322 3.324ZM5.994 10.9h-.05c.67-2.12 1.076-3.209 1.223-3.275L14.492.343c.08 0 .258.524.533 1.562zm1.37-4.014h-.05C8.813 2.342 9.612.048 9.71 0h4.495v.05a664.971 664.971 0 0 1-6.841 6.839Zm-2.69 7.874h-.05c.166-.798.554-1.418 1.174-1.855a312.918 313.213 0 0 1 5.71-5.717h.05c-.117.672-.375 1.175-.781 1.52zM1.598 24l-.098-.05c1.399-4.172 2.148-6.322 2.248-6.45l6.74-6.694v.05C10.232 11.88 8.974 16.263 6.73 24Z"/></svg> Aktualnie gra: ${data.length} osób`;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

getPlayers();

setInterval(() => {
  getPlayers();
}, 2000);

let mobileCategory = false;

function toggleMobileCategory() {
  mobileCategory = !mobileCategory;
  if (mobileCategory) {
    document.getElementById("category-mobile-container").style.display =
      "block";
    document.getElementById(currentShopCategory).style.display = "none";
  } else {
    document.getElementById("category-mobile-container").style.display = "none";
    document.getElementById(currentShopCategory).style.display = "block";
  }
}

const postScroll = document.getElementById("categories");
let scrollingHorizontally = true;

postScroll.addEventListener("wheel", (event) => {
  if (scrollingHorizontally) {
    postScroll.scrollBy({
      left: event.deltaY < 0 ? -70 : 70,
    });
    event.preventDefault();

    // check if the user has reached the end of the slider
    // if (postScroll.scrollLeft >= postScroll.scrollWidth - postScroll.clientWidth) {
    //   scrollingHorizontally = false;
    //   postScroll.style.overflowY = "auto";
    // }
  } else {
    // (scroll the page up/down)
    return true;
  }
  
});
