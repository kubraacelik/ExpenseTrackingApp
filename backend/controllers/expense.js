const ExpenseSchema = require("../models/ExpenseModel");

//* Gider Ekler
exports.addExpense = async (req, res) => {
  // HTTP isteğinden veriler alınıyor
  const { title, amount, category, description, date } = req.body;

  // kullanıcının gönderdiği gider bilgilerini alarak bir expense nesnesi oluşturduk
  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    // validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount == "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    // income nesnesi veritabanına kaydediliyor
    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }

  console.log(expense);
};

//* Giderleri Getirir
exports.getExpenses = async (req, res) => {
  try {
    // en son eklenen kayıtlar en başta olacak şekilde sıralama yapılır
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//* Gider Siler
exports.deleteExpense = async (req, res) => {
  //  istekte bulunan URL’den id parametresini alır
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "Expense Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
