import { useState } from "react";
import { useCreateUser } from "../hooks/useCreateUser";
import { UserRole } from "../types/userTypes";
import  Input  from "../../../shared/components/Input";

const AddUserForm = ({ role }: { role: UserRole }) => {
  const { mutate, isPending } = useCreateUser();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    college: "",
    branch: "",
    graduationYear: "",
  });

  const handleSubmit = () => {
    mutate({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      role,

      // ✅ ROLE BASED DATA
      mobile: role === "STUDENT" ? form.mobile : undefined,
      college: role === "ADMIN" ? undefined : form.college,
      branch: role === "STUDENT" ? form.branch : undefined,
      graduationYear:
        role === "STUDENT" ? Number(form.graduationYear) : undefined,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-5">

      {/* BASIC INFO */}
      <Input label="First Name" onChange={(v) => setForm({ ...form, firstName: v })} />
      <Input label="Last Name" onChange={(v) => setForm({ ...form, lastName: v })} />

      <Input label="Email" onChange={(v) => setForm({ ...form, email: v })} />
      <Input label="Password" type="password" onChange={(v) => setForm({ ...form, password: v })} />

      {/* STUDENT ONLY */}
      {role === "STUDENT" && (
        <>
          <Input label="Mobile" onChange={(v) => setForm({ ...form, mobile: v })} />
          <Input label="Branch" onChange={(v) => setForm({ ...form, branch: v })} />
          <Input label="College" onChange={(v) => setForm({ ...form, college: v })} />
          <Input label="Graduation Year" onChange={(v) => setForm({ ...form, graduationYear: v })} />
        </>
      )}

      {/* COORDINATOR */}
      {role === "COORDINATOR" && (
        <Input label="College" onChange={(v) => setForm({ ...form, college: v })} />
      )}

      {/* ADMIN → NOTHING EXTRA */}

      {/* BUTTON FULL WIDTH */}
      <div className="col-span-2 mt-4">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full bg-green-500 hover:bg-green-400 transition p-3 rounded-lg font-medium"
        >
          {isPending ? "Creating..." : `Create ${role}`}
        </button>
      </div>
    </div>
  );
};

export default AddUserForm;