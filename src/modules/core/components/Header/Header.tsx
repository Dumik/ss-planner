'use client';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';

import { Logo, User } from '@/core/assets';
import { useAuthActions, useAuthUser } from '@/modules/auth';
import { usePeriodActions } from '@/modules/dashboard';
import { auth } from '../../../../../firebaseConfig';
import { Button, ButtonSizeEnum, ButtonVariantEnum } from '../../ui';
import { List, X } from '@phosphor-icons/react';
import { useBannerActions } from '../../slices';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'Statistic', href: '/dashboard/statistic', current: false },
];

const Header = () => {
  const router = useRouter();

  const pathname = usePathname();

  const { user } = useAuthUser();
  const { resetAccess } = useAuthActions();
  const { resetPeriod } = usePeriodActions();
  const { resetBanner } = useBannerActions();

  const handleLogOut = () => {
    resetPeriod();
    resetAccess();
    resetBanner();
    signOut(auth);
  };
  return (
    <Disclosure as='nav' className='bg-white  border-b fixed w-full shadow z-10'>
      {({ open }) => (
        <>
          <div className='mx-auto  max-w-[1400px] px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='relative duration-300 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <X className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <List className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <Image
                    src={Logo}
                    alt=''
                    className='text-white stroke-white fill-white max-h-8 w-auto'
                  />
                </div>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Button
                        key={item.name}
                        onClick={() => router.push(item.href)}
                        variant={ButtonVariantEnum.TEXT}
                        size={ButtonSizeEnum.MEDIUM}
                        className={classNames(
                          '!text-gray-500 hover:!text-white hover:bg-indigo-700  duration-300 transition-all',
                          {
                            '!text-white bg-indigo-700': item.href === pathname,
                          },
                        )}>
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* Profile dropdown */}
                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button
                      className={classNames(
                        'relative flex rounded-full text-sm focus:outline-none :',
                        'hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-purple-700',
                      )}>
                      <span className='absolute -inset-1.5' />
                      <span className='sr-only'>Open user menu</span>

                      <Image
                        src={user?.photoURL || User}
                        alt=''
                        className='h-8 w-8 rounded-full'
                        width={32}
                        height={32}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'>
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        <span className='block px-4 py-2 text-sm text-gray-800 border-b w-full'>
                          {user?.email}
                        </span>
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Button
                            text='Settings'
                            variant={ButtonVariantEnum.TEXT}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-800 font-normal !justify-start hover:bg-gray-100 hover:text-purple-900 rounded-none',
                            )}
                            onClick={() => router.push('/settings')}
                            fullWith
                          />
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Button
                            text='Sign out'
                            variant={ButtonVariantEnum.TEXT}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-800 font-normal !justify-start hover:bg-gray-100 hover:text-purple-900 rounded-none',
                            )}
                            onClick={handleLogOut}
                            fullWith
                          />
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden absolute w-full bg-white border-purple-700 border-b '>
            <div className='space-y-1 px-2 pb-3 pt-4 flex flex-col gap-2'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={`${item.name}-${item.href}-${item.current}`}
                  aria-current={item.current ? 'page' : undefined}>
                  <Button
                    onClick={() => router.push(item.href)}
                    variant={ButtonVariantEnum.TEXT}
                    size={ButtonSizeEnum.MEDIUM}
                    fullWith
                    className={classNames(
                      '!text-gray-500 hover:!text-white hover:bg-indigo-700  duration-300 transition-all',
                      {
                        '!text-white bg-indigo-700': item.href === pathname,
                      },
                    )}>
                    {item.name}
                  </Button>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
