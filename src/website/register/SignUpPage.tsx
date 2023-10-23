"use client";

import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { type SignUpData } from "./SignupInterface";
import { Checkbox } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  KeyIcon,
  MailIcon,
  PersonIcon,
  Spinner,
} from "~/shared/icons/icons";
import { api } from "~/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const initialData: SignUpData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreedToTermsAndConditions: false,
};

const SignUpPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialData);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [signUpError, setSignUpError] = useState("");

  const onChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const onCheckCheckbox = (name: string, value: boolean) => {
    setFormData({ ...formData, [name]: value });
  };

  // const addUser = api.user.addUser.useMutation({
  //       onSuccess: () => {
  //     router.refresh();
  //   },
  // });

  const addUser = api.user.addUser.useMutation({});

  const onSubmitSignUpCredentials = () => {
    try {
      if (formData.confirmPassword === formData.password) {
        setIsSubmitting(true);
        const data = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          agreedToTermsAndConditions: formData.agreedToTermsAndConditions,
        };

        addUser.mutate(data, {
          onSuccess: (value) => {
            if (value.success && value.user.id && value.user.email) {
              // dispatch(
              //   showSuccessSnackbar(
              //     `Successfully created your account, We have sent the email verification code to ${value.user.email}`
              //   )
              // );
              toast({
                title: "Scheduled: Catch up ",
                description: "Friday, February 10, 2023 at 5:57 PM",
                action: (
                  <ToastAction altText="Goto schedule to undo">
                    Undo
                  </ToastAction>
                ),
              });
              console.log('value', value);
              router.push('/login');
              // router.push(`/verification/${value.user.email}`).catch((error) => {
              //   console.error(
              //     'Error while redirecting to email verification after registration:',
              //     error
              //   );
              // });
            }
            setIsSubmitting(false);
          },
          onError: (e) => {
            setIsSubmitting(false);
            // setSignUpError(e.message);
          },
        });
      } else {
        setIsSubmitting(false);
        // setSignUpError(`Passwords doesn't match`);
      }
    } catch (err) {
      console.error("error", err);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg justify-center text-center">
        <Card shadow="lg">
          <CardBody>
            <form onSubmit={onSubmitSignUpCredentials}>
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
                  <h2 className="text-3l font-bold">Register an Account</h2>
                </div>
                <div className="mb-2 ml-4 mr-4 mt-4 flex justify-center">
                  <Input
                    type="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    labelPlacement="outside"
                    value={formData.firstName}
                    onChange={(e) => onChange("firstName", e.target.value)}
                    startContent={
                      <PersonIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                    }
                    isRequired
                    isReadOnly={isSubmitting}
                  />
                </div>
                <div className="mb-2 ml-4 mr-4 mt-4 flex justify-center">
                  <Input
                    type="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    labelPlacement="outside"
                    value={formData.lastName}
                    onChange={(e) => onChange("lastName", e.target.value)}
                    startContent={
                      <PersonIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                    }
                    isRequired
                    isReadOnly={isSubmitting}
                  />
                </div>
                <div className="mb-2 ml-4 mr-4 mt-2 flex justify-center">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    labelPlacement="outside"
                    value={formData.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    startContent={
                      <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                    }
                    isRequired
                    isReadOnly={isSubmitting}
                  />
                </div>
                <div className="mb-2 ml-4 mr-4 mt-2  flex justify-center">
                  <Input
                    type={isVisible ? "text" : "password"}
                    label="Password"
                    labelPlacement="outside"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => onChange("password", e.target.value)}
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
                <div className="mb-2 ml-4 mr-4 mt-2  flex justify-center">
                  <Input
                    type={isVisible ? "text" : "password"}
                    label="Confirm Password"
                    labelPlacement="outside"
                    placeholder="Enter your password again"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      onChange("confirmPassword", e.target.value)
                    }
                    isRequired
                    isReadOnly={isSubmitting || formData.password === ""}
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
                <div className="mb-4 ml-4 mr-4 mt-2">
                  <Checkbox
                    color="primary"
                    size="sm"
                    isSelected={formData.agreedToTermsAndConditions}
                    onValueChange={() =>
                      onCheckCheckbox(
                        "agreedToTermsAndConditions",
                        !formData.agreedToTermsAndConditions,
                      )
                    }
                  >
                    I accept the Terms and conditions
                  </Checkbox>
                </div>
                <Button
                  className="mb-4 ml-4 mr-4 mt-2  flex justify-center"
                  isDisabled={
                    (formData.email === "" || formData.password === "") &&
                    formData.password !== formData.confirmPassword
                  }
                  isLoading={isSubmitting}
                  color="primary"
                  spinner={<Spinner />}
                  size="lg"
                  type="submit"
                >
                  Register
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
