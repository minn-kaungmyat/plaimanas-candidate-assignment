// play collection videos on hover
const videoItems = document.querySelectorAll(".collection-item");

videoItems.forEach((item) => {
  const video = item.querySelector("video");

  if (video) {
    item.addEventListener("mouseenter", () => {
      video.play();
    });

    item.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  }
});

// faq accordion open/close
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});

// keep the select placeholder color right
const select = document.getElementById("subject");

function updateSelectColor() {
  if (select.value === "") {
    select.style.color = "rgba(0,0,0,0.3)";
  } else {
    select.style.color = "black";
  }
}

updateSelectColor();
select.addEventListener("change", updateSelectColor);

// mobile currency dropdown (tap to open)
const currencyDropdown = document.getElementById("currencyDropdown");
const currencyTrigger = document.getElementById("currencyTrigger");
const currencyMenu = document.getElementById("currencyMenu");

if (currencyDropdown && currencyTrigger && currencyMenu) {
  const setCurrencyState = (isOpen) => {
    currencyDropdown.classList.toggle("is-open", isOpen);
    currencyTrigger.setAttribute("aria-expanded", String(isOpen));
    currencyMenu.setAttribute("aria-hidden", String(!isOpen));
  };

  const toggleCurrency = () => {
    if (window.innerWidth > 768) {
      return;
    }

    const shouldOpen = !currencyDropdown.classList.contains("is-open");
    setCurrencyState(shouldOpen);
  };

  currencyTrigger.addEventListener("click", (event) => {
    if (window.innerWidth > 768) {
      return;
    }

    event.stopPropagation();
    toggleCurrency();
  });

  currencyTrigger.addEventListener("keydown", (event) => {
    if (window.innerWidth > 768) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCurrency();
    }
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 768) {
      return;
    }

    if (!currencyDropdown.contains(event.target)) {
      setCurrencyState(false);
    }
  });

  currencyMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setCurrencyState(false);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      setCurrencyState(false);
    }
  });
}

// mobile menu + editorial submenu
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenuPanel = document.getElementById("mobileMenuPanel");
const mobileEditorialGroup = document.getElementById("mobileEditorialGroup");
const mobileEditorialToggle = document.getElementById("mobileEditorialToggle");
const mobileEditorialSubmenu = document.getElementById(
  "mobileEditorialSubmenu",
);

if (mobileMenuToggle && mobileMenuPanel) {
  const setEditorialState = (isOpen) => {
    if (
      !mobileEditorialGroup ||
      !mobileEditorialToggle ||
      !mobileEditorialSubmenu
    ) {
      return;
    }

    mobileEditorialGroup.classList.toggle("is-open", isOpen);
    mobileEditorialToggle.setAttribute("aria-expanded", String(isOpen));
    mobileEditorialSubmenu.setAttribute("aria-hidden", String(!isOpen));
  };

  const setMenuState = (isOpen) => {
    document.body.classList.toggle("menu-open", isOpen);
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenuPanel.setAttribute("aria-hidden", String(!isOpen));

    if (!isOpen) {
      setEditorialState(false);
    }
  };

  const closeMenu = () => setMenuState(false);

  mobileMenuToggle.addEventListener("click", () => {
    const shouldOpen = !document.body.classList.contains("menu-open");
    setMenuState(shouldOpen);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  mobileMenuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  if (mobileEditorialToggle) {
    mobileEditorialToggle.addEventListener("click", () => {
      const isOpen = mobileEditorialGroup?.classList.contains("is-open");
      setEditorialState(!isOpen);
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // faq category tabs
  const filterBtns = document.querySelectorAll(".filter-btn");
  const faqItems = document.querySelectorAll(".faq-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedCategory = btn.getAttribute("data-filter");

      faqItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (itemCategory === selectedCategory) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
          item.classList.remove("active");
        }
      });
    });
  });

  // onsite vs hybrid extra field
  const radioInputs = document.querySelectorAll('input[name="type"]');
  const inquiryForm = document.querySelector(".inquiry-form");
  const hybridWrapper = document.getElementById("hybrid-input-wrapper");
  const dynamicInput = document.getElementById("dynamic-preference-input");

  const setInquiryType = (selectedType) => {
    if (!inquiryForm || !hybridWrapper || !dynamicInput) {
      return;
    }

    if (selectedType === "onsite") {
      hybridWrapper.style.display = "none";
      dynamicInput.removeAttribute("required");
      dynamicInput.value = "";
      inquiryForm.classList.remove("hybrid-mode");
      return;
    }

    if (selectedType === "hybrid") {
      hybridWrapper.style.display = "block";
      dynamicInput.setAttribute("required", "true");
      inquiryForm.classList.add("hybrid-mode");
    }
  };

  radioInputs.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      setInquiryType(e.target.value);
    });
  });

  const checkedType = document.querySelector('input[name="type"]:checked');
  if (checkedType) {
    setInquiryType(checkedType.value);
  }
});
