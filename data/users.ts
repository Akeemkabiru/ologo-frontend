export interface MockUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "USR-1042",
    fullName: "Jane Cooper",
    username: "janecooper",
    email: "jane.cooper@example.com",
    phone: "+1 555-010-1042",
    avatar: "https://i.pravatar.cc/64?img=31",
  },
  {
    id: "USR-1043",
    fullName: "Wade Warren",
    username: "wadewarren",
    email: "wade.warren@example.com",
    phone: "+1 555-010-1043",
    avatar: "https://i.pravatar.cc/64?img=12",
  },
  {
    id: "USR-1044",
    fullName: "Esther Howard",
    username: "estherhoward",
    email: "esther.howard@example.com",
    phone: "+1 555-010-1044",
    avatar: "https://i.pravatar.cc/64?img=33",
  },
  {
    id: "USR-1045",
    fullName: "Cameron Williamson",
    username: "cameronw",
    email: "cameron.w@example.com",
    phone: "+1 555-010-1045",
    avatar: "https://i.pravatar.cc/64?img=35",
  },
  {
    id: "USR-1046",
    fullName: "Brooklyn Simmons",
    username: "brooklyns",
    email: "brooklyn.s@example.com",
    phone: "+1 555-010-1046",
    avatar: "https://i.pravatar.cc/64?img=45",
  },
  {
    id: "USR-1047",
    fullName: "Leslie Alexander",
    username: "lesliealexander",
    email: "leslie.a@example.com",
    phone: "+1 555-010-1047",
    avatar: "https://i.pravatar.cc/64?img=47",
  },
];

/** Search users by full name, username, user ID, email, or phone. */
export const searchUsers = (query: string, excludeIds: string[] = []) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return MOCK_USERS.filter((user) => {
    if (excludeIds.includes(user.id)) return false;
    return (
      user.fullName.toLowerCase().includes(q) ||
      user.username.toLowerCase().includes(q) ||
      user.id.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.phone.toLowerCase().includes(q)
    );
  });
};
