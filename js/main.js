/* Picture Republiq — shared behaviour */

document.addEventListener("DOMContentLoaded", function () {
  // Intro splash: fullscreen logo covers the screen briefly, then fades into
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
        setTimeout(function () { splash.remove(); }, 1000);
      }, 1800);
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

  // ------------------------------------------------------------------
  // Gallery: containers with data-gallery are filled from the manifest
  // in gallery-data.js. data-gallery="all" mixes every category
  // (round-robin so the "All" view shows variety), any other value
  // renders that single category. data-limit="N" caps the number shown.
  // ------------------------------------------------------------------
  var lightboxItems = []; // visible images, shared with the lightbox

  function buildTile(cat, n) {
    var num = String(n).padStart(3, "0");
    var tile = document.createElement("div");
    tile.className = "tile tall";
    tile.setAttribute("data-cat", cat);
    var img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.src = "assets/gallery/" + cat + "/" + cat + "-" + num + ".jpg";
    img.alt = (GALLERY_LABELS[cat] || cat) + " photography by Picture Republiq";
    tile.appendChild(img);
    return tile;
  }

  if (typeof GALLERY_COUNTS !== "undefined") {
    document.querySelectorAll("[data-gallery]").forEach(function (host) {
      var which = host.getAttribute("data-gallery");
      var limit = parseInt(host.getAttribute("data-limit") || "0", 10);
      var tiles = [];

      if (which === "all") {
        // Round-robin through categories so consecutive tiles differ
        var cats = Object.keys(GALLERY_COUNTS);
        var idx = {};
        cats.forEach(function (c) { idx[c] = 1; });
        var remaining = cats.reduce(function (s, c) { return s + GALLERY_COUNTS[c]; }, 0);
        while (remaining > 0) {
          cats.forEach(function (c) {
            if (idx[c] <= GALLERY_COUNTS[c]) {
              tiles.push(buildTile(c, idx[c]));
              idx[c]++;
              remaining--;
            }
          });
        }
      } else if (GALLERY_COUNTS[which]) {
        for (var n = 1; n <= GALLERY_COUNTS[which]; n++) tiles.push(buildTile(which, n));
      }

      if (limit > 0) tiles = tiles.slice(0, limit);
      tiles.forEach(function (t) { host.appendChild(t); });
    });

    // Category counts on the filter buttons
    document.querySelectorAll(".filter-bar button[data-filter]").forEach(function (btn) {
      var f = btn.getAttribute("data-filter");
      var count = f === "all"
        ? Object.keys(GALLERY_COUNTS).reduce(function (s, c) { return s + GALLERY_COUNTS[c]; }, 0)
        : GALLERY_COUNTS[f] || 0;
      if (count > 0) {
        var span = document.createElement("span");
        span.className = "count";
        span.textContent = count;
        btn.appendChild(span);
      }
    });
  }

  // Portfolio filter
  var filterBar = document.querySelector(".filter-bar");
  if (filterBar) {
    filterBar.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBar.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var f = btn.getAttribute("data-filter");
        var shown = 0;
        document.querySelectorAll(".masonry [data-cat]").forEach(function (tile) {
          var visible = f === "all" || tile.getAttribute("data-cat") === f;
          tile.style.display = visible ? "" : "none";
          tile.classList.remove("pop");
          if (visible) {
            // Stagger the first screenful back in for a smooth switch
            if (shown < 12) tile.style.animationDelay = (shown * 45) + "ms";
            else tile.style.animationDelay = "0ms";
            void tile.offsetWidth; // restart the animation
            tile.classList.add("pop");
            shown++;
          }
        });
        refreshLightboxItems();
      });
    });
  }

  // ------------------------------------------------------------------
  // Lightbox: click any gallery tile to view it large, with arrows,
  // keyboard and basic swipe support.
  // ------------------------------------------------------------------
  var galleryTiles = document.querySelectorAll(".masonry .tile img");
  if (galleryTiles.length) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML =
      '<img alt="">' +
      '<span class="lb-caption"></span>' +
      '<button class="lb-close" aria-label="Close">&#10005;</button>' +
      '<button class="lb-prev" aria-label="Previous photo">&#8249;</button>' +
      '<button class="lb-next" aria-label="Next photo">&#8250;</button>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector("img");
    var lbCaption = lb.querySelector(".lb-caption");
    var lbIndex = 0;

    function refreshLightboxItemsInner() {
      lightboxItems = Array.prototype.filter.call(
        document.querySelectorAll(".masonry .tile"),
        function (t) { return t.style.display !== "none"; }
      ).map(function (t) { return t.querySelector("img"); });
    }
    window.__refreshLB = refreshLightboxItemsInner;
    refreshLightboxItemsInner();

    function lbShow(i) {
      if (!lightboxItems.length) return;
      lbIndex = (i + lightboxItems.length) % lightboxItems.length;
      lbImg.src = lightboxItems[lbIndex].src;
      lbImg.alt = lightboxItems[lbIndex].alt;
      lbCaption.textContent = (lbIndex + 1) + " / " + lightboxItems.length;
    }
    function lbOpen(i) {
      lbShow(i);
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function lbClose() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
    }

    document.querySelectorAll(".masonry").forEach(function (m) {
      m.addEventListener("click", function (ev) {
        var tile = ev.target.closest(".tile");
        if (!tile) return;
        refreshLightboxItemsInner();
        var img = tile.querySelector("img");
        lbOpen(lightboxItems.indexOf(img));
      });
    });

    lb.querySelector(".lb-close").addEventListener("click", lbClose);
    lb.querySelector(".lb-prev").addEventListener("click", function () { lbShow(lbIndex - 1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { lbShow(lbIndex + 1); });
    lb.addEventListener("click", function (ev) { if (ev.target === lb) lbClose(); });

    document.addEventListener("keydown", function (ev) {
      if (!lb.classList.contains("open")) return;
      if (ev.key === "Escape") lbClose();
      if (ev.key === "ArrowLeft") lbShow(lbIndex - 1);
      if (ev.key === "ArrowRight") lbShow(lbIndex + 1);
    });

    var touchX = null;
    lb.addEventListener("touchstart", function (ev) { touchX = ev.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (ev) {
      if (touchX === null) return;
      var dx = ev.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) lbShow(lbIndex + (dx < 0 ? 1 : -1));
      touchX = null;
    }, { passive: true });
  }

  function refreshLightboxItems() {
    if (window.__refreshLB) window.__refreshLB();
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
