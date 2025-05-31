
import React, { useState } from 'react';
import { useTransactions, categoryColors } from '@/contexts/TransactionContext';
import { formatDateToLocal } from '@/lib/utils';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { TransactionCategory } from '@/types';

export default function TransactionList() {
  const { transactions, deleteTransaction, getCategoryTotals } = useTransactions();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'ascending' | 'descending' } | null>(
    { key: 'date', direction: 'descending' }
  );

  const allCategories = [
    ...new Set(transactions.map(transaction => transaction.category))
  ];

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.amount.toString().includes(search);
    
    const matchesCategory = 
      categoryFilter === 'all' || transaction.category === categoryFilter;
    
    const matchesType = 
      typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig) return 0;

    let valueA, valueB;
    
    if (sortConfig.key === 'date') {
      valueA = new Date(a[sortConfig.key]).getTime();
      valueB = new Date(b[sortConfig.key]).getTime();
    } else if (sortConfig.key === 'amount') {
      valueA = a[sortConfig.key];
      valueB = b[sortConfig.key];
    } else {
      valueA = a[sortConfig.key as keyof typeof a].toString().toLowerCase();
      valueB = b[sortConfig.key as keyof typeof b].toString().toLowerCase();
    }

    if (valueA < valueB) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Handle sort click
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  // Get icon for current sort direction
  const getSortIcon = (name: string) => {
    if (!sortConfig || sortConfig.key !== name) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground/70" />;
    }
    
    return (
      <ArrowUpDown 
        className={`ml-2 h-4 w-4 ${sortConfig.direction === 'ascending' ? 'text-blue-500' : 'text-blue-500 rotate-180'}`} 
      />
    );
  };

  const categoryTotal = (category: string) => {
    const totals = getCategoryTotals('expense').find(
      item => item.category === category
    );
    return totals ? totals.amount : 0;
  };

  // Function to render an icon based on category
  const getCategoryIcon = (category: TransactionCategory) => {
    // This replaces the categoryIcons lookup with a basic representation
    // You could add a more comprehensive icon mapping in TransactionContext if needed
    switch(category) {
      case 'salary':
      case 'freelance':
      case 'investments':
      case 'other_income':
        return <span className="text-green-500 w-4 h-4 flex items-center justify-center">+</span>;
      default:
        return <span className="text-red-500 w-4 h-4 flex items-center justify-center">-</span>;
    }
  };

  return (
    <div>
      <div className="p-4 border-b border-border/30">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h3 className="font-medium text-lg mb-3 sm:mb-0">Recent Transactions</h3>
          <div className="w-full sm:w-auto flex space-x-2">
            <Input 
              placeholder="Search..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full max-w-[300px]"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-8 w-[110px] text-xs">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-8 w-[140px] text-xs">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {allCategories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {sortedTransactions.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => requestSort('date')}
                >
                  <div className="flex items-center">
                    Date {getSortIcon('date')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => requestSort('description')}
                >
                  <div className="flex items-center">
                    Description {getSortIcon('description')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => requestSort('category')}
                >
                  <div className="flex items-center">
                    Category {getSortIcon('category')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors text-right"
                  onClick={() => requestSort('amount')}
                >
                  <div className="flex items-center justify-end">
                    Amount {getSortIcon('amount')}
                  </div>
                </TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.map(transaction => {
                return (
                  <TableRow key={transaction.id} className="group hover:bg-muted/30 transition-colors animate-fade-in">
                    <TableCell className="font-medium">
                      {formatDateToLocal(transaction.date)}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(transaction.category)}
                        <HoverCard>
                          <HoverCardTrigger className="cursor-help">
                            <span>
                              {transaction.category.split('_').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </span>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-64">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Category Total</p>
                              <p className="text-sm text-muted-foreground">
                                ${categoryTotal(transaction.category).toFixed(2)}
                              </p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      transaction.type === 'income' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteTransaction(transaction.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500 transition-colors" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex justify-center items-center p-8">
          <p className="text-muted-foreground">No transactions match your filters.</p>
        </div>
      )}
    </div>
  );
}
