# Expense Tracker

A modern, feature-rich expense tracking application built with React and TypeScript. Track your spending, set budgets, and gain insights into your financial habits with an intuitive and beautiful interface.

![Expense Tracker Screenshot](https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Features

- 📊 **Dashboard Overview**: Get a quick snapshot of your financial status
- 💰 **Budget Management**: Set and track budgets by category
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 📈 **Spending Analytics**: Visual charts and trends of your expenses
- 🏷️ **Category Tracking**: Organize expenses by customizable categories
- 📅 **Date-based Filtering**: Filter expenses by time periods
- 🔍 **Search & Sort**: Find expenses easily with powerful search and sorting options

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/expense-tracker.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── budget/        # Budget-related components
│   ├── charts/        # Chart visualizations
│   ├── expense/       # Expense-related components
│   └── layout/        # Layout components
├── context/           # React Context providers
├── pages/             # Main application pages
└── main.tsx          # Application entry point
```

## Built With

- ⚛️ React - Frontend framework
- 🎨 Tailwind CSS - Styling
- 📊 Custom Charts - Data visualization
- 💻 TypeScript - Type safety
- 🎯 Vite - Build tool

## Features in Detail

### Dashboard
- Total budget overview
- Recent transactions
- Spending trends visualization
- Category-wise budget progress

### Expense Management
- Add, edit, and delete expenses
- Categorize expenses
- Search and filter functionality
- Sort by date or amount

### Budget Settings
- Set monthly budget
- Configure category-specific budgets
- Visual progress indicators
- Budget vs actual spending comparison

## Local Storage

The application uses browser local storage to persist:
- Expense records
- Budget settings
- Category configurations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons by [Lucide React](https://lucide.dev)
- Font by [Inter](https://rsms.me/inter/)
