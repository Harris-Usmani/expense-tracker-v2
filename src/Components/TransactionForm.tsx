import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Transaction } from '../Context/ExpenseContext';

type FormValues = {
    name: string;
    amount: number;
    type: 'Income' | 'Expense';
};

type TransactionFormProps = {
    initialData?: Transaction;
    onSubmit: (transaction: Transaction) => void;
};

export const TransactionForm: React.FC<TransactionFormProps> = ({ initialData, onSubmit }) => {
    const { register, handleSubmit, reset, setValue } = useForm<FormValues>({
        defaultValues: {
            name: initialData?.name || '',
            amount: initialData?.amount ? Math.abs(initialData.amount) : 0,
            type: initialData?.type || 'Income',
        },
    });

    useEffect(() => {
        if (initialData) {
            setValue('name', initialData.name);
            setValue('amount', Math.abs(initialData.amount));
            setValue('type', initialData.type);
        }
    }, [initialData, setValue]);

    const submitHandler: SubmitHandler<FormValues> = (data) => {
        const transaction = {
            id: initialData?.id || Date.now(),
            name: data.name,
            amount: data.type === 'Income' ? data.amount : -data.amount,
            type: data.type,
        };
        onSubmit(transaction);  // This should trigger add or update
        reset();
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="bg-white p-5 rounded shadow">
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
                {initialData ? 'Update' : 'Submit'}
            </button>
        </form>
    );
};
