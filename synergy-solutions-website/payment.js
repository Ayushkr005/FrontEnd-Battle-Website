// payment.js
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    const paymentForm = document.getElementById('paymentForm');
    const paymentMessage = document.getElementById('paymentMessage');
    const payNowButton = document.getElementById('payNowButton');
    const shippingForm = document.getElementById('shippingForm');

    // Page Load Animations
    const elementsToAnimate = document.querySelectorAll('.initial-hidden');
    elementsToAnimate.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-fadeInUp');
            el.classList.remove('initial-hidden'); // Or just let 'animate-fadeInUp' handle opacity
        }, 100 + index * 150); // Staggered delay
    });

    function showCartMessage(messageText, isError = false) {
        const existingMessage = cartItemsList.querySelector('.cart-status-message');
        if (existingMessage) existingMessage.remove();

        const messageP = document.createElement('p');
        messageP.innerHTML = messageText;
        messageP.classList.add('cart-status-message'); // For potential specific styling
        if (isError) messageP.style.color = 'var(--theme-error-color)';
        
        cartItemsList.appendChild(messageP);
        setTimeout(() => messageP.classList.add('visible'), 10); // Trigger fade-in
    }

    function loadCart() {
        const loadingMessage = cartItemsList.querySelector('.loading-message');
        if (loadingMessage) {
            loadingMessage.classList.remove('visible'); // Start fading out
            setTimeout(() => loadingMessage.remove(), 400); // Remove after fade
        }
        
        // Clear previous items except status messages
        const currentItems = cartItemsList.querySelectorAll('.cart-item');
        currentItems.forEach(item => item.remove());

        const cart = JSON.parse(localStorage.getItem('synergyShopCart')) || [];
        let total = 0;

        if (cart.length === 0) {
            showCartMessage('Your cart is currently empty. <a href="index.html#products">Continue shopping?</a>');
            if(payNowButton) payNowButton.disabled = true;
            if(cartTotalAmount) cartTotalAmount.textContent = '$0.00';
            return;
        }

        if(payNowButton) payNowButton.disabled = false;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            const itemPrice = parseFloat(item.price.replace('$', ''));
            const quantity = item.quantity || 1;
            total += itemPrice * quantity;

            itemElement.innerHTML = `
                <img src="${item.image || 'https://via.placeholder.com/70'}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Category: ${item.category || 'N/A'} | Qty: ${quantity}</p>
                </div>
                <span class="cart-item-price">$${(itemPrice * quantity).toFixed(2)}</span>
            `;
            cartItemsList.appendChild(itemElement);
            // Staggered animation for cart items
            setTimeout(() => itemElement.classList.add('loaded'), 50 * index);
        });

        if(cartTotalAmount) cartTotalAmount.textContent = `$${total.toFixed(2)}`;
    }

    function showUIPaymentMessage(message, type) {
        paymentMessage.textContent = message;
        paymentMessage.className = 'visible'; // Base class for visibility
        if (type) {
            paymentMessage.classList.add(type); // Add specific type: 'success', 'error', 'processing'
        }
    }

    function hideUIPaymentMessage() {
        paymentMessage.classList.remove('visible');
        // Optionally clear content after transition, if needed
        // setTimeout(() => {
        //     paymentMessage.textContent = '';
        //     paymentMessage.classList.remove('success', 'error', 'processing');
        // }, 400); // Match transition duration
    }


    function validateForm(form) {
        let isValid = true;
        form.querySelectorAll('input[required]').forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--theme-error-color)';
            } else {
                input.style.borderColor = 'var(--theme-border-color)';
            }
        });
        return isValid;
    }

    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!payNowButton || payNowButton.disabled) return;

            // Clear previous message and validation styles
            hideUIPaymentMessage();
            document.querySelectorAll('#shippingForm input, #paymentForm input').forEach(input => {
                input.style.borderColor = 'var(--theme-border-color)';
            });

            if (!validateForm(shippingForm)) {
                showUIPaymentMessage('Please fill in all required shipping fields.', 'error');
                const firstInvalidShipping = shippingForm.querySelector('input[required][style*="var(--theme-error-color)"]');
                if (firstInvalidShipping) firstInvalidShipping.focus();
                return;
            }

            if (!validateForm(paymentForm)) {
                showUIPaymentMessage('Please fill in all required payment fields.', 'error');
                const firstInvalidPayment = paymentForm.querySelector('input[required][style*="var(--theme-error-color)"]');
                if (firstInvalidPayment) firstInvalidPayment.focus();
                return;
            }

            const cardNumberInput = document.getElementById('cardNumber');
            if (cardNumberInput.value.replace(/\s/g, '').length < 13 || cardNumberInput.value.replace(/\s/g, '').length > 19 || !/^\d+$/.test(cardNumberInput.value.replace(/\s/g, ''))) {
                showUIPaymentMessage('Please enter a valid card number.', 'error');
                cardNumberInput.style.borderColor = 'var(--theme-error-color)';
                cardNumberInput.focus();
                return;
            }

            const expiryDateInput = document.getElementById('expiryDate');
            const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
            if (!expiryRegex.test(expiryDateInput.value)) {
                showUIPaymentMessage('Please enter a valid expiry date (MM/YY).', 'error');
                expiryDateInput.style.borderColor = 'var(--theme-error-color)';
                expiryDateInput.focus();
                return;
            } else {
                 const [month, yearPart] = expiryDateInput.value.split('/');
                 const year = parseInt(yearPart, 10);
                 const currentYearLastTwoDigits = new Date().getFullYear() % 100;
                 const currentMonth = new Date().getMonth() + 1;
                 if (year < currentYearLastTwoDigits || (year === currentYearLastTwoDigits && parseInt(month, 10) < currentMonth)) {
                    showUIPaymentMessage('Card has expired.', 'error');
                    expiryDateInput.style.borderColor = 'var(--theme-error-color)';
                    expiryDateInput.focus();
                    return;
                 }
            }

            const cvvInput = document.getElementById('cvv');
            if (!/^\d{3,4}$/.test(cvvInput.value)) {
                showUIPaymentMessage('Please enter a valid CVV (3 or 4 digits).', 'error');
                cvvInput.style.borderColor = 'var(--theme-error-color)';
                cvvInput.focus();
                return;
            }

            showUIPaymentMessage('Processing payment...', 'processing');
            payNowButton.disabled = true;
            payNowButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            setTimeout(() => {
                showUIPaymentMessage(
                    'Payment Successful! <br>Thank you for your order. A confirmation email has been (not really) sent.',
                    'success'
                );
                localStorage.removeItem('synergyShopCart');
                shippingForm.querySelectorAll('input').forEach(input => input.disabled = true);
                paymentForm.querySelectorAll('input').forEach(input => input.disabled = true);
                payNowButton.innerHTML = '<i class="fas fa-check-circle"></i> Payment Complete';
                setTimeout(() => { window.location.href = "index.html#hero"; }, 3500);
            }, 2500);
        });
    }

    loadCart(); // Initial cart load

    // Ripple Effect Logic
    document.querySelectorAll('.clickable-element').forEach(item => {
        const itemStyle = getComputedStyle(item);
        if (itemStyle.position === 'static') {
            item.style.position = 'relative';
        }
        item.addEventListener('click', function (e) {
            if (item.disabled || item.classList.contains('disabled')) return;
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            item.appendChild(ripple);
            const rect = item.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size * 2 + 'px';
            const rippleX = e.clientX - rect.left - size;
            const rippleY = e.clientY - rect.top - size;
            ripple.style.left = rippleX + 'px';
            ripple.style.top = rippleY + 'px';
            if (item.classList.contains('light-ripple-target') || item.tagName.toLowerCase() === 'input') {
                 ripple.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }
            ripple.addEventListener('animationend', () => ripple.remove());
            setTimeout(() => { if (ripple.parentElement) ripple.remove(); }, 600);
        });
    });
});