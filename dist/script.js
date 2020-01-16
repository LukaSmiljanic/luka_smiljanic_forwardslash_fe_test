/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
/*function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};*/

// Sticky header on scroll
window.onscroll = function() {
  stickyHeader();
};

var header = document.getElementById("navbar");
var sticky = header.offsetTop;

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

//Populate star icon

function changeColor() {
  var icon = document.getElementById("far fa-star");
  icon.style.color = "yellow";
}

//Collapsible
var coll = document.getElementsByClassName("asdasd");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// Show/hide

$(".starAndImg").click(function() {
  $(this).toggleClass("far fa-star");
  $(this).toggleClass("fas fa-star");
});

// Open/close
$(document).ready(function() {
  $(".showfilter").hide();
  $(".product1").on("click", function() {
    var state = $(this)
      .next(".showfilter")
      .is(".open");
    if (state) {
      $(this)
        .next(".showfilter")
        .removeClass("open")
        .fadeOut();
    } else {
      $(this)
        .next(".showfilter")
        .addClass("open")
        .slideDown()
        .siblings(".showfilter")
        .removeClass("open")
        .slideUp();
    }
  });
});

// Filters

$("select").on("change", function(e) {
  $("div").text($(this).val());
});

// Dropdown buttons
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches(".filters")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// Favorite star

$(".starAndImg").click(function() {
  $("#receita-div").slideToggle(1, function() {
    //
    //  if you want to toogle at the eend of animation
    //
    //$("#btn-receitamob i").toggleClass("fa-chevron-right fa-chevron-down");
  });

  //
  // if you want to toogle the icon right in time
  //
  $(this)
    .find("i")
    .toggleClass("fa-chevron-right fa-chevron-down");
});

// Shopping Cart
// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];

  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    sessionStorage.setItem("shoppingCrt", JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem("shoppingCrt"));
  }
  if (sessionStorage.getItem("shoppingCrt") != null) {
    loadCart();
  }

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};

  // Add to cart
  obj.addItemToCart = function(name, price, count) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  };

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  };

  // Count cart
  obj.totalCount = function() {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  };

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();

// *****************************************
// Triggers / Events
// *****************************************
// Add item
$(".productCart").click(function(event) {
  event.preventDefault();
  var name = $(this).data("name");
  var price = Number($(this).data("price"));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$(".clear-cart").click(function() {
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for (var i in cartArray) {
    output +=
      "<tr>" +
      "<td>" +
      cartArray[i].name +
      "</td>" +
      "<td>(" +
      cartArray[i].price +
      ")</td>" +
      "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" +
      cartArray[i].name +
      ">-</button>" +
      "<input type='number' class='item-count form-control' data-name='" +
      cartArray[i].name +
      "' value='" +
      cartArray[i].count +
      "'>" +
      "<button class='plus-item btn btn-primary input-group-addon' data-name=" +
      cartArray[i].name +
      ">+</button></div></td>" +
      "<td><button class='delete-item btn btn-danger' data-name=" +
      cartArray[i].name +
      ">X</button></td>" +
      " = " +
      "<td>" +
      cartArray[i].total +
      "</td>" +
      "</tr>";
  }
  $("").html(output);
  $(".count").html(shoppingCart.totalCart());
  $(".scCount").html(shoppingCart.totalCount());
}

// Item count input
$(".show-cart").on("change", ".item-count", function(event) {
  var name = $(this).data("name");
  var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();
