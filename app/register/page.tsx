
// @typescript-eslint/no-explicit-any
"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// --- Zod Schemas for each category ---
const BaseFields = z.object({
  category: z.string(),
});

const contactSchema = z.object({
  contactName: z.string().min(2, "Required"),
  contactEmail: z.string().email("Invalid email"),
  contactPhone: z.string().min(7, "Invalid phone"),
});

const vehicleDimensionsSchema = z.object({
  length: z.number().nonnegative(),
  width: z.number().nonnegative(),
  height: z.number().nonnegative().lte(4.4, "Max height 4.4m (14.4ft)"),
});

const MasBandSchema = BaseFields.extend({
  // Basic
  bandName: z.string().min(2, "Band name required"),
  companyName: z.string().optional(),
  bandBio: z.string().max(5000).optional(), // allow chars; we'll rely on UI for 500 words
  website: z.string().url().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  // Contacts
  contact1: contactSchema,
  contact2: contactSchema.optional(),
  // Event
  applyingFor: z.enum(["Sunday Only", "Monday Only", "Sunday & Monday"]),
  // Uploads (we won't validate files heavily here)
  logoUpload: z.any().optional(),
  informationSharingConsentForm: z.any().optional(),
  // Theme
  theme: z.string().optional(),
  themeSynopsis: z.string().optional(),
  // Band size
  bandSize: z.enum(["Small (50–99)", "Medium (100–199)", "Large (200+)"]).optional(),
  // Vehicle
  vehicleCount: z.enum(["1", "2"]).optional(),
  vehicleDimensions: vehicleDimensionsSchema.optional(),
  vehicleModifications: z.string().optional(),
  // Other uploads
  termsAndConditions: z.any().optional(),
  riskAssessment: z.any().optional(),
  insuranceDocuments: z.any().optional(),
});

const SoundSystemSchema = BaseFields.extend({
  soundSystemName: z.string().min(2),
  companyName: z.string().optional(),
  soundSystemBio: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  contact1: contactSchema,
  contact2: contactSchema.optional(),
  applyingFor: z.enum(["Sunday Only", "Monday Only", "Sunday & Monday"]),
  logoUpload: z.any().optional(),
  informationSharingConsentForm: z.any().optional(),
  licenseType: z.enum(["T.E.N", "Premises"]).optional(),
  powerSource: z.string().optional(),
  musicGenre: z.string().optional(),
  barSite: z.enum(["Yes", "No"]).optional(),
  streetTrading: z.enum(["Yes", "No"]).optional(),
  eventManagementPlan: z.any().optional(),
  riskAssessment: z.any().optional(),
  aaaPassesImages: z.any().optional(),
  termsAndConditions: z.any().optional(),
  insuranceDocuments: z.any().optional(),
});

const SteelbandSchema = BaseFields.extend({
  bandName: z.string().min(2),
  companyName: z.string().optional(),
  bandBio: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  contact1: contactSchema,
  contact2: contactSchema.optional(),
  applyingFor: z.enum(["Sunday Only", "Monday Only", "Sunday & Monday"]),
  logoUpload: z.any().optional(),
  informationSharingConsentForm: z.any().optional(),
  estimatedNumberOfParticipants: z.number().int().positive().optional(),
  vehicleCount: z.enum(["1", "2"]).optional(),
  vehicleDescription: z.string().optional(),
  termsAndConditions: z.any().optional(),
  riskAssessment: z.any().optional(),
  insuranceDocuments: z.any().optional(),
});

const BrazilianBandSchema = BaseFields.extend({
  bandName: z.string().min(2),
  companyName: z.string().optional(),
  bandBio: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  contact1: contactSchema,
  contact2: contactSchema.optional(),
  applyingFor: z.enum(["Sunday Only", "Monday Only", "Sunday & Monday"]),
  logoUpload: z.any().optional(),
  informationSharingConsentForm: z.any().optional(),
  theme: z.string().optional(),
  themeSynopsis: z.string().optional(),
  bandSize: z.enum(["Small", "Medium", "Large"]).optional(),
  vehicleCount: z.enum(["1", "2"]).optional(),
  vehicleDimensions: vehicleDimensionsSchema.optional(),
  vehicleModifications: z.string().optional(),
  termsAndConditions: z.any().optional(),
  riskAssessment: z.any().optional(),
  insuranceDocuments: z.any().optional(),
});

const ContractorSchema = BaseFields.extend({
  companyName: z.string().min(2),
  informationSharingConsentForm: z.any().optional(),
  purposeOfVehiclePass: z.string().optional(),
  vehicleRegistration: z.string().optional(),
  driverName: z.string().optional(),
  driversLicenseCopy: z.any().optional(),
});

// Union schema for final server-side validation if required
const AnyCategorySchema = z.union([
  MasBandSchema,
  SoundSystemSchema,
  SteelbandSchema,
  BrazilianBandSchema,
  ContractorSchema,
]);

export default function MultiCategoryForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AnyCategorySchema),
    defaultValues: { category: "masband" },
  });

  const category = watch("category");

  useEffect(() => {
    // keep a small effect to validate vehicle height whenever user sets values via custom inputs
  }, []);

  const onSubmit = (data:any) => {
    // Files: transform FileList to simple metadata for display or upload
    const normalized = { ...data };
    // convert FileList to filenames (if present)
    Object.keys(normalized).forEach((k) => {
      if (normalized[k] instanceof FileList) {
        normalized[k] = Array.from(normalized[k]).map((f) => f.name);
      }
    });
    console.log("Submitting:", normalized);
    alert("Form submitted — check console for payload (demo)");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Event Registration</h1>
        <p className="text-sm text-gray-600 text-center">
          Choose a category and fill the relevant form. Mobile-first, responsive.
        </p>

        {/* Category Selection */}
        <div>
          <label className="block font-medium mb-1">Select Category</label>
          <select
            className="w-full border p-2 rounded"
            {...register("category")}
          >
            <option value="masband">Mas Band</option>
            <option value="soundsystem">Sound System</option>
            <option value="steelband">Steelband</option>
            <option value="brazilian">Brazilian Band</option>
            <option value="contractor">Contractor</option>
          </select>
        </div>

        {/* == MAS BAND == */}
        {category === "masband" && (
          <section className="border rounded-[10px] p-4">
            <h2 className="text-lg font-semibold mb-3">Category 1 — Mas Band</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm">Band Name *</label>
                <input className="w-full border p-2 rounded" {...register("bandName")} />
               {"bandName" in (errors ?? {}) && (
      <p className="text-red-500 text-sm">
        {(errors as any).bandName?.message}
      </p>
    )}
              </div>

              <div>
                <label className="block text-sm">Company Name (optional)</label>
                <input className="w-full border p-2 rounded" {...register("companyName")} />
              </div>

              <div>
                <label className="block text-sm">Band Bio (up to 500 words)</label>
                <textarea className="w-full border p-2 rounded" rows={4} {...register("bandBio")} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm">Website</label>
                  <input className="w-full border p-2 rounded" {...register("website")} />
                </div>
                <div>
                  <label className="block text-sm">Instagram</label>
                  <input className="w-full border p-2 rounded" {...register("instagram")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm">Facebook</label>
                  <input className="w-full border p-2 rounded" {...register("facebook")} />
                </div>
                <div>
                  <label className="block text-sm">Applying For</label>
                  <select className="w-full border p-2 rounded" {...register("applyingFor")}>
                    <option>Sunday Only</option>
                    <option>Monday Only</option>
                    <option>Sunday &amp; Monday</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Correspondent Contact 1</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                  <input placeholder="Name" className="border p-2 rounded" {...register("contact1.contactName")} />
                  <input placeholder="Email" className="border p-2 rounded" {...register("contact1.contactEmail")} />
                  <input placeholder="Phone" className="border p-2 rounded" {...register("contact1.contactPhone")} />
                </div>
              </div>

              <div>
                <h3 className="font-medium">Correspondent Contact 2 (optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                  <input placeholder="Name" className="border p-2 rounded" {...register("contact2.contactName")} />
                  <input placeholder="Email" className="border p-2 rounded" {...register("contact2.contactEmail")} />
                  <input placeholder="Phone" className="border p-2 rounded" {...register("contact2.contactPhone")} />
                </div>
              </div>

              <div>
                <label className="block text-sm">Logo Upload</label>
                <input type="file" {...register("logoUpload")} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm">Theme</label>
                  <input className="w-full border p-2 rounded" {...register("theme")} />
                </div>
                <div>
                  <label className="block text-sm">Band Size</label>
                  <select className="w-full border p-2 rounded" {...register("bandSize")}>
                    <option>Small (50–99)</option>
                    <option>Medium (100–199)</option>
                    <option>Large (200+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm">Vehicle Count</label>
                <select className="w-full border p-2 rounded" {...register("vehicleCount")}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm">Vehicle Dimensions (m) — Max height 4.4m</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <input placeholder="Length" type="number" step="0.1" className="border p-2 rounded" {...register("vehicleDimensions.length", { valueAsNumber: true })} />
                  <input placeholder="Width" type="number" step="0.1" className="border p-2 rounded" {...register("vehicleDimensions.width", { valueAsNumber: true })} />
                  <input placeholder="Height" type="number" step="0.1" className="border p-2 rounded" {...register("vehicleDimensions.height", { valueAsNumber: true })} />
                </div>
                {errors.vehicleDimensions?.height && (
                  <p className="text-red-600 text-sm">{errors.vehicleDimensions.height.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm">Vehicle Modifications</label>
                <textarea className="w-full border p-2 rounded" rows={3} {...register("vehicleModifications")} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <label className="block text-sm">Terms & Conditions</label>
                  <input type="file" {...register("termsAndConditions")} />
                </div>
                <div>
                  <label className="block text-sm">Risk Assessment</label>
                  <input type="file" {...register("riskAssessment")} />
                </div>
                <div>
                  <label className="block text-sm">Insurance Documents</label>
                  <input type="file" {...register("insuranceDocuments")} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* == Sound System == */}
        {category === "soundsystem" && (
          <section className="border p-4 rounded bg-gray-50">
            <h2 className="text-lg font-semibold mb-3">Category 2 — Sound System</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm">Sound System Name *</label>
                <input className="w-full border p-2 rounded" {...register("soundSystemName")} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input placeholder="Company Name" className="border p-2 rounded" {...register("companyName")} />
                <input placeholder="Website" className="border p-2 rounded" {...register("website")} />
              </div>

              <div>
                <label className="block text-sm">Bio</label>
                <textarea className="w-full border p-2 rounded" rows={3} {...register("soundSystemBio")} />
              </div>

              <div>
                <h3 className="font-medium">Correspondent Contact 1</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                  <input placeholder="Name" className="border p-2 rounded" {...register("contact1.contactName")} />
                  <input placeholder="Email" className="border p-2 rounded" {...register("contact1.contactEmail")} />
                  <input placeholder="Phone" className="border p-2 rounded" {...register("contact1.contactPhone")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm">License Type</label>
                  <select className="w-full border p-2 rounded" {...register("licenseType")}>
                    <option>T.E.N</option>
                    <option>Premises</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm">Power Source</label>
                  <input className="w-full border p-2 rounded" {...register("powerSource")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm">Music Genre (comma separated)</label>
                  <input className="w-full border p-2 rounded" {...register("musicGenre")} />
                </div>
                <div>
                  <label className="block text-sm">Bar Site</label>
                  <select className="w-full border p-2 rounded" {...register("barSite")}>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm">Event Management Plan</label>
                  <input type="file" {...register("eventManagementPlan")} />
                </div>
                <div>
                  <label className="block text-sm">AAA Passes Images (up to 2)</label>
                  <input type="file" multiple {...register("aaaPassesImages")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm">Terms & Conditions</label>
                  <input type="file" {...register("termsAndConditions")} />
                </div>
                <div>
                  <label className="block text-sm">Insurance Documents</label>
                  <input type="file" {...register("insuranceDocuments")} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* == Steelband == */}
        {category === "steelband" && (
          <section className="border p-4 rounded bg-gray-50">
            <h2 className="text-lg font-semibold mb-3">Category 3 — Steelband</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm">Band Name *</label>
                <input className="w-full border p-2 rounded" {...register("bandName")} />
              </div>

              <div>
                <label className="block text-sm">Estimated Number Of Participants</label>
                <input type="number" className="w-full border p-2 rounded" {...register("estimatedNumberOfParticipants", { valueAsNumber: true })} />
              </div>

              <div>
                <label className="block text-sm">Vehicle Count</label>
                <select className="w-full border p-2 rounded" {...register("vehicleCount")}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm">Vehicle Description</label>
                <textarea className="w-full border p-2 rounded" rows={3} {...register("vehicleDescription")} />
              </div>

              <div>
                <label className="block text-sm">Logo Upload</label>
                <input type="file" {...register("logoUpload")} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <label className="block text-sm">Terms & Conditions</label>
                  <input type="file" {...register("termsAndConditions")} />
                </div>
                <div>
                  <label className="block text-sm">Risk Assessment</label>
                  <input type="file" {...register("riskAssessment")} />
                </div>
                <div>
                  <label className="block text-sm">Insurance Documents</label>
                  <input type="file" {...register("insuranceDocuments")} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* == Brazilian Band == */}
        {category === "brazilian" && (
          <section className="border p-4 rounded bg-gray-50">
            <h2 className="text-lg font-semibold mb-3">Category 4 — Brazilian Band</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm">Band Name *</label>
                <input className="w-full border p-2 rounded" {...register("bandName")} />
              </div>

              <div>
                <label className="block text-sm">Theme</label>
                <input className="w-full border p-2 rounded" {...register("theme")} />
              </div>

              <div>
                <label className="block text-sm">Band Size</label>
                <select className="w-full border p-2 rounded" {...register("bandSize")}>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm">Vehicle Dimensions (m)</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <input placeholder="Length" type="number" step="0.1" className="border p-2 rounded" {...register("vehicleDimensions.length", { valueAsNumber: true })} />
                  <input placeholder="Width" type="number" step="0.1" className="border p-2 rounded" {...register("vehicleDimensions.width", { valueAsNumber: true })} />
                  <input placeholder="Height" type="number" step="0.1" className="border p-2 rounded" {...register("vehicleDimensions.height", { valueAsNumber: true })} />
                </div>
              </div>

              <div>
                <label className="block text-sm">Vehicle Modifications</label>
                <textarea className="w-full border p-2 rounded" rows={3} {...register("vehicleModifications")} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <label className="block text-sm">Terms & Conditions</label>
                  <input type="file" {...register("termsAndConditions")} />
                </div>
                <div>
                  <label className="block text-sm">Risk Assessment</label>
                  <input type="file" {...register("riskAssessment")} />
                </div>
                <div>
                  <label className="block text-sm">Insurance Documents</label>
                  <input type="file" {...register("insuranceDocuments")} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* == Contractor == */}
        {category === "contractor" && (
          <section className="border p-4 rounded bg-gray-50">
            <h2 className="text-lg font-semibold mb-3">Category 5 — Contractor</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm">Company Name *</label>
                <input className="w-full border p-2 rounded" {...register("companyName")} />
              </div>

              <div>
                <label className="block text-sm">Purpose Of Vehicle Pass</label>
                <input className="w-full border p-2 rounded" {...register("purposeOfVehiclePass")} />
              </div>

              <div>
                <label className="block text-sm">Vehicle Registration</label>
                <input className="w-full border p-2 rounded" {...register("vehicleRegistration")} />
              </div>

              <div>
                <label className="block text-sm">Driver Name</label>
                <input className="w-full border p-2 rounded" {...register("driverName")} />
              </div>

              <div>
                <label className="block text-sm">Driver's License (front & back)</label>
                <input type="file" multiple {...register("driversLicenseCopy")} />
              </div>

              <div>
                <label className="block text-sm">Consent Form</label>
                <input type="file" {...register("informationSharingConsentForm")} />
              </div>
            </div>
          </section>
        )}

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
