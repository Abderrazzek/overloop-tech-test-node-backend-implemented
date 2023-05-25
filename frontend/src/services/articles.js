import api from "../utils/api";

const ARTICLES = "articles";

export const listArticles = async () => {
  const response = await api.get(ARTICLES);
  return response.data;
};

export const getArticle = async (articleId) => {
  const response = await api.get(`${ARTICLES}/${articleId}`);
  return response.data;
};

export const createArticle = async (payload) => {
  const response = await api.post(ARTICLES, payload);
  return response.data;
};

export const editArticle = async (articleId, payload) => {
  const response = await api.put(`${ARTICLES}/${articleId}`, payload);
  return response.data;
};
