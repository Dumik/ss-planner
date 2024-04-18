'use client';

import { FC, ReactNode, useEffect } from 'react';

import { useTypedSelector } from '@/store';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  children: ReactNode;
};

const PrivateRouteProvider: FC<Props> = ({ children }) => {
  const { accessToken, refreshToken } = useTypedSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const isUndefinedRoute = /(undefined)/.test(pathname);
  const isPublicRoute = /(api|auth|_next\/static|_next\/image)/.test(pathname);

  console.log('%c jordan accessToken', 'color: lime;', accessToken);

  useEffect(() => {
    if (accessToken) {
      router.push('/dashboard');
      return;
    }

    if (!isPublicRoute && !isHomePage && !isUndefinedRoute) {
      router.push('/sign-in');
      return;
    }
  }, [isPublicRoute, isHomePage, isUndefinedRoute, router, accessToken]);

  return children;
};

export default PrivateRouteProvider;