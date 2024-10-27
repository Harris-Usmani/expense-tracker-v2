import React, { createContext, useReducer, ReactNode } from 'react';

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
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction } // new update and del action
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


// undefined added from gpt suggestion, so that context knows ke koi default value nahi hai
const ExpenseContext = createContext<ExpenseContextProps | undefined>(undefined); 


const expenseReducer = (state: State, action: Action): State => {
  switch (action.type) {
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


// provider ccomp
export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  const addTransaction = (transaction: Transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const updateTransaction = (transaction: Transaction) => {
    dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
  };

  const deleteTransaction = (id: number) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  return (
    <ExpenseContext.Provider value={{ state, addTransaction, updateTransaction, deleteTransaction }}>
      {children}
    </ExpenseContext.Provider>
  );
};



// custom hook to use the ExpenseContext
export const useExpenseContext = () => {
  const context = React.useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used witin ExpenseProvider');
  }
  return context;
};
