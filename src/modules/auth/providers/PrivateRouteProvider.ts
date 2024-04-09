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

  useEffect(() => {
    if (isPublicRoute || isHomePage || isUndefinedRoute) {
      router.push('/dashboard');
    }

    if (!isPublicRoute && !isHomePage && !isUndefinedRoute) {
      router.push('/sign-in');
    }
  }, [isPublicRoute, isHomePage, isUndefinedRoute, router]);

  return children;
};

export default PrivateRouteProvider;
