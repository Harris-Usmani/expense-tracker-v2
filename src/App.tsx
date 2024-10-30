import React from 'react';
import { ExpenseProvider, useExpenseContext } from './Context/ExpenseContext';
import { TransactionForm } from './Components/TransactionForm';
import { History } from './Components/History';
import { AllTransactions } from './Components/AllTransactions';

const AppContent: React.FC = () => {
  const { addTransaction } = useExpenseContext();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <h1 className="text-center text-3xl font-bold py-5">Expense Tracker V3 </h1>
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-10">
        <TransactionForm onSubmit={addTransaction} />
        <div>
          <AllTransactions />
          <History />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <ExpenseProvider>
    <AppContent />
  </ExpenseProvider>
);

export default App;
