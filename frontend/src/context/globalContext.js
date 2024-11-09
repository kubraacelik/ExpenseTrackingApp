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

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome
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
