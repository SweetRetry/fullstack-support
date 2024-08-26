import { Permission } from "@prisma/client";
import { getPermissionList } from "@repo/database/services/auth";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext<Permission[]>([]);
const AuthProvider = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) => {
  const [authList, setAuthList] = useState<Permission[]>([]);

  useEffect(() => {
    async function run() {
      const res = await getPermissionList(token);
      res.data && setAuthList(res.data);
    }
    run();
  }, []);

  return (
    <AuthContext.Provider value={authList}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
