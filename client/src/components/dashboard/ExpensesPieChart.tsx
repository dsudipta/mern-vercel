
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTransactions, categoryColors } from '@/contexts/TransactionContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionCategory } from '@/types';

export default function ExpensesPieChart() {
  const { getCategoryTotals } = useTransactions();
  
  const expensesByCategory = getCategoryTotals('expense');
  
  // Format data for the pie chart
  const data = expensesByCategory.map((item, index) => ({
    name: formatCategoryName(item.category),
    value: item.amount,
    category: item.category,
    animationDuration: 1500 + index * 200
  }));
  
  function formatCategoryName(category: TransactionCategory): string {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  if (data.length === 0) {
    return (
      <Card className="overflow-hidden border-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 pb-2">
          <CardTitle className="text-xl font-medium text-blue-800 dark:text-blue-300">Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <p className="text-muted-foreground animate-pulse">No expense data available</p>
        </CardContent>
      </Card>
    );
  }
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <Card className="overflow-hidden border-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 pb-2">
        <CardTitle className="text-xl font-medium text-blue-800 dark:text-blue-300">Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-64 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={1800}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={categoryColors[entry.category as TransactionCategory]} 
                    stroke="white"
                    strokeWidth={2}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${value}`, 'Amount']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ paddingTop: 20 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
