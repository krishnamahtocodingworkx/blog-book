"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

type Section = {
  heading: string;
  content: string;
  imageUrl: string;
};

type FormData = {
  title: string;
  coverImageUrl: string;
  description: string;
  authorName: string;
  data: Section[];
};

export default function CreateBlog() {
  const {
    register,
    control,
    handleSubmit,
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

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form Data:", data);

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Server responded with error status
        const errorData = await response.json();
        console.error("Server error:", errorData);
        alert(`Error: ${errorData.message || "Failed to create blog"}`);
        return;
      }

      const res = await response.json();
      console.log("Response:", res);
      alert("Blog created successfully!");
      // Optionally reset form or redirect user here
    } catch (error) {
      console.error("Network or unexpected error:", error);
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

        {/* Cover Image URL */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="coverImageUrl">
            Cover Image URL <span className="text-red-600">*</span>
          </label>
          <input
            id="coverImageUrl"
            type="string"
            {...register("coverImageUrl", {
              required: "Cover Image URL is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Enter a valid URL",
              },
            })}
            className={`w-full border rounded px-3 py-2 ${
              errors.coverImageUrl ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.coverImageUrl && (
            <p className="text-red-600 text-sm mt-1">
              {errors.coverImageUrl.message}
            </p>
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
                onClick={() => remove(index)}
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

              {/* Image URL */}
              <div>
                <label
                  htmlFor={`data.${index}.imageUrl`}
                  className="block font-semibold mb-1"
                >
                  Image URL
                </label>
                <input
                  id={`data.${index}.imageUrl`}
                  type="string"
                  {...register(`data.${index}.imageUrl` as const, {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "Enter a valid URL",
                    },
                  })}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.data?.[index]?.imageUrl
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.data?.[index]?.imageUrl && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.data[index]?.imageUrl?.message}
                  </p>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ heading: "", content: "", imageUrl: "" })}
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
