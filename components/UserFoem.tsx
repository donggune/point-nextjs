"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import PointList from "./PointList";
import { PointHistory } from "@/model/pointHistory";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "3글자 이상 입력해 주세요.",
  }),
});

export function UserForm() {
  const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(JSON.stringify(values, null, 2));
    const res = await fetch(`/search/${values.username}`);
    const data = await res.json();
    setPointHistory(data);
    console.log(pointHistory);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input placeholder="닉네임을 입력해 주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex  justify-center">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "조회중" : "조회"}
            </Button>
          </div>
        </form>
      </Form>

      <PointList pointHistory={pointHistory} />
    </>
  );
}
