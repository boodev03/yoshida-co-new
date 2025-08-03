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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ConfirmStep from "./ConfirmStep";
import HeadingSite from "@/components/HeadingSite";
import { useTranslations } from "@/providers/translation-provider";
import parse from "html-react-parser";

const LabelCondition = ({ require }: { require?: boolean }) => {
  const { dict } = useTranslations();

  return (
    <div className={cn("bg-web-light rounded-full", require && "bg-web-vivid")}>
      <p className="flex items-center justify-center text-normal text-[8px] md:text-[12px] text-white py-1 px-2 leading-[9px] font-bold relative -top-[1px]">
        {require ? dict.contact.labels.required : dict.contact.labels.optional}
      </p>
    </div>
  );
};

export default function Contact() {
  const { dict } = useTranslations();
  const contact = dict.contact;

  // Create dynamic form schema based on translations
  const formSchema = z.object({
    category: z
      .string({
        required_error: contact.fields.category.required,
      })
      .min(1, contact.fields.category.required),

    company: z
      .string({
        required_error: contact.fields.company.required,
      })
      .min(1, contact.fields.company.required),

    name: z
      .string({
        required_error: contact.fields.name.required,
      })
      .min(1, contact.fields.name.required),

    phone: z
      .string({
        required_error: contact.fields.phone.required,
      })
      .min(1, contact.fields.phone.required)
      .regex(/^0\d{9,10}$/, contact.fields.phone.invalid)
      .refine((val) => {
        const digits = val.replace(/[^\d]/g, "");
        return digits.length >= 10 && digits.length <= 11 && digits.startsWith("0");
      }, contact.fields.phone.invalid),

    email: z
      .string({
        required_error: contact.fields.email.required,
      })
      .min(1, contact.fields.email.required)
      .email(contact.fields.email.invalid),

    message: z
      .string({
        required_error: contact.fields.message.required,
      })
      .min(1, contact.fields.message.required),

    privacy: z
      .boolean({
        required_error: contact.fields.privacy.required,
      })
      .refine((val) => val === true, contact.fields.privacy.required),
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
      category: "",
      company: "",
      name: "",
      phone: "",
      email: "",
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
      // Step 1: Only move to confirmation, do NOT call API yet
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
    // No API call here anymore
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
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    })
      .then((res) => {
        if (res.ok) {
          setStep(3);
        } else {
          alert(contact.messages.sendError);
        }
      })
      .catch(() => {
        alert(contact.messages.sendError);
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
    // Handle different Japanese phone number formats
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    } else if (digits.length === 10) {
      // 10-digit format: 03-4500-7216 or 090-1234-5678
      if (digits.startsWith('03') || digits.startsWith('04') || digits.startsWith('06')) {
        return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
      } else {
        return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
      }
    } else if (digits.length === 11) {
      // 11-digit format: 090-1234-5678
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    } else {
      // Fallback for other lengths
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
    <section className="py-[82px] mlg:py-[90px] pb-[60px] mlg:pb-[390px]">
      {/* Decor */}
      <HeadingSite
        title={contact.heading.title}
        subtitle={contact.heading.subtitle}
        imageUrl="/images/contact/banner.webp"
        breadcrumbs={[
          { label: contact.heading.breadcrumbs.top },
          { label: contact.heading.breadcrumbs.contact },
        ]}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="container mx-auto mt-[60px] md:mt-[120px] mb-[167px] md:mb-6"
      >
        <div className="space-y-8 md:space-y-12">
          <h2 className="text-jp-h2 text-web-dark text-center">
            {contact.stepHeadings[step - 1].title}
          </h2>
          <p className="text-jp-p2 text-web-dark text-center whitespace-pre-line">
            {parse(contact.stepHeadings[step - 1].description)}
          </p>
        </div>

        <div className="my-12 md:my-16 border-t border-line-gray" />

        {/* Form */}
        {step === 1 && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 md:space-y-8"
            >
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className={formControlClass}>
                    <Label className={labelClass}>
                      {contact.fields.category.label}
                      <LabelCondition require />
                    </Label>
                    <div className="flex-1 flex flex-col gap-2">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={contact.fields.category.placeholder}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="見積り依頼">
                            {contact.fields.category.options.quote}
                          </SelectItem>
                          <SelectItem value="製品への質問">
                            {contact.fields.category.options.product}
                          </SelectItem>
                          <SelectItem value="その他">
                            {contact.fields.category.options.other}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-sm" />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className={formControlClass}>
                    <Label className={labelClass}>
                      {contact.fields.company.label}
                      <LabelCondition require />
                    </Label>
                    <div className="flex-1 flex flex-col gap-2">
                      <FormControl>
                        <Input
                          placeholder={contact.fields.company.placeholder}
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
                      {contact.fields.name.label}
                      <LabelCondition require />
                    </Label>
                    <div className="flex-1 flex flex-col gap-2">
                      <FormControl>
                        <Input
                          placeholder={contact.fields.name.placeholder}
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
                      {contact.fields.phone.label}
                      <LabelCondition require />
                    </Label>
                    <div className="flex-1 flex flex-col gap-2">
                      <FormControl>
                        <Input
                          type="tel"
                          inputMode="numeric"
                          placeholder="03-4500-7216"
                          value={
                            phoneDisplay || formatPhoneForDisplay(field.value)
                          }
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

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={formControlClass}>
                    <Label className={labelClass}>
                      {contact.fields.email.label}
                      <LabelCondition require />
                    </Label>
                    <div className="flex-1 flex flex-col gap-2">
                      <FormControl>
                        <Input
                          placeholder={contact.fields.email.placeholder}
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
                name="message"
                render={({ field }) => (
                  <FormItem className={formControlClass}>
                    <Label className={labelClass}>
                      {contact.fields.message.label}
                      <LabelCondition require />
                    </Label>
                    <div className="flex-1 flex flex-col gap-2">
                      <FormControl>
                        <Textarea
                          placeholder={contact.fields.message.placeholder}
                          className="min-h-[371px]"
                          {...field}
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
                  {contact.fields.attachment.label}
                </Label>

                <div className="space-y-2 flex-1">
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      const file = acceptedFiles[0];
                      if (file && file.size > 1024 * 1024 * 20) {
                        const sizeMB = (file.size / (1024 * 1024 * 20)).toFixed(
                          1
                        );
                        setFileError(
                          `${contact.fields.attachment.sizeError.replace(
                            "20MB",
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
                      setFileError(contact.fields.attachment.sizeError);
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
                              {contact.fields.attachment.addFile}{" "}
                            </span>
                            {contact.fields.attachment.dropFile}
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
                        {contact.fields.attachment.sizeLimit}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="privacy"
                render={({ field }) => (
                  <FormItem className="my-12 md:mt-20 md:mb-20 flex flex-col gap-2 items-center">
                    <FormControl>
                      <CustomCheckbox
                        checked={field.value}
                        onChange={() => field.onChange(!field.value)}
                      >
                        <p className="text-normal text-[13px] md:text-[14px] text-web-vivid">
                          {contact.fields.privacy.label}
                        </p>
                        <p className="text-normal text-[13px] md:text-[14px] text-web-dark">
                          {contact.fields.privacy.agree}
                        </p>
                      </CustomCheckbox>
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full md:w-auto md:px-[120px]"
                >
                  {contact.buttons.confirm}
                </Button>
              </div>
            </form>
          </Form>
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
    </section>
  );
}
