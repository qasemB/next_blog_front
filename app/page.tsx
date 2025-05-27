import Image from 'next/image';
import { getBlogsService } from '../services/blog';
import { getCategoriesService } from '../services/category';
import Link from 'next/link';
import { 
  FaHome, 
  FaSearch, 
  FaInfoCircle, 
  FaPhone, 
  FaUsers, 
  FaNewspaper, 
  FaEye, 
  FaHeart,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

export default async function Home() {
  const blogs = await getBlogsService();
  const categories = await getCategoriesService();
  
  // نمایش فقط 6 مقاله اول
  const featuredBlogs = blogs.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* نوبار */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* لوگو */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                وبلاگ من
              </Link>
            </div>

            {/* منوی دسکتاپ */}
            <div className="hidden md:flex gap-5 items-center">
              <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <FaHome />
                صفحه اصلی
              </Link>
              <Link href="/search" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <FaSearch />
                جستجو و فیلتر
              </Link>
              <Link href="/about" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <FaInfoCircle />
                درباره ما
              </Link>
              <Link href="/contact" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <FaPhone />
                تماس با ما
              </Link>
            </div>

            {/* منوی موبایل */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* بنر اصلی */}
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <Image
          src="/assets/images/Blog-banner.jpg"
          alt="بنر وبلاگ"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/35 bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              وبلاگ من
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto">
              مرجع مقالات تخصصی در زمینه‌های مختلف
            </p>
          </div>
        </div>
      </section>

      {/* بخش آمار */}
      <section className="bg-blue-200 py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center text-blue-700">
              <div className="flex justify-center mb-3">
                <FaNewspaper className="text-4xl" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-1 flex justify-center">250+</h3>
              <p className="text-blue-600 flex justify-center">مقاله منتشر شده</p>
            </div>
            <div className="text-center text-blue-700">
              <div className="flex justify-center mb-3">
                <FaUsers className="text-4xl" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-1 flex justify-center">15K+</h3>
              <p className="text-blue-600 flex justify-center">کاربر فعال</p>
            </div>
            <div className="text-center text-blue-700">
              <div className="flex justify-center mb-3">
                <FaEye className="text-4xl" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-1 flex justify-center">500K+</h3>
              <p className="text-blue-600 flex justify-center">بازدید ماهانه</p>
            </div>
            <div className="text-center text-blue-700">
              <div className="flex justify-center mb-3">
                <FaHeart className="text-4xl" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-1 flex justify-center">98%</h3>
              <p className="text-blue-600 flex justify-center">رضایت کاربران</p>
            </div>
          </div>
        </div>
      </section>

      {/* بخش دسته‌بندی‌ها */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              دسته‌بندی‌ها
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              مقالات را بر اساس موضوعات مختلف مرور کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.id}`}
                className="group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                    مشاهده مقالات
                    <svg className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* بخش مقالات */}
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            آخرین مقالات
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            جدیدترین مطالب و مقالات تخصصی را در اینجا مطالعه کنید
          </p>
        </div>

        {/* گرید مقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredBlogs.map((blog) => (
            <Link 
              key={blog.id} 
              href={`/blog/${blog.id}`}
              className="group"
            >
              <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                {/* تصویر مقاله */}
                <div className="relative h-48 md:h-52 lg:h-56 overflow-hidden">
                  <Image
                    src={`http://localhost:4004${blog.image}`}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    جدید
                  </div>
                </div>

                {/* محتوای کارت */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-1">
                    {blog.content.substring(0, 120)}...
                  </p>

                  {/* اطلاعات نویسنده و تاریخ */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-xs">
                          {blog.author.charAt(0)}
                        </span>
                      </div>
                      <span>{blog.author}</span>
                    </div>
                    <time className="text-xs">
                      {new Date(blog.createdAt).toLocaleDateString('fa-IR')}
                    </time>
                  </div>

                  {/* دکمه ادامه مطلب */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700 flex items-center gap-1">
                      ادامه مطلب
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* دکمه مشاهده همه مقالات */}
        <div className="text-center mt-12">
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            مشاهده همه مقالات
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* فوتر */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* درباره وبلاگ */}
            <div>
              <h3 className="text-xl font-bold mb-4">وبلاگ من</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                مرجع تخصصی مقالات در زمینه‌های مختلف تکنولوژی، کسب و کار، سلامت و موضوعات متنوع دیگر. هدف ما ارائه محتوای باکیفیت و مفید برای شماست.
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-600 transition-colors">
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>

            {/* لینک‌های مفید */}
            <div>
              <h3 className="text-xl font-bold mb-4">لینک‌های مفید</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                    صفحه اصلی
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="text-gray-300 hover:text-white transition-colors text-sm">
                    همه مقالات
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-gray-300 hover:text-white transition-colors text-sm">
                    جستجو و فیلتر
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                    درباره ما
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                    تماس با ما
                  </Link>
                </li>
              </ul>
            </div>

            {/* دسته‌بندی‌ها */}
            <div>
              <h3 className="text-xl font-bold mb-4">دسته‌بندی‌ها</h3>
              <ul className="space-y-2">
                {categories.slice(0, 5).map((category) => (
                  <li key={category.id}>
                    <Link 
                      href={`/category/${category.id}`} 
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* اطلاعات تماس */}
            <div>
              <h3 className="text-xl font-bold mb-4">تماس با ما</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-400" />
                  <span className="text-gray-300 text-sm">info@myblog.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-blue-400" />
                  <span className="text-gray-300 text-sm">021-12345678</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <span className="text-gray-300 text-sm">تهران، ایران</span>
                </div>
              </div>
            </div>
          </div>

          {/* خط جداکننده و کپی‌رایت */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 وبلاگ من. تمامی حقوق محفوظ است.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
