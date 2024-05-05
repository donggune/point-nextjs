import Nav from "@/components/Nav";
import { UserForm } from "@/components/UserFoem";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-24">
      <Nav />
      <section className="py-12 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl font-bold">point</h1>
        <p className="text-2xl text-muted-foreground">
          “point” is a new way to manage your mental health. It is a new way to manage your mental health.
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        <Button variant={"secondary"}>Get Started</Button>
        <Button>Login</Button>
      </div>
      <div>
        <UserForm />
      </div>
    </main>
  );
}
