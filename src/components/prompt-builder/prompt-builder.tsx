"use client";

import { Category } from "@/db/schema";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { PromptSubject } from "./subject";
import { useState } from "react";

type Props = {
  categories: Category[];
};

export const PromptBuiler = ({ categories }: Props) => {
  const [currentStep, setCurrentStep] = useState(-1);

  const orderData = categories.sort().map((c) => {
    return {
      header: c,
      component: <PromptSubject />,
    };
  });

  const nextStep = () => {
    if (currentStep !== categories.length - 1) setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    if (currentStep !== -1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="h-1/2 w-full">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            {currentStep === -1
              ? "Subject"
              : orderData[currentStep].header.title}
          </h3>
        </CardHeader>
        <CardContent>
          {currentStep === -1 ? (
            <PromptSubject />
          ) : (
            orderData[currentStep].component
          )}
          <div className="mt-4 flex gap-2">
            <Button
              className="ml-auto mr-0"
              variant="secondary"
              onClick={previousStep}
            >
              Previous
            </Button>
            <Button onClick={nextStep}> Next </Button>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};
