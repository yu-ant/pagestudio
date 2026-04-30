(function initAdminPage() {
  if (document.body.dataset.adminPage !== "true" || !window.PageStudioCMS) {
    return;
  }

  const PASSWORD_KEY = "page-studio-admin-password-v1";
  const SESSION_KEY = "page-studio-admin-session";
  const formRoot = document.getElementById("adminForm");
  const status = document.getElementById("adminStatus");
  const saveButton = document.getElementById("saveContent");
  const resetButton = document.getElementById("resetContent");
  const changePasswordButton = document.getElementById("changePassword");
  const lockScreen = document.getElementById("adminLockScreen");
  const lockTitle = document.getElementById("adminLockTitle");
  const lockLead = document.getElementById("adminLockLead");
  const lockForm = document.getElementById("adminLockForm");
  const passwordInput = document.getElementById("adminPasswordInput");
  const confirmField = document.getElementById("adminPasswordConfirmField");
  const confirmInput = document.getElementById("adminPasswordConfirmInput");
  const lockError = document.getElementById("adminLockError");
  const lockSubmit = document.getElementById("adminLockSubmit");
  const isHub = document.body.dataset.adminHub === "true";
  const visibleSections = (document.body.dataset.adminSections || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  let changeMode = false;

  const groups = {
    global: "공통 정보",
    home: "홈페이지",
    services: "촬영안내 페이지",
    portfolio: "갤러리 페이지",
    price: "가격 안내 페이지",
    inquiry: "문의하기 페이지",
    reservation: "예약 페이지",
  };

  function getStoredPassword() {
    return localStorage.getItem(PASSWORD_KEY) || "";
  }

  function setStoredPassword(value) {
    localStorage.setItem(PASSWORD_KEY, value);
  }

  function isSessionAuthenticated() {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  }

  function setSessionAuthenticated() {
    sessionStorage.setItem(SESSION_KEY, "1");
  }

  function clearError() {
    lockError.textContent = "";
  }

  function showError(message) {
    lockError.textContent = message;
  }

  function openSetupMode() {
    changeMode = false;
    lockScreen.classList.add("is-visible");
    lockTitle.textContent = "관리자 비밀번호를 설정해 주세요";
    lockLead.textContent = "처음 한 번 비밀번호를 설정하면 이후 관리자 페이지 진입 시 입력이 필요합니다.";
    confirmField.classList.remove("admin-field--hidden");
    passwordInput.value = "";
    confirmInput.value = "";
    passwordInput.setAttribute("autocomplete", "new-password");
    lockSubmit.textContent = "비밀번호 설정";
    clearError();
  }

  function openLoginMode() {
    changeMode = false;
    lockScreen.classList.add("is-visible");
    lockTitle.textContent = "관리자 비밀번호를 입력해 주세요";
    lockLead.textContent = "설정된 비밀번호를 입력하면 관리자 페이지로 들어갈 수 있습니다.";
    confirmField.classList.add("admin-field--hidden");
    passwordInput.value = "";
    confirmInput.value = "";
    passwordInput.setAttribute("autocomplete", "current-password");
    lockSubmit.textContent = "입장하기";
    clearError();
  }

  function openChangeMode() {
    changeMode = true;
    lockScreen.classList.add("is-visible");
    lockTitle.textContent = "새 관리자 비밀번호를 설정해 주세요";
    lockLead.textContent = "새 비밀번호를 저장하면 다음부터는 변경된 비밀번호로 관리자 페이지에 들어올 수 있습니다.";
    confirmField.classList.remove("admin-field--hidden");
    passwordInput.value = "";
    confirmInput.value = "";
    passwordInput.setAttribute("autocomplete", "new-password");
    lockSubmit.textContent = "비밀번호 변경";
    clearError();
  }

  function unlock() {
    lockScreen.classList.remove("is-visible");
    clearError();
  }

  function render() {
    if (!formRoot) {
      return;
    }

    const content = window.PageStudioCMS.getContent();
    const grouped = new Map();

    window.PageStudioCMS.fields.forEach((field) => {
      const section = field.key.split(".")[0];
      if (visibleSections.length && !visibleSections.includes(section)) {
        return;
      }
      if (!grouped.has(section)) {
        grouped.set(section, []);
      }
      grouped.get(section).push(field);
    });

    formRoot.innerHTML = "";

    grouped.forEach((fields, section) => {
      const card = document.createElement("section");
      card.className = "admin-section-card";

      const title = document.createElement("h2");
      title.className = "admin-section-title";
      title.textContent = groups[section] || section;
      card.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "admin-section-grid";

      fields.forEach((field) => {
        const wrapper = document.createElement("label");
        wrapper.className = field.type === "textarea" ? "admin-field admin-field--full" : "admin-field";

        const caption = document.createElement("span");
        caption.className = "admin-field__label";
        caption.textContent = field.label;
        wrapper.appendChild(caption);

        const input = document.createElement(field.type === "textarea" ? "textarea" : "input");
        input.className = "admin-field__input";
        input.dataset.key = field.key;
        input.value = window.PageStudioCMS.getValue(content, field.key) || "";
        if (field.type !== "textarea") {
          input.type = "text";
        } else {
          input.rows = 4;
        }

        wrapper.appendChild(input);
        grid.appendChild(wrapper);
      });

      card.appendChild(grid);
      formRoot.appendChild(card);
    });
  }

  function collect() {
    const content = window.PageStudioCMS.getContent();
    formRoot.querySelectorAll("[data-key]").forEach((input) => {
      window.PageStudioCMS.setValue(content, input.dataset.key, input.value);
    });
    return content;
  }

  function flash(message) {
    status.textContent = message;
    status.classList.add("is-visible");
    window.setTimeout(() => status.classList.remove("is-visible"), 2200);
  }

  lockForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const password = passwordInput.value.trim();
    const confirm = confirmInput.value.trim();
    const stored = getStoredPassword();

    if (!stored || changeMode) {
      if (password.length < 4) {
        showError("비밀번호는 4자 이상으로 입력해 주세요.");
        return;
      }

      if (password !== confirm) {
        showError("비밀번호 확인이 일치하지 않습니다.");
        return;
      }

      setStoredPassword(password);
      setSessionAuthenticated();
      unlock();
      flash(changeMode ? "비밀번호를 변경했습니다." : "비밀번호를 설정했습니다.");
      return;
    }

    if (password !== stored) {
      showError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setSessionAuthenticated();
    unlock();
  });

  saveButton?.addEventListener("click", () => {
    const content = collect();
    window.PageStudioCMS.saveContent(content);
    flash("수정 내용이 저장되었습니다.");
  });

  resetButton?.addEventListener("click", () => {
    window.PageStudioCMS.resetContent();
    if (!isHub) {
      render();
    }
    flash("기본값으로 되돌렸습니다.");
  });

  changePasswordButton?.addEventListener("click", () => {
    openChangeMode();
  });

  if (!isHub) {
    render();
  }

  if (!getStoredPassword()) {
    openSetupMode();
  } else if (isSessionAuthenticated()) {
    // already authenticated this session — no lock screen needed
  } else {
    openLoginMode();
  }
})();
