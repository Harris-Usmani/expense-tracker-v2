import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useExpenseContext } from '../Context/ExpenseContext';

// form input types - what datatypes it takes
type FormValues = {
    name: string;
    amount: number;
    type: 'Income' | 'Expense';
};

export const TransactionForm: React.FC = () => {
    const { addTransaction } = useExpenseContext();


    const { register, handleSubmit, reset } = useForm<FormValues>({   // useform hook initialized here - to handle form submissions and resetting
        defaultValues: {
            name: '',
            amount: 0,
            type: 'Income',
        },
    });


    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const { name, amount, type } = data;

        let parsedAmount; 
        if (type === 'Income') {
            parsedAmount = amount; // agr amount is positive to goes in normally 
        } else {
            parsedAmount = -amount; // agr type expense then negative sign to treat it as an expense
        }

        addTransaction({
            id: Date.now(), // send a uniuque id with date
            name, // name of transaction
            amount: parsedAmount, // amount
            type, // expense or income?
        });

        reset(); 
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 rounded shadow">
            <div>
                <label className="block text-lg font-semibold">Name</label>
                <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="border rounded p-2 w-full"
                    placeholder="Transaction Name"
                />
            </div>
            <div>
                <label className="block text-lg font-semibold">Transaction Type</label>
                <select
                    {...register('type', { required: 'Transaction type is required' })}
                    className="border rounded p-2 w-full"
                >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
            </div>
            <div>
                <label className="block text-lg font-semibold">Amount</label>
                <input
                    type="number"
                    {...register('amount', { required: 'Amount is required', min: 0.01 })}
                    className="border rounded p-2 w-full"
                    placeholder="Amount"
                />
            </div>
            <button type="submit" className="bg-green-500 text-white p-2 mt-3 rounded w-full">
                Submit
            </button>
        </form>
    );
};
