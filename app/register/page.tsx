"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
const registrationSchema = z.object({
  organisationName: z.string().min(1, "Organisation Name is required"),
  organisationBio: z.string().min(1, "Bio is required"),
  website: z.string().url("Invalid URL"),
  instagram: z.string().optional(),
  contact1Name: z.string().min(1, "Contact 1 Name is required"),
  contact1Number: z.string().min(1, "Contact 1 Number is required"),
  contact2Name: z.string().optional(),
  contact2Number: z.string().optional(),
  participationAs: z.string().min(1, "This field is required"),
  managerName: z.string().min(1, "Manager Name is required"),
  vehiclesRequired: z.string().min(1, "Vehicle info is required"),
  vehicleDetails: z.string().min(1, "Vehicle details required"),
  estimatedParticipants: z.string().min(1, "Estimated participants required"),
});

export default function Register() {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    // Here, you would normally check login credentials via API.
    // For now, we just navigate:
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-8 px-4 bg-gray-50">
      {/* Top Logo */}
      <div className="mb-6">
        <Image
          src="/logo.png" // Change to your actual logo file
          width={120}
          height={120}
          alt="Notting Hill Carnival"
          className="mx-auto"
        />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Organisation Registration Portal
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl space-y-4"
      >
        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="Organisation Name?" name="organisationName" register={register} errors={errors} />
          <FormInput label="Organisation Bio?" name="organisationBio" register={register} errors={errors} />
          <FormInput label="Website?" name="website" register={register} errors={errors} />
          <FormInput label="Instagram?" name="instagram" register={register} errors={errors} />
          <FormInput label="Correspondent Contact 1 - Name" name="contact1Name" register={register} errors={errors} />
          <FormInput label="Correspondent Contact 1 - Number" name="contact1Number" register={register} errors={errors} />
          <FormInput label="Correspondent Contact 2 - Name" name="contact2Name" register={register} errors={errors} />
          <FormInput label="Correspondent Contact 2 - Number" name="contact2Number" register={register} errors={errors} />
          <FormInput label="What will you be participating as?" name="participationAs" register={register} errors={errors} />
          <FormInput label="Name of Organisation Manager" name="managerName" register={register} errors={errors} />
          <FormInput label="How many vehicles do you require?" name="vehiclesRequired" register={register} errors={errors} />
        </div>

        {/* Large Text Areas */}
        <FormTextArea
          label="Describe each vehicle in detail (including size & specifications)"
          name="vehicleDetails"
          register={register}
          errors={errors}
        />

        <FormTextArea
          label="Estimated number of participants performing"
          name="estimatedParticipants"
          register={register}
          errors={errors}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function FormInput({ label, name, register, errors }: any) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        {...register(name)}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}

function FormTextArea({ label, name, register, errors }: any) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <textarea
        {...register(name)}
        rows={4}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
