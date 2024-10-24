import React from 'react';
import { useExpenseContext } from '../Context/ExpenseContext';

export const History: React.FC = () => {
  const { state } = useExpenseContext();

  // very simple history component, fetch transacitosn from the global transactions array

  return (
    <div className="mt-5 bg-white p-5 rounded shadow">
      <h3 className="text-lg font-semibold">History</h3>
      <ul>
        {state.transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between py-2">
            <span>{transaction.name}</span>
            <span className={transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}>
              Rs {transaction.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
