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

  const isHomePage = pathname === '/';
  const isUndefinedRoute = /(undefined)/.test(pathname);
  const isPublicRoute = /(api|auth|_next\/static|_next\/image|\/sign-(in|up))/.test(pathname);

  useEffect(() => {
    if (isPublicRoute && accessToken) {
      router.push('/dashboard');
      return;
    }

    if (
      ((!isPublicRoute && !isHomePage && !isUndefinedRoute) || pathname === '/') &&
      !accessToken
    ) {
      router.push('/sign-in');
      return;
    }
  }, [isPublicRoute, isHomePage, isUndefinedRoute, accessToken, pathname]);

  return children;
};

export default PrivateRouteProvider;
