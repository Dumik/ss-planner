import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';

type BannerType = {
  unsplash: string;
};

const bannerApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Banner'],
  reducerPath: 'bannerApi',
  keepUnusedDataFor: 0,

  endpoints: (builder) => ({
    fetchBannerForUser: builder.query<{ banner: BannerType; docId: string } | null, string | void>({
      async queryFn(userId) {
        try {
          if (userId) {
            const q = query(collection(db, 'banners'), where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            let banner: BannerType = {
              unsplash: '',
            };
            let docId: string = '';
            querySnapshot.forEach((doc) => {
              docId = doc.id;
              banner = { unsplash: doc.data()?.unsplash };
            });
            return { data: { banner, docId } };
          } else {
            return {
              data: null,
            };
          }
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ['Banner'],
    }),

    saveBanner: builder.mutation<void | null, { userId?: string; bannerData?: BannerType }>({
      async queryFn({ bannerData, userId }) {
        try {
          const docRef = await addDoc(collection(db, 'banners'), {
            ...bannerData,
            userId: userId,
          });
          console.log('Document reference:', docRef);
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Banner'],
    }),
    updateBanner: builder.mutation<void | null, { documentId: string; newData: any }>({
      async queryFn({ documentId, newData }) {
        try {
          const documentRef = doc(db, 'banners', documentId);
          await updateDoc(documentRef, newData);
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Banner'],
    }),
    deleteBanner: builder.mutation<void | null, { documentId: string }>({
      async queryFn({ documentId }) {
        try {
          await deleteDoc(doc(db, 'banners', documentId));
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Banner'],
    }),
  }),
});

export const {
  useFetchBannerForUserQuery,
  useDeleteBannerMutation,
  useSaveBannerMutation,
  useUpdateBannerMutation,
} = bannerApi;
export default bannerApi;
