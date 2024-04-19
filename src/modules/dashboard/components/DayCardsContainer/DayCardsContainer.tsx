import { InterfaceData } from '../../types';
import DayCard from '../DayCard/DayCard';

const DayCardsContainer = () => {
  const interfaceData: InterfaceData = {
    days: [
      {
        date: '2020/12/12',
        day: 'monday',
        amountPerDay: 400,
        expenses: [
          {
            price: 40,
            category: 'atb0',
          },
        ],
      },

      {
        date: '2020/12/12',
        day: 'tuesday',
        amountPerDay: 400,
        expenses: [],
      },
      {
        date: '2020/12/12',
        day: 'Wednesday',
        amountPerDay: 400,
        expenses: [
          {
            price: 40,
            category: 'atb1',
          },
          {
            price: 40,
            category: 'atb2',
          },
        ],
      },
    ],
  };

  return (
    <div className='grid grid-cols-5 gap-3 items-start'>
      {interfaceData.days.map((item) => {
        return <DayCard key={item.date} className='col-span-1' day={item} />;
      })}
    </div>
  );
};

export default DayCardsContainer;
