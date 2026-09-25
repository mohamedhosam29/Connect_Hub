import api from "./api";

const TEST_ACCOUNTS = [
  { email: "mohamed@example.com", password: "12345678", userId: 1, name: "Mohamed", username: "mohamed" },
  { email: "hossam@example.com", password: "87654321", userId: 2, name: "Hossam", username: "hossam" },
];

const getRegisteredAccounts = () => {
  const saved = localStorage.getItem("registeredAccounts");
  return saved ? JSON.parse(saved) : [];
};

const saveRegisteredAccounts = (accounts) => {
  localStorage.setItem("registeredAccounts", JSON.stringify(accounts));
};

const UniqueUserId = () => Date.now();

export const login = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  const registeredAccounts = getRegisteredAccounts();

  const account = [...TEST_ACCOUNTS, ...registeredAccounts].find(
    (acc) => acc.email.trim().toLowerCase() === normalizedEmail && acc.password === password
  );

  if (!account) {
    throw new Error("Invalid email or password.");
  }

  const token = `${account.email}${Date.now()}`;

  return {
    user: {
      id: account.userId,
      name: account.name || account.username || account.email,
      username: account.username || account.email.split("@")[0],
      email: account.email,
    },
    token,
  };
};

export const register = async (username, email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  const registeredAccounts = getRegisteredAccounts();

  const existing = [...TEST_ACCOUNTS, ...registeredAccounts].find(
    (acc) => acc.email.trim().toLowerCase() === normalizedEmail
  );
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  try {
    await api.post("/users", { name: username, email, username });
  } catch (e) {}

  const newUserId = UniqueUserId();
  const newAccount = {
    email: normalizedEmail,
    password,
    userId: newUserId,
    name: username,
    username: username,
  };

  registeredAccounts.push(newAccount);
  saveRegisteredAccounts(registeredAccounts);

  const token = `${normalizedEmail}${Date.now()}`;

  return {
    user: {
      id: newUserId,
      name: username,
      username: username,
      email: normalizedEmail,
    },
    token,
  };
};

export const getCurrentUser = async (userId) => {
  const registeredAccounts = getRegisteredAccounts();
  const account = [...TEST_ACCOUNTS, ...registeredAccounts].find(
    (acc) => acc.userId === userId
  );
  return account
    ? {
        id: account.userId,
        name: account.name || account.email,
        username: account.username || account.email.split("@")[0],
        email: account.email,
      }
    : null;
};