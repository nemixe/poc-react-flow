export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?u=john.doe@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Manager",
    avatar: "https://i.pravatar.cc/150?u=jane.smith@example.com",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Developer",
    avatar: "https://i.pravatar.cc/150?u=bob.johnson@example.com",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "Designer",
    avatar: "https://i.pravatar.cc/150?u=alice.williams@example.com",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "QA Engineer",
    avatar: "https://i.pravatar.cc/150?u=charlie.brown@example.com",
  },
];

export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}
