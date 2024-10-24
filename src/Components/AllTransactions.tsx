import React from 'react';
import { useExpenseContext } from '../Context/ExpenseContext';

export const AllTransactions: React.FC = () => {
  const { state } = useExpenseContext();


// reduce function so to calculate everything
  const { income, expenses } = state.transactions.reduce(
    (acc, transaction) => {
      if (transaction.amount > 0) { // agar more than 0 then add to income
        acc.income += Number(transaction.amount);
      } else { // agar less than 0 then add to expesne
        acc.expenses += Number(transaction.amount);
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );
  
  const total = income + expenses; // sum both for total :)
  

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="bg-green-500 text-white p-3 rounded">
        Income: Rs {income.toLocaleString('en-IN')} {/*formating for comma separation, en-IN means indian convention*/}
      </div>
      <div className="bg-red-500 text-white p-3 rounded">
        Expenses: Rs {Math.abs(expenses).toLocaleString('en-IN')} {/*math.abs se negative to positive convertion*/}
      </div>
      <div className="bg-teal-500 text-white p-3 rounded">
        Total: Rs {total.toLocaleString('en-IN')}
      </div>
    </div>
  );
};
