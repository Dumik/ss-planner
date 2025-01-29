'use client';

import { useState } from 'react';
import axios from 'axios';

const SettingsPage = () => {
  const [token, setToken] = useState('');
  const [statements, setStatements] = useState([]);
  const [error, setError] = useState('');

  // Функція для отримання виписок
  const fetchStatements = async () => {
    try {
      const startDate = Math.floor(new Date().setDate(new Date().getDate() - 30) / 1000); // За останні 30 днів
      const endDate = Math.floor(new Date().getTime() / 1000);

      const response = await axios.get(`https://api.monobank.ua/personal/statement/{account}`, {
        headers: {
          'X-Token': token,
        },
        params: {
          from: startDate,
          to: endDate,
        },
      });

      setStatements(response.data); // Збереження виписок у стані
      setError('');
    } catch (err) {
      setError('Failed to fetch statements. Please check your token or try again.');
    }
  };

  return (
    <div className='flex gap-7 flex-col p-5 !h-full'>
      <h1 className='text-xl font-bold'>Monobank Integration</h1>

      {/* Поле для введення токена */}
      <div className='flex flex-col gap-3'>
        <label className='text-sm font-semibold'>Monobank Token:</label>
        <input
          type='text'
          className='p-2 border border-gray-300 rounded'
          placeholder='Enter your Monobank token'
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button
          className='bg-indigo-600 text-white px-4 py-2 rounded mt-2'
          onClick={fetchStatements}
          disabled={!token}>
          Fetch Statements
        </button>
      </div>

      {/* Відображення помилок */}
      {error && <div className='text-red-500'>{error}</div>}

      {/* Відображення виписок */}
      {statements.length > 0 ? (
        <div className='mt-5'>
          <h2 className='text-lg font-semibold'>Statements:</h2>
          <ul className='mt-3'>
            {statements.map((statement: any, index: number) => (
              <li key={index} className='border-b py-2'>
                <span className='font-semibold'>Date:</span>{' '}
                {new Date(statement.time * 1000).toLocaleString()}
                <br />
                <span className='font-semibold'>Amount:</span> {statement.amount / 100} UAH
                <br />
                <span className='font-semibold'>Description:</span> {statement.description}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='mt-5 text-gray-500'>No statements available.</div>
      )}
    </div>
  );
};

export default SettingsPage;
