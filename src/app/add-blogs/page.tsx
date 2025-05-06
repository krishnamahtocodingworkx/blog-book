"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

type Section = {
  heading: string;
  content: string;
  imageUrl: string;
  imageFile?: File;
  imagePreview?: string;
};

type FormData = {
  title: string;
  coverImageUrl: string;
  coverImageFile?: File;
  coverImagePreview?: string;
  description: string;
  authorName: string;
  data: Section[];
};

async function uploadImage(file: File): Promise<string> {
  // Convert file to base64
  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const base64 = await toBase64(file);

  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64 }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Image upload failed");
  return data.result.secure_url;
}

export default function CreateBlog() {
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const [sectionPreviews, setSectionPreviews] = useState<(string | null)[]>([]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      data: [{ heading: "", content: "", imageUrl: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "data",
  });

  // Cover image file handler
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("coverImageFile", file);
      const reader = new FileReader();
      reader.onloadend = () => setCoverImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Section image file handler
  const handleSectionImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set file in react-hook-form
      const data = getValues("data");
      data[idx].imageFile = file;
      setValue("data", data);

      // Set preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setSectionPreviews((prev) => {
          const newPreviews = [...prev];
          newPreviews[idx] = reader.result as string;
          return newPreviews;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new section and its preview
  const handleAddSection = () => {
    append({ heading: "", content: "", imageUrl: "" });
    setSectionPreviews((prev) => [...prev, null]);
  };

  // Remove a section and its preview
  const handleRemoveSection = (idx: number) => {
    remove(idx);
    setSectionPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const onSubmit = async (data: FormData) => {
    try {
      // 1. Upload cover image if it's a File
      let coverImageUrl = data.coverImageUrl;
      if (data.coverImageFile && data.coverImageFile instanceof File) {
        coverImageUrl = await uploadImage(data.coverImageFile);
      }

      // 2. Upload section images if they're Files
      const sections = await Promise.all(
        data.data.map(async (section) => {
          let imageUrl = section.imageUrl;
          if (section.imageFile && section.imageFile instanceof File) {
            imageUrl = await uploadImage(section.imageFile);
          }
          return {
            heading: section.heading,
            content: section.content,
            imageUrl,
          };
        })
      );

      // 3. Prepare the blog data for POST
      const blogData = {
        title: data.title,
        coverImageUrl,
        description: data.description,
        authorName: data.authorName,
        data: sections,
      };

      // 4. Send blog data to backend
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Failed to create blog"}`);
        return;
      }

      alert("Blog created successfully!");
      // Optionally reset form or redirect user here
    } catch (error) {
      console.log("error :", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="title">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            {...register("title", {
              required: "Title is required",
              maxLength: { value: 120, message: "Max length is 120" },
            })}
            className={`w-full border rounded px-3 py-2 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Cover Image */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="coverImageFile">
            Cover Image <span className="text-red-600">*</span>
          </label>
          <input
            id="coverImageFile"
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="w-full border rounded px-3 py-2"
          />
          {coverImagePreview && (
            <Image
              src={coverImagePreview}
              alt="Cover Preview"
              className="mt-2 max-h-48 rounded"
              height={200}
              width={200}
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="description">
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            rows={5}
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 200,
                message: "Description must be at least 200 characters",
              },
            })}
            className={`w-full border rounded px-3 py-2 resize-y ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Author Name */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="authorName">
            Author Name
          </label>
          <input
            id="authorName"
            {...register("authorName")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Dynamic Sections */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Sections</h2>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border p-4 mb-4 rounded relative bg-gray-50"
            >
              <button
                type="button"
                onClick={() => handleRemoveSection(index)}
                className="absolute top-2 right-2 text-red-600 font-bold hover:text-red-800"
                aria-label={`Remove section ${index + 1}`}
              >
                &times;
              </button>

              {/* Heading */}
              <div className="mb-3">
                <label
                  htmlFor={`data.${index}.heading`}
                  className="block font-semibold mb-1"
                >
                  Heading
                </label>
                <input
                  id={`data.${index}.heading`}
                  {...register(`data.${index}.heading` as const, {
                    required: "Heading is required",
                  })}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.data?.[index]?.heading
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.data?.[index]?.heading && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.data[index]?.heading?.message}
                  </p>
                )}
              </div>

              {/* Content */}
              <div className="mb-3">
                <label
                  htmlFor={`data.${index}.content`}
                  className="block font-semibold mb-1"
                >
                  Content
                </label>
                <textarea
                  id={`data.${index}.content`}
                  rows={4}
                  {...register(`data.${index}.content` as const, {
                    required: "Content is required",
                  })}
                  className={`w-full border rounded px-3 py-2 resize-y ${
                    errors.data?.[index]?.content
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.data?.[index]?.content && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.data[index]?.content?.message}
                  </p>
                )}
              </div>

              {/* Section Image */}
              <div>
                <label
                  htmlFor={`data.${index}.imageFile`}
                  className="block font-semibold mb-1"
                >
                  Section Image
                </label>
                <input
                  id={`data.${index}.imageFile`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSectionImageChange(e, index)}
                  className="w-full border rounded px-3 py-2"
                />
                {sectionPreviews[index] && (
                  <Image
                    src={sectionPreviews[index] as string}
                    alt={`Section ${index + 1} Preview`}
                    className="mt-2 max-h-40 rounded"
                    height={200}
                    width={200}
                  />
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddSection}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Section
          </button>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Blog
          </button>
        </div>
      </form>
    </div>
  );
}
