import React, { useContext, useState } from "react";
import axios from "axios";

// backend sunucusunun API'sine ulaşmak için kullanılan temel URL
const BASE_URL = "http://localhost:5000/api/v1/";

// GlobalContext adında bir context oluşturuldu
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  //! calculate incomes
  // yeni bir gelir eklemek için kullanılır
  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  // tüm gelir verilerini alır
  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    setIncomes(response.data);
    console.log(response.data);
  };

  // gelir silmek için kullanılır
  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes();
  };

  // toplam gelir miktarını verir
  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount;
    });

    return totalIncome;
  };

  //! calculate expenses
  // yeni bir gider eklemek için kullanılır
  const addExpense = async (expense) => {
    const response = await axios
      .post(`${BASE_URL}add-expense`, expense)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  // tüm gider verilerini alır
  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    setExpenses(response.data);
    console.log(response.data);
  };

  // gider silmek için kullanılır
  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses();
  };

  // toplam gider miktarını verir
  const totalExpenses = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense += expense.amount;
    });

    return totalExpense;
  };

  // toplam bakiye miktarını verir
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  // gelir ve gider verilerini birleştirerek, tarih sırasına göre en yeni tarihten en eski tarihe sıralanmış bir işlem geçmişi oluşturur
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        expenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// useContext kullanarak GlobalContext'e erişim sağlar
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
