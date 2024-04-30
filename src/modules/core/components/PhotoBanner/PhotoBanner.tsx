'use client';
import React, { SetStateAction, useEffect, useState } from 'react';
import { Basic } from 'unsplash-js/dist/methods/users/types';
import { createApi } from 'unsplash-js';
import Image from 'next/image';
import classNames from 'classnames';

import { DialogWrapper } from '@/core/components';
import { Input, Loader } from '@/core/ui';
import { useBannerActions } from '@/core/slices';
import { useTypedSelector } from '@/store';
import {
  useDeleteBannerMutation,
  useFetchBannerForUserQuery,
  useSaveBannerMutation,
  useUpdateBannerMutation,
} from '@/modules/dashboard';
import { useAuthUser } from '@/modules/auth';
import { Trash } from '@phosphor-icons/react';

const unsplash = createApi({
  accessKey: `${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
});

type BasicType = {
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
} & Basic;

const PhotoBanner = () => {
  const { bannerImage } = useTypedSelector((state) => state.banner);

  const [photos, setPhotos] = useState<BasicType[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthUser();
  const { setBannerImage, resetBanner } = useBannerActions();

  const { data } = useFetchBannerForUserQuery(user?.uid);

  const [saveBanner] = useSaveBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  const searchPhotos = async (query: string) => {
    setIsLoading(true);
    const response = await unsplash.search
      .getPhotos({
        query,
        perPage: 20,
        orientation: 'landscape',
      })
      .finally(() => setIsLoading(false));
    const data = response.response?.results;
    setPhotos(data as SetStateAction<BasicType[] | undefined>);
  };

  const handleImage = (photo: BasicType | undefined) => {
    if (bannerImage && data?.docId) {
      updateBanner({
        documentId: data.docId,
        newData: { bannerData: { unsplash: photo?.urls.full! || '' } },
      });
      setBannerImage({ bannerImage: photo?.urls.full! || '' });
    } else {
      saveBanner({ bannerData: { unsplash: photo?.urls.full! || '' }, userId: user?.uid });
      setBannerImage({ bannerImage: photo?.urls.full! || '' });
    }
  };

  const handleDelete = () => {
    setIsLoading(true);
    if (bannerImage && data?.docId) {
      deleteBanner({ documentId: data?.docId })
        .then(() => {
          resetBanner();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  //META: Init banner to store
  useEffect(() => {
    if (data?.banner.unsplash && !bannerImage && !isLoading) {
      setBannerImage({ bannerImage: data?.banner.unsplash || '' });
    }
  }, [data?.banner.unsplash && !bannerImage]);

  return (
    <div
      className='bg-purple-500 p-10 h-96 rounded flex items-end justify-end'
      style={{
        backgroundImage: `url("${bannerImage || 'https://images.unsplash.com/photo-1521117184087-0bf82f2385ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1OTIxNTl8MHwxfHNlYXJjaHw0fHxsaW5lc3xlbnwwfHx8fDE3MTM0NTkxNDh8MA&ixlib=rb-4.0.3&q=85'}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className='flex items-center'>
        <DialogWrapper
          className='max-w-96 !h-8'
          openElement={
            <span
              className={classNames(
                'text-sm p-2 bg-white/50 hover:bg-black/20 hover:text-white rounded-md duration-300 !h-8',
                {
                  'rounded-s-md rounded-e-none': bannerImage,
                },
              )}>
              Change cover
            </span>
          }>
          <div className='w-full'>
            <span>Search:</span>
            <Input type='text' onChange={(e) => searchPhotos(e.target.value)} />
            <div className='h-96 overflow-y-scroll grid grid-cols-4 gap-1 mt-8'>
              {!photos?.length && !isLoading ? (
                <div className='flex col-span-4  items-center flex-col'>
                  <span className='text-lg font-semibold text-slate-400'>Photo not found</span>
                  <span className='text-lg font-semibold text-slate-400'>Type your request</span>
                </div>
              ) : null}
              {photos?.map((photo) => (
                <Image
                  key={photo.id}
                  src={photo.urls.small}
                  alt={photo.alt_description}
                  width={200}
                  height={200}
                  className='col-span-1 cursor-pointer hover:opacity-80 duration-200 !aspect-square  object-cover rounded'
                  onClick={() => handleImage(photo)}
                />
              ))}
              {isLoading && (
                <div className='flex col-span-4 justify-center '>
                  <Loader color='#4C1FA7' style={{ width: '60px' }} />
                </div>
              )}
            </div>
          </div>
        </DialogWrapper>
        {data?.docId && (
          <button
            className='text-sm p-2 bg-white/50 hover:bg-red-500 hover:text-white rounded-e-md duration-300 cursor-pointer h-[33px] mt-[1px]'
            onClick={handleDelete}>
            <Trash size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PhotoBanner;
