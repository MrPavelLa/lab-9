import React, { useState, useEffect } from 'react';
import Modal2 from './Modal2';
import axios from 'axios';

const Replenishment = (props) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/transactions/${props.code}`);
        const userTransactions = response.data || [];
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Ошибка при получении данных транзакций:', error);
      }
    };

    fetchData();
  }, [props.code]);

  const handleUpdateTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/transactions/${props.code}`);
      const userTransactions = response.data || [];
      setTransactions(userTransactions);
    } catch (error) {
      console.error('Ошибка при получении данных транзакций:', error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const currentDate = new Date();
      const transactionTime = new Date(transactions[index].date + ' ' + transactions[index].time);
      const difference = (currentDate - transactionTime) / (1000 * 60); 
  
      if (difference <= 5) {
        await axios.delete(`http://localhost:5001/transactions/${transactions[index]._id}`);
        setTransactions(prevTransactions => prevTransactions.filter((_, i) => i !== index));
      } else {
        alert('Время больше 5 минут. Удалить нельзя');
      }
    } catch (error) {
      console.error('Ошибка удаления транзакции:', error);
    }
  };  
  

  if (!props.code || props.code.trim() === '') {
    return (
      <div className='ReplenishmentCont'>
        <p>У вас нет операций</p>;
      </div>
    )
  }

  return (
    <div className='ReplenishmentCont'>
      <h1>Изменение платежей</h1>
      <table>
        <thead>
          <tr>
            <th>Наименование операции</th>
            <th>Дата</th>
            <th>Время</th>
            <th>Сумма</th>
            <th>Изменение</th>
            <th>Удаление</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} style={{ backgroundColor: transaction.isdeleted ? 'lightgrey' : 'white' }}>
              <td>{transaction.operationName}</td>
              <td>{transaction.date}</td>
              <td>{transaction.time}</td>
              <td>{transaction.amount}</td>
              <td>
                {!transaction.isdeleted ? (
                  <Modal2
                    code={props.code}
                    operationName={transaction.operationName}
                    id={transaction._id}
                    accounts={transaction.accounts}
                    target={transaction.target}
                    amount={transaction.amount}
                    onTransactionUpdate={handleUpdateTransactions}
                  />
                ) : (
                  <p>Вы отменили</p>
                )}
              </td>
              <td>
                {!transaction.isdeleted ? (
                  <button onClick={() => handleDelete(index)}>Удалить</button>
                ) : (
                  <p>Вы отменили</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
  

export default Replenishment;
