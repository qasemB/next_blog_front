'use client';

import { getBlogsService } from '../../services/blog';
import { getCategoriesService } from '../../services/category';
import { useState, useEffect } from 'react';
import { Blog } from '@/types/blog';
import { Cattegory } from '@/types/category';

// Import components
import Navbar from './_partials/Navbar';
import HeroBanner from './_partials/HeroBanner';
import Statistics from './_partials/Statistics';
import Categories from './_partials/Categories';
import FeaturedBlogs from './_partials/FeaturedBlogs';
import Footer from './_partials/Footer';

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Cattegory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsData, categoriesData] = await Promise.all([
          getBlogsService(),
          getCategoriesService()
        ]);
        setBlogs(blogsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  // نمایش فقط 6 مقاله اول
  const featuredBlogs = blogs.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroBanner />
      <Statistics />
      <Categories categories={categories} />
      <FeaturedBlogs blogs={featuredBlogs} />
      <Footer categories={categories} />
    </div>
  );
}
