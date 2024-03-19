import baseAPI from 'src/api/userApi'
import { authHeader, authHeaderWithImage } from 'src/helpers/authHeader'

const getAllBlogs = async () => {
  try {
    return await baseAPI.get('/list-blogs')
  } catch (e) {
    console.log(e)
  }
}

const getBlogById = async (id) => {
  try {
    return await baseAPI.get(`/blogById/${id}`)
  } catch (e) {
    console.log(e)
  }
}

const createBlog = async (data) => {
  try {
    return await baseAPI.post('/create-blog', data, { headers: authHeaderWithImage() })
  } catch (error) {
    console.log(error)
  }
}

const updateBlog = async (data) => {
  try {
    return await baseAPI.post('/update-blog', data, { headers: authHeaderWithImage() })
  } catch (error) {
    console.log(error)
  }
}

const deleteBlog = async (id) => {
  try {
    return await baseAPI.post(`/delete-blog/${id}`, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const BlogService = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
}

export default BlogService
