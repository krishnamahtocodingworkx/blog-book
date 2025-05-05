import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/db/db";
import Blog from "@/models/blog.model";

export async function getBlogs(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.status(200).json(blogs);
}

export async function getBlogBySlug(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { slug } = req.query;
  const blog = await Blog.findOne({ slug });
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.status(200).json(blog);
}

export async function createBlog(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function updateBlog(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { slug } = req.query;
  try {
    const blog = await Blog.findOneAndUpdate({ slug }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function deleteBlog(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { slug } = req.query;
  const blog = await Blog.findOneAndDelete({ slug });
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.status(204).end();
}
