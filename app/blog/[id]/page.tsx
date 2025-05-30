import { getBlogByIdService, getBlogsService } from '@/services/blog';
import { getBlogCommentsService } from '@/services/comment';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaEye, FaHeart, FaShare } from 'react-icons/fa';

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function BlogPage({ params }: BlogPageProps) {
  try {
    const { id } = await params;
    console.log(id);
    
    
    const [blog, allBlogs, comments] = await Promise.all([
      getBlogByIdService(id),
      getBlogsService(),
      getBlogCommentsService(id)
    ]);

    console.log(comments);
    

    // مقالات پیشنهادی (حذف مقاله فعلی و انتخاد 3 مقاله)
    const suggestedBlogs = allBlogs
      .filter(b => b.id !== blog.id)
      .slice(0, 3);

    // مقالات سایدبار (حذف مقاله فعلی و انتخاد 5 مقاله)
    const sidebarBlogs = allBlogs
      .filter(b => b.id !== blog.id)
      .slice(0, 5);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <Image
            src={`http://localhost:4004${blog.image}`}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Breadcrumb */}
          <div className="absolute top-6 right-6">
            <Link 
              href="/" 
              className="inline-flex items-center text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm rounded-full px-4 py-2"
            >
              <FaArrowLeft className="ml-2" />
              بازگشت به صفحه اصلی
            </Link>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="container mx-auto">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                {blog.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <FaUser className="text-blue-400" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-400" />
                  <span>{new Date(blog.createdAt).toLocaleDateString('fa-IR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEye className="text-blue-400" />
                  <span>1,234 بازدید</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Article Content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                      <FaHeart />
                      <span className="text-sm">پسندیدن</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <FaShare />
                      <span className="text-sm">اشتراک‌گذاری</span>
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    زمان مطالعه: 5 دقیقه
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed text-justify whitespace-pre-line">
                    {blog.content}
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-600 ml-2">برچسب‌ها:</span>
                    {['تکنولوژی', 'برنامه‌نویسی', 'وب'].map((tag) => (
                      <span 
                        key={tag}
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>

              {/* Suggested Articles */}
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">مقالات پیشنهادی</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestedBlogs.map((suggestedBlog) => (
                    <Link 
                      key={suggestedBlog.id} 
                      href={`/blog/${suggestedBlog.id}`}
                      className="group"
                    >
                      <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={`http://localhost:4004${suggestedBlog.image}`}
                            alt={suggestedBlog.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {suggestedBlog.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {suggestedBlog.content.substring(0, 100)}...
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{suggestedBlog.author}</span>
                            <span>{new Date(suggestedBlog.createdAt).toLocaleDateString('fa-IR')}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Comments Section */}
              <section className="mt-12">
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">نظرات ({comments.length})</h2>
                  
                  {/* Comment Form */}
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">نظر خود را بنویسید</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="نام شما"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="email"
                          placeholder="ایمیل شما"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <textarea
                        rows={4}
                        placeholder="متن نظر شما..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      ></textarea>
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        ارسال نظر
                      </button>
                    </form>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-gray-400 text-4xl mb-4">💬</div>
                        <h3 className="text-lg font-medium text-gray-600 mb-2">
                          هنوز نظری ثبت نشده
                        </h3>
                        <p className="text-gray-500 text-sm">
                          اولین نفری باشید که نظر می‌دهید!
                        </p>
                      </div>
                    ) : (
                      comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-medium">
                              {comment.author.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-gray-800">{comment.author}</h4>
                              <span className="text-sm text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString('fa-IR')}
                              </span>
                            </div>
                            <p className="text-gray-700 whitespace-pre-line">{comment.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                
                {/* Featured Article */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">مقاله ویژه</h3>
                  {sidebarBlogs[0] && (
                    <Link href={`/blog/${sidebarBlogs[0].id}`} className="group">
                      <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                        <Image
                          src={`http://localhost:4004${sidebarBlogs[0].image}`}
                          alt={sidebarBlogs[0].title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {sidebarBlogs[0].title}
                      </h4>
                    </Link>
                  )}
                </div>

                {/* Other Articles */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">سایر مقالات</h3>
                  <div className="space-y-4">
                    {sidebarBlogs.slice(1).map((sidebarBlog) => (
                      <Link 
                        key={sidebarBlog.id} 
                        href={`/blog/${sidebarBlog.id}`}
                        className="group flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={`http://localhost:4004${sidebarBlog.image}`}
                            alt={sidebarBlog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 line-clamp-2 text-sm group-hover:text-blue-600 transition-colors">
                            {sidebarBlog.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(sidebarBlog.createdAt).toLocaleDateString('fa-IR')}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
                  <h3 className="text-lg font-bold mb-3">خبرنامه</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    برای دریافت آخرین مقالات عضو خبرنامه شوید
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="ایمیل شما"
                      className="w-full px-3 py-2 rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-white/50"
                    />
                    <button
                      type="submit"
                      className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
                    >
                      عضویت
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
} 