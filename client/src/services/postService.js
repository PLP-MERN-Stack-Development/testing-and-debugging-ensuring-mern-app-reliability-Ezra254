import apiClient from './apiClient';

export const fetchPosts = (params = {}) => {
  return apiClient
    .get('/posts', { params })
    .then((res) => res.data);
};

export const fetchPostById = (postId) => {
  return apiClient
    .get(`/posts/${postId}`)
    .then((res) => res.data);
};

export const createPost = (payload) => {
  return apiClient
    .post('/posts', payload)
    .then((res) => res.data);
};

export const updatePost = (postId, payload) => {
  return apiClient
    .put(`/posts/${postId}`, payload)
    .then((res) => res.data);
};

export const deletePost = (postId) => {
  return apiClient
    .delete(`/posts/${postId}`)
    .then((res) => res.data);
};

