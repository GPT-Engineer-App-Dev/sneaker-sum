import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddTransactionModal } from "../components/AddTransactionModal";
import { EditTransactionModal } from "../components/EditTransactionModal";
import { DeleteTransactionDialog } from "../components/DeleteTransactionDialog";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-03-15", amount: 250, type: "Expense", brand: "Nike" },
    { id: 2, date: "2024-03-18", amount: 300, type: "Income", brand: "Adidas" },
    { id: 3, date: "2024-03-20", amount: 180, type: "Expense", brand: "Puma" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingTransaction, setDeletingTransaction] = useState(null);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Sneaker Accounting App</h1>
        <p className="text-xl text-gray-600">Track your sneaker transactions effortlessly</p>
      </header>

      <div className="mb-4">
        <Button onClick={() => setIsAddModalOpen(true)}>Add Transaction</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>${transaction.amount}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.brand}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => setEditingTransaction(transaction)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeletingTransaction(transaction)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addTransaction}
      />

      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          isOpen={!!editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onUpdate={updateTransaction}
        />
      )}

      {deletingTransaction && (
        <DeleteTransactionDialog
          transaction={deletingTransaction}
          isOpen={!!deletingTransaction}
          onClose={() => setDeletingTransaction(null)}
          onDelete={deleteTransaction}
        />
      )}
    </div>
  );
};

export default Index;