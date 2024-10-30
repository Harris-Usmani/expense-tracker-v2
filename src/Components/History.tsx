import React, { useState } from 'react';
import { useExpenseContext } from '../Context/ExpenseContext';
import { Transaction } from '../Context/ExpenseContext';
import { TransactionForm } from './TransactionForm';

export const History: React.FC = () => {
    const { state, deleteTransaction, updateTransaction } = useExpenseContext();
    const [editableTransaction, setEditableTransaction] = useState<Transaction | null>(null);

    const handleEdit = (transaction: Transaction) => {
        setEditableTransaction(transaction);
    };

    const handleDelete = (id: number) => {
        deleteTransaction(id);
    };

    return (
        <div className="mt-5 bg-white p-5 rounded shadow">
            <h3 className="text-lg font-semibold">History</h3>
            <ul>
                {state.transactions.map((transaction) => (
                    <li key={transaction.id} className="flex justify-between py-2 items-center">
                        <span>{transaction.name}</span>
                        <span className={transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                            Rs {transaction.amount}
                        </span>
                        <button onClick={() => handleEdit(transaction)} className="text-blue-500 ml-4">Edit</button>
                        <button onClick={() => handleDelete(transaction.id)} className="text-red-500 ml-2">Delete</button>
                    </li>
                ))}
            </ul>

            {editableTransaction && (
                <TransactionForm 
                    initialData={editableTransaction} 
                    onSubmit={(updatedTransaction) => {
                        updateTransaction(updatedTransaction);
                        setEditableTransaction(null);
                    }} 
                />
            )}
        </div>
    );
};
