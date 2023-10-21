import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

import { type LoginData } from "./LoginInterface";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  KeyIcon,
  MailIcon,
  Spinner,
} from "~/shared/icons/icons";

export default function LoginPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(""); // State for login error message

  const onEmailChange = (event: string) => {
    setEmail(event);
  };

  const onPasswordChange = (event: string) => {
    setPassword(event);
  };

  const onSubmitLoginCredentials = async () => {
    try {
      setLoginError("");
      const values: LoginData = { email: email, password: password };
      setIsSubmitting(true);

      console.log("values: ", values);
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      console.log("result: ", result);

      if (result && result.ok) {
        setLoginError("");
        // dispatch(showSuccessSnackbar(`Welcome`));
        // await router.push('/verificationCheck');
        console.log("result: ", result);
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
        console.log("result: ", result);
        setLoginError("Invalid email or password"); // Set the login error message
      }
    } catch (error: unknown) {
      console.error("Error occurred during sign-in:", error);
      setLoginError(`Error occurred`);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg justify-center text-center">
        <Card shadow="lg">
          <CardBody>
            <form onSubmit={onSubmitLoginCredentials}>
              <div className="flex w-full flex-col">
                <div className="flex justify-center">
                  <Image
                    src="/SKLogo.png"
                    width={180}
                    height={180}
                    alt="SK LOGO"
                  />
                </div>
                <div className="flex justify-center pt-2">
                  <h2 className="text-3lg font-bold">
                    Interactive Learning Center
                  </h2>
                </div>
                <div className="mb-2 ml-4 mr-4 mt-4 flex justify-center">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    labelPlacement="outside"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    startContent={
                      <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                    }
                    isRequired
                    isReadOnly={isSubmitting}
                  />
                </div>
                <div className="mb-4 ml-4 mr-4 mt-2  flex justify-center">
                  <Input
                    type={isVisible ? "text" : "password"}
                    label="Password"
                    labelPlacement="outside"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    isRequired
                    isReadOnly={isSubmitting}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                        ) : (
                          <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                        )}
                      </button>
                    }
                    startContent={
                      <KeyIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                    }
                  />
                </div>
                {loginError && ( // Display the error message if it exists
                  <h6 className="text-1lg font-bold">{loginError}</h6>
                )}
                <Button
                  className="mb-4 ml-4 mr-4 mt-2  flex justify-center"
                  isDisabled={email === "" || password === ""}
                  isLoading={isSubmitting}
                  color="primary"
                  spinner={<Spinner />}
                  size="lg"
                  type="submit"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
