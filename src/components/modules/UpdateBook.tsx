"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { IBook } from "@/type";
import { useUpdateBookMutation } from "@/redux/Api/baseApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  book: IBook;
  onClose: () => void;
};

function UpdateBook({ book, onClose }: Props) {
  const { register, handleSubmit, reset } = useForm<IBook>({
    defaultValues: book,
  });

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  useEffect(() => {
    reset(book);
  }, [book, reset]);

  const onSubmit = async (data: IBook) => {
    try {
      await updateBook({ id: book._id, data }).unwrap();
      onClose(); // close on success
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
           <DialogDescription>
            Update the book details and click “Update” to save changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input id="author" {...register("author")} />
          </div>

          <div>
            <Label htmlFor="genre">Genre</Label>
            <Input id="genre" {...register("genre")} />
          </div>

          <div>
            <Label htmlFor="isbn">ISBN</Label>
            <Input id="isbn" {...register("isbn")} />
          </div>

          <div>
            <Label htmlFor="copies">Copies</Label>
            <Input
              type="number"
              id="copies"
              {...register("copies", { valueAsNumber: true })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateBook;
