import { useState, useEffect } from "react";
import { communityAPI } from "../services/api";

export default function useCommunity() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, pages: 0 });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await communityAPI.getPosts({ page: 1, limit: 10 });
        setPosts(res.data.data || []);
        setPagination(res.data.pagination || { total: 0, page: 1, limit: 10, pages: 0 });
      } catch (err) {
        console.error("Failed to fetch community posts:", err);
        setError(err.response?.data?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const createPost = async (postData) => {
    try {
      const res = await communityAPI.createPost(postData);
      const newPost = res.data.data;
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      console.error("Failed to create post:", err);
      throw err;
    }
  };

  const likePost = async (postId) => {
    try {
      const res = await communityAPI.likePost(postId);
      const { liked } = res.data;
      
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            _count: {
              ...post._count,
              likes: liked ? post._count.likes - 1 : post._count.likes + 1
            }
          };
        }
        return post;
      }));
      
      return { liked, likesChange: liked ? -1 : 1 };
    } catch (err) {
      console.error("Failed to like post:", err);
      throw err;
    }
  };

  const addComment = async (postId, commentData) => {
    try {
      const res = await communityAPI.addComment(postId, commentData);
      const newComment = res.data.data;
      
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            _count: {
              ...post._count,
              comments: post._count.comments + 1
            }
          };
        }
        return post;
      }));
      
      return newComment;
    } catch (err) {
      console.error("Failed to add comment:", err);
      throw err;
    }
  };

  const loadMore = async (page) => {
    try {
      setLoading(true);
      const res = await communityAPI.getPosts({ page, limit: 10 });
      setPosts(prev => [...prev, ...(res.data.data || [])]);
      setPagination(res.data.pagination || pagination);
    } catch (err) {
      console.error("Failed to load more posts:", err);
      setError(err.response?.data?.message || "Failed to load more posts");
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
    pagination,
    createPost,
    likePost,
    addComment,
    loadMore
  };
}
