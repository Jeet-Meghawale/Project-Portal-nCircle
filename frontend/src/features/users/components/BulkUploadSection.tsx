import { useState } from "react";
import * as XLSX from "xlsx";
import { useBulkUpload } from "../hooks/useBulkUpload";

const BulkUploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const { mutate, isPending, data, error } = useBulkUpload();

  const handleUpload = async () => {
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawData = XLSX.utils.sheet_to_json(sheet);

      // ✅ FORMAT + VALIDATE DATA
      const users = rawData.map((row: any) => {
        const role = row.role?.toUpperCase();

        return {
          firstName: row.firstName,
          lastName: row.lastName,
          email: row.email,
          password: row.email, // default password

          role: ["STUDENT", "COORDINATOR", "ADMIN"].includes(role)
            ? role
            : "STUDENT",

          mobile: role === "STUDENT" ? row.mobile || undefined : undefined,
          branch: role === "STUDENT" ? row.branch || undefined : undefined,
          college: role !== "ADMIN" ? row.college || undefined : undefined,
          graduationYear:
            role === "STUDENT" && row.graduationYear
              ? Number(row.graduationYear)
              : undefined,
        };
      });

      mutate(users);

    } catch (err) {
      console.error("Error parsing Excel:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-10">

      {/* ICON */}
      <div className="mb-4 text-green-400 text-4xl">📂</div>

      <h2 className="text-xl font-semibold mb-2">
        Bulk Upload Users
      </h2>

      <p className="text-gray-400 mb-6">
        Upload Excel (.xlsx) to create users in bulk
      </p>

      {/* DROP AREA */}
      <label className="w-full max-w-md border-2 border-dashed border-gray-700 rounded-xl p-8 cursor-pointer hover:border-green-400 transition">

        <input
          type="file"
          accept=".xlsx, .xls"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <p className="text-gray-400">
          {file ? file.name : "Click to upload or drag & drop"}
        </p>
      </label>

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        disabled={!file || isPending}
        className="mt-6 bg-green-500 hover:bg-green-400 px-6 py-2 rounded-lg"
      >
        {isPending ? "Processing..." : "Upload & Create Users"}
      </button>

      {/* SUCCESS */}
      {data && (
        <div className="mt-6 text-sm text-green-400">
          ✅ Users created successfully
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="mt-6 text-red-400 text-sm">
          ❌ Failed to upload users
        </div>
      )}

      {/* FORMAT INFO */}
      <p className="text-xs text-gray-500 mt-6">
        Format: firstName | lastName | email | role | mobile | branch | college | graduationYear
      </p>

    </div>
  );
};

export default BulkUploadSection;