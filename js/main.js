/* Picture Republiq — shared behaviour */

document.addEventListener("DOMContentLoaded", function () {
  // Intro splash: fullscreen logo covers the screen for 2s, then fades into
  // the site. Plays when entering from outside the site or on refresh —
  // not when navigating back to Home from another page.
  var splash = document.getElementById("introSplash");
  if (splash) {
    var navEntry = performance.getEntriesByType("navigation")[0];
    var isReload = navEntry && navEntry.type === "reload";
    var fromOutside = true;
    try {
      fromOutside = !document.referrer || new URL(document.referrer).origin !== location.origin;
    } catch (e) { /* keep fromOutside = true */ }

    if (fromOutside || isReload) {
      document.body.classList.add("intro-lock");
      setTimeout(function () {
        splash.classList.add("hide");
        document.body.classList.remove("intro-lock");
        setTimeout(function () { splash.remove(); }, 1200);
      }, 2000);
    } else {
      splash.remove();
    }
  }

  // Header state on scroll
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      toggle.classList.toggle("open");
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.classList.remove("open");
        nav.classList.remove("open");
      });
    });
  }

  // Hero slideshow
  var slides = document.querySelectorAll(".hero-slide");
  var dotsWrap = document.querySelector(".hero-dots");
  if (slides.length > 1) {
    var current = 0;
    var timer = null;

    slides.forEach(function (_, i) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Slide " + (i + 1));
      if (i === 0) b.classList.add("active");
      b.addEventListener("click", function () { show(i); restart(); });
      dotsWrap && dotsWrap.appendChild(b);
    });

    function show(i) {
      slides[current].classList.remove("active");
      if (dotsWrap) dotsWrap.children[current].classList.remove("active");
      current = i % slides.length;
      slides[current].classList.add("active");
      if (dotsWrap) dotsWrap.children[current].classList.add("active");
    }
    function next() { show(current + 1); }
    function restart() {
      clearInterval(timer);
      timer = setInterval(next, 5500);
    }
    restart();
  }

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // Enquiry / contact forms: show confirmation message on submit.
  // NOTE: to receive submissions by email, connect the form to a service
  // such as Formspree/Getform, or a site platform's built-in forms.
  document.querySelectorAll("form[data-confirm]").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var confirmation = document.getElementById(form.getAttribute("data-confirm"));
      form.style.display = "none";
      var intro = form.parentElement.querySelector(".form-intro");
      if (intro) intro.style.display = "none";
      if (confirmation) {
        confirmation.classList.add("visible");
        confirmation.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  // Portfolio filter (placeholder tiles)
  var filterBar = document.querySelector(".filter-bar");
  if (filterBar) {
    filterBar.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBar.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var f = btn.getAttribute("data-filter");
        document.querySelectorAll(".masonry [data-cat]").forEach(function (tile) {
          tile.style.display = (f === "all" || tile.getAttribute("data-cat") === f) ? "" : "none";
        });
      });
    });
  }

  // Testimonials rotator
  var quotes = document.querySelectorAll(".testimonial");
  var tDots = document.querySelector(".testimonial-dots");
  if (quotes.length > 1) {
    var tCurrent = 0;
    var tTimer = null;

    quotes.forEach(function (_, i) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Testimonial " + (i + 1));
      if (i === 0) b.classList.add("active");
      b.addEventListener("click", function () { tShow(i); tRestart(); });
      tDots && tDots.appendChild(b);
    });

    function tShow(i) {
      quotes[tCurrent].classList.remove("active");
      if (tDots) tDots.children[tCurrent].classList.remove("active");
      tCurrent = i % quotes.length;
      quotes[tCurrent].classList.add("active");
      if (tDots) tDots.children[tCurrent].classList.add("active");
    }
    function tRestart() {
      clearInterval(tTimer);
      tTimer = setInterval(function () { tShow(tCurrent + 1); }, 6500);
    }
    tRestart();
  }

  // Newsletter signup: show inline thank-you. Connect to Mailchimp/Formspree to
  // actually collect subscribers.
  document.querySelectorAll(".newsletter-form").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var done = document.createElement("p");
      done.className = "poem";
      done.style.fontSize = "22px";
      done.textContent = "Thank you — you're on the list.";
      form.replaceWith(done);
    });
  });

  // Current year in footer
  document.querySelectorAll(".year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
