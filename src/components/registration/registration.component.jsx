import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Label,
  TextInput,
  Radio,
  Select,
  FileInput,
} from "flowbite-react";

const RegistrationForm = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
    number: "",
    role: "",
    image: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Please select a gender")
      .required("Gender is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    number: Yup.string()
      .matches(/^\d+$/, "Must be only digits")
      .required("Number is required"),
    role: Yup.string()
      .oneOf(["buyer", "seller"], "Please select a role")
      .required("Role is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test(
        "fileSize",
        "File is too large",
        (value) => value && value.size <= 1024 * 1024
      ) // 1MB
      .test(
        "fileType",
        "Unsupported file format",
        (value) =>
          value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
      ),
  });

  // Handle form submission and API call
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      // Prepare the data to send to the FakeStore API
      const userData = {
        email: values.email,
        username: values.name.toLowerCase().replace(" ", ""), // Simplified username (example)
        password: values.password,
        name:values.name,
        phone: values.number,
      };

      // Send data to FakeStore API
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();
      console.log("Registration Successful:", data);
      setStatus({ success: true, message: "User registered successfully!" });
    } catch (error) {
      console.error("Registration Failed:", error);
      setStatus({ success: false, message: "Registration failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto">
        <br />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, isSubmitting, status }) => (
            <Form className="space-y-4">
              {/* Name Field */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Field
                  name="name"
                  as={TextInput}
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Field
                  name="email"
                  as={TextInput}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Gender Radio Buttons */}
              <div>
                <Label>Gender</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <Field
                      name="gender"
                      type="radio"
                      value="male"
                      id="male"
                      className="mr-2"
                    />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center">
                    <Field
                      name="gender"
                      type="radio"
                      value="female"
                      id="female"
                      className="mr-2"
                    />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center">
                    <Field
                      name="gender"
                      type="radio"
                      value="other"
                      id="other"
                      className="mr-2"
                    />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password Field */}
              <div>
                <Label htmlFor="password">Password</Label>
                <Field
                  name="password"
                  as={TextInput}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Field
                  name="confirmPassword"
                  as={TextInput}
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <Label htmlFor="number">Number</Label>
                <Field
                  name="number"
                  as={TextInput}
                  id="number"
                  type="text"
                  placeholder="Enter your number"
                />
                <ErrorMessage
                  name="number"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Role Selection */}
              <div>
                <Label htmlFor="role">Role</Label>
                <Field name="role" as={Select} id="role">
                  <option value="">Select a role</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label htmlFor="image">Image Upload</Label>
                <FileInput
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                    setPreviewImage(
                      URL.createObjectURL(event.currentTarget.files[0])
                    );
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mt-2 max-w-xs"
                  />
                )}
              </div>

              {/* Submission Button */}
              <Button className="bg-red-600" type="submit" disabled={isSubmitting}>
                Register
              </Button>

              {/* Status Message */}
              {status && status.message && (
                <div className={`text-sm ${status.success ? "text-green-600" : "text-red-600"}`}>
                  {status.message}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default RegistrationForm;
