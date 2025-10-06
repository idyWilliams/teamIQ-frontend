"use client";

import { useUsers } from "@/hooks/useUsers";
import { useAddUser, useDeleteUser, useUpdateUser } from "@/hooks/useUserMutations";

export default function TestPage() {
  const { data, isLoading, isError } = useUsers();
  const addUser = useAddUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error fetching users.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Users</h1>
      <ul>
        {data?.slice(0, 5).map((user: any) => (
          <li key={user.id} className="flex justify-between items-center">
            <span>{user.name} ({user.email})</span>
            <div>
              <button
                onClick={() => updateUser.mutate({ id: user.id, name: "Updated", email: user.email })}
                className="px-2 py-1 bg-yellow-400 text-white rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={() => deleteUser.mutate(user.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => addUser.mutate({ name: "New User", email: "new@example.com" })}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add User
      </button>
    </div>
  );
}
