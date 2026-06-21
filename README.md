# EMI Calculator

> **A modern, instant EMI (Equated Monthly Installment) Calculator** built with React + Vite — designed for the Digital Heroes internship trial task.

[![Built for Digital Heroes](https://img.shields.io/badge/Built%20for-Digital%20Heroes-f5c542?style=for-the-badge&logo=heroicons)](https://digitalheroesco.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

---

## ✨ Features

- **Instant Results** — EMI updates in real-time as you type (no submit button needed)
- **Loan Amount Input** — Enter any amount from ₹10,000 to ₹1 Crore with a live slider
- **Annual Interest Rate** — Configure between 1%–30% per annum
- **Flexible Tenure** — Toggle between Months (1–360) and Years (1–30) seamlessly
- **3 Key Metrics** — Monthly EMI, Total Amount Payable, Total Interest Paid
- **Animated Values** — Smooth number transitions on every change
- **Pie Chart** — Visual breakdown of Principal vs Interest using Recharts
- **Progress Bars** — Split % visualization for principal and interest
- **Mobile-First Responsive** — Works perfectly on all screen sizes
- **Accessible** — ARIA labels, live regions, semantic HTML throughout

---

## 🛠️ Tech Stack

| Technology  | Version | Purpose                   |
|-------------|---------|---------------------------|
| React       | 18      | UI Framework              |
| Vite        | 5       | Build tool & Dev server   |
| Recharts    | 2       | Pie chart visualization   |
| Inter       | —       | Body font (Google Fonts)  |
| Space Grotesk | —     | Heading font (Google Fonts)|

**No paid APIs. No paid libraries. 100% free tools.**

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/emi-calculator.git
cd emi-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
# Preview locally
npm run preview
```

---

## 📁 Project Structure

```
emi-calculator/
├── public/
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── Calculator.jsx    # Main input panel (loan amount, rate, tenure)
│   │   ├── Footer.jsx        # Footer with author info & DH button
│   │   ├── Header.jsx        # Header with logo, badge & DH button
│   │   ├── Hero.jsx          # Hero section
│   │   └── ResultPanel.jsx   # EMI results, pie chart, breakdown
│   ├── utils/
│   │   └── emiUtils.js       # EMI formula + currency formatter
│   ├── App.jsx               # Root component
│   ├── index.css             # Global design system styles
│   └── main.jsx              # React entry point
├── index.html                # HTML shell with SEO meta tags
├── vercel.json               # Vercel deployment config
├── vite.config.js            # Vite configuration
├── package.json
└── README.md
```

---

## 🧮 EMI Formula

```
EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
```

Where:
- **P** = Principal loan amount (₹)
- **r** = Monthly interest rate = Annual Rate ÷ 12 ÷ 100
- **n** = Loan tenure in months

---

## ☁️ Deploy to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/emi-calculator)

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

The `vercel.json` is pre-configured for:
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **SPA Routing:** All routes → `/index.html`

---

## 👤 Author

**Manish S**
📧 manishs.dev@gmail.com

Built as a trial task for the **[Digital Heroes](https://digitalheroesco.com)** internship program.

---

## 📄 License

MIT — Free to use, modify, and distribute.
