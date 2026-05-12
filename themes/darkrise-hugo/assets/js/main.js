// main script
(function () {
  "use strict";

  // Dropdown Menu Toggler For Mobile
  // ----------------------------------------
  const dropdownMenuToggler = document.querySelectorAll(
    ".nav-dropdown > .nav-link",
  );

  dropdownMenuToggler.forEach((toggler) => {
    toggler?.addEventListener("click", (e) => {
      e.target.closest(".nav-item").classList.toggle("active");
    });
  });

  // Testimonial Slider
  // ----------------------------------------
  new Swiper(".testimonial-slider", {
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: ".testimonial-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const setHeaderOffset = () => {
    const headerHeight = header?.offsetHeight || 0;
    document.documentElement.style.setProperty(
      "--header-offset",
      `${headerHeight - 16}px`,
    );
  };

  setHeaderOffset();
  window.addEventListener("resize", setHeaderOffset);

  AOS.init({
    once: true,
  });

  const featureChartProfiles = [
    {
      type: "bar",
      labels: ["Download", "Upload", "Latency", "Uptime"],
      values: [94, 76, 88, 99],
    },
    {
      type: "line",
      labels: ["Router", "IoT", "Streaming", "Gaming"],
      values: [68, 74, 89, 95],
    },
    {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      values: [58, 69, 84, 96],
    },
    {
      type: "doughnut",
      labels: ["Fiber", "IPTV", "VoIP", "Support"],
      values: [42, 28, 18, 12],
    },
    {
      type: "polarArea",
      labels: ["Home", "Office", "Mobile", "Cloud"],
      values: [36, 24, 19, 21],
    },
  ];

  const featureCharts = document.querySelectorAll("[data-feature-chart]");
  if (window.Chart && featureCharts.length) {
    const hexToRgba = (hex, alpha = 1) => {
      if (!hex || !hex.startsWith("#")) return hex;
      const normalized =
        hex.length === 4
          ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
          : hex;
      const int = parseInt(normalized.slice(1), 16);
      const r = (int >> 16) & 255;
      const g = (int >> 8) & 255;
      const b = int & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const createFeatureChart = (canvas) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const chartIndex = Number(canvas.dataset.featureChartIndex || 0);
      const chartOffset = Number(canvas.dataset.featureChartOffset || 0);
      const profile =
        featureChartProfiles[
          (chartIndex + chartOffset) % featureChartProfiles.length
        ];
      const primaryColor = canvas.dataset.chartPrimary || "#070707";
      const secondaryColor = canvas.dataset.chartSecondary || "#2d57ee";
      const borderColor = canvas.dataset.chartBorder || "#2c2c2c";
      const lightColor = canvas.dataset.chartLight || "#f6f6f6";
      const textColor = canvas.dataset.chartText || "#e9e9e9";
      const barColors = [
        hexToRgba(secondaryColor, 0.95),
        hexToRgba(secondaryColor, 0.78),
        hexToRgba(secondaryColor, 0.62),
        hexToRgba(secondaryColor, 0.46),
      ];
      const chartType = profile.type || "bar";
      const isLineChart = profile.type === "line";
      const isCircularChart =
        chartType === "doughnut" || chartType === "polarArea";
      const chartAnimation = {
        duration: 1800,
        easing: "easeOutQuart",
        animateScale: !isCircularChart,
        animateRotate: isCircularChart,
        delay: (context) => {
          if (context.type === "data" && context.mode === "default") {
            return context.dataIndex * 140 + context.datasetIndex * 80;
          }

          if (context.type === "active") {
            return 0;
          }

          return 0;
        },
      };
      const reserveCanvasSize = () => {
        if (!isCircularChart) return;

        const wrapper = canvas.parentElement;
        const styles = wrapper ? window.getComputedStyle(wrapper) : null;
        const paddingX = styles
          ? parseFloat(styles.paddingLeft || "0") + parseFloat(styles.paddingRight || "0")
          : 0;
        const paddingY = styles
          ? parseFloat(styles.paddingTop || "0") + parseFloat(styles.paddingBottom || "0")
          : 0;
        const width = Math.max(
          1,
          Math.floor((wrapper?.clientWidth || 0) - paddingX),
        );
        const height = Math.max(
          1,
          Math.floor((wrapper?.clientHeight || 0) - paddingY),
        );
        const pixelRatio = window.devicePixelRatio || 1;

        canvas.width = Math.max(1, Math.floor(width * pixelRatio));
        canvas.height = Math.max(1, Math.floor(height * pixelRatio));
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      };

      reserveCanvasSize();

      const chartOptions = {
        responsive: !isCircularChart,
        maintainAspectRatio: false,
        animation: isCircularChart ? false : chartAnimation,
        plugins: {
          legend: { display: isCircularChart },
          tooltip: {
            displayColors: false,
            backgroundColor: hexToRgba(primaryColor, 0.92),
            titleColor: lightColor,
            bodyColor: lightColor,
            borderColor: hexToRgba(borderColor, 0.9),
            borderWidth: 1,
          },
        },
        cutout: chartType === "doughnut" ? "56%" : undefined,
        scales: isCircularChart
          ? undefined
          : {
              y: {
                beginAtZero: true,
                suggestedMax: 100,
                ticks: {
                  color: hexToRgba(textColor, 0.78),
                },
                grid: {
                  color: hexToRgba(lightColor, 0.14),
                },
              },
              x: {
                ticks: {
                  color: hexToRgba(textColor, 0.82),
                },
                grid: {
                  display: false,
                },
              },
            },
      };

      const dataset = isCircularChart
        ? {
            data: profile.values,
            backgroundColor: barColors,
            hoverBackgroundColor: [
              hexToRgba(secondaryColor, 1),
              hexToRgba(secondaryColor, 0.88),
              hexToRgba(secondaryColor, 0.74),
              hexToRgba(secondaryColor, 0.6),
            ],
            borderColor: hexToRgba(primaryColor, 0.55),
            borderWidth: chartType === "doughnut" ? 2 : 1,
          }
        : isLineChart
        ? {
            data: profile.values,
            borderColor: hexToRgba(secondaryColor, 0.95),
            backgroundColor: hexToRgba(secondaryColor, 0.2),
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 5,
            pointBackgroundColor: lightColor,
            pointBorderColor: hexToRgba(secondaryColor, 0.95),
            pointBorderWidth: 2,
            borderWidth: 3,
            tension: 0.35,
          }
        : {
            data: profile.values,
            backgroundColor: barColors,
            hoverBackgroundColor: [
              hexToRgba(secondaryColor, 1),
              hexToRgba(secondaryColor, 0.88),
              hexToRgba(secondaryColor, 0.74),
              hexToRgba(secondaryColor, 0.6),
            ],
            categoryPercentage: 0.95,
            barPercentage: 0.9,
            borderRadius: 10,
            borderSkipped: false,
            maxBarThickness: 64,
          };

      new window.Chart(ctx, {
        type: chartType,
        data: {
          labels: profile.labels,
          datasets: [dataset],
        },
        options: chartOptions,
      });

              canvas.dataset.chartInitialized = "true";
            };

            const observeFeatureChart = (canvas) => {
              if (canvas.dataset.chartInitialized === "true") return;

              if (!("IntersectionObserver" in window)) {
                createFeatureChart(canvas);
                return;
              }

              const observer = new IntersectionObserver(
                (entries, io) => {
                  entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    createFeatureChart(entry.target);
                    io.unobserve(entry.target);
                  });
                },
                {
                  threshold: 0.35,
                  rootMargin: "0px 0px -10% 0px",
                },
              );

              observer.observe(canvas);
            };

            featureCharts.forEach(observeFeatureChart);
  }

  // price Switcher
  const priceCheck = document.querySelector(".pricing-check");
  if (priceCheck){
    priceCheck.addEventListener("change", (e) => {
      const priceCount = document.querySelectorAll(".price-count");

      if (e.target.checked) {
        priceCount.forEach((count) => {
          animateValue(count, 0, count.dataset.countYearly, 200, 0);
        });
      } else {
        priceCount.forEach((count) => {
          animateValue(count, 0, count.dataset.countMonthly, 200, 0);
        });
      }
    });
  }

});

function animateValue(obj, start, end, duration, decimals) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Number(progress * (end - start) + start).toFixed(decimals);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
