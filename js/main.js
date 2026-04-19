/* ============================================================
   AWAIS ZAHID PORTFOLIO — main.js
   - Scroll-triggered reveal animations (IntersectionObserver)
   - Subtle tilt effect on hero card
   - Active nav link highlight
   - Navbar scroll opacity boost
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  /* ── 1. SCROLL REVEAL ─────────────────────────── */
  var revealEls = document.querySelectorAll(
    ".reveal-left, .reveal-right, .reveal-section",
  );

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── 2. HERO TILT ─────────────────────────────── */
  var tiltEl = document.getElementById("tilt");

  if (tiltEl) {
    tiltEl.addEventListener("mousemove", function (e) {
      var rect = tiltEl.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var xRot = -12 * ((y - rect.height / 2) / rect.height);
      var yRot = 12 * ((x - rect.width / 2) / rect.width);
      tiltEl.style.transform =
        "perspective(700px) rotateX(" +
        xRot +
        "deg) rotateY(" +
        yRot +
        "deg) scale(1.02)";
    });

    tiltEl.addEventListener("mouseleave", function () {
      tiltEl.style.transform =
        "perspective(700px) rotateX(0) rotateY(0) scale(1)";
    });
  }

  /* ── 3. NAVBAR SCROLL STYLE ───────────────────── */
  var navbar = document.getElementById("myNavbar");

  if (navbar) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 60) {
          navbar.style.background = "rgba(6, 9, 16, 0.96)";
          navbar.style.boxShadow = "0 2px 24px rgba(0,0,0,0.4)";
        } else {
          navbar.style.background = "";
          navbar.style.boxShadow = "";
        }
      },
      { passive: true },
    );
  }

  /* ── 4. ACTIVE NAV LINKS ─────────────────────── */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-link");

  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.style.color = "";
          });
          var active = document.querySelector(
            '.nav-link[href="#' + entry.target.id + '"]',
          );
          if (active) {
            active.style.color = "#ffffff";
          }
        }
      });
    },
    {
      threshold: 0.35,
    },
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  /* ── 5. SMOOTH ANCHOR OFFSET (for fixed navbar) ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        var navHeight = navbar ? navbar.offsetHeight : 72;
        var top =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight -
          16;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });
});
