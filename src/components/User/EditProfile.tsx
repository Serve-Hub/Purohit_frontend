import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AuthContext } from "@/src/context/authcontext";
import Link from "next/link";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";
import Breadcrumb from "./Breadcrumbs/Breadcrumb";
import { useToast } from "@/hooks/use-toast";
import $axios from "@/src/lib/axios.instance";

// Define the Zod schema
const profileSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

function EditProfile() {
  const { toast } = useToast();
  const userInfo = useContext(AuthContext)?.userInfo;
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [coverpreview, setCoverpreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: ProfileFormValues) => {
    console.log("eta handle submit ma", data);
    try {
      setLoading(true);
      const response = await $axios.patch(
        "/api/v1/users/updateAccountDetails",
        data
      );

      console.log("Profile updated successfully:", response.data);
      if (response.data.statusCode === 200) {
        console.log("update");
        toast({
          title: "update message",
          description: `${response.data.message}`,
          className: "bg-green-100 text-success border border-green-700",
        });
      }
    } catch (error: any) {
      console.log(
        "Error updating profile:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const [profileData, setProfileData] = useState<{ avatar: File | null }>({
    avatar: null,
  });

  const [coverData, setCoverData] = useState<{ coverPhoto: File | null }>({
    coverPhoto: null,
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileData({ avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverData({ coverPhoto: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverpreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (userInfo) {
      Object.keys(userInfo).forEach((key) => {
        if (key in userInfo) {
          form.setValue(
            key as keyof ProfileFormValues,
            userInfo[key as keyof ProfileFormValues]
          );
        }
      });
    }
  }, [userInfo, form]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("eta ");
    console.log("data is ", profileData);
    const fd = new FormData();
    if (profileData.avatar) {
      fd.append("avatar", profileData.avatar);
    }
    console.log("avatar is", fd);
    try {
      setLoading(true);
      const response = await $axios.patch("/api/v1/Users/profileImage", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile updated successfully:", response.data);
      if (response.data.statusCode === 200) {
        console.log("update");
        toast({
          title: "update message",
          description: `${response.data.message}`,
          className: "bg-green-100 text-success border border-green-700",
        });
      }
    } catch (error: any) {
      console.log(
        "Error updating profile:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCoverSubmit = async (e: React.FormEvent) => {
    const cd = new FormData();
    if (coverData.coverPhoto) {
      cd.append("coverPhoto", coverData.coverPhoto);
    }
    console.log("cover photo is", cd);
    e.preventDefault();
    try {
      setLoading(true);
      const response = await $axios.patch("/api/v1/users/coverImage", cd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("cover Image updated successfully:", response.data);
      if (response.data.statusCode === 200) {
        console.log("update");
        toast({
          title: "update message",
          description: `${response.data.message}`,
          className: "bg-green-100 text-success border border-green-700",
        });
      }
    } catch (error: any) {
      console.log(
        "Error updating profile:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb pageName="Edit Profile" />

        {/* Main Content Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-4 sm:mt-6">
          {/* Cover Photo Section */}
          <form
            onSubmit={(e) => {
              handleCoverSubmit(e);
            }}
          >
            <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64">
              {coverpreview ? (
                <img
                  src={coverpreview}
                  alt="Cover Image Preview"
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <img
                  src={userInfo?.coverPhoto || "/img/default-cover.jpg"}
                  alt="Cover Image"
                  className="h-full w-full object-cover object-center"
                />
              )}

              {/* Cover Photo Edit Button */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <label
                    htmlFor="coverPhoto"
                    className="flex cursor-pointer items-center justify-center gap-1 sm:gap-2 rounded-md bg-black bg-opacity-70 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-opacity-80 transition-all duration-200"
                  >
                    <input
                      type="file"
                      name="coverPhoto"
                      id="coverPhoto"
                      className="sr-only"
                      onChange={handleCoverImageChange}
                      accept="image/png, image/jpg, image/jpeg"
                    />
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Edit Cover</span>
                    <span className="sm:hidden">Edit</span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading || !coverData.coverPhoto}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-pandit hover:bg-pandit/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {loading ? (
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        <span className="hidden sm:inline">Saving...</span>
                      </div>
                    ) : (
                      <span>Save</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Profile Photo and Info Section */}
          <div className="relative px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 md:pb-10">
            {/* Profile Photo Upload Form */}
            <form onSubmit={(e) => handleProfileSubmit(e)}>
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 -mt-12 sm:-mt-16 md:-mt-20">
                {/* Profile Photo Container */}
                <div className="relative">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-white p-1 sm:p-2 shadow-lg">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile Preview"
                        className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <img
                        src={userInfo?.avatar || "/img/default-avatar.png"}
                        className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                        alt="Profile"
                      />
                    )}

                    {/* Profile Photo Edit Button */}
                    <label
                      htmlFor="profilePhoto"
                      className="absolute bottom-0 right-0 sm:bottom-1 sm:right-1 md:bottom-2 md:right-2 flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-full bg-pandit text-white hover:bg-pandit/90 transition-all duration-200 shadow-md"
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <input
                        type="file"
                        name="avatar"
                        id="profilePhoto"
                        className="sr-only"
                        onChange={handleImageChange}
                        accept="image/png, image/jpg, image/jpeg"
                      />
                    </label>
                  </div>

                  {/* Profile Photo Save Button */}
                  {profileData.avatar && (
                    <button
                      type="submit"
                      disabled={loading}
                      className="absolute -bottom-12 sm:-bottom-14 left-1/2 transform -translate-x-1/2 px-3 py-1.5 sm:px-4 sm:py-2 bg-pandit hover:bg-pandit/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                      {loading ? (
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                          <span>Updating...</span>
                        </div>
                      ) : (
                        "Update Photo"
                      )}
                    </button>
                  )}
                </div>

                {/* User Info */}
                <div className="text-center sm:text-left mt-8 sm:mt-0 flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {userInfo?.firstName} {userInfo?.lastName}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-1">
                    {userInfo?.email}
                  </p>
                  {userInfo?.bio && (
                    <p className="text-xs sm:text-sm text-gray-500 max-w-md">
                      {userInfo?.bio}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Personal Information Form */}
          <div className="border-t border-gray-200 p-4 sm:p-6 md:p-8">
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 sm:space-y-8"
              >
                {/* Personal Information Section */}
                <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-pandit"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                      Personal Information
                    </h2>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <input
                              type="text"
                              {...field}
                              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200 text-sm sm:text-base"
                              placeholder="Enter your first name"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm mt-1" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <input
                              type="text"
                              {...field}
                              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200 text-sm sm:text-base"
                              placeholder="Enter your last name"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Bio Field */}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                          Bio
                        </FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            rows={4}
                            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200 text-sm sm:text-base resize-vertical"
                            placeholder="Tell us about yourself..."
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-pandit hover:bg-pandit/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        <span>Saving Changes...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Save Changes</span>
                      </>
                    )}
                  </Button>

                  {/* Cancel/Reset Button */}
                  <button
                    type="button"
                    onClick={() => form.reset()}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
