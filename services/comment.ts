import { BlogComment } from "@/types/comment";

export const getBlogCommentsService = async (blogId: string): Promise<BlogComment[]> => {
    const res = await fetch(`http://localhost:4004/api/articles/${blogId}/comments`, {
        cache: 'no-store'
    });
    const data = await res.json();
    return data as BlogComment[];
};
