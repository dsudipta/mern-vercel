
import { useTransactions } from "@/contexts/TransactionContext";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Wallet, DollarSign } from "lucide-react";

export default function StatsCards() {
  const { getTotalIncome, getTotalExpenses, getBalance } = useTransactions();
  
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = getBalance();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="relative overflow-hidden shadow-lg border-0 hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Income</h3>
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(totalIncome)}
            </p>
            <p className="text-xs text-muted-foreground">All-time earnings</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden shadow-lg border-0 hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Expenses</h3>
            <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <ArrowDownRight className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400">
              {formatCurrency(totalExpenses)}
            </p>
            <p className="text-xs text-muted-foreground">All-time spending</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden shadow-lg border-0 hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Current Balance</h3>
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="space-y-1">
            <p className={`text-2xl md:text-3xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
              {formatCurrency(balance)}
            </p>
            <p className="text-xs text-muted-foreground">Available funds</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
