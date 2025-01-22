import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

import { useAuthActions, useAuthUser } from '@/modules/auth';
import { usePeriodActions } from '@/modules/dashboard';
import { auth } from '../../../../firebaseConfig';
import { useBannerActions } from '../slices';

const useLogout = () => {
  const router = useRouter();

  const { resetAccess } = useAuthActions();
  const { resetPeriod } = usePeriodActions();
  const { resetBanner } = useBannerActions();

  const logout = async () => {
    try {
      resetPeriod();
      resetAccess();
      resetBanner();
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return { logout };
};

export default useLogout;
