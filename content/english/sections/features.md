---
features:
- title: Your usage history - always in control.
  description: Monitor your monthly data consumption in real time. See bandwidth breakdown by category - streaming, gaming, remote work - and get instant alerts when you approach your data cap or experience unusual activity.
  charts:
    primary:
      type: "bar"
      title: "24h Network Activity (Mbps)"
      labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"]
      values: [120, 45, 30, 280, 350, 410, 520, 480]
    secondary:
      type: "doughnut"
      title: ""
      labels: ["Fiber", "IPTV", "VoIP", "Support"]
      values: [42, 28, 18, 12]
  images:
    - "/images/features/sales-overview.png"
    - "/images/features/monthly-sale.png"
  list:
    - Upload speed gauges
    - Monthly data meter
    - Outages alerts
    - For work and play
  button:
    label: "Get Started Now"
    link: "#contact"
    enable: true
- title: See every device on your network.
  images:
    - "/images/features/audience-activity.png"
    - "/images/features/summery.png"
  description: The Devices Panel gives you a bird's-eye view of every connected device - laptops, smart TVs, phones, security cameras, and IoT sensors. Track live status, per-device usage bars, and data consumption at a glance.
  charts:
    primary:
      type: "line"
      title: "Customer Coverage Growth (%)"
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      values: [62, 65, 68, 68, 70, 79, 83, 82, 83, 88, 91, 94]
    secondary:
      type: "polarArea"
      title: ""
      labels: ["Q1", "Q2", "Q3", "Q4"]
      values: [21, 19, 24, 36]
  list:
    - Connected devices
    - Live status dots
    - Data consumption
    - Device scheduling
  button:
    label: "Get Started Now"
    link: "#contact"
    enable: true

enable: true # enable and disable this section
# don't create a separate page
build:
  render: "never"
---
