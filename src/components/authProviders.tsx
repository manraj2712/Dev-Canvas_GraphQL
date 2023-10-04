"use client";
import { getProviders, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Button from "./button";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <Button handleClick={() => signIn(provider.id)} title="Sign in" />
          </div>
        ))}
      </div>
    );
  }
};

export default AuthProviders;
