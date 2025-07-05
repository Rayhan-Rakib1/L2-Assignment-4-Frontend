import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateBookMutation } from "@/redux/Api/baseApi";

import { toast } from "react-toastify";

type BookFormValues = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
};

function AddBook() {
  const navigate = useNavigate();

  const form = useForm<BookFormValues>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
    },
  });

  const [createBook] = useCreateBookMutation();

  const onSubmit: SubmitHandler<BookFormValues> = async (values) => {
    // Trigger validation programmatically
    const isValid = await form.trigger();

    if (!isValid) {
      toast.error("Please fill out all required fields!");
      return;
    }

    try {
      await createBook(values).unwrap();
      toast.success("Your book has been saved!");
      navigate("/");
      form.reset();
    } catch (error) {
      toast.error("Failed to save book. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Book title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            rules={{ required: "Author is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Author <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Author name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Genre */}
          <FormField
            control={form.control}
            name="genre"
            rules={{ required: "Genre is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Genre <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Genre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ISBN */}
          <FormField
            control={form.control}
            name="isbn"
            rules={{ required: "ISBN is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ISBN <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="ISBN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Copies */}
          <FormField
            control={form.control}
            name="copies"
            rules={{
              required: "Copies is required",
              min: { value: 1, message: "At least 1 copy required" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Available */}
          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                  />
                </FormControl>
                <FormLabel className="font-normal">Available</FormLabel>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Add Book
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AddBook;
