"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import PointList from "@/components/PointList";
import AllPointList from "@/components/AllPointList";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "3글자 이상 입력해 주세요.",
  }),
  point: z.coerce.number().min(0, {
    message: "0 이상 입력해 주세요.",
  }),
});

export default function PointManagementForm() {
  const { data: userList, mutate: mutateUserList } = useSWR(`/admin/points/all`);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      point: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmitDeposit(values: z.infer<typeof formSchema>) {
    console.log("[Deposit]");
    console.log(values);

    const res = await fetch(`/admin/points/deposit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.status === 200) {
        alert("등록되었습니다");
      }
    });
  }
  async function onSubmitWithdraw(values: z.infer<typeof formSchema>) {
    console.log("[Withdraw]");
    console.log(values);
    const res = await fetch(`/admin/points/withdraw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.status === 200) {
        alert("등록되었습니다");
      }
    });
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitDeposit)} className="max-w-screen-md mx-auto space-y-8">
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
          <FormField
            control={form.control}
            name="point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>포인트</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="포인트를 입력해 주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center gap-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              적립
            </Button>
            <Button
              type="button"
              onClick={() => form.handleSubmit(onSubmitWithdraw)()}
              disabled={form.formState.isSubmitting}
            >
              사용
            </Button>
          </div>
        </form>
      </Form>

      {userList && <AllPointList userList={userList} />}
    </section>
  );
}
