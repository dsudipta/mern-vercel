import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, TransactionCategory, TransactionType, CategoryColor, MonthlyData } from '@/types';
import { useAuth } from './AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface TransactionContextType {
  transactions: Transaction[];
  isLoading: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'userId'>) => void;
  deleteTransaction: (id: string) => void;
  getCategoryTotals: (type: TransactionType) => { category: TransactionCategory; amount: number }[];
  getMonthlyData: () => MonthlyData[];
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getBalance: () => number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const categoryColors: CategoryColor = {
  salary: '#4CAF50',
  freelance: '#8BC34A',
  investments: '#009688',
  other_income: '#CDDC39',
  rent: '#F44336',
  groceries: '#FF5722',
  utilities: '#795548',
  entertainment: '#9C27B0',
  transportation: '#3F51B5',
  dining: '#FF9800',
  shopping: '#E91E63',
  healthcare: '#2196F3',
  education: '#00BCD4',
  travel: '#673AB7',
  personal: '#607D8B',
  other_expense: '#9E9E9E'
};

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Load transactions when user changes
  useEffect(() => {
    if (user) {
      // Load transactions from localStorage for this user
      const savedTransactions = localStorage.getItem(`transactions_${user.id}`);
      if (savedTransactions) {
        try {
          const parsedTransactions = JSON.parse(savedTransactions);
          setTransactions(parsedTransactions);
        } catch (error) {
          console.error('Error parsing saved transactions:', error);
          setTransactions([]);
        }
      } else {
        setTransactions([]);
      }
    } else {
      setTransactions([]);
    }
    setIsLoading(false);
  }, [user]);
  
  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (user && transactions.length >= 0) {
      localStorage.setItem(`transactions_${user.id}`, JSON.stringify(transactions));
    }
  }, [transactions, user]);
  
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'userId'>) => {
    if (!user) return;
    
    const newTransaction: Transaction = {
      ...transaction,
      id: `trans-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    toast({
      title: "Transaction Added",
      description: `${transaction.type === 'income' ? 'Income' : 'Expense'} of $${transaction.amount} has been added.`,
    });
  };
  
  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
    toast({
      title: "Transaction Deleted",
      description: "The transaction has been removed.",
    });
  };
  
  const getCategoryTotals = (type: TransactionType) => {
    const filteredTransactions = transactions.filter(t => t.type === type);
    
    const categoryMap = new Map<TransactionCategory, number>();
    
    filteredTransactions.forEach(transaction => {
      const currentAmount = categoryMap.get(transaction.category) || 0;
      categoryMap.set(transaction.category, currentAmount + transaction.amount);
    });
    
    return Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount
    }));
  };
  
  const getMonthlyData = (): MonthlyData[] => {
    const monthMap = new Map<string, { income: number; expense: number }>();
    
    // Get the last 6 months
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthStr = month.toLocaleString('default', { month: 'short' });
      monthMap.set(monthStr, { income: 0, expense: 0 });
    }
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthStr = date.toLocaleString('default', { month: 'short' });
      
      if (monthMap.has(monthStr)) {
        const monthData = monthMap.get(monthStr)!;
        
        if (transaction.type === 'income') {
          monthData.income += transaction.amount;
        } else {
          monthData.expense += transaction.amount;
        }
        
        monthMap.set(monthStr, monthData);
      }
    });
    
    return Array.from(monthMap.entries()).map(([month, data]) => ({
      month,
      ...data
    }));
  };
  
  const getTotalIncome = (): number => {
    return transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, transaction) => total + transaction.amount, 0);
  };
  
  const getTotalExpenses = (): number => {
    return transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((total, transaction) => total + transaction.amount, 0);
  };
  
  const getBalance = (): number => {
    return getTotalIncome() - getTotalExpenses();
  };
  
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        isLoading,
        addTransaction,
        deleteTransaction,
        getCategoryTotals,
        getMonthlyData,
        getTotalIncome,
        getTotalExpenses,
        getBalance
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  
  return context;
};
