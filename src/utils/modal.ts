export type BlogCardProps = {
  blog: BlogType;
};
export type BlogSection = {
  imageUrl?: string;
  heading?: string;
  content?: string;
  _id: string;
};
export type BlogType = {
  title: string;
  coverImageUrl: string;
  author: string;
  conclusion: string;
  description: string;
  _id: string;
  __v: number;
  slug: string;
  data: BlogSection[];
};
