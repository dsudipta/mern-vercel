
export type User = {
  id: string;
  name: string;
  email: string;
}

export type TransactionType = 'income' | 'expense';

export type TransactionCategory = 
  | 'salary' 
  | 'freelance' 
  | 'investments' 
  | 'other_income'
  | 'rent' 
  | 'groceries' 
  | 'utilities' 
  | 'entertainment'
  | 'transportation'
  | 'dining'
  | 'shopping'
  | 'healthcare'
  | 'education'
  | 'travel'
  | 'personal'
  | 'other_expense';

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  date: string;
  userId: string;
}

export type CategoryColor = {
  [key in TransactionCategory]: string;
};

export type MonthlyData = {
  month: string;
  income: number;
  expense: number;
};
