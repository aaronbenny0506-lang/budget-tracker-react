# Pocketbook: Budget Tracker (React)

A responsive React app to set a monthly budget, log expenses and see where your money goes.

## Features
- Set a monthly budget with live progress bar (turns red when you go over)
- Expense form with validation (description, amount, category, date)
- Expense list with category filter and delete
- Spending-by-category breakdown
- Data saved in the browser (localStorage), so it survives reloads
- Mobile-first responsive layout

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure
```
src/
  App.jsx                    state and layout
  utils.js                   categories, currency + date helpers
  hooks/useLocalStorage.js   persistent state hook
  components/                BudgetSummary, ExpenseForm, ExpenseList, CategoryBreakdown
  styles.css
```

## Deploy
Import the repo on Vercel or Netlify (build: `npm run build`, output: `dist`). No environment variables needed.
