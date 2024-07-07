'use client';

import useCart from '@/hooks/UseCart';
import { useUser } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface HeartFavoriteProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  // const [signedInUser, setsignedInUser] = useState<UserType | null>(null);
  const [isLiked, setisLiked] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const data = await response.json();
      // setsignedInUser(data);
      setisLiked(data.wishlist.includes(product._id));
      setLoading(false);
    } catch (error) {
      console.log('Users_GET:', error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!user) {
      router.push('/sign-in');
      return;
    } else {
      try {
        setLoading(true);
        const response = await fetch('/api/users/wishlist', {
          method: 'POST',
          body: JSON.stringify({ productId: product._id }),
        });

        const updatedUser = await response.json();
        // setsignedInUser(updatedUser);
        setisLiked(updatedUser.wishlist.includes(product._id));
        updateSignedInUser && updateSignedInUser(updatedUser);
      } catch (error) {
        console.log('[wishlist_POST]', error);
      }
    }
  };
  return (
    <button onClick={handleLike}>
      <Heart fill={`${isLiked ? 'orange' : 'white'}`} />
    </button>
  );
};

export default HeartFavorite;
