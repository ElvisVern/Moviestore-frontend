import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import submitRate from "../../api/submit-rate";
import { useState } from "react";

const formSchema = z.object({
  rating: z.string(),
});

interface Props {
  movieId: string;
}

export default function Rate({ movieId }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessage, setShowMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: "1",
    },
  });

  async function handleSubmit(rating: number) {
    setIsSubmitting(true);
    try {
      await submitRate({ movieId, rating });
      setShowMessage("Thank you for your rating!");
    } catch (error) {
      setShowMessage(`An Error occurred!`);
      console.log(error);
    }
    setIsSubmitting(false);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    handleSubmit(+values.rating);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Rate:</FormLabel>
              <FormControl className="flex justify-start">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">1 Star</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2" />
                    </FormControl>
                    <FormLabel className="font-normal">2 Star</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3" />
                    </FormControl>
                    <FormLabel className="font-normal">3 Star</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="4" />
                    </FormControl>
                    <FormLabel className="font-normal">4 Star</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="5" />
                    </FormControl>
                    <FormLabel className="font-normal">5 Star</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Click on the score to rate this movie.
              </FormDescription>
              {showMessage && <FormDescription>{showMessage}</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
