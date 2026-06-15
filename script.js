// --- Form Tab Toggle Navigation System with Gold Color States ---
function switchForm(formType) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.getElementById('tab-login-btn');
    const registerTab = document.getElementById('tab-register-btn');
    const feedbackBox = document.getElementById('ajax-feedback');

    feedbackBox.className = "mt-3 alert d-none fade show text-center small fw-semibold py-2";
    clearAllErrors();

    if (formType === 'login') {
        loginForm.classList.remove('d-none');
        registerForm.classList.add('d-none');
        
        loginTab.className = "btn w-50 active-login-tab fw-bold py-2";
        registerTab.className = "btn w-50 fw-bold text-muted py-2";
    } else {
        registerForm.classList.remove('d-none');
        loginForm.classList.add('d-none');
        
        registerTab.className = "btn w-50 active-register-tab fw-bold py-2";
        loginTab.className = "btn w-50 fw-bold text-muted py-2";
    }
}

// --- Toggle Password Inline Field Visibilities ---
function togglePasswordVisibility(fieldId, iconContainer) {
    const passwordField = document.getElementById(fieldId);
    const icon = iconContainer.querySelector('i');
    
    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    } else {
        passwordField.type = "password";
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    }
}

// --- Clear Form Field Error Layout Logs ---
function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.innerText = "");
}

// --- Trigger Bootstrap Modal Popups ---
function showPopupNotice(isSuccess, title, msg) {
    const iconBox = document.getElementById('modal-icon-container');
    const titleEl = document.getElementById('modal-title');
    const msgEl = document.getElementById('modal-message');
    
    if (isSuccess) {
        iconBox.innerHTML = `<div class="d-inline-flex p-2.5 bg-success bg-opacity-10 text-success rounded-circle"><i class="bi bi-check-circle-fill fs-2"></i></div>`;
    } else {
        iconBox.innerHTML = `<div class="d-inline-flex p-2.5 bg-danger bg-opacity-10 text-danger rounded-circle"><i class="bi bi-exclamation-triangle-fill fs-2"></i></div>`;
    }
    
    titleEl.innerText = title;
    msgEl.innerText = msg;
    
    const targetModal = new bootstrap.Modal(document.getElementById('statusModal'));
    targetModal.show();
}

// --- Live Processing Simulation ---
function simulateAjaxRequest(callback) {
    const feedbackBox = document.getElementById('ajax-feedback');
    feedbackBox.className = "mt-3 alert alert-secondary d-block text-center small fw-semibold py-2";
    feedbackBox.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span> Connecting Securely...`;

    setTimeout(() => {
        feedbackBox.className = "mt-3 alert d-none";
        callback();
    }, 1100);
}

// --- Login Validation ---
function handleLogin(event) {
    event.preventDefault();
    clearAllErrors();

    const identity = document.getElementById('login-identity').value.trim();
    const pass = document.getElementById('login-password').value;
    let isValid = true;

    if (!identity) {
        document.getElementById('err-login-identity').innerText = "Username or email is required.";
        isValid = false;
    }
    if (!pass) {
        document.getElementById('err-login-password').innerText = "Password cannot be empty.";
        isValid = false;
    }

    if (isValid) {
        simulateAjaxRequest(() => {
            showPopupNotice(true, "Authorized Entry", `Welcome back terminal node user: ${identity}`);
        });
    }
}

// --- Registration Validation ---
function handleRegister(event) {
    event.preventDefault();
    clearAllErrors();

    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    let isValid = true;

    if (!name) {
        document.getElementById('err-reg-name').innerText = "Name is required.";
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('err-reg-email').innerText = "Provide a valid target email format.";
        isValid = false;
    }

    if (password.length < 6) {
        document.getElementById('err-reg-password').innerText = "6+ characters minimum threshold required.";
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById('err-reg-confirm').innerText = "Key variant mismatch.";
        isValid = false;
    }

    if (isValid) {
        simulateAjaxRequest(() => {
            showPopupNotice(true, "Registration Complete", `Your account profile is successfully initialized for ${name}.`);
        });
    }
}