'use client';

import { FC, ReactNode, useEffect } from 'react';

import { useTypedSelector } from '@/store';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  children: ReactNode;
};

const PrivateRouteProvider: FC<Props> = ({ children }) => {
  const { accessToken } = useTypedSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === '/dashboard';
  const isUndefinedRoute = /(undefined)/.test(pathname);
  const isPublicRoute = pathname === '/sign-up' || pathname === '/sign-in';

  useEffect(() => {
    if (isPublicRoute && accessToken) {
      router.push('/dashboard');
      return;
    }

    if (!accessToken) {
      router.push('/sign-in');
      return;
    }
  }, [isPublicRoute, isHomePage, isUndefinedRoute, router, accessToken, pathname]);

  return children;
};

export default PrivateRouteProvider;
