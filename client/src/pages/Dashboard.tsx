
import StatsCards from "@/components/dashboard/StatsCards";
import ExpensesPieChart from "@/components/dashboard/ExpensesPieChart";
import MonthlyBarChart from "@/components/dashboard/MonthlyBarChart";
import TransactionList from "@/components/transactions/TransactionList";
import AddTransactionForm from "@/components/transactions/AddTransactionForm";
import { useAuth } from "@/contexts/AuthContext";
import { useTransactions } from "@/contexts/TransactionContext";
import { Navigate } from "react-router-dom";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { transactions } = useTransactions();
  const { toast } = useToast();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/20"></div>
          <div className="h-4 w-32 rounded bg-muted"></div>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleExport = () => {
    if (transactions.length === 0) {
      toast({
        title: "No data to export",
        description: "You don't have any transactions to export.",
        variant: "destructive"
      });
      return;
    }

    // Create a new jsPDF instance
    const doc = new jsPDF();
    
    // Add title to the PDF
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    doc.setFontSize(16);
    doc.text("Financial Transactions Report", 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${formattedDate}`, 14, 30);
    
    // Format transaction data for the PDF table
    const tableData = transactions.map(transaction => [
      new Date(transaction.date).toLocaleDateString(),
      transaction.description,
      transaction.category.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
      `$${transaction.amount.toFixed(2)}`
    ]);
    
    // Add the table with header and data
    autoTable(doc, {
      head: [['Date', 'Description', 'Category', 'Type', 'Amount']],
      body: tableData,
      startY: 40,
      theme: 'striped',
      headStyles: { 
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      margin: { top: 40 }
    });
    
    // Add a summary section
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const balance = totalIncome - totalExpense;
    
    // Calculate the position to place the summary (after the table)
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    
    doc.setFontSize(12);
    doc.text(`Summary`, 14, finalY);
    doc.setFontSize(10);
    doc.text(`Total Income: $${totalIncome.toFixed(2)}`, 14, finalY + 7);
    doc.text(`Total Expenses: $${totalExpense.toFixed(2)}`, 14, finalY + 14);
    doc.setFontSize(11);
    doc.text(`Balance: $${balance.toFixed(2)}`, 14, finalY + 22);
    
    // Save the PDF file
    doc.save(`finance_report_${formattedDate}.pdf`);

    toast({
      title: "Export successful",
      description: "Your transaction data has been exported as PDF.",
    });
  };
  
  return (
    <div className="container mx-auto py-6 px-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Financial Dashboard</h1>
          <p className="text-muted-foreground">Manage your finances with ease.</p>
        </div>

        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 hover:bg-primary/10"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <ThemeToggle />
          <AddTransactionForm />
        </div>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-4 border-b border-border/30">
              <h3 className="font-medium text-lg">Expense Distribution</h3>
            </div>
            <div className="p-4">
              <ExpensesPieChart />
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-4 border-b border-border/30">
              <h3 className="font-medium text-lg">Monthly Overview</h3>
            </div>
            <div className="p-4">
              <MonthlyBarChart />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <TransactionList />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
