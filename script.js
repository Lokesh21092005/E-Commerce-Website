document.addEventListener("DOMContentLoaded", function () {
    loadCart();

    let paymentForm = document.getElementById("payment-form");
    let creditCardFields = document.getElementById("credit-card-fields");
    let upiFields = document.getElementById("upi-fields");
    let cardNumber = document.getElementById("card-number");
    let expiryDate = document.getElementById("expiry-date");
    let cvv = document.getElementById("cvv");
    let upiId = document.getElementById("upi-id");

    creditCardFields.style.display = "none";
    upiFields.style.display = "none";

    document.querySelectorAll("input[name='payment-method']").forEach((radio) => {
        radio.addEventListener("change", function () {
            if (this.value === "credit-card") {
                creditCardFields.style.display = "block";
                upiFields.style.display = "none";

                cardNumber.setAttribute("required", "true");
                expiryDate.setAttribute("required", "true");
                cvv.setAttribute("required", "true");
                upiId.removeAttribute("required");

            } else if (this.value === "upi") {
                creditCardFields.style.display = "none";
                upiFields.style.display = "block";

                upiId.setAttribute("required", "true");

                cardNumber.removeAttribute("required");
                expiryDate.removeAttribute("required");
                cvv.removeAttribute("required");
            }
        });
    });

    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let pincode = document.getElementById("pincode").value;
        let phone = document.getElementById("phone").value;
        let paymentMethod = document.querySelector("input[name='payment-method']:checked");

        if (!name || !address || !city || !pincode || !phone || !paymentMethod) {
            alert("Please fill all the required details!");
            return;
        }

        let paymentDetails = "";
        if (paymentMethod.value === "credit-card") {
            let cardNumberValue = cardNumber.value.trim();
            let expiryDateValue = expiryDate.value.trim();
            let cvvValue = cvv.value.trim();

            if (!cardNumberValue || !expiryDateValue || !cvvValue) {
                alert("Please fill in your card details!");
                return;
            }

            paymentDetails = `Card: **** **** **** ${cardNumberValue.slice(-4)}`;
        } else if (paymentMethod.value === "upi") {
            let upiIdValue = upiId.value.trim();

            if (!upiIdValue) {
                alert("Please enter your UPI ID!");
                return;
            }

            paymentDetails = `UPI: ${upiIdValue}`;
        }

        alert(`Payment Successful! \nName: ${name} \nAddress: ${address}, ${city}, ${pincode} \nPhone: ${phone} \nPayment Method: ${paymentDetails}`);

        localStorage.clear();
        window.location.href = "index.html";
    });
});

function loadCart() {
    let cartItemsContainer = document.getElementById("cart-items");
    let savedCart = JSON.parse(localStorage.getItem("cart")) || {};
    let savedTotal = localStorage.getItem("cartTotal") || 0;

    cartItemsContainer.innerHTML = "";

    Object.keys(savedCart).forEach((id) => {
        let item = savedCart[id];
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: $${item.price} | Quantity: ${item.quantity}</p>
            </div>`;
    });

    document.getElementById("cart-total").textContent = savedTotal;
}
