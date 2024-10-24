import React, { createContext, useReducer, ReactNode } from 'react';

// types define so that i know what types i am passing
type Transaction = {
  id: number;
  name: string;
  amount: number;
  type: 'Income' | 'Expense';
};

type State = {
  transactions: Transaction[];
};

type Action = 
  | { type: 'ADD_TRANSACTION'; payload: Transaction };

type ExpenseContextProps = {
  state: State;
  addTransaction: (transaction: Transaction) => void;
};

const initialState: State = {
  transactions: [],
};


const ExpenseContext = createContext<ExpenseContextProps | undefined>(undefined); //undefined added from gpt suggestion, so that context knows ke koi default value nahi hai


const expenseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
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

  return (
    <ExpenseContext.Provider value={{ state, addTransaction }}>
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
