"use client";

import { SmallCheck } from "@/components/icons/Check";
import { Button } from "@/components/ui/button";
import { CustomCheckbox } from "@/components/ui/custom-checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ConfirmStep from "./ConfirmStep";
import { useTranslations } from "@/providers/translation-provider";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

const LabelCondition = ({ require }: { require?: boolean }) => {
  const { dict } = useTranslations();

  return (
    <div
      className={cn(
        "bg-web-light rounded-[2px] relative -top-[1px]",
        require && "bg-web-vivid"
      )}
    >
      <p className="flex items-center justify-center text-normal text-[8px] text-white px-2 pt-0.5 font-bold">
        {require
          ? dict.entryForm.labels.required
          : dict.entryForm.labels.optional}
      </p>
    </div>
  );
};

export default function EntryForm() {
  const { dict } = useTranslations();
  const entryForm = dict.entryForm;

  const [isInView, setIsInView] = useState(false);
  const [startScrollY, setStartScrollY] = useState(0);
  const { scrollY } = useScroll();

  const handleViewportEnter = () => {
    setIsInView(true);
    setStartScrollY(window.scrollY);
  };

  const handleViewportLeave = () => {
    setIsInView(false);
  };

  const yFloat1 = useTransform(scrollY, (value) => {
    if (!isInView) return 0;
    const scrollDelta = value - startScrollY;
    return -scrollDelta * 0.15;
  });

  const xFloat2 = useTransform(scrollY, (value) => {
    if (!isInView) return 0;
    const scrollDelta = value - startScrollY;
    return Math.sin(scrollDelta * 0.004) * 20;
  });

  const scaleFloat2 = useTransform(scrollY, (value) => {
    if (!isInView) return 1;
    const scrollDelta = value - startScrollY;
    return 1 + Math.sin(scrollDelta * 0.006) * 0.05;
  });
  // Create dynamic form schema based on translations
  const formSchema = z.object({
    type: z.enum(["新卒採用", "キャリア採用"], {
      required_error: entryForm.fields.type.required,
    }),
    jobType: z
      .string({
        required_error: entryForm.fields.jobType.required,
      })
      .min(1, entryForm.fields.jobType.required),

    name: z
      .string({
        required_error: entryForm.fields.name.required,
      })
      .min(1, entryForm.fields.name.required),

    furigana: z
      .string({
        required_error: entryForm.fields.furigana.required,
      })
      .min(1, entryForm.fields.furigana.required),

    email: z
      .string({
        required_error: entryForm.fields.email.required,
      })
      .min(1, entryForm.fields.email.required)
      .email(entryForm.fields.email.invalid),

    phone: z
      .string({
        required_error: entryForm.fields.phone.required,
      })
      .min(1, entryForm.fields.phone.required)
      .regex(/^0\d{9,10}$/, entryForm.fields.phone.invalid),

    message: z.string().optional(),

    privacy: z
      .boolean({
        required_error: entryForm.fields.privacy.required,
      })
      .refine((val) => val === true, entryForm.fields.privacy.required),
  });

  const formControlClass = "flex flex-col md:flex-row gap-6";
  const labelClass = cn(
    "w-full md:w-1/4 flex items-center gap-2",
    "text-jp-p2 font-bold"
  );

  const contentRef = useRef<HTMLDivElement | null>(null);

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "新卒採用",
      jobType: "",
      name: "",
      furigana: "",
      email: "",
      phone: "",
      message: "",
      privacy: false,
    },
  });

  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
  } | null>(null);

  // Add state for step
  const [step, setStep] = useState<number>(1);

  // Update the onSubmit function and add state for form data
  const [formValues, setFormValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (step === 1) {
      setFormValues(values); // Store form values
      setStep(2);
      if (contentRef.current) {
        const yOffset = -100;
        const y =
          contentRef.current.getBoundingClientRect().top +
          window.scrollY +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      return;
    }
    // Handle final form submission
    console.log("Final submission:", values);
  }

  // Add handleBack function
  const onConfirmStepBack = () => {
    setStep(1);
    if (contentRef.current) {
      const yOffset = -100;
      const y =
        contentRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const onConfirmStepSubmit = () => {
    // Call API to send email when user confirms
    if (!formValues) return;
    fetch("/api/recruit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    })
      .then((res) => {
        if (res.ok) {
          setStep(3);
        } else {
          alert("送信に失敗しました。もう一度お試しください。");
        }
      })
      .catch(() => {
        alert("送信に失敗しました。もう一度お試しください。");
      });
    if (contentRef.current) {
      const yOffset = -100;
      const y =
        contentRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const [phoneDisplay, setPhoneDisplay] = useState("");

  // Initialize phoneDisplay when form values change
  useEffect(() => {
    const currentPhone = form.getValues("phone");
    if (currentPhone && !phoneDisplay) {
      setPhoneDisplay(formatPhoneForDisplay(currentPhone));
    }
  }, [form, phoneDisplay]);

  const formatPhoneForDisplay = (digits: string) => {
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 7) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
    }
  };

  const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-digit characters to get clean digits
    const digits = e.target.value.replace(/[^\d]/g, "");
    
    // Limit to 11 digits max
    const limitedDigits = digits.slice(0, 11);
    
    // Format for display
    const formattedDisplay = formatPhoneForDisplay(limitedDigits);
    setPhoneDisplay(formattedDisplay);
    
    // Store normalized digits only
    return limitedDigits;
  };

  return (
    <motion.section
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
      className="relative pt-[82px] mlg:pt-[90px] font-gothic"
    >
      {/* First triangle - TOP LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          x: xFloat2,
          scale: scaleFloat2,
        }}
        className="w-[300px] h-[260px] sm:w-[500px] sm:h-[435px] md:w-[1200px] md:!h-[1051px] absolute top-0 left-0 -translate-x-1/3 sm:-translate-x-1/2 md:-translate-x-1/2 -z-[1] -rotate-[110deg]"
      >
        <Image
          src="https://pub-1c108179b7cb46a98dc6dd25e0df069c.r2.dev/triangle.png"
          alt="Triangle decoration"
          fill
        />
      </motion.div>

      {/* Second triangle - CENTER RIGHT */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{
          x: xFloat2,
          scale: scaleFloat2,
        }}
        className="w-[400px] h-[350px] sm:w-[600px] sm:h-[525px] md:w-[1600px] md:!h-[1390px] absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/3 sm:translate-x-1/2 md:translate-x-1/2 -z-[1] -rotate-[110deg]"
      >
        <Image
          src="https://pub-1c108179b7cb46a98dc6dd25e0df069c.r2.dev/triangle.png"
          alt="Triangle decoration"
          fill
        />
      </motion.div>

      {/* Third triangle - BOTTOM LEFT */}
      <motion.div
        initial={{ opacity: 0, rotate: -20 }}
        whileInView={{ opacity: 1, rotate: -30 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          y: yFloat1,
        }}
        className="size-[120px] sm:size-[200px] md:size-[500px] absolute bottom-0 left-0 -translate-x-2/3 sm:-translate-x-full md:-translate-x-full -z-[1] rotate-[60deg]"
      >
        <Image
          src="https://pub-1c108179b7cb46a98dc6dd25e0df069c.r2.dev/triangle.png"
          alt="Triangle decoration"
          fill
        />
      </motion.div>
      {/* Content */}
      <div
        ref={contentRef}
        className="container mx-auto mt-[60px] md:mt-[120px] mb-[60px] md:mb-12"
      >
        <div
          className={cn(
            "space-y-8 md:space-y-12",
            step === 3 && "pb:[80px] md:pb-[160px]"
          )}
        >
          <h2 className="text-jp-h2 text-web-main text-center">
            {entryForm.stepHeadings[step - 1].title}
          </h2>
          <p className="text-jp-p2 text-web-dark text-center whitespace-pre-line">
            {entryForm.stepHeadings[step - 1].description}
          </p>
        </div>

        {/* Form */}
        {step === 1 && (
          <div className="my-12 mlg:my-[120px] px-6 mlg:px-[95px] py-[60px] mlg:py-[120px] space-y-12 shadow-[4px_4px_12px_0px_#0000001A] bg-white">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 md:space-y-8"
              >
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className={formControlClass}>
                      <Label className={labelClass}>
                        {entryForm.fields.type.label}
                        <LabelCondition require />
                      </Label>
                      <div className="flex-1 flex flex-col gap-2">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex items-center gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="新卒採用" id="shinsotsu" />
                              <Label
                                htmlFor="shinsotsu"
                                className="text-web-dark"
                              >
                                {entryForm.fields.type.newGrad}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="キャリア採用"
                                id="career"
                                className="text-web-vivid"
                              />
                              <Label htmlFor="career" className="text-web-dark">
                                {entryForm.fields.type.career}
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem className={formControlClass}>
                      <Label className={labelClass}>
                        {entryForm.fields.jobType.label}
                        <LabelCondition require />
                      </Label>
                      <div className="flex-1 flex flex-col gap-2">
                        <FormControl>
                          <Input
                            placeholder={entryForm.fields.jobType.placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className={formControlClass}>
                      <Label className={labelClass}>
                        {entryForm.fields.name.label}
                        <LabelCondition require />
                      </Label>
                      <div className="flex-1 flex flex-col gap-2">
                        <FormControl>
                          <Input
                            placeholder={entryForm.fields.name.placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="furigana"
                  render={({ field }) => (
                    <FormItem className={formControlClass}>
                      <Label className={labelClass}>
                        {entryForm.fields.furigana.label}
                        <LabelCondition require />
                      </Label>
                      <div className="flex-1 flex flex-col gap-2">
                        <FormControl>
                          <Input
                            placeholder={entryForm.fields.furigana.placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={formControlClass}>
                      <Label className={labelClass}>
                        {entryForm.fields.email.label}
                        <LabelCondition require />
                      </Label>
                      <div className="flex-1 flex flex-col gap-2">
                        <FormControl>
                          <Input
                            placeholder={entryForm.fields.email.placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className={formControlClass}>
                      <Label className={labelClass}>
                        {entryForm.fields.phone.label}
                        <LabelCondition require />
                      </Label>
                      <div className="flex-1 flex flex-col gap-2">
                        <FormControl>
                          <Input
                            type="tel"
                            inputMode="numeric"
                            placeholder="0312345678"
                            value={phoneDisplay || formatPhoneForDisplay(field.value)}
                            onChange={(e) => {
                              const normalizedValue = onPhoneNumberChange(e);
                              field.onChange(normalizedValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Dropzone */}
                <div className={formControlClass}>
                  <Label className={labelClass}>
                    {entryForm.fields.attachment.label}
                    <LabelCondition require />
                  </Label>

                  <div className="space-y-2 flex-1">
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        const file = acceptedFiles[0];
                        if (file && file.size > 1024 * 1024 * 20) {
                          const sizeMB = (
                            file.size /
                            (1024 * 1024 * 20)
                          ).toFixed(1);
                          setFileError(
                            `${entryForm.fields.attachment.sizeError.replace(
                              "1MB",
                              sizeMB + "MB"
                            )}`
                          );
                          setUploadedFile(null);
                        } else if (file) {
                          setFileError(null);
                          // Convert size to KB and format it
                          const sizeKB = Math.round(file.size / 1024);
                          setUploadedFile({
                            name: file.name,
                            size: `${sizeKB}KB`,
                          });
                          console.log(acceptedFiles);
                        }
                      }}
                      onDropRejected={() => {
                        setFileError(entryForm.fields.attachment.sizeError);
                        setUploadedFile(null);
                      }}
                      maxSize={1024 * 1024 * 20}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section className="border border-dashed border-line-gray rounded-[3px] flex justify-center items-center h-[120px]">
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className="text-normal text-[13px] md:text-[14px] text-line-gray">
                              <span className="text-web-vivid cursor-pointer">
                                {entryForm.fields.attachment.addFile}{" "}
                              </span>
                              {entryForm.fields.attachment.dropFile}
                            </p>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                    <div className="space-y-1">
                      {fileError ? (
                        <p className="text-normal text-[13px] md:text-[14px] text-brand-accent">
                          {fileError}
                        </p>
                      ) : uploadedFile ? (
                        <p className="flex gap-1 items-center text-normal text-[13px] md:text-[14px] text-web-dark">
                          <SmallCheck />{" "}
                          {`${uploadedFile.name}(${uploadedFile.size})`}
                        </p>
                      ) : (
                        <p className="text-normal text-[13px] md:text-[14px] text-web-dark">
                          {entryForm.fields.attachment.sizeLimit}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className={formControlClass}>
                      <Label className={labelClass}>
                        {entryForm.fields.message.label}
                        <LabelCondition />
                      </Label>
                      <div className="flex-1 flex flex-col gap-2">
                        <FormControl>
                          <Textarea
                            placeholder={entryForm.fields.message.placeholder}
                            className="min-h-[371px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem className="my-12 md:mt-20 md:mb-6 flex flex-col gap-2 items-center">
                      <FormControl>
                        <CustomCheckbox
                          checked={field.value}
                          onChange={() => field.onChange(!field.value)}
                        >
                          <p className="text-normal underline text-[13px] md:text-[14px] text-web-vivid">
                            {entryForm.fields.privacy.label}
                          </p>
                          <p className="text-normal text-[13px] md:text-[14px] text-web-dark">
                            {entryForm.fields.privacy.agree}
                          </p>
                        </CustomCheckbox>
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center pt-20">
                  <Button
                    type="submit"
                    className="w-full md:w-auto md:px-[120px] rounded-[5px] h-[72px]"
                  >
                    {entryForm.buttons.confirm}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {step === 2 && formValues && (
          <ConfirmStep
            formData={formValues} // Pass stored values instead of getValues()
            uploadedFile={uploadedFile}
            onBack={onConfirmStepBack}
            onSubmit={onConfirmStepSubmit}
          />
        )}
      </div>
    </motion.section>
  );
}
