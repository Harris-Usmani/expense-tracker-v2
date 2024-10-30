import React, { createContext, useReducer, useEffect, ReactNode } from 'react';

// types define so that i know what types i am passing
export type Transaction = {
  id: number;
  name: string;
  amount: number;
  type: 'Income' | 'Expense';
};

type State = {
  transactions: Transaction[];
};

type Action = 
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: number };

type ExpenseContextProps = {
  state: State;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: number) => void;
};

const initialState: State = {
  transactions: [],
};

const ExpenseContext = createContext<ExpenseContextProps | undefined>(undefined);

const expenseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((transaction) => transaction.id !== action.payload),
      };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Fetch transactions from the server when the app loads
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/transactions');
        const data = await response.json();
        dispatch({ type: 'SET_TRANSACTIONS', payload: data });
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  // Add a new transaction
  const addTransaction = async (transaction: Transaction) => {
    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });
      const newTransaction = await response.json();
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  // Update an existing transaction
  const updateTransaction = async (transaction: Transaction) => {
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${transaction.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });
      const updatedTransaction = await response.json();
      dispatch({ type: 'UPDATE_TRANSACTION', payload: updatedTransaction });
    } catch (error) {
      console.error('Failed to update transaction:', error);
    }
  };

  // Delete a transaction
  const deleteTransaction = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/transactions/${id}`, { method: 'DELETE' });
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  return (
    <ExpenseContext.Provider value={{ state, addTransaction, updateTransaction, deleteTransaction }}>
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook to use the ExpenseContext
export const useExpenseContext = () => {
  const context = React.useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within ExpenseProvider');
  }
  return context;
};
