
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTransactions } from '@/contexts/TransactionContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MonthlyBarChart() {
  const { getMonthlyData } = useTransactions();
  
  const monthlyData = getMonthlyData();
  
  if (monthlyData.length === 0) {
    return (
      <Card className="overflow-hidden border-gradient-to-r from-green-500 to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-100 dark:from-green-900/20 dark:to-blue-800/20 pb-2">
          <CardTitle className="text-xl font-medium text-blue-800 dark:text-blue-300">Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <p className="text-muted-foreground animate-pulse">No monthly data available</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden border-gradient-to-r from-green-500 to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-100 dark:from-green-900/20 dark:to-blue-800/20 pb-2">
        <CardTitle className="text-xl font-medium text-blue-800 dark:text-blue-300">Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-64 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.3)" />
              <XAxis 
                dataKey="month" 
                axisLine={{ stroke: '#64748b' }}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickLine={{ stroke: '#64748b' }}
              />
              <YAxis
                axisLine={{ stroke: '#64748b' }}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickLine={{ stroke: '#64748b' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value}`, '']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
                cursor={{ fill: 'rgba(224, 231, 255, 0.2)' }}
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Bar 
                name="Income" 
                dataKey="income" 
                fill="#4CAF50" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
                animationBegin={200}
              />
              <Bar 
                name="Expense" 
                dataKey="expense" 
                fill="#F44336" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
                animationBegin={400}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
