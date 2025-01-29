'use client';

import { Fragment } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import classNames from 'classnames';
import { Button, ButtonSizeEnum, ButtonVariantEnum } from '../../ui';
import useLogout from '@/core/hooks/useLogout';
import { Home, BarChart, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Logo, User } from '@/core/assets';
import { useAuthUser } from '@/modules/auth';
import { useTypedSelector } from '@/store';
import { useManualActions } from '../../slices/actions';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Statistic', href: '/dashboard/statistic', icon: BarChart },
];

export const Sidebar = () => {
  const { isSidebarCollapse } = useTypedSelector((state) => state.manual);
  const { setSidebarCollapse } = useManualActions();

  const router = useRouter();
  const pathname = usePathname();

  const { logout } = useLogout();
  const { user } = useAuthUser();
  console.log('%c jordan user', 'color: lime;', user);
  const toggleSidebar = () => {
    setSidebarCollapse({ isSidebarCollapse: !isSidebarCollapse });
  };

  return (
    <aside
      className={classNames(
        'h-screen bg-white border-r shadow-lg flex flex-col justify-between p-4 fixed transition-all duration-300',
        isSidebarCollapse ? 'w-[70px]' : 'w-64',
      )}>
      <div className='flex items-center justify-between mb-4'>
        {!isSidebarCollapse && <Image src={Logo} alt='Logo' className='max-h-8 w-auto ml-4' />}
        <button onClick={toggleSidebar} className='p-2 rounded-md'>
          {isSidebarCollapse ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      <nav className='flex flex-col gap-2 flex-1 mt-10'>
        {navigation.map(({ name, href, icon: Icon }) => (
          <Button
            key={name}
            onClick={() => router.push(href)}
            variant={ButtonVariantEnum.TEXT}
            size={ButtonSizeEnum.MEDIUM}
            className={classNames(
              'flex items-start gap-3 text-gray-500 hover:text-white hover:bg-indigo-700 duration-300 transition-all rounded-lg p-3',
              isSidebarCollapse ? '!justify-center' : '!justify-start',
              isSidebarCollapse && '!px-0',
              {
                '!text-white bg-indigo-700': href === pathname,
              },
            )}
            fullWith>
            <Icon size={22} />
            {!isSidebarCollapse && <span>{name}</span>}
          </Button>
        ))}
      </nav>

      <div className='relative'>
        <HeadlessMenu as='div' className='relative'>
          <div>
            <HeadlessMenu.Button
              className={classNames(
                'relative flex items-center gap-2 rounded-lg p-3 w-full text-gray-700 hover:bg-gray-100 transition-all duration-300',
                isSidebarCollapse && 'px-0 hover:bg-transparent',
              )}>
              <Image
                src={user?.photoURL || User}
                alt='User Avatar'
                className='h-8 !w-8 rounded-full'
                width={32}
                height={32}
              />
              {!isSidebarCollapse && <span>{user?.displayName ?? user?.email ?? 'User'}</span>}
            </HeadlessMenu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'>
            <HeadlessMenu.Items className='absolute left-0 bottom-full mb-2 w-48 origin-bottom-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <HeadlessMenu.Item>
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
              </HeadlessMenu.Item>
              <HeadlessMenu.Item>
                {({ active }) => (
                  <Button
                    text='Sign out'
                    variant={ButtonVariantEnum.TEXT}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-800 font-normal !justify-start hover:bg-gray-100 hover:text-purple-900 rounded-none',
                    )}
                    onClick={logout}
                    fullWith
                  />
                )}
              </HeadlessMenu.Item>
            </HeadlessMenu.Items>
          </Transition>
        </HeadlessMenu>
      </div>
    </aside>
  );
};
