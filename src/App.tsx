import React from 'react';
import { ExpenseProvider } from './Context/ExpenseContext';
import { TransactionForm } from './Components/TransactionForm';
import { Transaction } from './Context/ExpenseContext';
import { History } from './Components/History';
import { AllTransactions } from './Components/AllTransactions';

const App: React.FC = () => {
  const handleAddTransaction = (transaction: Transaction) => {
    console.log('Transaction submitted:', transaction);
  };

  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-white text-gray-800">
        <h1 className="text-center text-3xl font-bold py-5">Expense Tracker V2</h1>
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-10">
          <TransactionForm onSubmit={handleAddTransaction} />
          <div>
            <AllTransactions />
            <History />
          </div>
        </div>
      </div>
    </ExpenseProvider>
  );
};

export default App;
