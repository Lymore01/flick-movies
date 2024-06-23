
import React from "react";
import { Metadata } from "next";
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import UnderConst from "@/components/shared/UnderConst";

export const metadata = {
  title: "Create Vote",
  description: "A page to create open votes",
};

const handleCopyLink = () =>{
  toast("Link copied!")
}

const CreateVote = () => {
  return (
    <section className="mt-[40px] w-full h-screen items-center justify-center flex">
      {/* under development */}
      <UnderConst /> 
      <Card className="bg-[black] text-white z-20 hidden">
        <CardHeader>
          <CardTitle>Create A Voting Flick</CardTitle>
          <CardDescription>
            Create a link and share it with your friends
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="capitalize">select a name for your link</Label>
                <Input id="name" placeholder="Name of your project" type="text" autoComplete="off"/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="link">Link</Label>
                <p id="link" className="text-[orangered]">http://flick.io/friday254</p>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-[white] text-black" >Copy link</Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default CreateVote;
