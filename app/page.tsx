import Nav from "@/components/Nav";
import { UserForm } from "@/components/UserFoem";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-24 max-w-screen-md mx-auto">
      <Nav />
      <section className="py-12 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl font-bold">Dalseomom</h1>
        <p className="text-2xl text-muted-foreground">{`“point” 를 확인해보세요 :)`}</p>
      </section>

      <div>
        <UserForm />
      </div>
    </main>
  );
}
