'use client';
import React, { SetStateAction, useState } from 'react';
import { Basic } from 'unsplash-js/dist/methods/users/types';
import { createApi } from 'unsplash-js';
import Image from 'next/image';

import { DialogWrapper } from '@/core/components';
import { Button, Input } from '@/core/ui';

const unsplash = createApi({
  accessKey: `${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
});

type BasicType = {
  urls: {
    small: string;
  };
  alt_description: string;
} & Basic;

const PhotoBanner = () => {
  const [photos, setPhotos] = useState<BasicType[] | undefined>();

  const searchPhotos = async (query: string) => {
    const response = await unsplash.search.getPhotos({
      query,
    });
    const data = response.response?.results;
    setPhotos(data as SetStateAction<BasicType[] | undefined>);
  };
  console.log('%c jordan photos', 'color: lime;', photos);
  return (
    <div className='bg-purple-500 p-10'>
      <DialogWrapper openElement={<Button text='Open' />}>
        <div className='w-full'>
          <span>Search:</span>
          <Input type='text' onChange={(e) => searchPhotos(e.target.value)} />
          <div className='h-96 overflow-y-scroll grid grid-cols-3 gap-1 mt-8'>
            {photos?.map((photo) => (
              <Image
                key={photo.id}
                src={photo.urls.small}
                alt={photo.alt_description}
                width={200}
                height={300}
                className='col-span-1'
              />
            ))}
          </div>
        </div>
      </DialogWrapper>
    </div>
  );
};

export default PhotoBanner;
