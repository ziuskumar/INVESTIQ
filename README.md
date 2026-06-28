# InvestIQ — AI Investment Research Dashboard

InvestIQ is a premium, AI-powered financial workspace designed to deliver instant, comprehensive investment analysis. It evaluates target companies using fundamental profile details and real-time news sentiment via Google's advanced **Gemini 2.5 Flash** model.

🌐 **Live URL:** [https://investiq-dashboard-eight.vercel.app](https://investiq-dashboard-eight.vercel.app)  
📦 **GitHub Repository:** [https://github.com/ziuskumar/INVESTIQ.git](https://github.com/ziuskumar/INVESTIQ.git)

---

## 🎨 Design Philosophy — Runway Theme
InvestIQ implements the custom **Runway Design System**, presenting a warm, paper-like ledger interface optimized for analytical readability:
- **Canvas Base**: Warm cream canvas background (`#f8f7f5`) with clean pure paper cards (`#ffffff`).
- **Typography**: Geometric-humanist Inter Variable font with tight letter-spacing for a clean, editorial layout.
- **Accents**: Deep espresso text (`#261b07`) for headings/body and a single amber signal (`#f9a600`) reserved exclusively for primary action CTAs.
- **Shadows**: Warm brown drop shadows (`rgba(38,27,7,0.06)`) instead of cool grays.

---

## ✨ Features
1. **Interactive AI Analyst Panel**:
   - **Executive Summary Tab**: Displays recommendation badges, confidence scores, news sentiment, and side-by-side grids of **Key Strengths** and **Potential Risks**.
   - **Detailed Analysis Tab**: Renders full markdown analyses detailing Market Position, Financial Health, and Outlook.
   - **Quick-Action Chips**: One-click research shortcuts for Apple, Tesla, NVIDIA, and Microsoft.
2. **Analytics Dashboard**:
   - **KPI Metric Tiles**: Shows Total Reports, Invest/Pass ratios, and Unique Analysed Companies with custom SVG sparkline charts.
   - **Sector Breakdown**: Interactive horizontal bar chart tracking search allocations (Tech, Healthcare, Finance, Energy).
   - **Accuracy Overview**: Fully styled vector line chart graphing evaluation outcomes.
   - **Recent Activity Feed**: Access and reload previous company analyses.
3. **Persistent Memory**: Uses browser `localStorage` to save search history, with full support to clear entries.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 13.5.6 (React 18)
- **Styling**: Tailwind CSS 3.4 & Vanilla CSS (Runway tokens)
- **AI Integration**: Google Generative AI (Gemini 2.5 Flash via Fetch) / LangChain
- **APIs**: Finnhub (Market Data & News Sentiment)

---

## 🚀 Setup & Build Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- npm (Node Package Manager)

### 1. Installation
Clone the repository and install all dependencies:
```bash
# Navigate to the project folder
cd "inside IIM"

# Install dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory and configure your API keys:
```env
# Gemini API Key (Required for live AI generation)
GEMINI_API_KEY=your_gemini_api_key_here

# Finnhub API Key (Optional; defaults to demo data if omitted)
FINNHUB_API_KEY=your_finnhub_api_key_here
```

### 3. Run Locally (Development)
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port specified in your terminal) in your browser to view the application.

### 4. Build for Production
To test the production compilation bundle:
```bash
# Build the optimized production bundle
npm run build

# Start the production server
npm run start
```

### 5. Deployment on Vercel
To deploy the application to Vercel via CLI:
```bash
# Link your project to Vercel
npx vercel link --yes --project investiq-dashboard

# Add production environment variables
npx vercel env add GEMINI_API_KEY production --value your_gemini_api_key_here --yes

# Deploy to production
npx vercel --prod --yes
```
