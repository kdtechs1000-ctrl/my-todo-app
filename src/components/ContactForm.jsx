import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Mail, Phone, Clock, Sparkles, Send, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

// Validation schema
const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone Number must be at least 10 digits")
    .max(15, "Phone Number must be at most 15 digits"),

  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(500, "Description must be at most 500 characters."),
});

export default function ContactPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      title: "",
      description: "",
    },
  });

  function onSubmit(data) {
    toast.success("Ticket Submitted Successfully!", {
      description: (
        <pre className="mt-2 w-[300px] overflow-x-auto rounded-md bg-muted p-3 text-xs">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
    });
    form.reset();
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Info Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Support Center
            </div>
            <h1 className="text-3xl font-black text-foreground sm:text-4xl tracking-tight">
              Get in Touch
            </h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Have a question or found a bug? Send us a message and our team will resolve it quickly.
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            <div className="p-4 rounded-2xl border border-border bg-card shadow-xs flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Email Us
                </span>
                <span className="text-sm font-bold text-foreground">
                  support@taskmaster.com
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-border bg-card shadow-xs flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Phone
                </span>
                <span className="text-sm font-bold text-foreground">
                  +1 (800) 123-4567
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-border bg-card shadow-xs flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Response Time
                </span>
                <span className="text-sm font-bold text-foreground">
                  Within 24 Hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side RHF Form */}
        <div className="lg:col-span-7">
          <Card className="w-full shadow-lg border-border">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Submit a Ticket</CardTitle>
              <CardDescription>
                Fill in the form details below to alert our technical team.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                id="form-rhf-demo"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FieldGroup className="space-y-4">
                  {/* Phone Number */}
  {/* Phone Number Field */}
<Controller
  name="phoneNumber"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor="form-rhf-demo-phoneNumber">
        Phone Number <span className="text-destructive">*</span>
      </FieldLabel>
      <Input
        {...field}
        id="form-rhf-demo-phoneNumber"
        aria-invalid={fieldState.invalid}
        placeholder="e.g. +1 (555) 000-0000"
        autoComplete="off"
      />
      {fieldState.invalid && (
        <FieldError errors={[fieldState.error]} />
      )}
    </Field>
  )}
/>

                  {/* Bug Title */}
                  <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Bug / Topic Title
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Login button not working on mobile"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Description */}
                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-description">
                          Description
                        </FieldLabel>

                        <InputGroup>
                          <InputGroupTextarea
                            {...field}
                            id="form-rhf-demo-description"
                            placeholder="Include steps to reproduce, expected behavior, and what actually happened..."
                            rows={5}
                            className="min-h-24 resize-none"
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align="block-end">
                            <InputGroupText className="tabular-nums text-xs">
                              {field.value.length}/500 characters
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>

                        <FieldDescription className="text-xs text-muted-foreground mt-1">
                          Include steps to reproduce, expected behavior, and what actually happened.
                        </FieldDescription>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>
            </CardContent>

            <CardFooter className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </Button>

              <Button
                type="submit"
                form="form-rhf-demo"
                className="flex items-center gap-1.5 bg-slate-900 text-white dark:bg-indigo-600"
              >
                <Send className="w-4 h-4" /> Submit Ticket
              </Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}